# Sky Designers AEO Answer-Engine Audit and Answer Architecture

Audit date: 2026-09-01  
Market: Sri Lanka  
Scope: local website and documentation only; no live Blog API, Supabase/MySQL, deployment, publishing, or remote-repository action

## 1. Executive summary

Sky Designers already has a useful answer-engine foundation from the SEO and GEO work: the homepage and About page define the business, the six service pages have distinct commercial intent, published work records distinguish output from performance evidence, and ten P1 drafts answer high-value decision questions without invented prices. This AEO phase preserves those boundaries and adds the missing commercial answers instead of creating duplicate landing pages.

The 39-query map has this baseline after the local service-page improvement:

| Status | Count | Meaning |
| --- | ---: | --- |
| READY | 13 | A suitable public page gives a clear, supportable answer |
| PARTIALLY READY | 14 | The answer exists locally or in fragments but is not yet a complete public answer |
| CONTENT GAP | 8 | No current public page gives the decision-support answer at useful depth |
| EVIDENCE GAP | 4 | The claim would require approved evidence that the project does not currently contain |
| **Total** | **39** | One assigned primary answer URL per question |

The main implementation in this phase is deliberately narrow: all six service pages now answer what affects scope/cost and what a buyer should evaluate before choosing a provider. Their existing definitions, audience statements, problem statements, approaches, scope lists, related work, evidence limitations, and concise FAQs remain in place. No new generic FAQ block or FAQPage schema was added.

The strongest next publishing opportunities are the ten existing P1 drafts, especially agency selection, Meta cost, branding cost, video cost, website cost, web-provider selection, and the SME planning guide. Publication still requires the factual reviews noted in each draft, verified author attribution, and normal editorial approval.

## 2. AEO query map

`Best URL` identifies the one page that should own the complete answer. A draft URL is a proposed route, not a published page. `Evidence support` distinguishes a service statement, portfolio output, campaign-specific evidence, or a missing proof record.

