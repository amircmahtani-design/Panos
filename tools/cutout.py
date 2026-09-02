import cv2, numpy as np
from scipy import ndimage
from gf import guided_filter_color

def trim_letterbox(rgb, thr=18):
    """Remove black bands from phone screenshots."""
    g = rgb.mean(2)
    rows = np.where(g.mean(1) > thr)[0]
    cols = np.where(g.mean(0) > thr)[0]
    if len(rows)==0 or len(cols)==0: return rgb, (0,0)
    y0,y1 = rows[0], rows[-1]+1
    x0,x1 = cols[0], cols[-1]+1
    return rgb[y0:y1, x0:x1], (x0,y0)

def _prior(shape, face):
    """Anatomical foreground prior from the face box: head + neck + shoulders."""
    h,w = shape
    fx,fy,fw,fh = face
    cx = fx+fw/2
    P = np.zeros((h,w), np.uint8)
    cv2.ellipse(P,(int(cx),int(fy+fh*0.30)),(int(fw*0.66),int(fh*0.90)),0,0,360,1,-1)
    chin = fy+fh*1.02
    sh_y = chin+fh*0.40
    pts = [(cx-fw*0.30,chin-fh*0.15),(cx+fw*0.30,chin-fh*0.15),
           (cx+fw*1.18,sh_y),(cx+fw*1.95,h),(cx-fw*1.95,h),(cx-fw*1.18,sh_y)]
    cv2.fillPoly(P,[np.array(pts,np.int32)],1)
    return P

def _row_corridor(binm, face):
    """Per row keep only the run of pixels that contains the body centre line."""
    h,w = binm.shape
    fx,fy,fw,fh = face
    cx = int(fx+fw/2)
    out = np.zeros_like(binm)
    for y in range(h):
        row = binm[y]
        if not row.any(): continue
        idx = np.flatnonzero(np.diff(np.concatenate(([0],row,[0]))))
        starts, ends = idx[0::2], idx[1::2]
        best=None; bestd=1e9
        for s,e in zip(starts,ends):
            d = 0 if s<=cx<e else min(abs(s-cx),abs(e-cx))
            if d<bestd: bestd, best = d,(s,e)
        if best and bestd < fw*0.9:
            out[y,best[0]:best[1]] = 1
    return out

