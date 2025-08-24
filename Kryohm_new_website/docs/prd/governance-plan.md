# Governance, Delivery Plan, Compliance, Analytics, DoD

This shard consolidates governance and execution-critical sections from the main PRD.

## Governance and Approvals

### Document Control

- Version: 1.1
- Status: In progress → Pending approval
- Document Owner: Product Manager (PM)
- Contributors: Engineering Lead, Design Lead, Marketing Lead
- Stakeholders: Founders/Executive Sponsor, Sales Lead, Operations Lead

### RACI (High-Level)

- Requirements (FR/NFR): R=PM, A=Executive Sponsor, C=Engineering/Design, I=Sales/Operations
- UX/UI: R=Design Lead, A=PM, C=Engineering/Marketing, I=Sales
- Technical Architecture: R=Engineering Lead, A=PM, C=Design, I=Operations
- Compliance & Privacy: R=PM, A=Executive Sponsor, C=Legal/Operations, I=Engineering
- Analytics: R=Marketing Lead, A=PM, C=Engineering, I=Executive Sponsor

### Approval & Sign-off

- PM Approval: Pending
- Engineering Approval: Pending
- Design Approval: Pending
- Executive Approval: Pending

Sign-off criteria: All sections complete; risks assigned owners; delivery plan with dates; DoD accepted by Eng/Design/PM.

---

## Prioritization

### MoSCoW (Functional)

- Must: FR1, FR2, FR3, FR5, FR6, FR7, FR8
- Should: FR4
- Could: Comparison matrix in Products hub (Epic 2.5), Search (Epic 4.5.3)
- Won’t (MVP): E‑commerce, user accounts, live chat (see Brief)

### MoSCoW (Non‑Functional)

- Must: NFR1, NFR2, NFR5, NFR6, NFR7
- Should: NFR3, NFR4

---

## Traceability Matrix (Excerpt)

| Requirement | Epic | Story/Section |
|-------------|------|----------------|
| FR1: Multi‑page architecture | Epic 1 | Story 1.3, 1.4 |
| FR2: Lead capture CTAs | Epic 1 | Story 1.4, 1.5 |
| FR3: Product specs | Epic 2 | Stories 2.2, 2.3, 2.4 |
| FR4: Projects gallery | Epic 3 | Story 3.1 |
| FR5: Contact forms | Epic 4 | Story 4.3 |
| FR6: Responsive design | Global | NFRs + DoD |
| FR7: SEO | Global | DoD + Stories 1.4, 2.x, 3.x, 4.5 |
| FR8: Navigation | Epic 1 | Story 1.3 |
| NFR1: <3s load | Global | DoD + 4.5 |
| NFR2: WCAG AA | Global | DoD + 1.2, 1.3 |

---

## Delivery Plan

### Milestones

- M1: Foundation & Home (Epic 1) — 2 weeks
  - Outcomes: Next.js app, Tailwind design system, navigation, Home with CTAs, basic forms
- M2: Product Pages (Epic 2) — 3 weeks
  - Outcomes: Sensors, Prepaid Metering, Shower Control pages with specs and CTAs
- M3: Trust & Projects (Epic 3) — 2 weeks
  - Outcomes: Projects gallery, case study template, initial case studies
- M4: Professional Presence & Optimization (Epic 4) — 2 weeks
  - Outcomes: About, Platform, Contact, analytics, accessibility and performance hardening

Assumptions: Single developer; parallel content delivery from stakeholders; deploy on Vercel.

### Risks and Owners

| Risk | Impact | Mitigation | Owner |
|------|--------|------------|-------|
| Content delays (images/specs/case studies) | Timeline slip | Early content audit; placeholders; staged publishing | PM |
| Performance with rich imagery | SEO/conversion | WebP, responsive images, Lighthouse budgets | Eng Lead |
| Form routing/CRM unknowns | Lead loss | Email-only for MVP; revisit CRM later | PM |
| Compliance gaps (POPIA/GDPR) | Legal risk | Consent banner, privacy policy review | PM + Legal |

---

## Compliance and Data Protection

- Privacy Policy: Publish before launch; covers data types, purpose, retention, rights
- Consent Management: Cookie banner with categories (Essential, Analytics); GA4 loads only after consent
- Data Retention: Form submissions retained max 24 months unless contract required
- DSAR Process: Request channel via contact page; 30‑day response SLA
- Processors: DPA with hosting (Vercel/Netlify), email providers
- Security: HTTPS only; HSTS; minimal PII collection; input validation; spam protection

---

## Analytics Specification

- Platform: GA4 (property/view IDs to be provided)
- Consent: All analytics gated behind explicit consent; store consent state for 6 months
- Core Events
  - demo_request_submitted {product, industry, company_size}
  - pricing_request_submitted {product, project_scope}
  - contact_form_submitted {inquiry_type, product_interest}
  - product_viewed {product, section}
  - cta_clicked {cta_id, location, product}
  - filter_used {filter_type, value}
  - comparison_started {products}
  - site_search_performed {query_length, results_count}
- Page/Content Dimensions: page_type, product_line, industry
- Dashboards: Conversion funnel, form drop‑off, product page engagement

---

## Definition of Done (DoD)

- Performance: Lighthouse ≥95 (mobile/desktop); LCP <2.5s; CLS <0.1; TBT <200ms
- Accessibility: axe clean on critical flows; keyboard nav; color contrast AA; manual screen reader spot checks
- SEO: Valid titles/meta, structured data on products/projects, XML sitemap, robots.txt
- Testing: Unit/integration coverage ≥80% for components; E2E for lead flows green in CI
- Forms: Validation, error/success states; delivery reliability ≥99.9%; test receipts in CI
- Responsiveness: Desktop, tablet, mobile breakpoints verified on latest Chrome, Safari, Firefox, Edge
- Content: All pages have approved copy and imagery; links validated; 0 broken links
- Analytics: Events firing as specced; consent respected; GA4 real‑time smoke checks
- Approvals: PM, Engineering, Design, Executive sign‑offs recorded in Change Log