| # | Question | Intent | Best URL | Answer format | Current status | Evidence support | Recommended improvement | Priority |
| ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | How do I choose a digital marketing agency in Sri Lanka? | Agency selection | `/blog/evaluate-digital-marketing-agency` (draft 10) | Decision framework | PARTIALLY READY | About, services, work, and two campaign analyses | Fact-check and publish draft 10; keep the homepage commercial | P1 |
| 2 | What should I ask before hiring a digital marketing agency? | Due diligence | `/blog/evaluate-digital-marketing-agency` (draft 10) | Checklist | PARTIALLY READY | Existing scope and evidence limitations | Retain the draft scorecard and verify account, reporting, and handover policies | P1 |
| 3 | What should a digital marketing agency report? | Measurement | Future reporting guide | Checklist | CONTENT GAP | Paid-campaign examples only | Publish a metric-definition guide after reporting fields and data sources are reviewed | P2 |
| 4 | What is Sky Designers? | Entity discovery | `/` | 40–70 word direct answer | READY | About page and Organization data | Keep the agency category, Sri Lankan context, and six service families consistent | P1 |
| 5 | What verified results has Sky Designers produced across multiple digital channels? | Provider evidence | `/work` | Evidence-led case summary | EVIDENCE GAP | No complete cross-channel outcome case | Create only from client-approved objectives, channel roles, period, sources, attribution, and limitations | P1 |
| 6 | How do I choose a Meta Ads agency in Sri Lanka? | Meta provider selection | `/blog/how-to-choose-meta-ads-agency-sri-lanka` (draft 01) | Decision framework | PARTIALLY READY | Performance service and two campaign analyses | Complete the draft's process/account-policy factual review before publishing | P1 |
| 7 | What affects Facebook and Instagram advertising cost in Sri Lanka? | Cost research | `/blog/facebook-instagram-ads-cost-sri-lanka` (draft 02) | Definition plus comparison table | PARTIALLY READY | Service and current packages; cases are not price benchmarks | Publish the draft without an invented range; date-check any package references | P1 |
| 8 | Who should own the Meta ad account and campaign data? | Ownership/risk | `/blog/how-to-choose-meta-ads-agency-sri-lanka` (draft 01) | FAQ answer plus checklist | PARTIALLY READY | Draft guidance; current agency policy needs confirmation | Verify the current access and handover policy before publication | P1 |
| 9 | How should Meta Ads performance be measured? | Measurement | `/services/performance-advertising` | 40–70 word direct answer plus checklist | READY | Service process and campaign-specific articles | Keep media metrics distinct from lead/sales quality; link the analyses contextually | P1 |
| 10 | Why can cheap Meta leads still produce weak business results? | Problem diagnosis | `/blog/lbc-life-insurance-course-37x-roas-meta-case-study` | Numbered diagnostic steps | READY | Campaign-specific creative and post-click analysis | Preserve campaign scope, attribution, and no-forecast disclaimer | P2 |
| 11 | What does a social media management agency do? | Service definition | `/services/social-media-management` | Definition | READY | Visible service scope | Keep content, publishing, community, approval, and reporting responsibilities explicit | P1 |
| 12 | What should social media management include? | Scope comparison | `/services/social-media-management` | Checklist | READY | Service inclusions, subject to agreed scope | Avoid presenting optional responsibilities as universal inclusions | P1 |
| 13 | Should I hire a social media agency or an in-house team? | Model comparison | `/blog/in-house-social-media-team-vs-agency` (draft 04) | Comparison table plus decision framework | PARTIALLY READY | Neutral draft; no universal cost claim | Fact-check responsibilities and publish; preserve the hybrid option | P1 |
| 14 | How do I choose a social media management agency in Sri Lanka? | Provider selection | `/blog/how-to-choose-social-media-management-agency-sri-lanka` (draft 03) | Decision framework | PARTIALLY READY | Service plus two OMS output records | Verify current boundaries for publishing, community work, languages, and reporting | P1 |
| 15 | How should a business measure social media management beyond likes? | Measurement | Future measurement guide | Checklist | CONTENT GAP | Creative output exists; management outcomes do not | Define business actions, data sources, time periods, and attribution before writing | P2 |
| 16 | What is branding and creative design? | Service definition | `/services/branding-creative-design` | Definition | READY | Visible service copy and creative portfolio | Preserve the distinction between identity systems and campaign creative | P1 |
| 17 | What affects branding cost in Sri Lanka? | Cost research | `/blog/branding-cost-sri-lanka` (draft 05) | 40–70 word answer plus cost-factor table | PARTIALLY READY | Service scope; no complete branding case | Publish after deliverables, revisions, file handover, and quotation structure are confirmed | P1 |
| 18 | What should a branding project include? | Scope research | `/services/branding-creative-design` | Checklist | READY | Service scope uses conditional wording | Keep the answer scope-dependent and link draft 05 only after publication | P1 |
| 19 | What files should a business receive after branding? | Handover research | `/blog/branding-cost-sri-lanka` (draft 05) | Checklist | CONTENT GAP | Draft flags file handover for verification | Confirm actual handover policy before adding a definitive list | P2 |
| 20 | How should I evaluate a branding provider? | Provider selection | `/services/branding-creative-design` | Checklist | READY | Service process and contextual creative work | Request a full brief-to-handover case rather than treating isolated graphics as proof | P2 |
| 21 | What is video and content production? | Service definition | `/services/video-content-production` | Definition | READY | Visible service scope and output records | Keep platform-ready delivery phrased as scope, not performance proof | P1 |
| 22 | What affects video production cost in Sri Lanka? | Cost research | `/blog/video-production-cost-sri-lanka` (draft 06) | 40–70 word answer plus cost-factor table | PARTIALLY READY | Video outputs are not price benchmarks | Publish after production, revision, licensing, and delivery boundaries are confirmed | P1 |
| 23 | What should a business prepare before a video shoot? | Preparation | `/blog/video-production-cost-sri-lanka` (draft 06) | Checklist | CONTENT GAP | Draft has planning guidance; agency responsibility needs review | Add a concise approved brief/assets/people/location checklist during editorial review | P2 |
| 24 | What is the difference between social content and campaign video production? | Format comparison | Future video brief guide | Comparison table | CONTENT GAP | Current outputs show formats without a full comparison | Compare purpose, useful life, production depth, variants, and distribution without fixed prices | P2 |
| 25 | How should I choose a video production provider? | Provider selection | `/services/video-content-production` | Checklist | READY | Service process and OMS T30 output record | Evaluate brief quality, workflow, deliverables, licensing, and third-party costs | P2 |
| 26 | How much does a business website cost in Sri Lanka? | Cost research | `/blog/business-website-cost-sri-lanka` (draft 07) | 40–70 word answer plus cost-component table | PARTIALLY READY | Two scope-led website projects; no price benchmark | Publish without a generic LKR range; verify ownership and ongoing-cost wording | P1 |
| 27 | What affects website development cost? | Cost factors | `/services/website-design-development` | 40–70 word direct answer | READY | Visible service scope and two website projects | Keep initial, third-party, and recurring costs distinct | P1 |
| 28 | How do I choose a web design company in Sri Lanka? | Provider selection | `/blog/how-to-choose-web-design-company-sri-lanka` (draft 08) | Decision framework | PARTIALLY READY | Service and two strong scope-led projects | Verify CMS, ownership, hosting, security, analytics, and support terms | P1 |
| 29 | Who should own the domain, hosting, code, and website accounts? | Ownership/risk | `/blog/how-to-choose-web-design-company-sri-lanka` (draft 08) | Checklist | CONTENT GAP | Draft guidance; actual commercial terms need confirmation | Add only after current ownership and handover policies are approved | P1 |
| 30 | What should a business website include? | Scope/planning | `/blog/business-website-cost-sri-lanka` (draft 07) | Checklist | CONTENT GAP | Two project records provide examples, not a universal list | Organise by user task, trust information, conversion path, operations, and legal needs | P2 |
| 31 | Does my business need an ecommerce or brochure website? | Type comparison | Future website-type guide | Comparison table | CONTENT GAP | Two different website project types exist | Use project scope as examples, not performance or cost benchmarks | P2 |
| 32 | How should a Sri Lankan SME create a digital marketing plan? | Planning | `/blog/digital-marketing-plan-sri-lankan-sme` (draft 09) | Numbered steps | PARTIALLY READY | Strategy service; no full cross-channel case | Fact-check and publish the ten-step framework | P1 |
| 33 | Which digital marketing channels should a Sri Lankan SME use? | Channel selection | `/blog/digital-marketing-plan-sri-lankan-sme` (draft 09) | Decision framework | PARTIALLY READY | Six specialist pages | Keep the answer objective- and resource-led; avoid a universal channel mix | P2 |
| 34 | How should a business measure digital marketing performance? | Measurement | `/services/digital-strategy-growth` | Definition plus checklist | PARTIALLY READY | Paid-campaign evidence only | Add a reviewed cross-channel measurement guide when metric definitions are available | P2 |
| 35 | How should paid media, content, and website activity work together? | Cross-channel strategy | `/services/digital-strategy-growth` | 40–70 word direct answer | READY | Specialist services and paid-campaign analyses | Keep each channel's role tied to the customer journey and stated objective | P2 |
| 36 | What branding evidence has Sky Designers published? | Provider evidence | `/work` | Evidence checklist | EVIDENCE GAP | Individual creative outputs; no complete branding case | Obtain an approved brief, decisions, deliverables, handover, and outcome context | P1 |
| 37 | What video production results has Sky Designers verified? | Provider evidence | `/work/video-production-brand-promotion` | Evidence summary | EVIDENCE GAP | Output and scope only; no verified outcome | Add reach or business outcomes only with period, source, distribution, and attribution limits | P2 |
| 38 | What website projects has Sky Designers completed? | Provider evidence | `/work` | Comparison table | READY | Lulu Bridal and Lustre & Legacy scope-led records | Keep project features distinct from traffic, conversion, or revenue claims | P1 |
| 39 | What cross-channel strategy evidence has Sky Designers published? | Provider evidence | `/work` | Evidence summary | EVIDENCE GAP | Specialist evidence only | Build a client-approved cross-channel case; do not combine unrelated projects | P1 |

