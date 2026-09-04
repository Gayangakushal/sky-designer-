# Sky Designers Local SEO and CRO Foundation Audit

Audit date: 2026-09-01  
Market: Sri Lanka  
Scope: local repository and existing project evidence only

## 1. Executive summary

Sky Designers already has a strong country-level entity foundation: one canonical brand name, HTTPS website, phone, email, Sri Lanka operating context, digital marketing and creative agency category, six stable service names, and six official-profile URLs. The website should target legitimate Sri Lanka intent rather than city or branch terms because no physical address, city office, opening hours, or branch record is verified.

The audit found five concrete entity/contact inconsistencies or risks and corrected all five locally:

1. Removed three additional staff phone numbers from the global footer because they were not part of the canonical entity record.
2. Removed the unverified "Bookings are available before 5:00 PM" claim from the homepage contact section.
3. Removed the same time restriction from the project-enquiry form and made preferred date/time optional.
4. Replaced hard-coded custom-package phone links with the same company contact source used by public navigation and contact components.
5. Routed floating, location, and pricing contact UI through `useCompany`, matching the existing Navbar, Footer, and About behavior.

High-confidence CRO changes also clarify the primary CTA as "Discuss Your Project," expose required versus optional booking fields, add privacy/contact alternatives, link work evidence and published articles to one contextual enquiry action, route the footer's Work link to the complete portfolio, and disable public query/keyboard entry points to the client-only package-management panel.

No price, result, location, response time, opening hour, review, award, rating, or service-area claim was added. No structured data, analytics loader, database policy, authentication, live data, Blog API, external profile, or deployment configuration was changed.

## 2. Local entity audit

### Canonical record

| Field | Canonical value/rule | Final website status |
| --- | --- | --- |
| Brand | Sky Designers | Consistent capitalization |
| Website | `https://skydesigners.lk` | Canonical origin, sitemap URL, and entity URL consistent |
| Category | Digital marketing and creative agency | Consistent across homepage, About, Footer, and Organization description |
| Operating context | Sri Lanka | Clear on homepage, About, services, portfolio metadata, locale, and `areaServed` |
| Phone display | `+94 77 950 7298` | Single canonical public number after footer correction |
| Phone machine/link | `+94779507298` | Used by canonical fallback, `tel`, WhatsApp, and structured data |
| Email | `info@skydesigners.lk` | Consistent public lowercase form |
| Physical address | None verified | Omitted; country context only |
| Opening hours | None verified | Unsupported before-5-PM claim removed |
| Registration | `WP/GAM/WT/2024/00244` | Existing visible/structured identifier; disclosure accuracy still requires owner confirmation |

### Official profile URLs retained

| Platform | Current local URL | Manual status |
| --- | --- | --- |
| Facebook | `https://web.facebook.com/profile.php?id=100089002696067` | Confirm ownership and preferred canonical host |
| Instagram | `https://www.instagram.com/js_sky_designers/` | Confirm ownership and current profile fields |
| LinkedIn | `https://lk.linkedin.com/company/sky-designers` | Confirm ownership and preferred canonical host |
| Threads | `https://www.threads.com/@js_sky_designers` | Confirm ownership and profile fields |
| TikTok | `https://www.tiktok.com/@sky_designers` | Confirm ownership and profile fields |
| YouTube | `https://youtube.com/@skydesigners` | Confirm ownership and channel fields |

Visible About and Footer profile links use the same fallback source as Organization `sameAs`. Approved live site settings can override visible values, so the rendered production values must be compared with this record after deployment.

### Local page audit

| Surface | Sri Lanka/entity clarity | Services/evidence/contact clarity | Finding |
| --- | --- | --- | --- |
| `/` | Strong | Strong | H1/description establish Sri Lankan agency context; services, work, team, official contact, and primary CTA are visible |
| `/about` | Strong | Strong | Category, registration, founder/team, services, work, profiles, country, phone, and email are explicit |
| `/services` | Strong | Strong | Six capabilities presented under Sri Lankan digital marketing services intent |
| Six service pages | Strong | Strong | Country-modified H1/metadata, definition, audience, scope/cost, provider criteria, evidence, and enquiry CTA |
| `/work` | Strong | Strong | Portfolio title includes Sri Lanka; published evidence routes to services |
| `/packages` | Strong | Strong with live-check need | Sri Lanka Meta Ads package intent and WhatsApp confirmation path; package values require ongoing owner review |
| `/careers` | Appropriate | Separate recruitment path | Employer/career intent is not mixed with customer conversions |
| Contact/booking | Strong after fixes | Strong | One visible canonical number, email, WhatsApp, country context, enquiry form, and direct alternatives |

