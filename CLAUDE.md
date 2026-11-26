# asparagents.com rules (Firat)

- English only. No em or en dashes anywhere. Headings carry no punctuation unless grammar needs it.
- The brand is always lowercase: asparagents (and asparajans).
- Never invent facts, prices, clients or results; ask Firat. Prices only from `src/prices.mjs`.
- Never name partner agencies; white label work stays white label. References are only live sites Firat built directly.
- Keep the asparagents look (asparagus green palette since 26.11.2026: dark green #1F2A22, green #4A6B35, pale green #E4ECDC, terracotta labels #A34A33, grey logo #646263, Arial). Do not copy the asparajans layout.
- Check mobile screenshots after every style change before it goes live; Lighthouse accessibility and best practices stay 100.
- Published content shows its sources and never names internal tools (OpenSEO, DataForSEO, Metricool, Claude, the Growth Sheet).
- Branches content/, publish/, site/, tech-audit/ auto-merge after the checks; .github/, tools/ and build.mjs need Firat's "merge".
- WooCommerce lives only on shop.asparagents.com; everything else is this static site.
- Every change that goes live on asparagents.com gets one entry in the asparagents Desk change log (https://claude.ai/artifact/7oczZW3BvXdX84FHVmgsYH, ArtifactData collection "log", doc id "<YYYYMMDD-HHMM>-<short-slug>"): at (ISO time of the merge), title (one plain line), area (Content, Design, Forms, Prices, SEO, Speed, Shop, Ads pages, Legal, References), by ("Chat session" or the agent's name), link (the PR URL).
