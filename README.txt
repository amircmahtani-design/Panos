ΟΔΟΝΤΙΑΤΡΕΙΟ ΠΑΠΑΝΤΩΝΙΟΥ ΠΑΝΑΓΙΩΤΗΣ — website files
====================================================

DEPLOY
------
Upload ALL 7 files to the ROOT of the repo (not in a subfolder).
The HTML files load styles.css and app.js as siblings, so the
folder structure must stay flat. Netlify then auto-deploys.

FILES
-----
index.html        Αρχική / Home
to-iatreio.html   Το ιατρείο / The Practice
ypiresies.html    Υπηρεσίες / Services
o-iatros.html     Ο ιατρός / The Dentist
epikoinonia.html  Επικοινωνία / Contact
styles.css        shared styling for all pages
app.js            language toggle, mobile menu, animations

LANGUAGE
--------
Greek is the default and is written directly into the HTML.
English is applied on top when the URL ends in ?lang=en
e.g. index.html?lang=en
The EL | EN switch is in the header and the mobile menu.
To edit English wording, open app.js and change the EN
dictionary at the top. To edit Greek, edit the HTML directly.

STILL TO DO
-----------
1. Instagram link is a placeholder ("#") in all 5 pages
   and in the footer. Search for instagram.com and replace.
2. The dentist's photo is still the "Π.Π" monogram on
   o-iatros.html. Replace the block marked with class
   "docframe" with:  <img src="images/giatros.jpg" alt="">
3. Photos are currently hotlinked from Google
   (lh5.googleusercontent.com). THOSE LINKS EXPIRE.
   Download them, put them in an /images folder, and
   replace the URLs before this goes live properly.
4. Confirm the review count. Google currently shows 46
   reviews at 4.6 stars; the pages say 53.

CONTACT DETAILS USED
--------------------
Phone:    22910 37444
Address:  Περικλέους, Ανάβυσσος 190 13
Hours:    Δευτέρα–Σάββατο 08:30–13:30, Κυριακή κλειστά
Map:      37.7375018, 23.9472415
