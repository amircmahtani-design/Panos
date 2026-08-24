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
   epikoinonia.html  404.html  efcharisto.html
   sitemap.xml  robots.txt
It only affects Google indexing and the preview image shown when
the link is shared on WhatsApp/Facebook. Everything else works
regardless.

DEPLOY
------
Upload to the ROOT of the repo, keeping images/ as a subfolder:

  index.html  to-iatreio.html  ypiresies.html
  o-iatros.html  epikoinonia.html
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

4. TREATMENTS. Limited to the four shown on the entrance glass:
   Αισθητική Οδοντιατρική, Εμφυτευματολογία, Παιδοδοντιατρική,
   Πανοραμικές Ακτινογραφίες. Earlier drafts listed orthodontics,
   endodontics, periodontology, prosthetics and oral surgery —
   removed, as nothing confirmed the clinic offers them. Add back
   any that are genuine.

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
TREATMENT TEXT AND FAQ  —  PLEASE HAVE THE DENTIST READ THIS
================================================================
The four treatments now expand to a full description, and there
is an eight-question FAQ on the treatments page. Both are fully
editable in the Studio (tabs "Θεραπείες" and "Συχνές ερωτήσεις"),
in Greek and English, with the translation arrows.

WHERE THIS TEXT CAME FROM
I wrote it from general, standard dentistry knowledge — the sort
of thing any practice would say about whitening, implants,
children's visits and panoramic X-rays. It is deliberately
general and contains no claims specific to this practice: no
prices, no brands, no success rates, no guarantees, no
qualifications.

It is accurate as general information, but it has NOT been
checked by a dentist. Before this goes public, Dr Papantoniou
should read all four descriptions and all eight answers and
correct anything that does not match how he actually works.

Things he will probably want to change:
  - whether walk-ins are accepted or strictly appointment only
  - his own recall interval (I wrote six months, the usual default)
  - whether he takes ΕΟΠΥΥ or private insurance (not mentioned
    at all, because I have no way to know)
  - what patients should do out of hours
  - anything he does differently from the general approach

Nothing here promises a clinical outcome, which is the main
thing to avoid on a medical site — but it is his professional
name on it, so it should be his words in the end.