## 3. Answer-format recommendations

Use the smallest format that resolves the question:

| Query pattern | Preferred format | Application |
| --- | --- | --- |
| “What is…?” | 40–70 word definition | Service definitions and company/entity answers |
| “What affects cost…?” | 40–70 word direct answer, then factor list or table | Meta, branding, video, and website cost guides |
| “How do I…?” | Numbered steps | SME plan, preparing a brief, and audit processes |
| “What should I ask/include/receive?” | Checklist | Provider due diligence, scope, reporting, handover |
| “Agency or in-house?” / “Which type?” | Comparison table followed by a decision rule | Social operating model and website type |
| “Who should own…?” | Direct answer plus responsibility checklist | Ad accounts, domains, hosting, code, analytics |
| “Which channel/provider is right?” | Decision framework | Agency, channel, and provider selection |
| Narrow remaining objection | FAQ answer | Only when it adds information not already stated in the body |
| “What evidence exists?” | Evidence summary with explicit limitations | Work pages and campaign analyses |

Direct answers should stand on their own, use plain language, and introduce qualifications in the answer rather than hiding them later. Tables are appropriate only for repeated-field comparisons; they should not be used to make an incomplete evidence set look more authoritative.

## 4. Core-page findings

The first meaningful section was assessed for the homepage, About, Services, six service routes, Work, the strongest work details, Blog, seven published blog routes, and Packages. Published blog bodies are managed outside the repository; this audit therefore relies on their rendered-content findings already recorded in the local SEO/GEO documents and the local metadata/link layer. No live Blog API read or write was performed.

