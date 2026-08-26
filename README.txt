ΟΔΟΝΤΙΑΤΡΙΚΟ ΚΕΝΤΡΟ ΠΑΠΑΝΤΩΝΙΟΥ — website
==========================================

White + turquoise clinical style, with the clinic's real
photographs and real logo mark.

!! ONE THING TO DO FIRST !!
---------------------------
The site is set up for the domain:  https://papantonioudental.gr
If the real domain is different, do a find-and-replace of that
string across these files:
   index.html  to-iatreio.html  ypiresies.html  o-iatros.html
   syhnes-erotiseis.html  epikoinonia.html  404.html  efcharisto.html
   sitemap.xml  robots.txt
It only affects Google indexing and the preview image shown when
the link is shared on WhatsApp/Facebook. Everything else works
regardless.

DEPLOY
------
Upload to the ROOT of the repo, keeping images/ as a subfolder:

  index.html  to-iatreio.html  ypiresies.html
  o-iatros.html  syhnes-erotiseis.html  epikoinonia.html
  styles.css  app.js
  404.html  efcharisto.html
  sitemap.xml  robots.txt  _headers
  images/          <- keep this folder name exactly

Netlify picks up 404.html and _headers automatically.

Netlify auto-deploys. Nothing to build.

LANGUAGE
--------
Greek is the default, written into the HTML.
English applies when the URL ends in ?lang=en
EL | EN switch is in the header and mobile menu.
Edit English in the EN dictionary at the top of app.js.

COLOURS
-------
All colours are variables at the top of styles.css:
  --teal:#16A3A0   turquoise accent
  --bg:#F2F9FB     pale background
  --ink:#16303B    headings
Change once, applies to all five pages.

