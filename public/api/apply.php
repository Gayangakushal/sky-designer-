<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');

function respond(int $status, bool $success, string $message): never
{
    http_response_code($status);
    echo json_encode(['success' => $success, 'message' => $message], JSON_UNESCAPED_SLASHES);
    exit;
}

function clean_text(string $value, int $maxLength = 2000): string
{
    $value = trim(str_replace(["\r", "\0"], '', $value));
    return mb_substr($value, 0, $maxLength);
}

function safe_header(string $value): string
{
    return trim(str_replace(["\r", "\n"], '', $value));
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, false, 'Method not allowed.');
}

// Honeypot: bots commonly fill hidden fields.
if (!empty($_POST['website'] ?? '')) {
    respond(200, true, 'Application received.');
}

// Lightweight per-IP rate limit: one submission per 60 seconds.
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateFile = sys_get_temp_dir() . '/sky-careers-' . hash('sha256', $ip) . '.lock';
$now = time();
if (is_file($rateFile)) {
    $last = (int) @file_get_contents($rateFile);
    if ($last > 0 && ($now - $last) < 60) {
        respond(429, false, 'Please wait a moment before sending another application.');
    }
}
@file_put_contents($rateFile, (string) $now, LOCK_EX);

$fullName = clean_text((string) ($_POST['fullName'] ?? ''), 120);
$email = filter_var(trim((string) ($_POST['email'] ?? '')), FILTER_VALIDATE_EMAIL);
$phone = clean_text((string) ($_POST['phone'] ?? ''), 60);
$position = clean_text((string) ($_POST['position'] ?? ''), 120);
$location = clean_text((string) ($_POST['location'] ?? ''), 120);
$experience = clean_text((string) ($_POST['experience'] ?? ''), 120);
$linkedin = clean_text((string) ($_POST['linkedin'] ?? ''), 500);
$portfolio = clean_text((string) ($_POST['portfolio'] ?? ''), 500);
$coverMessage = clean_text((string) ($_POST['coverMessage'] ?? ''), 4000);
$consent = (string) ($_POST['consent'] ?? '');

if ($fullName === '' || !$email || $phone === '' || $position === '' || $coverMessage === '') {
    respond(422, false, 'Please complete all required fields.');
}
if ($consent !== 'on') {
    respond(422, false, 'Privacy consent is required.');
}

if (!isset($_FILES['cv']) || !is_array($_FILES['cv'])) {
    respond(422, false, 'Please attach your CV or résumé.');
}

$file = $_FILES['cv'];
if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
    respond(422, false, 'The CV upload failed. Please try again.');
}
if (($file['size'] ?? 0) <= 0 || $file['size'] > 5 * 1024 * 1024) {
    respond(422, false, 'The CV file must be smaller than 5 MB.');
}

$allowedMimes = [
    'application/pdf' => 'pdf',
    'application/msword' => 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document' => 'docx',
    'application/zip' => 'docx', // Some servers report DOCX as ZIP.
];

$finfo = new finfo(FILEINFO_MIME_TYPE);
$mime = $finfo->file((string) $file['tmp_name']) ?: '';
$originalExtension = strtolower(pathinfo((string) ($file['name'] ?? ''), PATHINFO_EXTENSION));
if (!isset($allowedMimes[$mime]) || !in_array($originalExtension, ['pdf', 'doc', 'docx'], true)) {
    respond(422, false, 'Only PDF, DOC, and DOCX files are accepted.');
}

$fileContents = @file_get_contents((string) $file['tmp_name']);
if ($fileContents === false) {
    respond(500, false, 'The uploaded file could not be read.');
}

$recipient = getenv('CAREERS_EMAIL') ?: 'Info@jsskydesigners.com';
$fromEmail = getenv('CAREERS_FROM_EMAIL') ?: 'no-reply@' . ($_SERVER['HTTP_HOST'] ?? 'localhost');
$fromName = getenv('CAREERS_FROM_NAME') ?: 'Sky Designers Careers';
$recipient = safe_header($recipient);
$fromEmail = safe_header($fromEmail);
$fromName = safe_header($fromName);

$subject = safe_header("New Job Application - {$position} - {$fullName}");
$submittedAt = date('Y-m-d H:i:s T');

$plainBody = "A new job application was submitted.\n\n"
    . "Applicant: {$fullName}\n"
    . "Email: {$email}\n"
    . "Phone: {$phone}\n"
    . "Position: {$position}\n"
    . "Location: " . ($location ?: 'Not provided') . "\n"
    . "Experience: " . ($experience ?: 'Not provided') . "\n"
    . "LinkedIn: " . ($linkedin ?: 'Not provided') . "\n"
    . "Portfolio: " . ($portfolio ?: 'Not provided') . "\n"
    . "Submitted: {$submittedAt}\n\n"
    . "Cover message:\n{$coverMessage}\n";

$boundary = '=_SkyDesigners_' . bin2hex(random_bytes(12));
$safeFileBase = preg_replace('/[^A-Za-z0-9._-]/', '-', $fullName . '-CV') ?: 'applicant-CV';
$attachmentName = $safeFileBase . '.' . $originalExtension;

$headers = [
    'MIME-Version: 1.0',
    'From: ' . $fromName . ' <' . $fromEmail . '>',
    'Reply-To: ' . safe_header((string) $email),
    'Content-Type: multipart/mixed; boundary="' . $boundary . '"',
];

$body = '--' . $boundary . "\r\n"
    . "Content-Type: text/plain; charset=UTF-8\r\n"
    . "Content-Transfer-Encoding: 8bit\r\n\r\n"
    . $plainBody . "\r\n\r\n"
    . '--' . $boundary . "\r\n"
    . 'Content-Type: ' . $mime . '; name="' . $attachmentName . '"' . "\r\n"
    . "Content-Transfer-Encoding: base64\r\n"
    . 'Content-Disposition: attachment; filename="' . $attachmentName . '"' . "\r\n\r\n"
    . chunk_split(base64_encode($fileContents))
    . '--' . $boundary . "--\r\n";

$sent = @mail($recipient, $subject, $body, implode("\r\n", $headers));
if (!$sent) {
    error_log('Sky Designers careers email failed for position: ' . $position);
    respond(500, false, 'The application could not be emailed. Please contact us directly or try again later.');
}

// Send a short acknowledgement. Failure here does not invalidate the application.
$confirmationSubject = 'We received your application - Sky Designers';
$confirmationBody = "Hi {$fullName},\n\nThank you for applying for {$position} at Sky Designers. Our team has received your application and will contact you if your profile matches the next stage.\n\nSky Designers\n";
$confirmationHeaders = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: ' . $fromName . ' <' . $fromEmail . '>',
];
@mail((string) $email, $confirmationSubject, $confirmationBody, implode("\r\n", $confirmationHeaders));

respond(200, true, 'Your application has been sent successfully. A confirmation email should arrive shortly.');
