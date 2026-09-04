# Meta Conversions API
## Architecture

`POST /api/meta-capi` is a TanStack Start server route deployed with the existing Netlify application. `META_ACCESS_TOKEN` is read only inside the per-request server handler. It is never a Vite variable, browser value, billing setting, database field, log value, or repository value.

Allowed events are `Lead`, `Contact`, and `PageView`. The current React click bridge sends only WhatsApp `Lead` and phone/email `Contact`; PageView remains supported server-side but is not sent until GTM browser/server deduplication is explicitly configured.

For each click React generates one UUID, places it in the existing GTM dataLayer as `meta_event_id`, and posts the same value to CAPI with `keepalive: true`. GTM must use that exact ID as Meta Pixel `eventID`. `_fbp` and `_fbc` remain raw; optional email/phone are normalized and SHA-256 hashed server-side. IP and user-agent are derived server-side and are not hashed.

Security: POST only, 16 KB limit, JSON validation, event allowlist, non-empty ID, HTTPS Sky Designers source URL allowlist, null stripping, upstream timeout, and safe upstream errors. The endpoint never returns Meta response bodies.

## Environment

- `META_ACCESS_TOKEN` — required, server-only; rotate the previously exposed token before launch.
- `META_TEST_EVENT_CODE` — optional for Events Manager testing.
- `META_GRAPH_API_VERSION` — optional; defaults to `v23.0` and should be reviewed during each Meta API upgrade.

Test in Events Manager with the test code, trigger one action, and confirm one logical event with Browser + Server deduplicated. Remove the test code for production.
