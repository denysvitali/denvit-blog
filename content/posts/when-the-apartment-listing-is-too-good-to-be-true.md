+++
date = '2026-08-04T00:00:00+02:00'
draft = false
publishdate = '2026-08-04T00:00:00+02:00'
tags = ['security', 'scam', 'fraud', 'social-engineering', 'osint', 'switzerland']
title = 'When the apartment listing is too good to be true'
+++

<!-- cspell:words Bristenstrasse DENIC IBAN Impressum INGDESMMXXX Handelsregister IONOS Klarna Mietzinsdepot Nebenkosten Nettomiete SEPA chargebacks cybercrime geolocation immobilien Immoscout kohrs monika novmane Oerlikon publishdate tawk thyssenkrupp Lastschrift Pauschalmiete Rückruf fedlex CRIF chargeback -->
<!-- cspell:words Anzeiger Béatrice IMMOPRO Jotterand Kantonspolizei NCSC Pulido Sàrl Tages defanged gérance hxxps topbar immo scambait AbuseIPDB fraude WHOIS Kimi brandabuse impressum Vorkasse Betrug -->
<!-- cspell:ignoreWords authorisation authorise authorised defence localised neighbouring organised -->

On 31 July 2026 my Immoscout24 alert surfaced a flat in Zürich, below market, all utilities included, available immediately. I applied. An hour later the listing was gone. Normal enough in this market, where advertisers pull ads once the applications bury them.

