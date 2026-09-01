# Sky Designers External Authority and Brand Mention Consistency

Status: Local audit and operating guide; no outreach, profile edit, submission, deployment, or live-data change completed

Business: Sky Designers

Market: Sri Lanka

Canonical website: `https://skydesigners.lk`
Prepared: 2026-08-31

## Scope and evidence standard

This record uses facts already present in the project. Source-of-truth files include `src/data/siteData.ts`, `src/lib/seo.ts`, the public About, service, work, and blog implementations, `docs/seo-offpage-strategy.md`, and `docs/geo-evidence-case-study-audit.md`.

External profile ownership, live profile fields, client permissions, legal status, and founder-name equivalence cannot be established from local source code alone. Those items are marked for manual confirmation. No physical address, award, qualification, membership, review, ranking, client count, or market-leadership claim is introduced here.

## Canonical entity record

| Field | Canonical value or rule | Evidence/status |
| --- | --- | --- |
| Brand name | `Sky Designers` | Consistent in website content and structured data |
| Website | `https://skydesigners.lk` | Canonical HTTPS origin in `src/lib/seo.ts` |
| Business category | Digital marketing and creative agency | Existing site description; external platforms may require the closest available factual category |
| Operating context | Sri Lanka | Existing company data, copy, locale, and `areaServed` |
| Phone, display | `+94 77 950 7298` | Existing public display format |
| Phone, machine/link | `+94779507298` | Existing `tel`, WhatsApp, and structured-data format |
| Email | `info@skydesigners.lk` | Lowercase canonical form now used by the local website/entity fallback |
| Registration identifier | `WP/GAM/WT/2024/00244` | Existing About/Organization value; management should reconfirm current accuracy and disclosure approval |
| Founder | `Joshuwa` | Existing About, team source, and Organization entity; do not expand without owner confirmation |
| Main services | Performance Advertising; Social Media Management; Branding & Creative Design; Video & Content Production; Website Design & Development; Digital Strategy & Growth | Exact current service names |
| Physical address | None verified | Omit. The local UI fallback now uses only the verified country context, `Sri Lanka` |

### Official profiles referenced by the project

| Platform | Current canonical local URL | Audit result |
| --- | --- | --- |
| Facebook | `https://web.facebook.com/profile.php?id=100089002696067` | Unique HTTPS URL; retain until the owner confirms whether a different Facebook canonical host or username is preferred |
| Instagram | `https://www.instagram.com/js_sky_designers/` | Unique HTTPS URL |
| LinkedIn | `https://lk.linkedin.com/company/sky-designers` | Unique HTTPS URL; retain until the owner confirms the preferred regional/canonical host |
| YouTube | `https://youtube.com/@skydesigners` | Unique HTTPS handle; share parameter removed locally |
| TikTok | `https://www.tiktok.com/@sky_designers` | Unique HTTPS URL |
| Threads | `https://www.threads.com/@js_sky_designers` | Unique HTTPS handle; share parameter removed locally |

The codebase treats these six URLs as official. Ownership should still be confirmed by an authorised business account holder before copying them into third-party listings.

## Consistency findings and local corrections

- The static email was displayed as `Info@skyDesigners.lk`, while Organization JSON-LD lowercased it. The local website/entity fallback is now `info@skydesigners.lk`. The differently cased, non-visible careers API fallback was not changed because APIs are outside this phase.
- The YouTube and Threads URLs contained share/tracking parameters. Their stable handle URLs are now used in local visible links and Organization `sameAs` fallback data.
- `useCompany` contained an unverified Battaramulla street-address fallback that was absent from the canonical company record and Organization schema. It has been removed; when no approved address exists in settings, the UI shows only the verified `Sri Lanka` operating context.
- Facebook uses `web.facebook.com` and LinkedIn uses `lk.linkedin.com`. Both are HTTPS and unique in the project, but their preferred public canonical hosts require an account-owner or live-profile check. They were not changed by assumption.
- Public contact and social fields may be overridden by site settings. Because this phase does not modify live data, an authorised person must compare the live settings with this entity record before deployment. A differing live override could make visible links differ from static Organization `sameAs`.
- Service naming is internally stable when the exact six service titles are used. Short navigation labels such as `Meta Ads`, `Creative Design`, and `Web Development` are interface labels, not replacement entity categories.