No city-specific landing page is justified by current evidence. "Colombo" appears only in technical timezone/admin scheduling contexts, not as a public office claim. No public Battaramulla, Gampaha, or other city-office page should be created without a verified location and unique user value.

## 3. Local query map

Eighteen legitimate country-level queries are mapped below. The target is Sri Lanka; city modifiers are intentionally excluded.

| Query | Intent | Primary URL | Supporting URL/content | Priority |
| --- | --- | --- | --- | --- |
| digital marketing agency sri lanka | Broad commercial/entity | `/` | `/about`, `/services`, `/work` | P1 |
| creative agency sri lanka | Broad commercial/entity | `/` | Branding/video service pages and `/work` | P2 |
| digital marketing services sri lanka | Service discovery | `/services` | Six service pages | P1 |
| Meta Ads agency sri lanka | Commercial service | `/services/performance-advertising` | Draft 01 when published | P1 |
| performance marketing agency sri lanka | Commercial service | `/services/performance-advertising` | Campaign-analysis articles | P1 |
| social media management agency sri lanka | Commercial service | `/services/social-media-management` | Draft 03 when published | P1 |
| branding agency sri lanka | Commercial service | `/services/branding-creative-design` | Draft 05 when published | P1 |
| creative design agency sri lanka | Commercial service | `/services/branding-creative-design` | `/work`, `/graphic-design` | P2 |
| video production company sri lanka | Commercial service | `/services/video-content-production` | Draft 06 and video work records | P1 |
| content production agency sri lanka | Commercial service | `/services/video-content-production` | Social/video work records | P2 |
| web design company sri lanka | Commercial service | `/services/website-design-development` | Draft 08 and two website projects | P1 |
| website development company sri lanka | Commercial service | `/services/website-design-development` | Draft 07 and two website projects | P1 |
| digital marketing strategy sri lanka | Commercial service | `/services/digital-strategy-growth` | Draft 09 when published | P1 |
| Meta Ads packages sri lanka | Package selection | `/packages` | Performance Advertising service | P1 |
| digital marketing portfolio sri lanka | Evidence discovery | `/work` | Strong work details | P2 |
| Facebook and Instagram ads cost sri lanka | Cost research | Draft 02, unpublished | `/packages` only for current package selection | P1 |
| website cost sri lanka | Cost research | Draft 07, unpublished | Website service | P1 |
| digital marketing plan for sri lankan SME | Planning | Draft 09, unpublished | Digital Strategy & Growth service | P1 |

Do not create `/digital-marketing-agency-colombo`, `/digital-marketing-agency-gampaha`, or equivalent pages from this map. A genuine future location page would require verified premises/service relevance, unique customer information, local evidence, and a useful purpose beyond changing the place name.

## 4. Google Business Profile manual checklist

No external profile was accessed or changed. An authorised owner should complete this checklist manually:

