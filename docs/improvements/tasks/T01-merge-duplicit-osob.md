# T01 — Dokončit merge duplicit osob

**Tag:** HNED · **Priorita:** P1 · **Bolest:** chaos v datech · **Závisí na:** T15 (skript `praut-merge-persons.cjs` musí být na main)

## Cíl
Ve workspace `praut` nezůstane žádná duplicitní osoba; neaktivní bývalí zaměstnanci jsou jasně označeni.

## Kontext
Inventura 2026-07-08: 18 osob, z toho duplicity **„Švanda,Martin" 2×** a **„Hoyer,René Samuel" / „Hoyer,Rene Samuel"** (Hoyer: účty a social identity už sloučeny 2026-07-02 — viz memory `huly-account-management`; zbývá jen sloučit KARTY kontaktů). 6 osob má `Employee.active=false`.

## Co přesně udělat
1. Spusť diagnostiku duplicit: `praut-merge-persons.cjs` bez argumentů (`--search svanda`, `--search hoyer`) — vypíše kandidáty s personUuid, social ID, zda jsou účty.
2. **Hoyer:** karty sloučit — UI „Sloučit kontakty" (zdroj = „Hoyer,René Samuel" stará karta `6a2c0572ad6913a2992c6fc3`, cíl = „Hoyer,Rene Samuel" `6a3cfc2725d8fc8feaa022f3`), NEBO skriptem. Account-merge už proběhl, neopakovat.
3. **Švanda Martin:** urči primární kartu (ta s aktivním účtem `84cc78fc-aad0-40fc-9ece-0770de2b2b15`), dry-run merge, ukázat Štěpánovi, pak `--apply`.
4. Zkontroluj 6 neaktivních osob: kdo je bývalý zaměstnanec (Mayer, Hirt, Lisičan…), má mít jméno s příponou „(bývalý zaměstnanec)" dle offboarding modelu — srovnej s `offboarding-tracker.json` a `praut-offboard-user.cjs`.
5. Ověřovací inventura: žádné duplicitní jméno mezi Person.

## Nástroje a vzory
- `tools/huly-admin/praut-merge-persons.cjs` (po T15 na main; DRY-RUN → `--apply`)
- `tools/huly-admin/praut-offboard-user.cjs` (tracker + přejmenování)
- POZOR na směr merge: zdroj nesmí mít ověřené social ID → jinak „Nelze sloučit globální osoby" (memory `huly-merge-contacts`). Po merge ověř, že workspace `SocialIdentity.attachedTo` ukazují na cílovou kartu — account-merge je NEPŘEPOJUJE (bug nalezený 2026-07-02, postup v memory `huly-account-management`).

## Ověření
- Inventurní dotaz (findAll Person, normalizovaná jména) nevrací žádnou duplicitu.
- René i Martin se přihlásí bez chyby „Confirmed social identity is attached to the wrong person".
- Všichni neaktivní mají označení nebo záznam v offboarding trackeru.

## Mantinely
- Každý `--apply` až po dry-run výstupu odsouhlaseném Štěpánem.
- NEMAZAT osoby — pouze slučovat/přejmenovávat (obsah musí zůstat s autorem).
- Nesahat na chráněné účty (`huly-praut`, `huly-praut[bot]`, `Admin,Praut`).