| Page/surface | Primary question | First-section answerability | Finding and action |
| --- | --- | --- | --- |
| `/` | What is Sky Designers and what does it offer? | READY | Broad agency/entity intent, Sri Lankan context, services, work, insights, and contact are clear. Do not turn the homepage into a provider-selection guide. |
| `/about` | What is the company and what facts support its identity? | PARTIALLY READY | Category, country, registration, services, work, and profiles are clear. Manually confirm whether founder `Joshuwa` and article author `Joshuwa Salamon` are the same public entity. |
| `/services` | Which services are available? | READY | The introduction names the six connected capabilities and cards explain their scope. |
| Six service routes | What is the service and is it relevant to me? | READY | Definition, audience, problem, scope/cost drivers, provider evaluation, approach, scope, related work, limitations, and two selective FAQs are visible. |
| `/work` | What work can I inspect? | READY | Useful discovery page; it is not an aggregate-results page. |
| Strong website work pages | What did Sky Designers build? | READY | Lulu Bridal and Lustre & Legacy explain context, services, deliverables, and result limitations. |
| Strong creative/video work pages | What output is documented? | READY | OMS T30, OMS social records, and Alloves explain output while avoiding unsupported performance claims. |
| Other work pages | What does this portfolio item prove? | PARTIALLY READY | Format/category is extractable; client, role, objective, period, or result is often missing. Upgrade only with approved evidence. |
| `/blog` | What topics does the insight library cover? | READY | The first section gives the editorial scope; article cards own narrower informational intent. |
| Seven published articles | What does this article answer? | READY within documented topic | Existing GEO audit confirms answer topic, visible author/dates, relationships, and BlogPosting. Platform-sensitive material needs periodic source review. |
| `/packages` | What current public options can a visitor choose? | READY with limitation | Suitable for current package selection, not an evergreen answer to total advertising cost. Treat prices and inclusions as volatile. |

## 5. Service-page findings

| Service | What is it / who is it for / problem solved | Scope and cost | Provider evaluation | Current evidence | Remaining limitation |
| --- | --- | --- | --- | --- | --- |
| Performance Advertising | Clear | Objective, media plan, audiences/offers, creative, testing, measurement, and reporting; media/service/creative costs separated | Business action, account/data ownership, and reporting quality | Two education Meta campaign analyses | No exact `/work` performance case; article results are campaign-specific |
| Social Media Management | Clear | Channels, volume/formats, production, publishing, community work, approvals, languages, and reporting | Responsibility split, review workflow, and objective-led reporting | OMS carousel and post-design outputs | No verified management-period outcome case |
| Branding & Creative Design | Clear | Logo versus identity, research, applications, guidelines, revisions, files, and ownership | Business/audience process, deliverable list, and contextual work | Individual creative records | No complete brief-to-handover branding case |
| Video & Content Production | Clear | Concept, script, shoot, crew, equipment, locations, talent, post-production, licensing, and formats | Brief, workflow, deliverables, licensing, and third-party costs | OMS T30 and other video outputs | No verified distribution or business outcome |
| Website Design & Development | Clear | Type, content, design, CMS, ecommerce/integrations, testing, support; initial/third-party/recurring costs separated | Mobile work, ownership/access, and full delivery process | Lulu Bridal and Lustre & Legacy | Scope-led evidence only; no verified traffic or conversion result |
| Digital Strategy & Growth | Clear | Channels/journeys, data quality, stakeholders, research, measurement, roadmap depth, and implementation | Diagnosis, priorities/owners/measures, assumptions and implementation roles | Specialist pages and two paid analyses | No complete cross-channel strategy outcome case |

All six use a shared structure, but the answers are service-specific. The template still has only two concise FAQs per page, preventing repetitive FAQ footprints. Related-work copy explicitly says that documented scope or output is not proof of typical results.

## 6. Published-blog findings

| Published article | Answer-first and format finding | Trust/link finding | Recommended action |
| --- | --- | --- | --- |
| 37x ROAS education campaign analysis | Strong campaign-specific answer and diagnostic role | Creative and post-click evidence; not a forecast | Preserve metric definitions, attribution limits, and related performance links |
| Brand Resonance Index | Clear method/concept explanation | Method is not proof of universal brand impact | Keep definitions concise and state what the method cannot establish |
| Meta Creative Test | Useful definition and practical test guidance | Platform-sensitive | Review terminology and interface-dependent statements against current official Meta guidance |
| Facebook Monetization Myth | Direct corrective answer with content/video relevance | Platform-policy sensitivity | Date and source material changes; avoid permanent feature claims |
| GEO Explained | Clear concept and relationship to website/strategy | Educational, not evidence of Sky Designers' AI visibility | Keep SEO/GEO distinctions factual and link to current sources when updated |
| Meta Value Rules | Direct platform-feature explanation | Platform-sensitive | Recheck current eligibility, controls, and terminology before material updates |
| 9.09x ROAS English diploma campaign | Strong full-funnel answer and evidence format | Campaign-specific economics; not a forecast | Keep period, spend, booking/revenue definitions, source, and limitations visible |

