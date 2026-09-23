# Editorial project system

Working name: **Galsen Facts**.

The visual symbol is deliberately independent from the project name so the editorial collection can be renamed without redesigning its identity.

## Product model

This is an editorial/data collection inside M221Tech, not a standalone platform today.

Primary output:

- clear web explorations;
- briefs and explainers;
- infographics and key-number cards;
- transparent source notes;
- lightweight downloadable data when redistribution is appropriate.

A dedicated platform should only be considered when repeated datasets, filters, search or cross-article exploration become a real user need.

## Repository structure

- `public/assets/galsen-facts/` — canonical mark and generated brand exports
- `src/components/galsen-facts/` — reusable editorial UI
- `src/content/galsen-facts/` — future article/content entries
- `src/data/galsen-facts/` — lightweight article-scoped data
- `scripts/galsen-facts/` — reproducible transformations
- `docs/galsen-facts/` — brand, editorial and publishing rules

The public route remains `/galsen-facts/` while that is the working project name.