def smooth_silhouette(binm, face):
    """Clamp each row to a median-filtered outline, so door frames, papers and
    other rectangles that touch the body cannot bulge out of the silhouette."""
    from scipy.signal import medfilt
    h,w = binm.shape
    fx,fy,fw,fh = face
    L=np.full(h,np.nan); R=np.full(h,np.nan)
    for y in range(h):
        c=np.flatnonzero(binm[y])
        if len(c): L[y],R[y]=c[0],c[-1]
    ok=~np.isnan(L)
    if ok.sum()<10: return binm
    idx=np.arange(h)
    Lf=np.interp(idx,idx[ok],L[ok]); Rf=np.interp(idx,idx[ok],R[ok])
    k=int(max(5,(h*0.07)//2*2+1))
    Lm=medfilt(Lf,k); Rm=medfilt(Rf,k)
    tol=fw*0.14
    out=np.zeros_like(binm)
    for y in range(h):
        if not ok[y]: continue
        a=int(max(L[y],Lm[y]-tol)); b=int(min(R[y],Rm[y]+tol))
        if b>a: out[y,a:b+1]=binm[y,a:b+1]
    return out

def peel_background(small, binm, bgmask, face):
    """Trim pixels at the left/right edge of each row that still match the wall,
    which is what leaves door frames and paper edges stuck to a shoulder."""
    px = small[bgmask>0].reshape(-1,3).astype(np.float32)
    if len(px) < 200: return binm
    mu = px.mean(0); C = np.cov(px.T)+np.eye(3)*9.0
    Ci = np.linalg.inv(C)
    fw = face[2]
    d = small.astype(np.float32)-mu
    maha = np.sqrt(np.einsum('...i,ij,...j->...', d, Ci, d))
    close = maha < 3.0
    out = binm.copy()
    cap = int(fw*0.9)
    for y in range(binm.shape[0]):
        c = np.flatnonzero(out[y])
        if len(c) < 3: continue
        a,b = c[0], c[-1]
        n=0
        while a < b and close[y,a] and n < cap: out[y,a]=0; a+=1; n+=1
        n=0
        while b > a and close[y,b] and n < cap: out[y,b]=0; b-=1; n+=1
    return out

def person_alpha(rgb, face):
    H,W = rgb.shape[:2]
    S = 900.0/max(H,W)
    small = cv2.resize(rgb,(int(W*S),int(H*S)),interpolation=cv2.INTER_AREA)
    h,w = small.shape[:2]
    f = tuple(v*S for v in face)
    fx,fy,fw,fh = f
    cx = fx+fw/2

    P = _prior((h,w), f)
    k = lambda n: cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(n,n))
    ring = cv2.dilate(P, k(max(3,int(fw*0.55))|1))

    m = np.full((h,w), cv2.GC_BGD, np.uint8)     # beyond the ring: certain background
    m[ring>0] = cv2.GC_PR_BGD                    # ring: probably background, may grow
    m[P>0]    = cv2.GC_PR_FGD
    cv2.ellipse(m,(int(cx),int(fy+fh*0.45)),(int(fw*0.34),int(fh*0.46)),0,0,360,cv2.GC_FGD,-1)
    cv2.rectangle(m,(int(cx-fw*0.45),int(fy+fh*1.75)),(int(cx+fw*0.45),h-1),cv2.GC_FGD,-1)

    bgd=np.zeros((1,65),np.float64); fgd=np.zeros((1,65),np.float64)
    cv2.grabCut(cv2.cvtColor(small,cv2.COLOR_RGB2BGR),m,None,bgd,fgd,8,cv2.GC_INIT_WITH_MASK)
    binm=np.where((m==cv2.GC_FGD)|(m==cv2.GC_PR_FGD),1,0).astype(np.uint8)

    lab,n = ndimage.label(binm)
    fl = lab[int(fy+fh*0.5), int(cx)]
    if fl==0:
        sizes=ndimage.sum(binm,lab,range(1,n+1)); fl=int(np.argmax(sizes))+1
    binm=(lab==fl).astype(np.uint8)
    binm=_row_corridor(binm, f)
    binm=peel_background(small, binm, (m==cv2.GC_BGD).astype(np.uint8), f)
    binm=smooth_silhouette(binm, f)
    binm=_row_corridor(binm, f)
    binm=ndimage.binary_fill_holes(binm).astype(np.uint8)
    binm=cv2.morphologyEx(binm,cv2.MORPH_CLOSE,k(9))
    binm=cv2.morphologyEx(binm,cv2.MORPH_OPEN,k(7))

    full=cv2.resize(binm.astype(np.float32),(W,H),interpolation=cv2.INTER_LINEAR)
    guide=rgb.astype(np.float32)/255.
    r=max(6,int(max(H,W)/180))
    a=guided_filter_color(guide,full,r,1e-4)
    a=np.clip((a-0.42)/0.30,0,1)
    a=guided_filter_color(guide,a.astype(np.float32),max(3,r//2),1e-5)
    return np.clip(a,0,1).astype(np.float32)


def white_background_alpha(rgb, tol=30, sat_tol=26):
    """For a portrait already cut out onto a white background.

    Only white that is CONNECTED TO THE BORDER is treated as background, so a
    white mask, a white collar or a bright highlight inside the figure is kept.
    """
    a = rgb.astype(np.int16)
    darkness = 255 - a.max(2)                    # 0 = pure white
    sat = a.max(2) - a.min(2)
    near_white = ((darkness < tol) & (sat < sat_tol)).astype(np.uint8)

    h, w = near_white.shape
    lab, n = ndimage.label(near_white)
    border = np.concatenate([lab[0], lab[-1], lab[:,0], lab[:,-1]])
    bg_ids = set(int(v) for v in np.unique(border) if v)
    bg = np.isin(lab, list(bg_ids)) if bg_ids else np.zeros_like(near_white, bool)

    binm = (~bg).astype(np.uint8)
    binm = ndimage.binary_fill_holes(binm).astype(np.uint8)
    k = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5,5))
    binm = cv2.morphologyEx(binm, cv2.MORPH_OPEN, k)
    lab2, n2 = ndimage.label(binm)
    if n2 > 1:                                    # drop stray specks
        sizes = ndimage.sum(binm, lab2, range(1, n2+1))
        binm = (lab2 == int(np.argmax(sizes))+1).astype(np.uint8)

    guide = rgb.astype(np.float32)/255.
    r = max(3, int(max(h,w)/400))
    al = guided_filter_color(guide, binm.astype(np.float32), r, 1e-5)
    al = np.clip((al-0.55)/0.30, 0, 1)            # pull the edge in, killing white fringe
    return al.astype(np.float32)
