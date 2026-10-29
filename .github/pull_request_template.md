<!--
Title: <type>(<folder>): [ZETAN01-N] what changed   e.g. feat(apps/web): [ZETAN01-8] add the home page blocks
Branch: feature/zetan01-N-short-what-we-do
Rules and an example: README.md → Git flow → PR
-->

<!-- Stacked on #<PR> ([ZETAN01-N], <what>). Only the last commit is this PR. — delete if based on main -->

## What
<!-- What changed for the user / for the code, in 2–3 sentences. Then bullets per part with paths. -->

*

## Why
<!-- Jira ticket and the Figma frame (✅ READY FOR DEV) -->
ZETAN01-
Figma:

## Notes for review
<!-- Decisions, trade-offs, things done differently from the ticket, what is NOT in this PR -->

*

## How to test
1. `bun install && bun run dev`
2.

## Tests
<!-- New/changed test files and what they cover -->

*

## Checklist
- [ ] Title is `<type>(<folder>): [ZETAN01-N] …`, branch is `feature/zetan01-N-…`
- [ ] Matches Figma (✅ READY FOR DEV only), desktop + mobile
- [ ] No changes outside my area (or explained above)
- [ ] `packages/shared` changes agreed with the other side
- [ ] Texts go through i18n (`uk` + `en`)
- [ ] `bun run lint` and `bun run test` pass
- [ ] Jira ticket moved to **Review**

## Screenshots
<!-- Required. UI: Figma vs result, desktop + mobile, plus states (hover, open menu, empty, error).
     API: Swagger/Postman response for each endpoint + `bun run test` output. Write n/a only if truly nothing to show. -->

| Figma | Desktop | Mobile |
| --- | --- | --- |
|  |  |  |

Closes ZETAN01-
