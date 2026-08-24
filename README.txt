ΟΔΟΝΤΙΑΤΡΙΚΟ ΚΕΝΤΡΟ ΠΑΠΑΝΤΩΝΙΟΥ — website
==========================================

DEPLOY
------
Upload everything to the ROOT of the repo, keeping the images/
folder as a subfolder:

  index.html
  to-iatreio.html
  ypiresies.html
  o-iatros.html
  epikoinonia.html
  styles.css
  app.js
  images/          <- keep this folder name exactly

Netlify then auto-deploys. Nothing to build.

LANGUAGE
--------
Greek is the default and is written into the HTML, so it is what
Google indexes and what shows if JavaScript fails.
English is applied on top when the URL ends in ?lang=en
The EL | EN switch sits in the header and the mobile menu.
To change English wording, edit the EN dictionary at the top of app.js.
To change Greek, edit the HTML directly.


================================================================
PLEASE CHECK BEFORE THIS GOES LIVE
================================================================

1. PATIENT PHOTOGRAPHS  ** most important **
   Two images show identifiable patients being treated:
     images/05_treatment_in_progress.jpg
     images/07_dentist_microscope.jpg
   These are used on the clinic page, the treatments page and the
   homepage technology section. Under GDPR, publishing photographs
   of identifiable patients on a website needs their explicit
   written consent — separate from consent to post on Instagram.
   Please confirm consent exists, or tell me and I will swap them
   for the equipment-only shots.

2. THE LOGO IS MY REDRAW, NOT THE ORIGINAL
   The gold tooth-and-leaves mark in the header, footer and favicon
   is an SVG I drew by eye from the storefront photograph. It is
   close but it is not the clinic's artwork. Ask them for the
   original vector file (.ai / .eps / .svg) and replace it — the
   SVG paths sit in each HTML file inside <a class="logo">, and
   in app.js there is nothing to change.

3. IMAGE QUALITY
   The photos came from Instagram screenshots, not original files.
   I cropped off the Instagram counter and mute icon and resized
   them for the web, but the detail simply is not there. If the
   clinic can send the original photographs, they will look
   noticeably sharper — drop them into images/ using the same
   filenames and nothing else needs changing.

4. THE DENTIST'S PHOTO AND BIOGRAPHY
   o-iatros.html shows a placeholder panel instead of a portrait.
   The biography text is deliberately generic and describes the
   clinic's approach — I did not invent qualifications, training
   or career history. Ask Dr Papantoniou for a portrait and a
   short real bio.

5. TREATMENTS LIST
   I limited this to the four categories actually shown on the
   clinic's entrance glass:
     Αισθητική Οδοντιατρική / Cosmetic dentistry
     Εμφυτευματολογία / Implantology
     Παιδοδοντιατρική / Paediatric dentistry
     Πανοραμικές Ακτινογραφίες / Panoramic radiography
   Earlier drafts listed orthodontics, endodontics, periodontology,
   prosthetics and oral surgery — I removed those because nothing
   confirmed the clinic offers them. Add any that are genuine.

6. "20+ YEARS OF EXPERIENCE"
   Taken from your brief. Worth confirming with the clinic, since
   it appears in the hero, the trust strip and the dentist page.

7. NAME
   The storefront reads ΟΔΟΝΤΙΑΤΡΙΚΟ ΚΕΝΤΡΟ (Dental Centre), so I
   used that rather than Οδοντιατρείο. The Google listing still
   says "Οδοντιατρείο Παπαντωνίου Παναγιώτης" — worth aligning.


CONTACT DETAILS USED
--------------------
Phone:     22910 37444
Address:   Περικλέους, Ανάβυσσος 190 13
Hours:     Δευτέρα–Σάββατο 08:30–13:30 · Κυριακή κλειστά
Instagram: @papantonioudentalclinic
Map:       37.7375018, 23.9472415
Rating:    4.6 from 46 Google reviews

The contact form uses Netlify Forms — it will start working
automatically once deployed to Netlify, and submissions appear
in the Netlify dashboard under "Forms".
