# T10 — Oživit denní rytmus (kanál + ritual)

**Tag:** HNED · **Priorita:** P1 · **Bolest:** lidi neví jak · **Závisí na:** T06 (týdenní report do kanálu odkázat)

## Cíl
Kanál `#praut-denni-prehled` je živý: jsou v něm všichni aktivní zaměstnanci a existuje jednoduchý denní ritual.

## Kontext
Inventura 2026-07-08: kanál `praut-denni-prehled` má **1 člena** (!), zatímco `general`/`random` mají autoJoin a 10 členů. Dokument Rychlý start přitom na kanál odkazuje jako na hlavní místo. Kanály v Huly nemají role — jen members (memory `huly-access-model`).

## Co přesně udělat
1. Přidat všechny aktivní zaměstnance do `praut-denni-prehled` + nastavit `autoJoin=true` (noví se přidají sami). Skriptem (update members na chunter:class:Channel), dry-run → apply.
2. Definovat ritual (odsouhlasí Štěpán): každý den do 9:30 každý napíše 1 zprávu: co dnes dělám / co mě blokuje. Vedoucí reaguje na blokery.
3. Zapsat ritual do kanálu (pinned zpráva, pokud UI umí) a do Rychlého startu.
4. Propojit s T06: po vygenerování týdenního reportu poslat do kanálu upozornění s odkazem (rozšíření `praut-weekly-report.cjs` — zpráva do kanálu přes chunter message createDoc; pokud se ukáže netriviální, jen zapsat do zadání T06 jako TODO).

## Nástroje a vzory
- `tools/huly-admin/praut-create-chunter.cjs` (vzor práce s kanály)
- `tools/huly-admin/praut-onboard-user.cjs` (přidávání members)

## Ověření
- Kanál má všech 9 aktivních zaměstnanců + autoJoin=true.
- Ritual je zapsaný v kanálu i v Rychlém startu.
- (Měkké) po týdnu: v kanálu se objevují denní zprávy — vyhodnotí Štěpán.

## Mantinely
- Nemazat žádné zprávy/kanály. Jen přidávat členy a psát návod.
- Apply po dry-runu.