No published article was edited locally because its body is not stored in this repository and the brief forbids Blog API publishing. Local article metadata already supplies relevant service, work, and related-article links. The manual expansion briefs in `docs/seo-content-strategy.md` remain the source for any later article-body revision.

## 7. P1 draft findings

All ten local drafts have one H1, an answer-first introduction, question or task-led sections, at least one useful list/table or decision aid, FAQs, internal links, factual-review notes, and no invented price range. None was edited because the AEO improvement was already present and unnecessary rewriting would create review noise.

| Draft | Best answer format | AEO finding | Required manual confirmation before publication |
| --- | --- | --- | --- |
| `01-choose-meta-ads-agency-sri-lanka.md` | Decision scorecard | Direct agency-selection answer; ownership and reporting addressed | Campaign process, cadence, account policy, scope, and responsibilities |
| `02-facebook-instagram-ads-cost-sri-lanka.md` | Cost-component table | Correctly separates media budget, management, creative, and other costs | Current package labels/inclusions and any later platform billing/tax detail |
| `03-choose-social-media-management-agency-sri-lanka.md` | Decision framework | Clear definition, responsibilities, and comparison criteria | Content, publishing, community, language, approval, and reporting boundaries |
| `04-in-house-social-media-team-vs-agency.md` | Comparison table | Neutral in-house/agency/hybrid answer | Current agency responsibilities, workflow, communication, and creative scope |
| `05-branding-cost-sri-lanka.md` | Cost-factor framework | Differentiates logo and identity scope without a price range | Deliverables, research, revisions, ownership, file handover, quotation structure |
| `06-video-production-cost-sri-lanka.md` | Cost-factor table/checklist | Separates purpose, shoot, post-production, and deliverables | Concept, scripting, production, revisions, licensing, delivery boundaries |
| `07-business-website-cost-sri-lanka.md` | Scope and cost-component guide | Separates initial scope from ongoing ownership | CMS, domain/hosting, maintenance, security, analytics, SEO, and recurring costs |
| `08-choose-web-design-company-sri-lanka.md` | Provider scorecard | Strong mobile, SEO, ownership, and support criteria | Technology, CMS, hosting, maintenance, security, analytics, ownership, support |
| `09-digital-marketing-plan-sri-lankan-sme.md` | Numbered steps | Practical objective-first SME plan; no universal mix | Current strategy scope and measurement process |
| `10-evaluate-digital-marketing-agency.md` | Due-diligence scorecard | Broad agency evaluation without competing with the homepage | Discovery, reporting, attribution, ownership, communication, and handover |

## 8. Featured-snippet opportunities

### Strongest paragraph opportunities

1. “What affects Facebook and Instagram advertising cost in Sri Lanka?” — draft 02 already gives a safe direct answer and separates media budget from service costs.
2. “What affects branding cost in Sri Lanka?” — draft 05 explains logo-only versus wider identity scope without inventing prices.
3. “What affects video production cost in Sri Lanka?” — draft 06 names purpose, production, post-production, and deliverable variables.
4. “What affects website development cost?” — the public service page now gives a concise scope/cost answer; draft 07 provides the deeper guide.
5. “What is social media management?” — the service page has a compact definition followed by audience and problem context.

### Strongest list opportunities

1. Draft 10: questions to ask before hiring a digital marketing agency.
2. Draft 01: Meta Ads agency evaluation scorecard.
3. Draft 08: web design company evaluation checklist.
4. Draft 09: ten steps for a Sri Lankan SME digital marketing plan.
5. Draft 06: what a business should prepare for video production.

### Strongest table opportunities

1. Draft 02: media budget versus agency/service fee versus creative/production and other costs.
2. Draft 04: in-house versus agency versus hybrid social media model.
3. Draft 07: website type and scope/cost drivers, keeping values qualitative.
4. Future website-type guide: brochure versus ecommerce using the same decision fields.
5. Draft 05: branding scope factors, only if the table is more readable than its current list.

Do not add tables to service pages merely to pursue a snippet. Their current direct paragraphs and short checklists are easier to read.

## 9. People-Also-Ask opportunities