The logo mark is gold (#C9A45C), matching the real sign on the
building. If you would rather it were turquoise, search the HTML
files for  #C9A45C  and  #D9AE5F  and replace with  #16A3A0.

NOTES
-----
1. THE LOGO IS MY REDRAW. The gold tooth-and-leaves mark is an
   SVG I drew by eye from the storefront photo. Close, but not
   the clinic's artwork — ask them for the original vector.

2. IMAGE QUALITY. Photos came from Instagram screenshots, not
   originals. I removed the Instagram counter and mute icon and
   resized for web, but the detail is not there. If the clinic
   sends the original files, drop them into images/ with the
   same filenames — nothing else needs changing.

3. THE DENTIST'S PHOTO. o-iatros.html still shows the "Π.Π"
   monogram. Replace with a real portrait when available.

4. TREATMENTS. Now seven, confirmed by the practice:
   Αισθητική Οδοντιατρική, Ορθοδοντική, Ενδοδοντία,
   Περιοδοντική Θεραπεία, Εμφυτεύματα & Γναθοχειρουργικές
   Θεραπείες, Παιδοδοντιατρική, Ψηφιακή Πανοραμική &
   Ενδοστοματικές Ακτινογραφίες.
   The Greek supplied by the practice is used verbatim, only split
   into paragraphs. Add or remove treatments in the Studio.

5. TWO PHOTOS SHOW PATIENTS
   images/05_treatment_in_progress.jpg
   images/07_dentist_microscope.jpg
   You have confirmed the clinic is fine with these.

DETAILS USED
------------
Phone:     22910 37444
Address:   Περικλέους, Ανάβυσσος 190 13
Hours:     Δευτέρα–Σάββατο 08:30–13:30 · Κυριακή κλειστά
Instagram: @papantonioudentalclinic
Map:       37.7375018, 23.9472415
Rating:    4.6 from 46 Google reviews

The contact form uses Netlify Forms — it starts working once
deployed; submissions appear under "Forms" in Netlify.


WHAT WAS ADDED IN THE FINAL PASS
--------------------------------
- Schema.org "Dentist" markup: address, hours, geo, 4.6 rating,
  services. This is what lets Google show the star rating and
  opening hours directly in search results.
- Open Graph / Twitter cards, so sharing the link on WhatsApp,
  Facebook or Viber shows the clinic photo and name instead of
  a bare URL. This matters a lot for a local business.
- hreflang tags telling Google the Greek and English versions
  are the same page in two languages.
- sitemap.xml and robots.txt.
- Gallery lightbox: photos open in an overlay with arrows,
  keyboard support and swipe on mobile, instead of dumping the
  raw .jpg in a new tab.
- Sticky "call to book" bar on mobile, always within thumb reach.
- Branded 404 page and a thank-you page after the contact form,
  instead of Netlify's generic screens.
- width/height on every image so the page does not jump about
  while loading (this is a Google ranking factor).
- Skip-to-content link and a <main> landmark for screen readers.
- Cache and security headers in _headers.
- Print stylesheet, so a printed page drops the nav and map.


MAP
---
The Google map on the contact page loads straight away, as
before. The whole map is clickable — tapping it opens Google
Maps directions to the clinic, so a visitor can go straight to
navigation. There is a "Οδηγίες πρόσβασης / Get directions"
pill at the bottom of the map so it is obvious it is clickable.

Because the map is a click-through to directions, you cannot
pan or zoom it in place — that is the trade-off for making the
whole surface a directions link, and it is what most clinic
sites do.

Note: the embedded map contacts Google as soon as the page
loads, which sets third-party cookies. That is normal practice
and how it was originally, but worth knowing if the clinic ever
adds a cookie banner.

APP ICONS
---------
Real PNG icons generated from the logo: favicon-16, favicon-32,
icon-180 (iPhone home screen), icon-192, icon-512, plus
site.webmanifest. Saving the site to a phone home screen now
shows the clinic's mark, not a blank page icon.

NOT DONE: WHATSAPP BUTTON
-------------------------
I left this out on purpose. WhatsApp needs a mobile number and
the only number I have (22910 37444) is a landline, which cannot
receive WhatsApp. If the clinic has a mobile they use for
bookings, send it and I will add a button — it is about five
minutes of work.


================================================================
STUDIO  —  /studio/
================================================================
Open  your-site/studio/   and enter the password.
Default password: panos
Change it on line "const PASSWORD" near the bottom of
studio/index.html.

WHAT YOU CAN EDIT
  Λογότυπο & μάρκα ..... upload your own logo image
  Στοιχεία επικοινωνίας  phone, address, Instagram, map links,
                         rating, review count
  Ωράριο ............... every day, both languages, mark days closed
  Η ομάδα .............. add/remove members, upload a CV photo,
                         name / role / biography in both languages
  Φωτογραφίες .......... replace any photo on the site
  Κείμενα .............. all 112 texts, Greek and English,
                         grouped by page, with a search box

*** HOW SAVING WORKS — READ THIS ***
The Studio has no server. Your edits are kept in YOUR browser
only. They do NOT appear on the live site until you publish:

  1. Edit in the Studio
  2. Press "Εξαγωγή content.json" — a file downloads
  3. Upload that content.json to the repo root on GitHub,
     replacing the old one
  4. Netlify redeploys and everyone sees the change

So: the Studio is where you decide the changes, and content.json
is how you publish them. Nothing is lost if you close the tab —
the browser keeps your working copy until you export.

"Επαναφορά" throws away your local edits and goes back to the
published content.json.

Uploaded images are stored inside content.json as data, so the
file grows. Photos are resized automatically (team 700px,
site photos 1600px). If content.json ever gets very large,
save the photos into images/ instead and point to them.

IF YOU LATER WANT REAL LIVE EDITING
That needs a database (Firestore or similar) so edits publish
without the export step. The site is already structured for it:
everything reads from one content object, so swapping the
fetch("content.json") call for a database read is a small change.

================================================================
TEAM PAGE
================================================================
o-iatros.html is now "Η ομάδα μας / Our Team" with five
placeholder members. Names, roles, biographies and photos are
all editable in the Studio. Add or remove members freely.

================================================================
CLICKABLE ICONS
================================================================
The four cards under the homepage hero are now links:
  Εμπειρία & εμπιστοσύνη -> Google reviews
  Προσωπική φροντίδα ----> contact page
  Σύγχρονη τεχνολογία ---> the clinic page
  Ανάβυσσος -------------> Google Maps directions


================================================================
ΜΕΤΑΦΡΑΣΗ  /  TRANSLATION
================================================================
Every text field now sits beside its pair with two buttons:

      [ Ελληνικά ]   EL -> EN     [ English ]
                     EN -> EL

Write in whichever language you are comfortable with, press the
matching arrow, and the other side fills in. It works in both
directions, so your friend can write Greek and produce English,
and you can write English and produce Greek.

There is also "Συμπλήρωση κενών" at the top of each text group,
which fills only the EMPTY side of every text in that group and
never overwrites something you already wrote.

The same arrows appear on team names, roles and biographies,
and on the address.

HOW IT WORKS
Two free translation services are tried in order (MyMemory, then
Lingva). No account or key is needed. If both fail — no internet,
or the daily free limit is reached — the field is LEFT UNCHANGED
and you get a message. Nothing is ever silently wiped.

The free tier is roughly 5,000 characters a day per connection.
Adding your email in Στοιχεία επικοινωνίας raises it to about
50,000. The email is only sent to the translation service.

IMPORTANT: it is machine translation. For a medical practice,
read the result before publishing — especially treatment names.


================================================================
FAQ PAGE  —  syhnes-erotiseis.html
================================================================
The FAQ is now its own page with its own tab in the menu
("Ερωτήσεις" / "FAQ"), between Η ομάδα and Επικοινωνία. It holds
27 questions in six groups:

   Ραντεβού & πρώτη επίσκεψη
   Επείγοντα περιστατικά
   Κατά τη θεραπεία
   Θεραπείες & φροντίδα
   Κόστος & ασφάλιση
   Η επίσκεψή σας στο ιατρείο

The treatments page keeps a short band that links here, so the
same 27 answers are not published twice (Google penalises that).

Grouping is driven by the "Κατηγορία" field on each question in
the Studio. Questions sharing a category appear together, in the
order they are listed. Clear every category and the page falls
back to one plain list.

FAQPage structured data is generated from the live questions, so
the rich result Google shows can never drift out of step with
what the page actually says. Nothing to maintain by hand.

STILL TO CONFIRM WITH THE PRACTICE
Nothing on the page is invented and no bracketed placeholders
were left in, but four answers are deliberately non-committal
because the facts were not available. Each is a one-line edit in
the Studio once you know:

  "Συνεργάζεστε με τον ΕΟΠΥΥ;"        — you said you would ask
  "Δέχεστε ιδιωτική ασφάλιση;"        — you said you would ask
  "Ποιους τρόπους πληρωμής δέχεστε;"  — cash / cards / transfer?
  "Υπάρχει χώρος στάθμευσης;"         — street? car park? none?
  "Είναι προσβάσιμο το ιατρείο;"      — ground floor? lift? steps?

Two things already handled from your notes:
  - Every phone number in the FAQ is the practice landline,
    22910 37444.
  - No cancellation fee is mentioned anywhere. The answer asks
    for 24 hours' notice as a courtesy and stops there.

Also worth doing: the orthodontist (New Jersey graduate, certified
Invisalign) and the maxillofacial surgeon are now named as roles
in the treatment text, but the Team page still shows five
placeholder members. Adding them there would tie the two together.


================================================================
TREATMENT TEXT  —  PLEASE HAVE THE DENTIST READ THIS
================================================================
The four treatments now expand to a full description, and there
is an eight-question FAQ on the treatments page. Both are fully
editable in the Studio (tabs "Θεραπείες" and "Συχνές ερωτήσεις"),
in Greek and English, with the translation arrows.

WHERE THIS TEXT CAME FROM
The opening paragraph of each of the five treatments the practice
supplied is the practice's own wording, used verbatim. Everything
below it — and all four of the original treatments — I wrote from
general, standard dentistry knowledge — the sort
of thing any practice would say about whitening, implants,
children's visits and panoramic X-rays. It is deliberately
general and contains no claims specific to this practice: no
prices, no brands, no success rates, no guarantees, no
qualifications.

It is accurate as general information, but it has NOT been
checked by a dentist. Before this goes public, Dr Papantoniou
should read all seven descriptions and all 27 answers and
correct anything that does not match how he actually works.

Things he will probably want to change:
  - whether walk-ins are accepted or strictly appointment only
  - his own recall interval (the FAQ now says the interval depends
    on the patient, with six months as the common case)
  - ΕΟΠΥΥ and private insurance — see the list above
  - anything he does differently from the general approach

Nothing here promises a clinical outcome, which is the main
thing to avoid on a medical site — but it is his professional
name on it, so it should be his words in the end.


================================================================
CHANGE LOG  —  26 August 2026
================================================================
- Three new treatments: Ορθοδοντική, Ενδοδοντία, Περιοδοντική
  Θεραπεία, using the practice's own Greek.
- Εμφυτευματολογία became "Εμφυτεύματα & Γναθοχειρουργικές
  Θεραπείες". The practice's paragraph leads, followed by a note
  that a maxillofacial surgeon holds both dental and medical
  qualifications, then the existing general explanation.
- Πανοραμικές Ακτινογραφίες became "Ψηφιακή Πανοραμική &
  Ενδοστοματικές Ακτινογραφίες". The line saying nothing is
  placed in the mouth was re-scoped to the panoramic scan only,
  since intraoral films obviously do go in the mouth.
- New FAQ page and menu tab. 27 questions, six groups, both
  languages. See the section above for what still needs the
  practice's answer.
- The four cards under the homepage hero and the Υπηρεσίες list
  in every footer now render from the treatments in content.json.
  Add a treatment in the Studio and it appears in all three
  places. Nothing to edit in the HTML.
- Studio: the icon dropdown gained ortho, endo and perio; the FAQ
  editor gained a Κατηγορία field with the same translation
  arrows as every other pair.
- Fixed, while in there: .rv.on cancelled the hover lift on the
  homepage cards, because the two rules had equal specificity.


================================================================
CHANGE LOG  —  26 August 2026 (second pass)
================================================================
- CACHING. styles.css and app.js were set to cache for a week, so
  a deploy could look unchanged for days — the new treatment
  icons and the FAQ category headings were both being hidden by
  it. Two fixes: the tags now carry ?v=20260826, and _headers
  asks the browser to revalidate every visit. Netlify answers an
  unchanged file with a small 304, so this costs nothing.

  WHEN YOU NEXT EDIT styles.css OR app.js: bump the ?v= number in
  all eight HTML files. A date works fine. Skip it and returning
  visitors may sit on the old file. content.json is unaffected —
  it was always fetched fresh.

- FAQ PAGE READABILITY. One centred column, 900px wide, with the
  questions at 24px and the answers at 17px instead of the 20/14.5
  used elsewhere. It centres on desktop and goes back to
  left-aligned on phones, where centred headings read badly.

- OPENING HOURS, EDITED IN ONE GO. The Ωράριο tab now opens with
  a single field and two buttons:

     "Σε όσες είναι ανοιχτές"  — every day not marked closed
     "Σε όλες τις ημέρες"      — all seven, reopening closed ones

  The field is pre-filled with whatever hours most days currently
  share. So: type 08:30 – 15:00, press the first button, then
  change Friday on its own row for a half day. Sunday stays
  closed unless you use the second button.

- OPENING HOURS IN GOOGLE. The Dentist structured data in
  index.html had the hours written into it by hand, so changing
  them in the Studio would have left the Google result showing
  the old times. app.js now rebuilds that block from
  content.json — hours, phone, rating, review count and the
  treatment list. Days sharing the same hours are grouped, and a
  one-off like a short Friday becomes its own entry. Nothing to
  maintain by hand any more.


================================================================
CHANGE LOG  —  26 August 2026 (third pass: typography)
================================================================
The headings were always the right size. Everything supporting
them was set a step or two too small, which is what made the site
feel thin. One pass over the whole scale, not a patch here and
there, so the proportions still hold together:

  body text        15    -> 16.5
  menu             12    -> 13.5
  page lede        16    -> 17.5
  section lede     15.5  -> 17
  card title       11    -> 12.5
  card text        12.5  -> 14
  treatment title  23    -> 27
  treatment lede   14    -> 16
  treatment body   15    -> 17
  contact details  15    -> 16.5
  footer links     13.5  -> 14.5
  team biography   14    -> 15.5

The small uppercase labels — eyebrows, roles, breadcrumbs — stay
between 11.5 and 12.5 on purpose. They are meant to sit quietly
under the headings, and enlarging them would flatten the
hierarchy.

CENTRED PAGE HEADERS. Every sub-page banner and every section
head is centred on desktop, and drops back to left-aligned below
620px, where a centred paragraph over three or four short lines
is harder to read than a left-aligned one.

THE NAVIGATION collapses to the burger at 1240px now, not 1150.
Six items at 13.5px need the extra room; below 1340px the menu
tightens its spacing first. Without this the menu would have run
into the booking button on a 1200px laptop.

WHAT WE COVER — REBUILT. The list is a centred 1020px column, so
every row starts on the same line and the page has an even
gutter on both sides rather than a ragged empty right-hand half.
The icon sits in a fixed 34px column, which keeps the titles
aligned whether or not a treatment has an icon.

Opening a row now tints the whole row — head and body together —
with rounded corners and a soft shadow, so it reads as one
panel. Before, the body was bare paragraphs sitting in white
with nothing beside them, which is what looked unfinished. The
hairline rules moved from the container onto the rows so they
can step out of the way of an open panel instead of cutting
across its edge.

The first paragraph of each treatment is set slightly larger and
darker. That paragraph is the practice's own wording in every
case, so it earns the emphasis. Body text is capped at 78
characters a line — past that the eye loses its place on the
return sweep.

The FAQ rows got the same panel treatment, so the two pages
read as siblings.
