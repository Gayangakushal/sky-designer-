# Meta CAPI — GTM Setup

The website already owns browser Meta events through GTM. Do not add another independent `fbq` call in React.

Create Data Layer Variables:

- `DLV - Meta Event ID` → `meta_event_id`
- `DLV - Meta Event Name` → `meta_event_name`

For the existing WhatsApp trigger, configure the Meta Pixel tag as `Lead` and set Event ID to `{{DLV - Meta Event ID}}`. For existing phone/email triggers, configure `Contact` with the same Event ID variable. Use the existing custom events `contact_whatsapp_click`, `contact_phone_click`, and `contact_email_click` as triggers.

Do not configure CAPI PageView yet. The currently embedded browser PageView lacks a shared event ID; enabling server PageView now would double count.

Preview GTM, click once, verify one dataLayer event and one browser request. In Meta Test Events, verify Browser and Server carry the identical event ID and collapse into one logical event. If they appear separately, stop release and correct the GTM Event ID field.