## Official profile map

Use `Sky Designers` as the display name wherever a platform permits it. Handles may differ, but the visible business name, short description, contact facts, and service wording should not.

| Profile | Canonical display name | Primary website link | Supported secondary links | Consistent service wording |
| --- | --- | --- | --- | --- |
| Facebook | Sky Designers | `https://skydesigners.lk` | Relevant service page, exact work page, or current blog guide in individual posts | Performance Advertising; Social Media Management |
| Instagram | Sky Designers | `https://skydesigners.lk` | `/services/branding-creative-design`, `/services/social-media-management`, `/services/video-content-production`, `/work` where the post matches | Branding & Creative Design; Social Media Management; Video & Content Production |
| LinkedIn | Sky Designers | `https://skydesigners.lk` | `/about`, `/work`, `/careers`, relevant business guide, or `/services/digital-strategy-growth` | Digital Strategy & Growth plus the exact relevant service name |
| YouTube | Sky Designers | `https://skydesigners.lk` | `/services/video-content-production` or the exact work/article URL described by a video | Video & Content Production |
| TikTok | Sky Designers | `https://skydesigners.lk` | Exact video work page, `/services/video-content-production`, or `/services/social-media-management` when directly relevant | Video & Content Production; Social Media Management |
| Threads | Sky Designers | `https://skydesigners.lk` | Relevant `/blog` article, service explanation, or exact case study used in the discussion | Use the exact service name relevant to the post |

Recommended short profile description:

> Sky Designers is a Sri Lankan digital marketing and creative agency providing performance advertising, social media management, branding, video production, website development, and digital strategy services.

Keep the permanent website field pointed at the canonical homepage. Use supported deep links in posts, descriptions, featured sections, or campaign links rather than repeatedly changing the primary entity URL.

## Organization `sameAs` audit

The Organization entity retains the six locally referenced profiles in this order: Facebook, Instagram, LinkedIn, Threads, TikTok, and YouTube.

- Six entries are present, unique, and use HTTPS.
- No unrelated profile or duplicate URL is present.
- Threads and YouTube share parameters were removed from the static canonical URLs.
- The same fallback URLs feed visible About/Footer links, so local source relationships are consistent.
- Organization, WebSite, AboutPage, Service, CreativeWork, and BlogPosting entities remain in place; no schema type or claim was removed.
- No physical address was added to structured data.

Manual check required: sign in to or otherwise verify each official account, confirm ownership and preferred canonical URL, then compare the deployed visible links and rendered Organization JSON-LD. Also inspect current site-setting overrides because Organization data uses the static entity record while visible components can use approved settings values.

## Citation-ready company descriptions

### A. Short (26 words)

Sky Designers is a Sri Lankan digital marketing and creative agency providing performance advertising, social media management, branding, video production, website development, and digital strategy services.

### B. Medium (62 words)

Sky Designers is a digital marketing and creative agency operating in Sri Lanka. Its services include performance advertising, social media management, branding and creative design, video and content production, website design and development, and digital strategy and growth. The agency publishes service information, team details, project work, and marketing insights at https://skydesigners.lk, where businesses can review documented examples and contact the team.

### C. Long (123 words)

Sky Designers is a digital marketing and creative agency operating in Sri Lanka. The agency provides performance advertising, social media management, branding and creative design, video and content production, website design and development, and digital strategy and growth services. Its website presents service information, team details, a public work portfolio, marketing articles, contact information, and links to official social profiles. Sky Designers is identified on the website by the business registration reference WP/GAM/WT/2024/00244, the phone number +94 77 950 7298, and the email info@skydesigners.lk. The agency's published work includes website, social creative, and video projects, while its blog includes digital marketing guidance and documented campaign articles. Readers can review the available evidence, service scope, and project limitations at https://skydesigners.lk before contacting the team.