- [ ] Use the exact business name `Sky Designers`; do not add service keywords to the name.
- [ ] Confirm the profile is eligible under current Google guidelines before creation or changes.
- [ ] Select the closest truthful primary category available in the interface; record the exact category chosen and why.
- [ ] Add secondary categories only for real, currently provided service groups.
- [ ] Use `https://skydesigners.lk` as the primary website.
- [ ] Use `+94 77 950 7298` / `+94779507298` consistently.
- [ ] Use `info@skydesigners.lk` where the platform exposes an email field.
- [ ] Adapt the established factual company description; do not add rankings, awards, guarantees, or unverified years/client counts.
- [ ] List only the six current services, using names consistent with the website.
- [ ] Confirm whether the business is location-based, service-area, or otherwise eligible; do not expose or invent an address.
- [ ] Add service areas only when genuinely served and supportable; do not select every city for reach.
- [ ] Do not add opening hours until real staffed/contact hours are approved.
- [ ] Use an approved logo, cover image, team/workspace photos, and real work images with rights confirmed.
- [ ] Ask real customers for honest reviews without incentives, scripts, review gating, or fabricated accounts.
- [ ] Respond to reviews factually and without disclosing client-sensitive information.
- [ ] Review Q&A for accurate service, contact, ownership, and scope information; do not seed fake customer questions.
- [ ] Use posts/updates only for current services, approved work, articles, or time-bound information.
- [ ] Add UTM parameters only through an agreed measurement standard, while keeping the canonical destination clear.
- [ ] Compare the live profile name, URL, phone, description, services, and photos with this audit quarterly.

## 5. Local citation checklist

Future citation/profile work should be selective, manual, and consistent:

| Surface | Fields to align | Check |
| --- | --- | --- |
| Google Business Profile | Name, website, phone, category, Sri Lanka/service-area truth, services, images | Eligibility and owner approval required |
| LinkedIn | Name, website, category/description, country, services, team relationship | Confirm preferred canonical host |
| Facebook | Name, website, phone, email, description, services | Confirm current page ownership and URL |
| Instagram | Display name, website, contact buttons, category, bio | Confirm current contact/profile values |
| YouTube | Channel name, handle, website, description, contact method | Use video service/work links contextually |
| TikTok | Display name, handle, website/bio, category wording | Do not imply platform certification |
| Threads | Display name, handle, website/bio | Use exact relevant service/article links in posts |
| Legitimate Sri Lankan directories | Name, website, phone, email, country/category | Submit only to reputable relevant directories; no mass submission |
| Client/project mentions | Brand name, exact project URL, factual role, approved evidence | Client approval and disclosure context required |

Citation gaps requiring manual review:

- ownership and current field accuracy for all six official profiles;
- Google Business Profile eligibility/status and profile fields;
- preferred canonical Facebook and LinkedIn hosts;
- live site-setting overrides versus static Organization `sameAs`;
- which Sri Lankan directories are legitimate, moderated, relevant, and worth maintaining;
- client permission for relationship mentions, logos, links, and stronger project descriptions.

## 6. Structured-data findings

The safest current local implementation remains `Organization` plus `areaServed: Sri Lanka`, supported by `WebSite`, `AboutPage`, six `Service` entities, `CreativeWork`, and `BlogPosting`.

Status: no structured-data change.

Do not add `LocalBusiness` merely for local ranking. Before considering a more specific local-business type, verify and approve:

- actual business eligibility and operating model;
- a public physical address, if one should legally and operationally be disclosed;
- address formatting and correspondence with external profiles;
- genuine customer-facing hours and exceptions;
- accurate service-area rules;
- latitude/longitude only for a verified public location;
- public business phone/email consistency;
- current legal/business identifiers and disclosure permission.

Even with those facts, aggregate ratings, individual reviews, awards, certifications, price ranges, and outcomes may be added only when visible, source-supported, policy-compliant, and appropriate to the schema type. No custom local/AEO schema is needed.

## 7. Primary conversion paths

| Visitor need | CTA/surface | Conversion action | Classification | Current measurability |
| --- | --- | --- | --- | --- |
| Discuss a project/service | Navbar, hero, homepage CTA, service pages | Open project-enquiry modal, submit booking record | Primary business conversion | PageView only; successful submission event absent |
| Start an immediate conversation | Header, contact section, footer, floating action, booking alternative | Open WhatsApp | Primary business conversion | Click event absent |
| Call directly | Footer, contact cards, floating action, booking alternative, custom package | `tel:` action | Primary business conversion | Click event absent |
| Email directly | Contact section, footer, About | `mailto:` action | Primary business conversion | Click event absent |
| Select a package | Homepage pricing or `/packages` flow | Open booking modal or prepared WhatsApp message | Primary business conversion | Selection/confirmation event absent |
| Move from evidence to enquiry | Work detail | Related service, then "Discuss a Similar Project" | Assisted business conversion | Click event absent |
| Move from article to enquiry | Blog detail | Contextual services/work, then "Discuss Your Project" | Assisted business conversion | Click event absent |
| Explore services/work/articles | Navigation and contextual links | Page view/deeper consideration | Secondary interaction | Virtual PageView present |
| Apply for a vacancy | Careers form | Job application submission | Recruitment conversion | Must remain separate from lead reporting; submit event absent |

