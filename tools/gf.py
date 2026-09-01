import cv2, numpy as np

def guided_filter_color(I, p, r, eps):
    """He et al. guided filter, colour guide. I float32 HxWx3 in 0..1, p float32 HxW."""
    bf = lambda x: cv2.boxFilter(x, -1, (2*r+1, 2*r+1), normalize=True, borderType=cv2.BORDER_REFLECT)
    Ir, Ig, Ib = I[:,:,0], I[:,:,1], I[:,:,2]
    mI = np.dstack([bf(Ir), bf(Ig), bf(Ib)])
    mp = bf(p)
    mIp = np.dstack([bf(Ir*p), bf(Ig*p), bf(Ib*p)])
    cov = mIp - mI*mp[...,None]

    vrr = bf(Ir*Ir)-mI[:,:,0]*mI[:,:,0]+eps; vrg = bf(Ir*Ig)-mI[:,:,0]*mI[:,:,1]
    vrb = bf(Ir*Ib)-mI[:,:,0]*mI[:,:,2];     vgg = bf(Ig*Ig)-mI[:,:,1]*mI[:,:,1]+eps
    vgb = bf(Ig*Ib)-mI[:,:,1]*mI[:,:,2];     vbb = bf(Ib*Ib)-mI[:,:,2]*mI[:,:,2]+eps

    # invert the 3x3 symmetric covariance per pixel
    c0 = vgg*vbb-vgb*vgb; c1 = vgb*vrb-vrg*vbb; c2 = vrg*vgb-vgg*vrb
    det = vrr*c0 + vrg*c1 + vrb*c2
    det = np.where(np.abs(det) < 1e-12, 1e-12, det)
    i00=c0/det; i01=c1/det; i02=c2/det
    i11=(vrr*vbb-vrb*vrb)/det; i12=(vrb*vrg-vrr*vgb)/det; i22=(vrr*vgg-vrg*vrg)/det

    a0 = cov[:,:,0]*i00+cov[:,:,1]*i01+cov[:,:,2]*i02
    a1 = cov[:,:,0]*i01+cov[:,:,1]*i11+cov[:,:,2]*i12
    a2 = cov[:,:,0]*i02+cov[:,:,1]*i12+cov[:,:,2]*i22
    b  = mp - a0*mI[:,:,0] - a1*mI[:,:,1] - a2*mI[:,:,2]
    q = bf(a0)*Ir + bf(a1)*Ig + bf(a2)*Ib + bf(b)
    return q.astype(np.float32)
