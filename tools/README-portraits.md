# Team portraits — one specification, one photoshoot

Every face on the team page is produced by the same script from the same
specification, so the six of them read as one sitting rather than six phone
snaps. Nothing about a person is regenerated, retouched or reinterpreted:
the original photograph is the source of truth. Only the background, the
crop, the framing and a small lighting balance are changed.

## The specification  (tools/spec.py — change it there, nowhere else)

| | |
|---|---|
| Output | 1000 × 1250 px (4:5), plus a 500 × 625 copy |
| Formats | `.webp` and `.jpg`, both sizes, progressive |
| Background | one gradient — pale cool white to soft grey, a gentle glow behind the head, a soft contact shadow. Identical for everybody. |
| Eye line | 32.5 % down the frame |
| Head size | face width = 30 % of the frame width |
| Centring | face centred horizontally |
| Lighting | grey-world white balance clamped to ±8 %, exposure moved at most ±20 % towards a common facial brightness |

Because every portrait is produced at exactly 4:5 and the card frame is
4:5, the browser never crops or stretches a face — on any screen size.

## Adding a new team member

```bash
python3 tools/standardise_portrait.py maria-nikolaou photo-from-phone.jpg
```

That writes into `images/team/`:

```
maria-nikolaou.jpg  maria-nikolaou.webp        (1000 × 1250)
maria-nikolaou-500.jpg  maria-nikolaou-500.webp  (500 × 625)
```

Then in the Studio → Η ομάδα, add the member and type the path
`images/team/maria-nikolaou.jpg` in the "Διαδρομή αρχείου" field. The page
builds the `<picture>` element, the `srcset` and the WebP alternatives from
that one path.

Keep the untouched original in `images/team/originals/`.

### If the face is not found

Faces in a mask, a surgical cap or at an angle can defeat the detector.
Measure the face box in any image editor — x, y, width, height in pixels,
from the eyebrows to the chin — and pass it:

```bash
python3 tools/standardise_portrait.py nikos photo.jpg --face 222,96,124,124
```

### If the photograph already has its background removed

Save it as a PNG with real transparency and hand it to the same command.
The script detects the alpha channel and keeps it instead of cutting the
person out itself — everything else (background, crop, sizes) is unchanged,
so a supplied cutout and a raw photo end up looking identical.

## What the script does, in order

1. Honours the EXIF rotation and trims any black screenshot bands.
2. Cuts the person out (GrabCut seeded from the face, a guided-filter matte
   for hair edges) — or uses the supplied alpha.
3. Balances white point and exposure within the clamps above.
4. Places the head at the specified eye line and size.
5. Composites onto the one clinic background and adds the contact shadow.
6. Writes the four files, optimised for the web.

## Files

```
tools/spec.py                    the specification — the only place to change the look
tools/standardise_portrait.py    the command
tools/cutout.py                  cutting the person out
tools/gf.py                      guided filter used for soft hair edges
```

A note on quality: the result can only be as good as the source. A photo
taken close, at eye height, against a plain wall in even light needs almost
nothing from the script. A small or heavily backlit photo will still be a
small, backlit photo afterwards.
