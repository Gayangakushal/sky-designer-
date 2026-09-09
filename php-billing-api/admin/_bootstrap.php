<?php
declare(strict_types=1);

function billing_json(array $data, int $status = 200): never { http_response_code($status); header('Content-Type: application/json; charset=utf-8'); echo json_encode($data, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE); exit; }
function billing_fail(string $message, int $status): never { billing_json(['success'=>false,'message'=>$message],$status); }

$configFile=dirname(__DIR__).'/config.php';
if(!is_file($configFile)) billing_fail('Billing service is not configured.',500);
$billingConfig=require $configFile;
$origin=$_SERVER['HTTP_ORIGIN']??'';
$isLocal=(bool)preg_match('#^http://(localhost|127\.0\.0\.1)(:\d+)?$#',$origin);
$allowed=$isLocal||in_array($origin,$billingConfig['allowed_origins']??[],true);
if($origin!==''&&!$allowed) billing_fail('Origin not allowed.',403);
if($allowed){header('Access-Control-Allow-Origin: '.$origin);header('Vary: Origin');header('Access-Control-Allow-Headers: Authorization, Content-Type, Accept');header('Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS');}
if(($_SERVER['REQUEST_METHOD']??'GET')==='OPTIONS'){http_response_code(204);exit;}

function billing_token(): string {
	$header=$_SERVER['HTTP_AUTHORIZATION']??$_SERVER['REDIRECT_HTTP_AUTHORIZATION']??'';
	if($header===''&&function_exists('apache_request_headers')){
		$headers=apache_request_headers();
		$header=$headers['Authorization']??$headers['authorization']??'';
	}
	if(!preg_match('/^Bearer\s+([^\s]+)$/i',trim($header),$matches))billing_fail('Authentication required.',401);
	return $matches[1];
}
function billing_http(string $url,string $key,string $token,?array $body=null): array {
	$curl=curl_init($url);
	$headers=['Accept: application/json','apikey: '.$key,'Authorization: Bearer '.$token];
	$options=[CURLOPT_RETURNTRANSFER=>true,CURLOPT_CONNECTTIMEOUT=>5,CURLOPT_TIMEOUT=>12,CURLOPT_HTTPHEADER=>$headers];
	if($body!==null){$headers[]='Content-Type: application/json';$options[CURLOPT_HTTPHEADER]=$headers;$options[CURLOPT_POST]=true;$options[CURLOPT_POSTFIELDS]=json_encode($body);}
	curl_setopt_array($curl,$options);
	$raw=curl_exec($curl);
	$error=$raw===false?curl_error($curl):null;
	$status=(int)curl_getinfo($curl,CURLINFO_HTTP_CODE);
	curl_close($curl);
	return ['ok'=>$raw!==false&&$status>=200&&$status<300,'status'=>$status,'data'=>json_decode((string)$raw,true),'error'=>$error];
}
function billing_supabase_failure(array $response): never {
	if(($response['status']??0)===401)billing_fail('Invalid or expired session.',401);
	billing_fail('Supabase verification service unavailable.',503);
}
function billing_authenticated_user(array $c): array {
	if(!function_exists('curl_init'))billing_fail('Server authentication is unavailable.',503);
	$token=billing_token();
	$url=rtrim((string)($c['supabase_url']??''),'/');
	$key=(string)($c['supabase_anon_key']??'');
	if($url===''||$key==='')billing_fail('Server authentication is not configured.',503);
	$userResponse=billing_http($url.'/auth/v1/user',$key,$token);
	if(!$userResponse['ok']||empty($userResponse['data']['id']))billing_supabase_failure($userResponse);
	return ['user_id'=>(string)$userResponse['data']['id'],'access_token'=>$token,'supabase_url'=>$url,'supabase_key'=>$key,'user'=>$userResponse['data']];
}
function billing_has_role(array $auth,string $role): bool {
	$response=billing_http($auth['supabase_url'].'/rest/v1/rpc/has_role',$auth['supabase_key'],$auth['access_token'],['_user_id'=>$auth['user_id'],'_role'=>$role]);
	if(!$response['ok'])billing_supabase_failure($response);
	return in_array($response['data'],[true,'true'],true);
}
function billing_require_roles(array $allowedRoles,array $config,string $message): array {
	global $billingRole,$billingAuth;
	$billingAuth=billing_authenticated_user($config);
	foreach($allowedRoles as $role){
		if(billing_has_role($billingAuth,$role)){
			$billingRole=$role;
			return $billingAuth['user'];
		}
	}
	billing_fail($message,403);
}
function billing_require_billing_access(array $config): array { return billing_require_roles(['admin','accounting'],$config,'Billing access required.'); }
function billing_require_admin(array $config): array { return billing_require_roles(['admin'],$config,'Administrator access required.'); }

$billingActionPolicy=[
	'dashboard'=>'billing',
	'clients/list'=>'billing','clients/get'=>'billing','clients/save'=>'billing','clients/archive'=>'admin',
	'quotes/list'=>'billing','quotes/get'=>'billing','quotes/create'=>'billing','quotes/update'=>'billing','quotes/status'=>'billing','quotes/convert'=>'billing','quotes/duplicate'=>'billing','quotes/delete'=>'admin','quotes/archive'=>'admin',
	'invoices/list'=>'billing','invoices/get'=>'billing','invoices/create'=>'billing','invoices/update'=>'billing','invoices/status'=>'billing','invoices/delete'=>'admin','invoices/archive'=>'admin',
	'payments/list'=>'billing','payments/create'=>'billing','payments/reverse'=>'admin',
	'settings/get'=>'billing','settings/update'=>'admin','settings/upload-logo'=>'admin',
];
$billingAction=defined('BILLING_ACTION')?BILLING_ACTION:'';
if(!isset($billingActionPolicy[$billingAction]))billing_fail('Endpoint not found.',404);
$billingUser=$billingActionPolicy[$billingAction]==='admin'
	? billing_require_admin($billingConfig)
	: billing_require_billing_access($billingConfig);