There is no separate generic contact form. The project-enquiry modal plus WhatsApp, phone, and email provide the business contact paths.

## 8. Homepage CRO findings

### What works

- The first screen identifies one connected Sri Lankan team and names the service range.
- Primary and secondary CTAs are visible, full-width on small screens, keyboard-focusable, and action-specific.
- "Discuss Your Project" now matches the enquiry modal more accurately than "Book a Call."
- Services appear before deep evidence, while work, insights, team, and contact remain discoverable.
- Trusted-brand assets, registered-business context, team profiles, published work, factual stats, and process content provide layered trust.
- The contact section exposes WhatsApp, email, phone, and Sri Lanka context without an address or hours claim.
- The hero performance foundations remain untouched.

### Non-blocking recommendations

- Live-test whether the large number of homepage sections creates scroll fatigue on mobile; use engagement and enquiry data before removing sections.
- Verify every trusted-brand logo relationship/permission and the connected live review widget before treating either as an endorsed result.
- Compare the performance of "Discuss Your Project" with the prior CTA only after conversion events exist.
- Keep one dominant primary action per viewport; do not add another sticky banner alongside the existing two floating contact buttons.

Implemented homepage changes: CTA wording, canonical contact sourcing, unverified-hours removal, booking friction/privacy improvements, footer evidence link, and removal of non-canonical footer phones.

## 9. Service-page CRO findings

All six service pages clearly answer:

- what the service is;
- who it is for;
- the problem it addresses;
- factors affecting scope/cost;
- what a buyer should evaluate;
- the Sky Designers approach and scope;
- available related work and its evidence limitations;
- the next action.

CTA hierarchy is appropriate:

1. **Primary:** "Discuss this service" opens the project-enquiry modal.
2. **Secondary:** related strategy/specialist service and Work links.
3. **Evidence:** up to three contextually related work cards.
4. **Supporting:** About, Blog, and contact links after concise FAQs.

No service-page redesign or extra FAQ was needed. After deployment, verify that the longer scope/provider sections remain readable on small screens and that dynamically related work genuinely matches each service.

## 10. Work, blog, and package CRO

### Work

- `/work` exposes filters, full portfolio cards, and direct links to all service pages.
- Strong work details explain evidence, scope, deliverables, limitations, and related services without inventing outcomes.
- Added one "Discuss a Similar Project" action after the evidence/detail sidebar.
- Related work remains a secondary exploration path.
- Live-test that the new CTA is visible after reading evidence and does not compete with external project links.

### Blog

- `/blog` clearly presents the insight library and featured/latest article routes.
- Published article details already include contextual service, work, and related-article resources.
- Added one "Discuss Your Project" action inside the related-resource block near the conclusion.
- No popup, repeated sales block, generated FAQ, or local-draft publication was added.
- The ten P1 drafts remain under `docs/blog-drafts/` only.

### Packages

- Homepage package cards show categories, monthly values, feature lists, featured-plan emphasis, custom quote, and a comparison table.
- The comparison explicitly states that ad spend is not included in the package fee.
- `/packages` uses a three-step service/plan/package flow and a prepared WhatsApp confirmation.
- A separate help/custom-detail WhatsApp path is visible.
- No artificial countdown, scarcity, or urgency was found.
- Custom-package phone links now use the shared company source.
- Public `?admin=true` and keyboard entry points to the client-only package-management panel were disabled. The panel did not write live data; its remaining dead implementation should be removed in a dedicated cleanup.
- Live owner review is required for every current price, duration, inclusion, featured label, platform category, and custom condition.

## 11. Form-friction audit

### Project-enquiry modal