These are routing decisions, not instructions to add every question as an FAQ.

### Performance Advertising

| Supporting question | Classification | Reason |
| --- | --- | --- |
| What does a performance campaign include? | ALREADY COVERED | Existing service FAQ and scope list |
| Who should own the Meta ad account? | ANSWER IN BLOG | Requires detailed access/handover guidance and policy review in draft 01 |
| Are agency fees separate from ad spend? | ANSWER IN BLOG | Draft 02 owns the cost-component answer |
| How should lead quality be measured? | ANSWER ON SERVICE PAGE | Provider checklist now distinguishes media metrics from lead/sales quality |
| How long does Meta Ads take to work? | NOT NEEDED | A universal duration answer would be misleading without campaign context |

### Social Media Management

| Supporting question | Classification | Reason |
| --- | --- | --- |
| What is included in social media management? | ALREADY COVERED | Existing FAQ and scope list |
| Who supplies and approves content? | ANSWER IN BLOG | Draft 03 can explain operating responsibilities after factual review |
| Agency, in-house team, or hybrid? | ANSWER IN BLOG | Draft 04 owns the neutral comparison |
| Which metrics belong in a monthly report? | ANSWER IN BLOG | Needs a dedicated measurement guide and verified definitions |
| How often should every business post? | NOT NEEDED | No universal frequency is supportable |

### Branding & Creative Design

| Supporting question | Classification | Reason |
| --- | --- | --- |
| Is a logo the same as a brand identity? | ANSWER IN BLOG | Draft 05 explains the distinction in context |
| What can a branding project include? | ALREADY COVERED | Existing FAQ and conditional service scope |
| What affects branding cost? | ANSWER ON SERVICE PAGE | New direct scope/cost block; draft 05 remains the detailed owner |
| What files are provided at handover? | ANSWER IN BLOG | Actual policy must be verified before publication |
| How many revisions are included? | NOT NEEDED | Commercial scope varies and must not be invented |

### Video & Content Production

| Supporting question | Classification | Reason |
| --- | --- | --- |
| What does the production process cover? | ALREADY COVERED | Existing FAQ and approach |
| What affects video production cost? | ANSWER ON SERVICE PAGE | New direct factors; draft 06 owns detail |
| What should a business prepare before a shoot? | ANSWER IN BLOG | Preparation checklist belongs in draft 06 or a future brief guide |
| Is content prepared for specific platforms? | ALREADY COVERED | Existing FAQ |
| How many videos can one shoot create? | NOT NEEDED | Asset quantity depends on an approved brief and production scope |

### Website Design & Development

| Supporting question | Classification | Reason |
| --- | --- | --- |
| What affects website development cost? | ANSWER ON SERVICE PAGE | Direct answer now distinguishes initial, third-party, and recurring costs |
| Who owns the domain and website accounts? | ANSWER IN BLOG | Draft 08 should own the detailed answer after policy confirmation |
| Is hosting or maintenance included? | ANSWER IN BLOG | Draft 07 can separate initial and ongoing scope after verification |
| Are websites designed for mobile visitors? | ALREADY COVERED | Existing FAQ |
| How long does every website take? | NOT NEEDED | A universal delivery time would be unsupported |

### Digital Strategy & Growth

| Supporting question | Classification | Reason |
| --- | --- | --- |
| What does a digital strategy engagement cover? | ALREADY COVERED | Existing FAQ and scope list |
| Which channel should an SME start with? | ANSWER IN BLOG | Draft 09 provides an objective-led framework |
| How should digital marketing performance be measured? | ANSWER IN BLOG | Needs a reviewed cross-channel measurement guide |
| Does every business need paid advertising? | ANSWER IN BLOG | Draft 09 can answer within the wider plan rather than the service page |
| What percentage should every channel receive? | NOT NEEDED | Universal allocation percentages would be misleading |

## 10. Answer cannibalization audit

| Surface | Owned intent | Boundary |
| --- | --- | --- |
| Homepage | Broad agency/entity and commercial discovery | Defines Sky Designers and routes to services; does not own neutral agency-evaluation detail |
| Service pages | Commercial service definition, fit, problem, scope/cost factors, provider criteria, and Sky Designers' stated approach | Do not become complete cost guides or generic how-to articles |
| Blog articles | Informational and decision-support intent | One narrow question per article; link to the relevant service without duplicating its sales copy |
| Work pages | Project/output/evidence intent | Describe only the documented role, scope, outputs, metrics, and limitations for that record |
| Packages | Current package-selection intent | Do not use as the evergreen answer for total Meta cost or typical market prices |

Specific ownership decisions:

