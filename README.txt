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
