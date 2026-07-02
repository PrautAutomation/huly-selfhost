# T22 — Balík build featur (po migraci na nový server)

**Tag:** NOVÝ SERVER · **Priorita:** P3 · **Bolest:** vše (dlouhodobá hodnota) · **Závisí na:** T21 (server existuje), `docs/CUSTOM-BUILD.md` pipeline ověřená

## Cíl
Funkce vyžadující vlastní build forku / trvale běžící služby jsou nasazené na novém serveru.

## Kontext
Firemní rozhodnutí: těžké věci (build vlastního kódu, AI, video, push, cron služby) až na vlastním serveru. Fork: `HulyPrautplatform` (Rush monorepo, GitHub Actions staví image na tag `v*`; deploy přepne `HULY_IMAGE_REGISTRY`+`HULY_VERSION`). Postup buildu: `docs/CUSTOM-BUILD.md`.

## Dílčí featury (každá = samostatný PR/nasazení, pořadí dle hodnoty)
1. **Invite s PRAUT rolí** — dle spec `docs/specs/invite-with-praut-role.md` (po T16 na main). Varianta A: `doJoinByInvite` → transactor; UI dropdown v InviteSetting.svelte. Mapa role→prostory sdílet s `praut-onboard-user.cjs`. **První ověření build pipeline — začít tímto.**
2. **Auto-onboarding jako služba** — hlídač nových členů (vzor existuje na zavřené větvi PR #26 / memory `huly-onboard-watcher`) jako systemd/cron na serveru; po nasazení featury 1 zbytečný → vyhodnotit, zda vůbec.
3. **Push notifikace** — config už na main (PR #14): vygenerovat VAPID klíče na serveru, doplnit conf, nasadit; POZOR bez klíčů notification service crash-loopuje.
4. **Love + LiveKit** — dle rozhodnutí z T21 (self-hosted vs Cloud); PR #16 po úklidu (T15).
5. **AI bot** — odkomentovat mongodb v compose, aibot služba s `OPENAI_BASE_URL` → lokální LLM (T21 bod 7); pilotní use-case: shrnutí schůzky → návrh úkolů.
6. **Offboarding purge cron** — měsíční `praut-offboard-user.cjs --purge-sweep` na serveru (dnes jen ručně; skript používá `new Date()` → běží v node, ne Workflow).
7. **Cards views blokované TypeString** — v modelech forku změnit pole (vlastník→Ref, datum obnovy→Date) + migrace dat; pak dostavět views „Bez vlastníka"/„Moje"/„Obnovy do 60 dní" (`praut-build-views.cjs` sekce Nedotaženo).
8. **Týdenní report cron na server** (převzít z T06, pokud běžel na Macu).

## Nástroje a vzory
- `docs/CUSTOM-BUILD.md` (fork→CI→GHCR→deploy), `docs/specs/invite-with-praut-role.md`
- `tools/huly-admin/README.md` (stav nástrojů), memory `huly-production-rollout`

## Ověření
- Každá featura: vlastní PR s AI metadata + test na novém serveru PŘED přepnutím DNS/produkce (migrace umožňuje paralelní běh).
- Po každém `docker compose up -d` → `restart nginx`.

## Mantinely
- Build featury NIKDY netestovat na běžící produkci — jen na novém serveru před ostrým přepnutím.
- Zásahy do forku minimální a značené `// PRAUT:` (kvůli re-merge upstreamu).
- Každá featura zvlášť — žádný big-bang PR.
