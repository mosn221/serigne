# Editorial data workspace

This folder holds small, article-scoped datasets used by the editorial project.

## Rules

- Keep each dataset tied to a documented source.
- Prefer one subfolder per exploration when files begin to accumulate.
- Include the covered period and retrieval date in a nearby README or metadata file.
- Never mix historical and current observations without an explicit period field.
- Keep raw/source extracts separate from cleaned data when both are committed.
- Do not commit credentials, private records or licensed material that cannot be redistributed.

Large raw corpora, recurring ETL or scraping pipelines should move to a dedicated data repository if the project grows beyond lightweight article support.
