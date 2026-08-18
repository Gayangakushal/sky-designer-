# Sky Designers blog admin API

Upload the contents of this repository's `php-blog-api/admin/` directory to:

`public_html/api/blog/admin/`

The production server must already contain `public_html/api/blog/db.php`. The admin files load it via `../db.php` and support a PDO connection named `$pdo`, or a mysqli connection named `$conn` or `$mysqli`.

Configure these server environment variables (never expose them in React):

- `SUPABASE_URL` — the existing Supabase project URL
- `SUPABASE_ANON_KEY` — the existing public/anon project key (not a service-role key)

If Apache does not forward the `Authorization` header to PHP, add this to the applicable `.htaccess` file:

```apache
SetEnvIf Authorization "(.+)" HTTP_AUTHORIZATION=$1
```

Allowed browser origins are limited in `admin/auth.php` to `http://localhost:5173` and `https://skydesigners.lk`.
