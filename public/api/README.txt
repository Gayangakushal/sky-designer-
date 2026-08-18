CAREERS EMAIL SETUP

1. Upload the built site to a PHP-enabled Apache/cPanel host.
2. Configure these server environment variables:
   CAREERS_EMAIL       Recipient for applications
   CAREERS_FROM_EMAIL  Same-domain sender address
   CAREERS_FROM_NAME   Display name (optional)
3. Confirm PHP mail() is enabled by the hosting provider.
4. Test one application with a small PDF file.

The endpoint validates fields, limits CV files to 5 MB, checks MIME types,
uses a honeypot, and applies a lightweight per-IP submission delay.
For higher deliverability, replace native mail() with authenticated SMTP/PHPMailer.
