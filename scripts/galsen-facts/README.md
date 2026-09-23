# Editorial processing scripts

Use this directory for article-specific cleaning, normalization and export scripts when an exploration needs reproducible transformations.

The preferred flow is:

1. preserve the source material;
2. transform it with a small documented script;
3. write the article-ready CSV/JSON into `src/data/galsen-facts/`;
4. keep assumptions, exclusions and covered periods explicit.

Do not build a parallel application stack here. This remains part of the M221Tech site until the volume of reusable data justifies a separate data product.
