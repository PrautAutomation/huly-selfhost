# T11 — Onboarding checklist nováčka

**Tag:** HNED · **Priorita:** P2 · **Bolest:** lidi neví jak · **Závisí na:** T09 (odkazuje na role návody)

## Cíl
Přijetí nováčka = jeden checklist, který kdokoliv z vedení odškrtá; nic se nezapomene.

## Kontext
Onboarding dnes: pozvánka v UI (Nastavení→Členové→Pozvat, odkaz role „Uživatel") → ručně `praut-onboard-user.cjs --email X --role Y --apply` (přiřadí prostory dle role) → nováček neví, co dál. Automatický „vyber roli v pozvánce" čeká na nový server (spec `docs/specs/invite-with-praut-role.md`, T22). Do té doby musí být ruční proces bez zaváhání.

## Co přesně udělat
1. Dokument `✅ Onboarding nováčka — checklist` do „Řízení a reporting" (dělá ho vedení):
   - [ ] Poslat pozvánkový odkaz (UI: Nastavení→Členové→Pozvat, role „Uživatel")
   - [ ] Po přihlášení: spustit onboarding skript s rolí (přesný příkaz s cestami)
   - [ ] Ověřit, že vidí správné prostory (co má vidět per role — tabulka z `praut-onboard-user.cjs --list-roles`)
   - [ ] Poslat mu odkaz na Rychlý start + jeho role návod (T09)
   - [ ] Přidat do `#praut-denni-prehled` (pokud autoJoin nefunguje)
   - [ ] Zařadit do HR oddělení
   - [ ] První úkol v Trackeru (vlastník = nováček)
2. Tracker šablona „Onboarding nováčka" (vzor `praut-tracker-templates.cjs`) se stejnými kroky jako sub-úkoly — vedení může checklist řídit přímo v Trackeru.
3. Offboarding protějšek: odkaz na `praut-offboard-user.cjs` postup (už zdokumentován) — jen prolinkovat, nepsat znovu.

## Nástroje a vzory
- `tools/huly-admin/praut-tracker-templates.cjs` (šablony úkolů)
- `tools/huly-admin/praut-quickstart-doc.cjs` (dokument)
- `tools/huly-admin/praut-onboard-user.cjs` (role → prostory; příkaz do checklistu)

## Ověření
- Dokument + tracker šablona existují; příkazy v checklistu jsou spustitelné copy-paste (ověřit dry-runem).
- Suchý test: projít checklist proti fiktivnímu nováčkovi (bez skutečné pozvánky).

## Mantinely
- Checklist do privátního prostoru vedení (obsahuje admin příkazy).
- Neposílat žádné skutečné pozvánky v rámci tohoto úkolu.