- Homepage owns “What is Sky Designers?”; draft 10 owns “How should I evaluate an agency?”
- Performance service owns the service definition; draft 01 owns provider selection; draft 02 owns cost structure; campaign articles own their individual evidence.
- Social service owns scope; draft 03 owns provider selection; draft 04 owns operating-model comparison.
- Branding, video, and website services own commercial summaries; their cost drafts own detailed cost research.
- Website service owns provider capability; draft 08 owns web-company due diligence; a future ecommerce-versus-brochure guide must own type comparison.
- Digital strategy service owns cross-channel commercial intent; draft 09 owns the SME planning process.
- No new page should target the exact wording of an existing owner merely to create another answer block.

## 11. Evidence gaps and answer trust

Four mapped questions are evidence gaps, not writing gaps. They cannot be fixed by stronger wording:

1. A complete cross-channel strategy case with business problem, channel roles, implementation period, sources, outcomes, attribution, and limitations.
2. A complete branding case with approved brief, decisions, identity system, applications, handover files, and outcome context.
3. A video case with exact production role, distribution context, period, metric source, and attribution limits.
4. Broader agency evidence beyond combining unrelated service outputs or campaign analyses.

Useful trust upgrades for future answers:

- show a verified public author name and role consistently on About and article pages;
- state methodology, period, metric definition, data source, and limitations beside campaign numbers;
- use client-approved screenshots with sensitive information removed and explanatory captions;
- identify whether a work record proves scope/output or performance;
- date platform-dependent references and cite current official sources during editorial review;
- preserve the visible evidence limitation on service and work pages;
- update visible copy and matching structured data together when evidence changes.

Never infer an agency relationship, result, award, ranking, typical outcome, client approval, or deliverable from an image alone.

## 12. Structured-data safety

The current implementation supports visible content with appropriate types:

- `Organization` and `WebSite` at the root;
- `AboutPage` on `/about`;
- `Service` on each service detail;
- `CreativeWork` on work details;
- `BlogPosting` on published article details.

No custom AEO schema is required or appropriate. No FAQPage structured data was added: the presence of a small visible question section does not by itself justify it. Current structured data should continue to exclude unsupported prices, ratings, reviews, awards, outcomes, physical addresses, and hidden claims. When content is updated, names, descriptions, authors, dates, service relationships, and evidence statements in structured data must remain consistent with what users can see.

## 13. AEO writing style guide

### Answer-first opening

- Put the answer in the first meaningful paragraph, normally 40–70 words.
- Use the subject's plain name in the first sentence.
- State the decision rule or central qualification immediately.
- Mention Sri Lanka when local market, ownership, regulation, payment, language, or buying context genuinely changes the answer.
- Follow with explanation, examples, a checklist, or a comparison only when it helps the reader act.

Example pattern:

> Website development cost depends on the site type, content, custom design, management needs, integrations, testing and support. Separate the initial build from domain, hosting, maintenance and other recurring or third-party costs before comparing quotations.

### Paragraphs and headings

- Aim for one idea per paragraph, usually two to four sentences.
- Use question headings when the section resolves a real user question.
- Use factual headings when a question would feel forced.
- Do not repeat the H1 as several near-identical H2s.
- Define a term once, then use the same term consistently.

### Definitions

- Use the pattern: subject + category + distinguishing function.
- Avoid circular definitions and brand claims inside neutral definitions.
- Qualify variable services with “can include,” “depends on the agreed scope,” or equivalent wording.

### Lists and steps

- Use numbered steps for a sequence.
- Use bullets for criteria, factors, inclusions, or preparation items.
- Keep list items grammatically parallel and specific enough to evaluate.
- Introduce what the list means; do not drop an unexplained keyword list onto the page.

### Comparison tables

- Use a table only when at least two options share repeated comparison fields.
- Prefer fields such as purpose, responsibility, evidence needed, initial cost category, recurring cost category, and decision condition.
- Do not place invented prices, timelines, scores, or results in a table.
- Follow the table with a short decision rule; do not expect the table to make the recommendation by itself.

### Factual qualifiers and cost safety

- Say “The cost depends on…” and list verified factors.
- Separate platform/media spend, agency/service fee, production cost, third-party cost, and recurring cost where relevant.
- Label campaign evidence as specific to its period, scope, objective, source, and attribution method.
- Say when a project demonstrates output or scope but not performance.
- Use dates for volatile package or platform information.
- If a fact is not verified, flag it for review rather than smoothing it into public copy.

### Evidence references

- Link a claim to the most direct supporting service, work record, methodology, or campaign analysis.
- Prefer one strong contextual evidence link over several weak portfolio links.
- Never combine unrelated projects to imply a cross-channel result.
- Screenshots need a source, date/period, context, redaction review, and client approval where applicable.