| Item | Finding | Action |
| --- | --- | --- |
| Name, phone, email | All required; useful for follow-up but requiring both phone and email may reduce completion | Labels now state required; confirm operational need before making either optional |
| Service/package | At least one is required by validation, but two selectors could be misunderstood | Added a clear "choose at least one" helper and associated labels/IDs |
| Preferred date/time | Previously required and constrained by an unsupported before-5-PM rule | Made optional and removed the unsupported time restriction |
| Project brief/message | Not collected | Do not add without testing whether qualification benefit outweighs extra friction |
| Privacy context | Previously absent beside submit action | Added purpose text and Privacy Policy link |
| Alternatives | Error toast mentioned WhatsApp but form lacked direct visible alternatives | Added canonical WhatsApp and phone links |
| Feedback | Loading, error toast, and success state exist | Success now avoids an unverified response-time promise and uses a polite live status |
| Accessibility | Dialog semantics, labels, Escape close, and visible close button existed | Added `aria-describedby`, Select label associations, and clearer required/optional text |
| Focus management | No explicit initial focus, focus trap, or focus restoration verified locally | P2 accessibility improvement; test with keyboard/screen reader before implementation |

### Careers form

- Correctly treated as recruitment rather than a customer lead.
- Required full name, email, phone, cover message, position, CV, and consent serve a distinct review process.
- Optional location, experience, LinkedIn, and portfolio fields increase length but are not required.
- Labels, file validation, error text, loading, success state, and consent copy are present.
- Confirm retention/deletion practices and run an end-to-end accessibility/email test manually.

## 12. Mobile CRO and accessibility

### Confirmed strengths

- Hero CTAs stack and remain at least 56px high on small screens.
- Mobile navigation uses a labelled 44px menu control and full-width primary CTA.
- Floating WhatsApp/call actions use safe-area positioning and 48-56px targets.
- The booking modal is scrollable, Escape-closeable, labelled as a dialog, and above floating actions by z-index.
- Package comparison gives a swipe instruction and keyboard-focusable horizontal container.
- Form fields use visible labels and 48px controls.
- New work/blog CTA buttons have visible focus rings and adequate target height.

### Live-test risks

- Two stacked floating actions may obscure lower-right content on short mobile viewports.
- The long booking modal may require careful focus/virtual-keyboard testing.
- Horizontal package tables need testing at 320px and 360px widths.
- Long service-page answer sections should be checked for fatigue and line length.
- Work galleries/lightboxes and fixed contact actions should be tested together.
- Review widget loading/height changes may cause layout shift or delayed interaction.
- Verify color contrast for small slate text and blue links in dark sections.

No intrusive sticky banner or additional fixed element was added.

## 13. Trust and evidence findings

Verified or appropriately qualified trust surfaces include:

- business registration identifier already approved for local display, pending owner reconfirmation;
- founder and team profiles, with unresolved founder/byline name equivalence kept separate;
- six official profile links, pending live ownership/field checks;
- published work with explicit output/performance limitations;
- two campaign-specific analyses with their own measurement context;
- two strong scope-led website projects;
- factual process, service definitions, and contact information;
- live external review widget, subject to production source/accuracy verification.

Do not convert the logo marquee into an unqualified "clients/results" claim. Confirm relationship and usage permission for every logo. Do not add review counts, aggregate ratings, awards, badges, certifications, years, or outcome statistics from the widget or portfolio without approved evidence.

## 14. CTA findings

### Implemented

- Unified the main Navbar, mobile menu, hero, and homepage closing CTA around **Discuss Your Project**.
- Retained service-specific **Discuss this service** wording.
- Retained package-specific selection/confirmation language.
- Added **Discuss a Similar Project** after Work evidence.
- Added **Discuss Your Project** after Blog resources.
- Routed Footer **Our Work** to `/work`, the complete evidence destination.
- Preserved direct **Message on WhatsApp**, phone, and email actions.

### Retained intentionally

- "View Services," "View Our Work," and service links are appropriate secondary discovery actions.
- "Submit Application" remains appropriate for recruitment and should not be renamed as a business CTA.
- Package-selection labels remain task-specific.

Avoid replacing every navigation link with sales language. CTA consistency should clarify the primary path while retaining contextual secondary actions.

