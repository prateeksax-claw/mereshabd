# Mereshabd — Safe Edit Workflow

This site is an editorial Hindi content archive with many pages, PDFs, and media assets.
Treat it as a curated publishing system, not a scratchpad.

## Golden Rule
Before meaningful edits, create recovery points and validate the site state.

## Required Before Any Meaningful Edit
1. Check git status
2. Create timestamped zip backup
3. Run validation baseline
4. Identify edit scope
5. Only then edit

## Risk Zones
### Zone A — High Risk
- `site/index.html`
- archive page structure
- shared navigation / repeated layout elements
- post templates used across multiple pages
- any bulk content transformation

### Zone B — Medium Risk
- individual post pages
- gallery / contact / about pages
- PDF / image link changes
- section-level homepage edits

### Zone C — Lower Risk
- isolated image additions
- metadata-only edits
- adding one new standalone page with no shared refactor

## Hard Rules
- avoid bulk regex rewrites across many content pages unless absolutely necessary
- do not combine content edits and layout refactors in one pass
- keep Hindi text in Unicode only
- validate before deploy
- if a page looks linguistically or visually damaged, stop and restore first

## Safe Change Sequence
### A. Before edit
- run git status
- create timestamped backup zip
- run validator baseline
- identify affected files before editing

### B. During edit
- make one scoped change at a time
- avoid unrelated cleanup
- avoid broad formatting churn

### C. After edit
- rerun validator
- inspect locally
- if validation fails, do not deploy
- if validation passes, commit clearly

## Validation Targets
Minimum checks before deploy:
- site HTML files parse cleanly enough for structural checks
- Devanagari count stays healthy
- mojibake / replacement characters do not appear unexpectedly
- key core pages exist
- changed page reviewed visually

## Rollback Strategy
- `git restore <file>` for uncommitted mistakes
- restore from timestamped zip for broader mistakes
- `git revert <commit>` for bad committed changes
- use off-machine backup if local state becomes unreliable

## Deployment Rule
No deploy unless validation passes.