### FAQs

- Add a question only if it resolves an important objection not already answered nearby.
- Keep a service-page FAQ concise; route deeper informational questions to one owned article.
- Do not duplicate the same FAQs across every service.
- Do not add FAQPage schema automatically.

### CTA placement

- Answer the question before asking for contact.
- Place the primary CTA after the reader understands service fit, scope, evidence, and limitations.
- Use a relevant next step: discuss the brief, inspect related work, compare services, or read the deeper guide.
- Do not interrupt a definition or cost explanation with a sales claim.

### Language to avoid

Avoid:

- “We are the best,” “leading agency,” “number one,” or similar unverified rankings;
- guarantees, promised ROAS, universal results, or “risk-free” claims;
- vague superlatives such as revolutionary, unmatched, world-class, and unbeatable;
- filler openings such as “In today's fast-paced digital world”;
- invented prices, statistics, awards, years, client counts, certifications, or service inclusions;
- permanent claims about changing platform features;
- keyword repetition that makes the answer unnatural;
- wording that treats portfolio output as performance evidence;
- blocks labelled “For AI,” “AI Answer,” or any hidden answer-only copy.

## 14. P1/P2/P3 action plan

### P1 — highest commercial and trust value

1. Keep the six new service-page scope/cost and provider-evaluation answers after editorial review.
2. Confirm founder/author canonical identity and use one approved public name/role consistently.
3. Fact-check and publish drafts 01, 02, 03, 04, 05, 06, 07, 08, 09, and 10 through the normal editorial workflow; publication is outside this local phase.
4. Confirm account ownership, domain/code access, handover, reporting, licensing, revision, and maintenance policies before those drafts become public.
5. Build one client-approved cross-channel strategy case and one complete branding case from primary records.

### P2 — supporting decision coverage

1. Create a reviewed guide to measuring social media management beyond likes and follower counts.
2. Create a video-shoot preparation/brief checklist after responsibility and licensing review.
3. Create an ecommerce-versus-brochure website decision guide using project scope as examples, not price or performance benchmarks.
4. Create a cross-channel metric-definition guide only after sources, owners, time windows, and attribution rules are agreed.
5. Add contextual links from service pages to P1 articles only after the articles are published.

### P3 — evidence maturity and maintenance

1. Upgrade portfolio-only records when approved client, role, objective, period, deliverable, source, and result fields become available.
2. Review Meta, Facebook monetisation, GEO, and other platform-sensitive articles on a dated schedule against primary sources.
3. Monitor the 39 mapped questions and the established GEO query set without rewriting pages merely to match answer wording.
4. Re-audit structured data whenever visible identity, authorship, service, work, or article evidence changes.

## 15. Implementation record

Local implementation in this AEO phase:

- `src/data/servicePages.ts`: added service-specific scope/cost answers and provider-evaluation criteria for all six service pages.
- `src/pages/ServiceDetail.tsx`: rendered the two new answer-first sections through the shared service template.
- `docs/aeo-answer-engine-audit.md`: added the 39-query matrix, format map, page audits, PAA routing, snippet opportunities, evidence gaps, structured-data safety, style guide, and action plan.

Intentionally unchanged:

- homepage, About, Services, Work, Blog index, Packages, and work-page copy because their current answer role is already clear;
- seven published article bodies because they are not local files and no Blog API content may be changed or published;
- ten P1 draft files because their existing answer-first structure is already meaningful and passed the local GEO review;
- Organization, WebSite, AboutPage, Service, CreativeWork, and BlogPosting structured-data implementations;
- live Supabase/MySQL data, Blog API records, migrations, deployment configuration, and all remote repositories.

## 16. Manual confirmations required

- Confirm whether `Joshuwa` and `Joshuwa Salamon` refer to the same person and approve the public author/founder form.
- Verify current Meta account ownership, access, reporting cadence, and handover policy.
- Verify current social content, publishing, community, language, approval, and reporting responsibilities.
- Verify branding research, revisions, deliverables, file formats, licensing/ownership, and handover policy.
- Verify video concept, scripting, production, revisions, licensing, third-party, and delivery boundaries.
- Verify website CMS, domain/hosting, code/account ownership, maintenance, security, analytics, SEO, and support terms.
- Verify digital-strategy scope, implementation boundaries, reporting fields, metric definitions, and attribution rules.
- Approve and date any package reference immediately before publication.
- Obtain client approval and source documentation before strengthening any work or outcome claim.
- Run a human editorial and legal/claim review before publishing any of the ten drafts.
