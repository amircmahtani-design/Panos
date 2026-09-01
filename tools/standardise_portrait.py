#!/usr/bin/env python3
"""
Team-portrait standardiser — Odontiatriko Kentro Papantoniou.

One canonical specification (spec.py) applied identically to every portrait.
Input may be either
  * a plain photograph          -> the person is cut out locally, or
  * an RGBA PNG already cut out -> the existing alpha is used as-is.
The person is never regenerated, beautified or altered: only background,
crop, framing and a restrained lighting balance.

    python3 tools/standardise_portrait.py <slug> <photo> [--face x,y,w,h] [--out DIR]

Writes <slug>.jpg/.webp (1000x1250) and <slug>-500.jpg/.webp into images/team/.
Point the member's photo at "images/team/<slug>.jpg" in the Studio and the page
picks up the right size and format on its own.
"""
import sys, os, json, cv2, numpy as np
from PIL import Image, ImageOps
import spec
from cutout import person_alpha, trim_letterbox

CASC = cv2.CascadeClassifier(cv2.data.haarcascades+"haarcascade_frontalface_alt2.xml")

# ---------------------------------------------------------------- background
def canonical_background(w=spec.OUT_W, h=spec.OUT_H):
    """The single background every team member is placed on."""
    y = np.linspace(0,1,h)[:,None]
    top = np.array(spec.BG_TOP,np.float32); bot = np.array(spec.BG_BOTTOM,np.float32)
    bg = top[None,None,:]*(1-y[...,None]) + bot[None,None,:]*y[...,None]
    bg = np.repeat(bg,w,axis=1)

    yy,xx = np.mgrid[0:h,0:w].astype(np.float32)
    d = np.sqrt(((xx-w*spec.CENTER_X)/(spec.GLOW_R*h))**2 + ((yy-h*spec.GLOW_Y)/(spec.GLOW_R*h))**2)
    glow = np.clip(1-d,0,1)**2
    bg = bg*(1-glow[...,None]*0.55) + np.array(spec.BG_GLOW,np.float32)[None,None,:]*glow[...,None]*0.55

    vig = np.clip(1-((xx-w/2)/(w*0.78))**2-((yy-h/2)/(h*0.95))**2,0,1)
    bg *= (0.955+0.045*vig)[...,None]
    return np.clip(bg,0,255).astype(np.uint8)

def contact_shadow(canvas, alpha):
    """A soft shadow under the shoulders so the figure sits in the frame."""
    h,w = alpha.shape
    sh = cv2.GaussianBlur(alpha,(0,0),w*0.045)
    band = np.clip((np.linspace(0,1,h)-0.62)/0.38,0,1)[:,None]**1.4
    sh = sh*band*spec.SHADOW
    return np.clip(canvas.astype(np.float32)*(1-sh[...,None]*0.9),0,255)

# ------------------------------------------------------------------- helpers
def detect_face(rgb):
    g = cv2.cvtColor(rgb,cv2.COLOR_RGB2GRAY)
    s = 900/max(rgb.shape[:2]); gs = cv2.resize(g,None,fx=s,fy=s)
    for sf,mn in ((1.08,6),(1.05,4),(1.03,3)):
        f = CASC.detectMultiScale(gs,sf,mn,minSize=(50,50))
        if len(f):
            f = max(f,key=lambda r:r[2])
            return tuple(int(v/s) for v in f)
    return None

