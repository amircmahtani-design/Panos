"""CANONICAL TEAM PORTRAIT SPECIFICATION v1 — Papantoniou Dental Clinic
One specification, applied identically to every team photograph.
Nothing here is decided per-photo."""

OUT_W, OUT_H = 1000, 1250          # 4:5, matches .member-photo aspect-ratio
RETINA = [(1000,1250), (500,625)]  # @2x and @1x

# --- geometry (fractions of OUT_H) -----------------------------------------
EYE_Y        = 0.345   # eye line
FACE_W_FRAC  = 0.440   # detected face-box width / OUT_W — tight enough that the
                       # shoulders leave the frame, so no figure floats
CENTER_X     = 0.500
EYE_IN_BOX   = 0.42    # eye line position inside a haar face box (frac of h)

# --- background -------------------------------------------------------------
BG_TOP    = (243, 248, 250)   # pale cool white, sampled from site --bg #F2F9FB
BG_BOTTOM = (214, 226, 231)   # soft cool grey at the base
BG_GLOW   = (252, 254, 255)   # gentle light behind the head
GLOW_Y    = 0.30              # centre of the glow
GLOW_R    = 0.62              # radius, fraction of height
SHADOW    = 0.10              # contact shadow strength under the shoulders

# --- lighting normalisation (restrained; consistency, not retouching) --------
FACE_LUMA_TARGET = 176        # mean sRGB luma of the facial region
LUMA_MAX_GAIN    = 0.20       # never move exposure more than +/-20%
WB_MAX           = 0.08       # grey-world white balance clamped to +/-8%
CONTRAST         = 1.03       # a whisker of contrast, applied to all equally

# --- output -----------------------------------------------------------------
JPEG_Q  = 88
WEBP_Q  = 82