Before external use, recheck the registration identifier, profile URLs, contact details, and any platform-specific length limit. Do not append promotional superlatives.

## Founder and author entity clarity

| Surface | Current reference | Entity behavior |
| --- | --- | --- |
| About and team source | `Joshuwa`, `CEO & FOUNDER` | Visible founder and leadership information |
| Organization JSON-LD | Person named `Joshuwa`, job title `CEO & FOUNDER` | Founder relationship to Sky Designers is explicit |
| Seven existing published blog records | `Joshuwa Salamon` | Stored Blog API author value; preserved without alteration |
| BlogPosting JSON-LD | Person named `Joshuwa Salamon` | No `worksFor`, role, or About URL is inferred because the name does not exactly match the verified team source |

Local evidence does not prove that `Joshuwa` and `Joshuwa Salamon` are the same intended public entity, so they must not be merged automatically. An authorised owner should confirm the approved public founder name and whether the existing seven bylines refer to that founder. If confirmed, update the visible About/team source, Organization founder, blog-author mapping, and future byline standard together.

Additional real information that would improve author trust, if approved and documented:

- Canonical public name and consistent role styling
- A stable author or About-page section URL
- A factual short biography describing actual responsibilities and subject expertise
- Which published articles were written or reviewed by the person
- Approved professional profile links owned by that person
- Relevant qualifications, speaking appearances, or memberships only when documentary evidence exists
- Article review and update responsibility for platform-sensitive topics

## Project and relationship mention opportunities

Every item below is an outreach opportunity only. It does not state that a mention or backlink exists, that the named organisation is a current client, or that permission has been granted.

| Priority opportunity | Natural external mention | Best supported destination | Required confirmation |
| --- | --- | --- | --- |
| Lulu Bridal Studio & Academy website | Approved project acknowledgement, launch note, or subtle website credit | `/work/lulu-bridal-studio-academy-website` | Client identity, live-site ownership, Sky Designers role, wording, and placement permission |
| Lustre & Legacy ecommerce website | Approved developer/creative partner credit or project page | `/work/lustre-legacy-luxury-gemstone-e-commerce-website` | Relationship, exact development scope, live destination, and permission |
| OMS social creative collection | One consolidated collaboration acknowledgement rather than repetitive links to individual assets | Most representative OMS work page | Preferred client name, asset scope, and permission |
| OMS T30 promotional video | Product/campaign acknowledgement or approved production collaboration note | `/work/video-production-brand-promotion` | Exact production role, product naming, rights, and permission |
| Pet Expo 2026 | Event recap, partner page, or production/creative acknowledgement | Exact published Pet Expo work page | Organiser identity, event status, exact role, and approved title |
| Alloves Baby Care social creative | Client-approved creative collaboration or project feature | `/work/alloves-baby-care-gentle-care-for-happy-little-moments` | Relationship, campaign scope, product-claim approval, and permission |
| 37x education Meta article | Joint, client-approved campaign analysis or resource citation | `/blog/lbc-life-insurance-course-37x-roas-meta-case-study` | Client identity, figures, attribution basis, period, wording, and permission |
| 9.09x English diploma Meta article | Joint case-study collaboration or relevant campaign resource | `/blog/9x-roas-english-diploma-meta-ads-case-study` | Client identity, figures, attribution basis, period, wording, and permission |
| Educational or campus collaboration | Speaker bio, workshop recap, or cited planning resource | Relevant guide, `/about`, or service page | Real participation, speaker identity, topic, host approval, and event details |
| Sri Lankan business publication or interview | Editorial contribution using a factual company/author bio | Relevant guide or `/about` | Editorial acceptance, qualified author, cited sources, and final fact check |

Strongest initial opportunities are the two documented website projects because the public work records already describe clear scope and deliverables. OMS offers a relationship-level opportunity, but one useful consolidated acknowledgement is safer than multiple repetitive project links. The two campaign articles can support authoritative collaboration only after their figures, attribution, client identity, and publication permission are reconfirmed.

## External citation checklist