def face_from_alpha(alpha):
    """Fallback anchors when no face is detected: read the head off the cutout."""
    ys,xs = np.where(alpha>0.5)
    if not len(ys): return None
    top = ys.min()
    band = alpha[top:top+int(alpha.shape[0]*0.06)]>0.5
    cols = np.where(band.any(0))[0]
    head_w = cols.max()-cols.min()
    widths=[]
    for y in range(top, min(top+int(alpha.shape[0]*0.5), alpha.shape[0])):
        c=np.where(alpha[y]>0.5)[0]
        widths.append(c.max()-c.min() if len(c) else 0)
    widths=np.array(widths,np.float32)
    hw = np.median(widths[:max(3,len(widths)//6)]) if len(widths) else head_w
    hw = max(hw, head_w, 1)
    # a face box is ~0.82 of head width and starts ~0.28 of head height down
    head_h = hw*1.32
    fw = hw*0.82
    cx = (cols.min()+cols.max())/2
    return (int(cx-fw/2), int(top+head_h*0.30), int(fw), int(fw))

def normalise_light(rgb, alpha, face):
    """Restrained, identical treatment for everyone. Consistency, not retouching."""
    img = rgb.astype(np.float32)
    fx,fy,fw,fh = face
    patch = img[max(0,int(fy+fh*0.15)):int(fy+fh*0.85), max(0,int(fx+fw*0.15)):int(fx+fw*0.85)]
    if patch.size:
        # grey-world white balance on the facial region, tightly clamped
        m = patch.reshape(-1,3).mean(0); g = m.mean()
        gain = np.clip(g/np.maximum(m,1e-3), 1-spec.WB_MAX, 1+spec.WB_MAX)
        img *= gain[None,None,:]
        luma = (patch@np.array([0.2126,0.7152,0.0722])).mean()
        e = np.clip(spec.FACE_LUMA_TARGET/max(luma,1e-3), 1-spec.LUMA_MAX_GAIN, 1+spec.LUMA_MAX_GAIN)
        img *= e
    img = (img-128)*spec.CONTRAST+128
    return np.clip(img,0,255)

def extend_to_bottom(rgb, alpha, rows=40):
    """If the body is cut by the frame edge, continue it rather than float it."""
    if (alpha[-1]>0.5).sum() < alpha.shape[1]*0.04: return rgb, alpha
    n = max(6, rgb.shape[0]//120)
    base = np.median(rgb[-n:],axis=0)[None,...]            # median of the last rows,
    abase = (alpha[-n:].min(0) > 0.5).astype(np.float32)   # only where the body is solid
    pad = np.repeat(base,rows,axis=0)
    a   = np.repeat(abase[None,:],rows,axis=0)
    a   = cv2.GaussianBlur(a,(0,0),2.0)
    return np.vstack([rgb,pad]), np.vstack([alpha,a])

# ---------------------------------------------------------------------- main
def standardise(slug, path, face_override=None, outdir="out"):
    im = ImageOps.exif_transpose(Image.open(path))
    arr = np.array(im.convert("RGBA"))
    has_cutout = (arr[:,:,3] < 250).mean() > 0.02      # a real transparent background
    if has_cutout:
        rgb = arr[:,:,:3]; alpha = arr[:,:,3].astype(np.float32)/255.
        source = "supplied cutout"
    else:
        rgb = np.array(im.convert("RGB"))
        rgb,(ox,oy) = trim_letterbox(rgb)
        f = face_override or detect_face(rgb)
        if f is None: raise SystemExit(f"{slug}: no face found, pass --face x,y,w,h")
        if face_override: f = (f[0]-ox, f[1]-oy, f[2], f[3])
        alpha = person_alpha(rgb, f)
        face_override = f
        source = "photo, cut out locally"

    face = face_override or detect_face(rgb) or face_from_alpha(alpha)
    rgb  = normalise_light(rgb, alpha, face)
    rgb, alpha = extend_to_bottom(rgb, alpha)

    fx,fy,fw,fh = face
    scale = (spec.FACE_W_FRAC*spec.OUT_W)/fw
    eye_y = fy + spec.EYE_IN_BOX*fh
    cx    = fx + fw/2
    M = np.array([[scale,0, spec.CENTER_X*spec.OUT_W - cx*scale],
                  [0,scale, spec.EYE_Y*spec.OUT_H     - eye_y*scale]],np.float32)
    flags = cv2.INTER_AREA if scale < 1 else cv2.INTER_LANCZOS4
    person = cv2.warpAffine(rgb, M,(spec.OUT_W,spec.OUT_H),flags=flags,
                            borderMode=cv2.BORDER_REPLICATE)
    a = cv2.warpAffine(alpha, M,(spec.OUT_W,spec.OUT_H),flags=cv2.INTER_LINEAR,
                       borderMode=cv2.BORDER_CONSTANT,borderValue=0)
    a = np.clip(a,0,1)

    if scale > 1.35:                      # low-resolution source: gentle recovery only
        blur = cv2.GaussianBlur(person,(0,0),1.1)
        person = np.clip(person*1.35-blur*0.35,0,255)

    canvas = contact_shadow(canonical_background().astype(np.float32), a)
    out = person*a[...,None] + canvas*(1-a[...,None])
    out = np.clip(out,0,255).astype(np.uint8)

    os.makedirs(outdir,exist_ok=True)
    img = Image.fromarray(out)
    img.save(f"{outdir}/{slug}.jpg","JPEG",quality=spec.JPEG_Q,optimize=True,progressive=True)
    img.save(f"{outdir}/{slug}.webp","WEBP",quality=spec.WEBP_Q,method=6)
    small = img.resize((spec.OUT_W//2,spec.OUT_H//2),Image.LANCZOS)
    small.save(f"{outdir}/{slug}-500.jpg","JPEG",quality=spec.JPEG_Q,optimize=True,progressive=True)
    small.save(f"{outdir}/{slug}-500.webp","WEBP",quality=spec.WEBP_Q,method=6)
    print(f"{slug:12s} {source:22s} face={face} scale={scale:.2f}")
    return out

if __name__=="__main__":
    if len(sys.argv) < 3:
        print(__doc__); raise SystemExit(1)
    slug, path = sys.argv[1], sys.argv[2]
    fo = None
    if "--face" in sys.argv:
        fo = tuple(int(v) for v in sys.argv[sys.argv.index("--face")+1].split(","))
    out = sys.argv[sys.argv.index("--out")+1] if "--out" in sys.argv else "images/team"
    standardise(slug, path, fo, out)
