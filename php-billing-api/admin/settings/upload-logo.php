<?php
declare(strict_types=1);
require dirname(__DIR__) . '/_bootstrap.php';
billing_method(['POST']);
if(!isset($_FILES['logo'])||!is_uploaded_file($_FILES['logo']['tmp_name']))billing_fail('A logo file is required.',422);
$file=$_FILES['logo'];if((int)$file['size']<1||(int)$file['size']>3*1024*1024)billing_fail('Logo must be smaller than 3 MB.',422);
$info=@getimagesize($file['tmp_name']);$mime=$info['mime']??'';$extensions=['image/png'=>'png','image/jpeg'=>'jpg','image/webp'=>'webp'];$imageType=function_exists('exif_imagetype')?@exif_imagetype($file['tmp_name']):($info[2]??false);
if(!isset($extensions[$mime])||!in_array($imageType,[IMAGETYPE_PNG,IMAGETYPE_JPEG,IMAGETYPE_WEBP],true))billing_fail('Only valid PNG, JPEG or WebP images are allowed.',422);
$directory=dirname(__DIR__,2).'/uploads/branding';if(!is_dir($directory)&&!mkdir($directory,0755,true))billing_fail('Logo storage is unavailable.',500);
$name='sky-brand-'.bin2hex(random_bytes(16)).'.'.$extensions[$mime];$target=$directory.'/'.$name;
if(!move_uploaded_file($file['tmp_name'],$target))billing_fail('Logo could not be stored.',500);
$url='uploads/branding/'.$name;
$old=(string)(billing_settings($db)['logo_url']??'');$db->prepare('UPDATE billing_settings SET logo_url=?,updated_by=? WHERE id=1')->execute([$url,$billingUser['id']]);billing_audit($db,(string)$billingUser['id'],'logo_updated','settings',1);
$oldPath=(string)(parse_url($old,PHP_URL_PATH)?:$old);$oldPath=ltrim($oldPath,'/');
if(str_starts_with($oldPath,'uploads/branding/')){$oldFile=$directory.'/'.basename($oldPath);if(is_file($oldFile))@unlink($oldFile);}
billing_json(['success'=>true,'logo_url'=>$url]);
