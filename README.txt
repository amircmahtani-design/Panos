ΟΔΟΝΤΙΑΤΡΙΚΟ ΚΕΝΤΡΟ ΠΑΠΑΝΤΩΝΙΟΥ — website
==========================================

White + turquoise clinical style, with the clinic's real
photographs and real logo mark.

DEPLOY
------
Upload to the ROOT of the repo, keeping images/ as a subfolder:

  index.html  to-iatreio.html  ypiresies.html
  o-iatros.html  epikoinonia.html
  styles.css  app.js
  images/          <- keep this folder name exactly

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