try{$db=new PDO($billingConfig['database']['dsn'],$billingConfig['database']['user'],$billingConfig['database']['password'],[PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION,PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC,PDO::ATTR_EMULATE_PREPARES=>false]);}catch(Throwable){billing_fail('Billing database is unavailable.',500);}

function billing_method(array $allowed): void {$m=strtoupper($_SERVER['REQUEST_METHOD']??'GET');if(!in_array($m,$allowed,true)){header('Allow: '.implode(', ',$allowed));billing_fail('Method not allowed.',405);}}
function billing_input(): array {$d=json_decode(file_get_contents('php://input')?:'{}',true);if(!is_array($d))billing_fail('Invalid JSON body.',400);return $d;}
function billing_id(mixed $v): int {$id=filter_var($v,FILTER_VALIDATE_INT);if(!$id||$id<1)billing_fail('A valid record ID is required.',422);return (int)$id;}
function billing_text(mixed $v,int $max=10000): string {return mb_substr(trim((string)$v),0,$max);}
function billing_date(mixed $v,bool $optional=false): ?string {$s=billing_text($v,10);if($optional&&$s==='')return null;$d=DateTimeImmutable::createFromFormat('!Y-m-d',$s);if(!$d||$d->format('Y-m-d')!==$s)billing_fail('A date is invalid.',422);return $s;}
function billing_one(PDO $db,string $sql,array $p=[]): ?array {$s=$db->prepare($sql);$s->execute($p);$r=$s->fetch();return $r?:null;}
function billing_all(PDO $db,string $sql,array $p=[]): array {$s=$db->prepare($sql);$s->execute($p);return $s->fetchAll();}
function billing_audit(PDO $db,string $user,string $action,string $type,?int $id,array $meta=[]): void {$s=$db->prepare('INSERT INTO billing_activity_log(admin_user_id,action,entity_type,entity_id,metadata) VALUES(?,?,?,?,?)');$s->execute([$user,$action,$type,$id,$meta?json_encode($meta):null]);}
function billing_settings(PDO $db): array {return billing_one($db,'SELECT * FROM billing_settings WHERE id=1')??[];}
function billing_client(PDO $db,int $id): array {$r=billing_one($db,'SELECT * FROM billing_clients WHERE id=?',[$id]);if(!$r)billing_fail('Client not found.',404);return $r;}
function billing_snapshot(array $s): array {return array_intersect_key($s,array_flip(['business_name','display_name','logo_url','primary_color','accent_color','website','email','phone','address','country','registration_number','bank_name','account_name','account_number','branch','payment_instructions','footer_company_text','footer_show_registration','disclaimer']));}
function billing_allocate(PDO $db,string $kind): string {$col=$kind==='quote'?'quotation_next_number':'invoice_next_number';$prefix=$kind==='quote'?'quotation_prefix':'invoice_prefix';$s=billing_one($db,"SELECT $col,$prefix FROM billing_settings WHERE id=1 FOR UPDATE");if(!$s)throw new RuntimeException('Settings missing');$number=(int)$s[$col];$db->prepare("UPDATE billing_settings SET $col=$col+1 WHERE id=1")->execute();return $s[$prefix].str_pad((string)$number,6,'0',STR_PAD_LEFT);}
function billing_items(array $data): array {$rows=$data['items']??[];if(!is_array($rows)||count($rows)<1)billing_fail('At least one line item is required.',422);$out=[];$subtotal=0.0;foreach($rows as $i=>$r){$title=billing_text($r['service_title']??'',255);$qty=(float)($r['quantity']??0);$rate=(float)($r['unit_price']??0);if($title===''||$qty<=0||$rate<0)billing_fail('Each line needs a title, positive quantity and valid rate.',422);$line=round($qty*$rate,2);$subtotal+=$line;$out[]=['service_title'=>$title,'description'=>billing_text($r['description']??''),'quantity'=>$qty,'unit_price'=>$rate,'line_total'=>$line,'sort_order'=>$i];}return [$out,round($subtotal,2)];}
function billing_invoice_select(): string {return "SELECT i.*,c.name client_name,COALESCE(p.amount_paid,0) amount_paid,GREATEST(i.total-COALESCE(p.amount_paid,0),0) balance_due,CASE WHEN i.status IN ('DRAFT','CANCELLED') THEN i.status WHEN GREATEST(i.total-COALESCE(p.amount_paid,0),0)<=0 THEN 'PAID' WHEN COALESCE(p.amount_paid,0)>0 THEN 'PARTIALLY_PAID' WHEN i.due_date<CURRENT_DATE THEN 'OVERDUE' ELSE 'SENT' END status FROM billing_invoices i JOIN billing_clients c ON c.id=i.client_id LEFT JOIN (SELECT invoice_id,SUM(amount) amount_paid FROM billing_payments WHERE reversed_at IS NULL GROUP BY invoice_id)p ON p.invoice_id=i.id";}
function billing_refresh_invoice(PDO $db,int $id): void {$i=billing_one($db,billing_invoice_select().' WHERE i.id=?',[$id]);if(!$i||$i['status']==='CANCELLED'||$i['status']==='DRAFT')return;$status=(float)$i['balance_due']<=0?'PAID':((float)$i['amount_paid']>0?'PARTIALLY_PAID':((string)$i['due_date']<gmdate('Y-m-d')?'OVERDUE':'SENT'));$db->prepare('UPDATE billing_invoices SET status=? WHERE id=?')->execute([$status,$id]);}