- [ ] Search for an existing Sky Designers record and claim or correct it before creating another profile.
- [ ] Use the exact display name `Sky Designers`; do not append keywords or a location to the legal/brand name field.
- [ ] Use `https://skydesigners.lk` without tracking parameters as the primary website.
- [ ] Use `+94 77 950 7298` for display and `+94779507298` where a machine-readable field requires it.
- [ ] Use `info@skydesigners.lk` with the approved lowercase display.
- [ ] State the Sri Lanka operating context accurately.
- [ ] Select the closest truthful digital marketing/creative agency category supported by the platform.
- [ ] Use the current official logo supplied by an authorised owner.
- [ ] Leave the physical-address field empty unless the owner provides and approves a verifiable address.
- [ ] Use one of the approved factual company descriptions without unsupported superlatives.
- [ ] Add only the six confirmed official business profiles.
- [ ] Check for duplicate records, obsolete URLs, conflicting phones, or conflicting descriptions.
- [ ] Record listing owner, login custodian, listing URL, approval date, and verification status privately.
- [ ] Obtain approval for every client, partner, event, quote, result, and project-role reference.
- [ ] Recheck contact and entity facts quarterly and immediately after an approved business change.

## Brand mention and backlink safety

Prefer branded mentions (`Sky Designers`), the naked canonical URL, natural editorial citations, approved project credits, client-reviewed case studies, real partnership references, and descriptive links to a genuinely useful resource. Let editors choose language that reads naturally.

Do not buy bulk links, create private blog network links, manufacture listings or reviews, automate mass profile creation, use irrelevant directories, hide credits, force keyword-stuffed anchors, or exchange links at scale. In particular, do not repeatedly request the exact-match anchor `digital marketing agency sri lanka`.

## AI-citation readiness

| Surface | Extractable facts | Status and limitation |
| --- | --- | --- |
| Homepage | Brand, Sri Lanka context, six service areas, contact routes, Organization/WebSite entities | Clear at source level; live setting overrides require a final deployed comparison |
| About | Brand story, registration reference, founder, team roles, official profiles, selected evidence links | Strong entity surface; founder canonical-name question remains |
| Services | Exact service names, descriptions, process/features, related work, Service entities | Clear service-to-provider relationship; avoid replacing exact names with short UI labels in citations |
| Work | Project title, stored description, evidence summary, scope/limitations where supported, CreativeWork entity | Stronger records are citation-ready; thin records must not be described as outcome case studies |
| Blog | Article topic, author string, dates, publisher, service/work links, BlogPosting entity | Published author string conflicts with founder naming and needs owner confirmation before entity consolidation |

The stable Organization `@id` connects the website, services, work, and published articles to Sky Designers. Visible descriptions and structured data avoid a physical address, awards, reviews, ratings, and unsupported results. The principal unresolved entity issue is author/founder identity consistency, followed by verification of live profile fields and settings overrides.

## Information gaps and manual actions outside the website

1. Confirm the authorised canonical public founder name and whether `Joshuwa Salamon` blog bylines refer to the same person as founder `Joshuwa`.
2. Confirm ownership and preferred canonical URL for all six official profiles, especially the Facebook and LinkedIn host variants.
3. Compare every live external profile's display name, description, website, phone, email, country, logo, and service categories with this record; do not edit automatically.
4. Review live site settings for contact/social overrides and remove any unverified street address or outdated profile URL through the normal authorised workflow.
5. Reconfirm that `WP/GAM/WT/2024/00244` is current and approved for public reuse.
6. Identify the approved official logo file/version for third-party listings.
7. Obtain written approval before any client, event, partner, project, quote, or performance mention.
8. Add founder biography, professional profiles, qualifications, or speaking credentials only after evidence and publication approval exist.
9. Maintain a private citation register containing profile ownership and verification dates; do not place credentials or secrets in the repository.

## Files changed for this phase

- `src/data/siteData.ts`
- `src/hooks/useCompany.ts`
- `docs/seo-offpage-strategy.md`
- `docs/geo-external-authority.md`

No live database record, Blog API record, authentication logic, route, schema migration, deployment configuration, or external profile was changed.