The reply came on Monday morning, and not from the agency. It was polite, fluent, and had an answer already prepared for every objection I could think of, including [the one I was fairly sure had no good answer](#why-the-hell-would-you-send-4700-to-a-random-bank-account). They had two.

<!--more-->
<!-- toc -->

## Methodology note

Everything below is a scambait. I was confident this was fraud from the first email and played along to see how far it went. I never sent money, and the reservation funnel was examined in a throwaway sandbox with no credentials and no browser sessions. All URLs, domains and email addresses are defanged. Do not visit them.

## The lure

The flat was at Bristenstrasse 20, 8048 Zürich. The property is real: the photos were almost certainly lifted from a legitimate listing for that address, so reverse-image search would probably have returned a genuine apartment. The flat is real. The operator simply has no relationship with it.

The listing claimed to be managed by *IMMOPRO gérance Béatrice Jotterand Sàrl*, [a real Swiss agency](https://www.gerancejotterand.ch/). The reply came from a private individual on a `.de` domain who then routed me to a third "agency" trading under a stolen industrial brand name, *ThyssenKrupp Immobilien*. All three names are the operator's. Both real companies are borrowed props with no involvement beyond having their names used, and the names do not even match each other, which is the tell: recycled identities, not rotated between listings.

Nothing appears to stop this at the source. As far as I can tell, anyone can register on Immoscout24 and advertise under any agency name they like. The name on a listing is a string the advertiser typed, not a verified credential, so borrowing a real agency's identity costs the operator nothing.

Three things were wrong with the price. Two of them were visible on the listing itself, at CHF 2,350/month all inclusive; the third only showed up once the reply arrived:

- **Electricity and internet were included.** All-in *Pauschalmiete* pricing does exist, mostly for furnished lets, so "everything included" is not impossible by itself. Electricity is: in Zürich it is a contract in the tenant's name with EWZ, not something a landlord bundles. Internet and TV are the same story.
- **A parking space in Zürich is its own market**, routinely a few hundred francs a month, let separately because it is worth letting separately. Nobody throws one in for free.
- **The currency changed.** On Immoscout24 the rent was CHF 2,350. By the time it reached the email and the payment page it was €2,350: same digits, currency symbol swapped, no conversion performed. Zürich rents are quoted in francs; a German-domiciled "agency" billing a Swiss flat in euros is a template built for another market and never localised.

## The emails

Both were in German; translations below, originals collapsed under each. The wording is boilerplate, and searching a phrase from it is how many people discover they are being worked.

<section class="mailbox-message" aria-label="First email from the fake landlord, translated from German">
  <div class="mailbox-message__topbar">
    <span class="mailbox-message__logo"></span>
    <span class="mailbox-message__product">Email message (translated from German)</span>
  </div>
  <article class="mailbox-message__pane">
      <header class="mailbox-message__header">
        <div class="mailbox-message__subject">Re: Enquiry, Bristenstrasse apartment</div>
        <dl class="mailbox-message__meta">
          <div>
            <dt>From</dt>
            <dd>Monika Kohrs &lt;monika.kohrs@novmane[.]de&gt;</dd>
          </div>
          <div>
            <dt>To</dt>
            <dd>not-real@denv.it</dd>
          </div>
          <div>
            <dt>Date</dt>
            <dd>Mon, 03 Aug 2026 08:21 +0200</dd>
          </div>
        </dl>
      </header>
      <div class="mailbox-message__body">
        <p>Hello,</p>
        <p>Thank you for your message.</p>
        <p>The apartment is available and ready for immediate occupancy. All utilities (heating, electricity, water, internet, TV and parking) are already included in the rent.</p>
        <p>As I have moved permanently to Italy with my family due to some health problems, the letting is handled by the real estate agency ThyssenKrupp Immobilien. I am therefore unable to carry out viewings in person.</p>
        <p class="mailbox-message__label">The process is simple:</p>
        <p>You register on the agency's website and select a viewing appointment.<br>After confirmation you will receive all the documents, including the draft lease and the viewing authorisation.<br>Once the reservation has been completed, an employee of the letting agency will come by to show you the apartment on the date of your choosing.</p>
        <p>For the reservation, the agency requires confirmation of payment of the first month's rent and the deposit. Until the lease is signed you can cancel the reservation at any time and receive the full amount back.</p>
        <p><strong>Very important:</strong> once you make the reservation, the apartment is reserved exclusively for you.</p>
        <p>If you agree with this process, I will gladly send you the link to the apartment on the agency's website so that you can reserve it. There you can also see photos of the apartment and further details.</p>
        <p>Kind regards</p>
      </div>
  </article>
</section>

<!-- cspell:disable -->
<details>
<summary>Original German text</summary>

> Hallo,
>
> Vielen Dank für Ihre Nachricht.
>
> Die Wohnung ist verfügbar und sofort bezugsfertig. Alle Nebenkosten (Heizung, Strom, Wasser, Internet, TV und Parkplatz) sind bereits in der Miete enthalten.
>
> Da ich mit meiner Familie dauerhaft nach Italien gezogen bin aufgrund einiger gesundheitlicher Probleme, erfolgt die Vermietung über die Immobilienagentur ThyssenKrupp Immobilien. Persönliche Besichtigungen kann ich daher nicht durchführen.
>
> Der Ablauf ist einfach:
>
> Sie registrieren sich auf der Website der Agentur und wählen einen Besichtigungstermin.
> Nach der Bestätigung erhalten Sie alle Unterlagen, einschließlich Mietvertragsentwurf und Besichtigungsgenehmigung.
> Nach Abschluss der Reservierung wird ein Mitarbeiter der Vermietungsagentur vorbeikommen, um Ihnen die Wohnung an dem von Ihnen gewünschten Termin zu zeigen.
>
> Für die Reservierung verlangt die Agentur eine Bestätigung der Zahlung der ersten Monatsmiete und der Kaution. Bis zur Unterzeichnung des Mietvertrags können Sie die Reservierung jederzeit stornieren und erhalten den vollständigen Betrag zurück.
>
> Sehr wichtig: Wenn Sie die Reservierung vornehmen, ist das Apartment ausschließlich für Sie reserviert.
>
> Wenn Sie mit diesem Ablauf einverstanden sind, sende ich Ihnen gerne den Link zur Wohnung auf der Website der Agentur, damit Sie die Wohnung reservieren können. Dort können Sie auch Bilder der Wohnung sowie weitere Einzelheiten zur Wohnung sehen.
>
> Mit freundlichen Grüßen

</details>
<!-- cspell:enable -->

I asked for the link. It arrived immediately:

<section class="mailbox-message" aria-label="Second email containing the fake agency link, translated from German">
  <div class="mailbox-message__topbar">
    <span class="mailbox-message__logo"></span>
    <span class="mailbox-message__product">Email message (translated from German)</span>
  </div>
  <article class="mailbox-message__pane">
      <header class="mailbox-message__header">
        <div class="mailbox-message__subject">Re: Enquiry, Bristenstrasse apartment</div>
        <dl class="mailbox-message__meta">
          <div>
            <dt>From</dt>
            <dd>Monika Kohrs &lt;monika.kohrs@novmane[.]de&gt;</dd>
          </div>
          <div>
            <dt>To</dt>
            <dd>not-real@denv.it</dd>
          </div>
        </dl>
      </header>
      <div class="mailbox-message__body">
        <p>Here is the link to the apartment on the agency's website:</p>
        <pre><code>hxxps://thyssenkrupp-immobilien[.]de/property.php?slug=4324113633</code></pre>
        <p>You need to create an account on the agency's website and then make the reservation.</p>
        <p>Once the reservation has been completed successfully, you will receive an email with the reservation details from ThyssenKrupp Immobilien. Please also check your spam folder for the email from ThyssenKrupp Immobilien.</p>
      </div>
  </article>
</section>

<!-- cspell:disable -->
<details>
<summary>Original German text</summary>

> Hier ist der Link zur Wohnung auf der Website der Agentur: `hxxps://thyssenkrupp-immobilien[.]de/property.php?slug=4324113633`
>
> Sie müssen ein Konto auf der Website der Agentur erstellen und anschließend die Reservierung vornehmen.
>
> Sobald die Reservierung erfolgreich abgeschlossen ist, erhalten Sie eine E-Mail mit den Reservierungsdetails von ThyssenKrupp Immobilien. Bitte überprüfen Sie auch Ihren Spam-Ordner auf die E-Mail von ThyssenKrupp Immobilien.

</details>
<!-- cspell:enable -->

That last line is defensive. Mail from a freshly registered `.de` domain has a good chance of being filtered, and a spam label arriving at the moment the victim is deciding whether any of this is real would break the spell.

The property page is preserved as an [archive.is snapshot](https://archive.is/sCl1e): generic hero image, stock trust badges, AI-generated copy that says a lot and commits to nothing.

## What each element is doing

- **The absent landlord.** "Moved permanently to Italy… health problems" pre-explains the one thing that would end the conversation. Sympathy is the delivery mechanism; the payload is *no viewing before payment*.
- **The agency as trust layer.** A private individual asking for €4,700 up front is suspicious. An *agency* asking is procedure. "ThyssenKrupp Immobilien" looks legitimate enough, and nobody can be expected to know every real-estate agency by name. There are thousands, most of them small, and an unfamiliar one is the normal case rather than a warning sign.
- **Reversibility.** "You can cancel at any time and receive the full amount back", offered for a SEPA credit transfer to a private foreign account, which has no cancel button. It is also only the opening bid; the website improves on it considerably, which is the [next section](#why-the-hell-would-you-send-4700-to-a-random-bank-account).
- **Scarcity.** "Reserved exclusively for you." In a city where [500 people once queued for one viewing](https://www.tagesanzeiger.ch/ueber-500-personen-frieren-in-zuerich-fuer-eine-wohnung-320887410342) in [Oerlikon](https://maps.app.goo.gl/ZDDXtz7cho3xD4CBA), exclusivity is the most valuable thing anyone can offer, and the one thing no honest Zürich landlord offers.

## Why the hell would you send €4,700 to a random bank account?

Nobody sends thousands to a stranger for a flat they have not seen. The operator knows that, and answers it twice: once in the email ("cancel any time, full refund"), and once on the site.

The funnel is three pages: `register.php` → `book.php` → `payment.php`. You register, pick a viewing date, "reserve" the property, and land on a payment page demanding first month's rent plus deposit (€2,350 + €2,350 = **€4,700**) within 24 hours against a booking reference.

{{< img src="/images/when-the-apartment-listing-is-too-good-to-be-true/payment.png" alt="The fake agency's payment page: 'Your reservation is almost complete', an inspection date of 10 Aug 2026, €2,350 monthly rent and €2,350 deposit for Bristenstrasse 20, 8048 Zürich, bank-transfer instructions for €4,700 within 24 hours under reference BK202608033FF8741E, and an 'Upload receipt now' box" >}}

The page advertises tenant protection: *we hold your payment and only release it to the landlord 48 hours after you move in*. That is why the site exists. A refund promise is only as good as the stranger making it; escrow requires trusting nobody. It is also an answer with the shape of a real one, borrowed from property sales and short-let platforms. No Swiss residential letting works this way: the equivalent is a blocked deposit account opened after signature, which is exactly the step the site replaces.

There is no escrow. There is a bank account.

Two details make the design deliberate:

**No card processor anywhere.** No Stripe, no PayPal, no Klarna, no card form. On its own that is a weak signal, since Swiss and German agencies do not take rent or deposits by card either. What matters is the consequence: cards carry chargeback rules, SEPA credit transfers do not, and the one rail with a reversal mechanism is never offered. Irreversibility is the product requirement.

**The payment page asks you to upload your payment receipt.** It tells the operator the transfer is inbound so the money can be moved onward, and it hands over a bank document with your real name, address and account details.

After payment the pattern is well documented: the viewing is "being confirmed", a second extraction is attempted (rental insurance, key courier fee, contract handling), then the channel goes dark.

## Follow the money

| Field | Value |
| :-- | :-- |
| IBAN | `ES95 1465 0100 9517 7489 8595` |
| BIC | `INGDESMMXXX` |
| Bank | ING Bank N.V., Spain (IBAN bank code `1465`) |
| Account holder | `Angel Ortiz Pulido` |
| Amount | €4,700 (€2,350 rent + €2,350 deposit) |
| Reference | `BK202608033FF8741E` (booking #378) |

A German agency, renting a Swiss apartment, in euros, into a private account at a Spanish retail bank. Together those mismatches describe a **money mule**: an account opened by a recruited third party or with a stolen identity, whose only function is to receive victim transfers and forward them onward, typically within hours.

A caveat, since I am publishing the name. Mule holders are sometimes co-conspirators and sometimes victims themselves, of identity theft or of a "financial agent" job advert. I cannot tell which from the outside. Do not contact this person, and do not treat the name as an accusation: it is the string that appeared on a payment page. The IBAN is the artefact that matters, and ING can resolve it.

The account is also the most fragile point in the operation. Domains are disposable; a bank account receiving fraud transfers is attached to a real identity and can be frozen.

## Infrastructure

| Indicator | Type | Notes |
| :-- | :-- | :-- |
| `thyssenkrupp-immobilien[.]de` | Domain | Fake agency site → `217.160.0[.]137` (IONOS SE, Frankfurt); registered `2026-07-30`; [archived](https://archive.is/sCl1e) |
| `thyssenkrupp-immo[.]de` | Domain | Agency contact mail → `217.160.0[.]138`, adjacent IP |
| `novmane[.]de` | Domain | "Landlord" mailbox; IONOS MX (`mx00`/`mx01.ionos.de`) |
| `monika.kohrs@novmane[.]de` | Email | Fake landlord persona |
| `info@thyssenkrupp-immo[.]de` | Email | Fake agency mailbox |
| `67e542e3f4f4ca190fc676a6` | tawk.to property ID | Live chat on the site |
| `HRB 25360` | Handelsregister number | Genuine: thyssenkrupp Services GmbH, Essen; reused in the site footer |
| `DE 177788496` | VAT ID | Claimed in the site footer |

**The domain was one day old.** The registrar record puts creation at `2026-07-30T11:28:16Z`, with the record last updated four seconds later. DENIC does not publish creation dates for `.de` in public whois, so this comes from the registrar-side record rather than the registry, and dates obtained that way are worth treating as approximate. The listing surfaced on my alert the following evening, and the emails arrived three days after that. A "letting agency" whose domain predates your enquiry by a day is infrastructure provisioned for this campaign, to be abandoned as soon as it is reported. Domain age is free to check and one of the strongest single indicators available.

```text
Domain Name: thyssenkrupp-immobilien.de
Registrar WHOIS Server: whois.ionos.com
Registrar URL: https://www.ionos.com
Creation Date: 2026-07-30T11:28:16.000Z
Updated Date: 2026-07-30T11:28:20.000Z
```

**All three domains sit at one provider.** Two adjacent IPs, `ui-dns` nameservers, IONOS MX for the mail domain. The adjacency is weaker evidence than it looks: `217.160.0.0/19` is IONOS mass shared hosting, where neighbouring addresses say nothing about who the customer is. What ties the domains together is the traffic between them, since the "independent landlord" hands off to the "independent agency" by email and link. Either way, one abuse report to IONOS covers all three.

**The site runs a tawk.to live chat**, answered in real time, in German. When a hesitant victim wants reassurance before transferring €4,700, there is a human to provide it. This is staffed, not a fire-and-forget kit.

**The site auto-translates by IP geolocation**, with a language map covering DE, AT, CH, RO, FR, ES, IT, PL and NL. That is the target list; Zürich is this week's listing. The `RO` entry stands out in a list otherwise made of victim countries, and it is tempting to read it as the operator's own locale. It is not evidence of one: Romanian-speaking renters in Germany, Austria and Switzerland are a large enough group to be worth translating for. I have nothing that identifies who runs this, and I am not making an attribution.

**The corporate details are stolen, not invented.** [HRB 25360](https://www.online-handelsregister.de/handelsregisterauszug/nw/Essen/HRB/25360/thyssenkrupp-Services-GmbH) is genuine and belongs to thyssenkrupp Services GmbH, copied out of the German commercial register and pinned to an unrelated site. Every German site carries an *Impressum* by law, scam ones included, and its identifiers can be real without belonging to whoever published them. The check is not *does this number exist* but *does it resolve to the company claiming it*.

## Red flags, in the order you'll meet them

1. Rent noticeably below market, with every utility included.
1. The landlord is abroad and cannot do viewings.
1. You are handed off to an agency you did not choose, on a domain that is not the agency's real one.
1. The price changes currency, or stops following local pricing conventions, once you are off the listing platform and into the email thread and the agency's own site.
1. Payment required **before** any viewing.
1. Bank transfer only. Legitimate lettings use transfers too, so this is not damning by itself, but it does mean nothing can be reversed.
1. A deposit of one month's rent. Swiss deposits are normally two or three months, capped at three by [Art. 257e OR](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en#art_257_e).
1. Receiving account in a third country, held by a private individual.
1. A 24-hour deadline.
1. You are asked to upload a payment receipt.
1. "Cancel any time, full refund", for a payment method with no refund mechanism.
1. The agency's domain is days old.

Compressed: **money before keys is the scam**. A real Swiss agency shows you the flat first and takes the deposit *after* a signed lease, into a *Mietzinsdepot*: a bank account in **your** name, which the bank may release only with both parties' consent or a court decision, and which reverts to you a year after the lease ends if the landlord has brought no claim.

That is worth putting next to the fake escrow. Swiss law already gives the tenant the protection the site was pretending to offer, and it gives it in the tenant's own name at the tenant's own bank. What the operator built is a counterfeit of a mechanism you are entitled to for free.

## If you have been scammed

Do these three now, in this order, because a SEPA transfer only stays recallable for a matter of hours.

1. **Call your bank** and ask them to recall the transfer.
1. **Call the receiving bank**, here ING Spain, and report the account for fraud. It is the part of the operation that can actually be frozen.
1. **File a police report** where you live. Your bank will ask for it.

## Where to report these scams

Spotting it and walking away only protects you. The listing stays up, and the next person to answer it may be in more of a hurry than you were, so the reports below are the part that actually costs the operator something.

- **The hosting provider.** Resolve the domain to an IP and run a whois on both: the domain record names the registrar, the IP record names whoever runs the network, and each publishes an abuse contact. Here both roads led to IONOS and `abuse@ionos.com`, so one report covers all three domains.
- **The listing platform** where you found the ad.
- **The national cybercrime reporting point** in your country.

In my case no money moved, so there was nothing to recall. What I did:

- reported the hosting to `abuse@ionos.com`;
- reported the mule IBAN to ING's fraud team at `fraude@ing.com`, since the account is the part that can be frozen and a report from someone who was *not* scammed still puts it on their radar;
- filed a report with the Swiss [NCSC](https://www.ncsc.admin.ch/);
- submitted the two IPs to [AbuseIPDB](https://www.abuseipdb.com/), which is close to useless on its own, since a single report against a shared-hosting IP moves nothing until others pile on, but it costs a minute and the pile-on has to start somewhere.

If any of them come back with something worth knowing, I will update this post.

## Closing

The technical sophistication is zero: shared PHP hosting, three cheap domains, a stolen brand, scraped photos, an off-the-shelf chat widget.

The design is good. Not the web design, which is the usual AI slop of stock badges and a hero image nobody chose. The design of the scam. The operator identified the objection that stops a victim ("why would I send money for a flat I have not seen?") and answered it with escrow, which is the correct answer, then implemented a transfer to a mule. Someone who pays here is not being reckless; they are reasoning correctly from premises manufactured for them, under time pressure, in a market that has trained them to move fast or lose out.

Which is why "be careful" is not advice. The defence that works does not depend on judgment: **no money moves before you have stood inside the apartment and signed a lease.** In Switzerland the law goes a step further, since even after signing the deposit does not go to the landlord at all, but into an account in your own name. If the process cannot accommodate that, the process is the scam.

The details are local. Deposit caps, blocked accounts and who holds the money differ from country to country, so the version of that rule you should apply is your own market's, not mine. What travels is the older rule the whole thing rests on: if an offer looks too good to be true, it almost certainly is.

## Appendix: Kimi took it from the link onwards

I handed the exploration over to Kimi K3 Swarm with a one-line prompt:

> I'm being scammed in this email thread. Can you look at that page and possibly understand what's the payment processor and how they're scamming people for money?

It registered a bait account, walked `register.php` → `book.php` → `payment.php`, pulled the IBAN off the payment page, resolved the hosting, and came back with most of what this post says, in one pass, without me specifying any of it.

<details>
<summary>The agent's report, verbatim</summary>

> This is a classic rental deposit scam ("Vorkasse-Betrug"). Let me investigate the site and its infrastructure.
> The site is live. Let me dig deeper into the infrastructure and the payment flow.
> Registered successfully. Now let me trigger the reservation flow to capture the payment details.
> The payment is a **direct SEPA bank transfer to an ING Bank account** — a classic money-mule setup. Let me extract the actual IBAN and account holder:
> Done — I reverse-engineered the whole funnel (registered a bait account and went through their booking flow to the payment page, without paying anything). Full report saved, here's the summary:
>
> ## What it is
>
> A textbook **advance-fee rental scam with fake escrow**. "Monika Kohrs" is a fake persona; the flat at Bristenstrasse 20, 8048 Zürich is real, but the photos are stolen from a legitimate listing. "ThyssenKrupp Immobilien" is a fake agency abusing the thyssenkrupp brand — nothing to do with the real company.
>
> ## The payment processor trick
>
> **There is no payment processor — that's the scam.** No Stripe/PayPal/Klarna anywhere in the site. Cards would allow chargebacks, so instead:
>
> - The site claims "tenant protection": *"we hold your payment and release it to the landlord 48h after move-in"* — this escrow **does not exist**.
> - Victims are told to make a **direct, irreversible SEPA transfer** to a **money mule account**:
>
> | | |
> |---|---|
> | **Account holder** | **Angel Ortiz Pulido** |
> | **IBAN** | **ES95 1465 0100 9517 7489 8595** |
> | **Bank** | ING Bank Spain (BIC INGDESMMXXX) |
> | **Amount** | €4,700 (€2,350 rent + €2,350 deposit), 24h deadline |
>
> A Spanish IBAN for a "German agency" renting a Swiss flat says everything. The receipt-upload step exists to confirm the money is coming and to harvest your real bank details.
>
> ## Infrastructure (all one operator)
>
> - `thyssenkrupp-immobilien.de` → 217.160.0.137, `thyssenkrupp-immo.de` → 217.160.0.**138** (adjacent IPs, same IONOS account), `novmane.de` (Monika's mailbox) → also IONOS
> - Live chat: tawk.to (property ID `67e542e3f4f4ca190fc676a6`) — real humans answering
> - The site's geolocation translate map includes **Romanian** — matches the documented Romanian scam groups running this exact template
> - Fake HRB 25360 / fake VAT DE 177788496 on the impressum
>
> ## How to actually make them think twice (legal, high impact)
>
> 1. **ING Spain fraud team** — report the mule IBAN; banks freeze flagged mule accounts and the holder is KYC-identifiable. **This is the single most damaging report.**
> 1. **IONOS abuse** (abuse@ionos.com) — kills all three domains + mailboxes at once
> 1. **tawk.to abuse** — kills their live-chat channel
> 1. **Kantonspolizei Zürich** cybercrime report + **NCSC** (ncsc.admin.ch)
> 1. **thyssenkrupp brand protection** (brandabuse@thyssenkrupp.com) — they pursue trademark abuse aggressively

</details>

I am describing what the operation does, not who runs it. The persona is fake by construction; the only real-world identities involved are the hosting account and the receiving bank account.