## 15. Conversion-tracking audit

Current implementation:

- Meta Pixel initialization and one initial PageView are deferred until interaction or seven seconds.
- `AnalyticsRouteTracker` sends one PageView and `virtual_page_view` per unique client route.
- No duplicate route PageView was found in the AEO/local SEO/CRO changes.
- GTM and Meta Pixel deferral remain unchanged.

Missing custom conversion measurement:

| Action | Recommended neutral data-layer event | PII rule | Verification |
| --- | --- | --- | --- |
| WhatsApp click | `contact_whatsapp_click` | No phone/name/message content | Live GTM preview |
| Phone click | `contact_phone_click` | No phone value needed | Live GTM preview/mobile device |
| Email click | `contact_email_click` | No email value needed | Live GTM preview |
| Booking open | `project_enquiry_open` | Source page/CTA only | Live GTM preview |
| Booking success | `project_enquiry_submit` | Service/package category only; no contact fields | Submit test with approved test record |
| Package selection | `package_select` | Package ID/category only | `/packages` and homepage pricing test |
| Package WhatsApp confirmation | `package_whatsapp_click` | Package category allowed; exclude typed message/contact data | Live GTM preview |
| Service CTA | `service_enquiry_click` | Service slug only | Six-service test |
| Work/blog assisted CTA | `evidence_enquiry_click` / `article_enquiry_click` | Public slug only | Representative route test |
| Careers submit | `career_application_submit` | Vacancy ID only; keep separate from Lead | Approved test application |

Do not send names, phone numbers, email addresses, CV details, or free-text messages to analytics. Do not add a Meta `Lead` event until event ownership, deduplication, consent/legal basis, and the successful server-write condition are agreed. Implementation is deferred because the current GTM container configuration cannot be verified locally.

## 16. Priority action matrix

| # | Recommendation | Impact | Effort | Priority | Status |
| ---: | --- | --- | --- | --- | --- |
| 1 | Use one canonical public phone and remove extra footer numbers | High | Low | P1 | IMPLEMENTED |
| 2 | Remove unverified booking-hours/time-limit claims | High | Low | P1 | IMPLEMENTED |
| 3 | Make preferred booking date/time optional | High | Low | P1 | IMPLEMENTED |
| 4 | Clarify primary project-enquiry CTA wording | High | Low | P1 | IMPLEMENTED |
| 5 | Add contextual enquiry actions after Work evidence and Blog resources | High | Low | P1 | IMPLEMENTED |
| 6 | Add privacy context, alternatives, and clearer booking labels | High | Low | P1 | IMPLEMENTED |
| 7 | Disable public entry points to package-management UI | High | Low | P1 | IMPLEMENTED |
| 8 | Verify live site settings, official profiles, and rendered Organization data against the canonical record | High | Medium | P1 | MANUAL |
| 9 | Implement privacy-safe conversion events after GTM/Pixel ownership and naming review | High | Medium | P1 | PLANNED |
| 10 | Run live booking, WhatsApp, phone, email, package, and assisted-CTA tests on mobile/desktop | High | Medium | P1 | POST-DEPLOYMENT |
| 11 | Confirm every package price, duration, inclusion, featured label, and custom condition | High | Medium | P1 | MANUAL |
| 12 | Confirm whether both phone and email must remain required in project enquiries | Medium | Low | P2 | MANUAL |
| 13 | Remove the now-inaccessible package-management implementation from the public bundle | Medium | Medium | P2 | PLANNED |
| 14 | Add tested dialog focus trap, initial focus, and focus restoration | Medium | Medium | P2 | PLANNED |
| 15 | Verify logo relationships/permissions and live review-widget source | Medium | Medium | P2 | MANUAL |
| 16 | Test and adjust floating-contact overlap on short mobile viewports | Medium | Low | P2 | POST-DEPLOYMENT |
| 17 | Create/align Google Business Profile only after eligibility and business-model verification | Medium | Medium | P2 | MANUAL |
| 18 | Review legitimate Sri Lankan directories selectively | Low | Medium | P3 | MANUAL |
| 19 | Review homepage section engagement after conversion tracking is reliable | Medium | High | P3 | FUTURE TEST |
| 20 | Publish local P1 guides only after their factual-review requirements are complete | Medium | High | P3 | FUTURE EDITORIAL |

## 17. Manual actions and confirmations

- Confirm current production site-setting values for phone display/link, email, WhatsApp, slogan, location, and six social URLs.
- Confirm ownership and current fields for Facebook, Instagram, LinkedIn, Threads, TikTok, and YouTube.
- Confirm Google Business Profile existence, eligibility, ownership, primary category, business model, phone, website, and service-area behavior.
- Confirm no public physical address or opening hours should be displayed at this time.
- Reconfirm registration identifier accuracy and disclosure approval.
- Confirm business need for requiring both phone and email in project enquiries.
- Confirm how optional date/time preferences are operationally reviewed.
- Confirm all package prices, durations, inclusions, platform labels, featured status, and custom-quote terms.
- Confirm brand-logo relationships and usage permissions.
- Verify the source and accuracy of reviews loaded by the external widget; do not copy counts/ratings into schema.
- Confirm privacy/retention procedures for bookings and job applications.
- Approve analytics event names, consent/legal basis, event deduplication, and GTM/Meta ownership before implementation.
- Confirm client permission before strengthening local project/citation claims.
- Complete factual review of the ten local drafts before any Blog API publication.

## 18. Post-deployment test checklist

- [ ] Inspect rendered Navbar, Footer, About, contact section, floating actions, booking modal, pricing/custom quote, and Organization JSON-LD for canonical phone/email/profile consistency.
- [ ] Confirm the three removed staff phone numbers do not appear on any public route.
- [ ] Confirm no physical address or opening-hours claim appears.
- [ ] Test "Discuss Your Project" from desktop Navbar, mobile menu, hero, and closing homepage CTA.
- [ ] Submit an approved test project enquiry with no preferred date/time; confirm success, stored null values, feedback, and follow-up workflow.
- [ ] Test validation when neither service nor package is selected.
- [ ] Test booking error behavior and direct WhatsApp/phone alternatives.
- [ ] Test modal Escape, close button, outside click, keyboard order, focus visibility, focus restoration, screen-reader name/description, and mobile virtual keyboard.
- [ ] Test canonical WhatsApp, phone, and email actions from header/contact/footer/floating/booking/pricing surfaces.
- [ ] Open a strong Work record, follow a related service, and test "Discuss a Similar Project."
- [ ] Open each of the seven published articles and test related service/work/article links plus "Discuss Your Project."
- [ ] Verify `/packages?admin=true` and the former keyboard shortcut do not reveal package-management UI.
- [ ] Test package selection, back/continue state, confirmation message, prepared WhatsApp link, custom quote, and mobile readability.
- [ ] Verify all current package values and exclusions against the approved commercial source.
- [ ] Test 320px, 360px, tablet, and desktop layouts for CTA wrapping, floating-button overlap, long service sections, tables, forms, and modals.
- [ ] Verify review-widget source, layout stability, and displayed review accuracy.
- [ ] Confirm GTM/Meta PageView behavior still initializes once and virtual PageViews fire once per route.
- [ ] Use GTM Preview/analytics debug tools to establish a baseline before adding conversion events.
- [ ] Recheck titles, canonicals, structured data, sitemap, robots, SSR, and 404 behavior after deployment.
- [ ] Compare any live Google Business Profile and official profile facts with the canonical entity record.

## 19. Files changed in this phase

- `src/components/BookingModal.tsx`
- `src/components/CtaSection.tsx`
- `src/components/Footer.tsx`
- `src/components/HeroSection.tsx`
- `src/components/LocationSection.tsx`
- `src/components/Navbar.tsx`
- `src/components/PricingSection.tsx`
- `src/components/common/FloatingContactActions.tsx`
- `src/pages/BlogDetail.tsx`
- `src/pages/Packages.tsx`
- `src/pages/WorkDetail.tsx`
- `docs/local-seo-cro-audit.md`

No Supabase migration/RLS, Blog API, admin authentication, scheduled publishing, external profile, analytics loader, schema, package price, live record, or deployment file was changed.
