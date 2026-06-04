# 🔴 Image Loading Issue — Root Cause & Fix Guide

## What Was Wrong

All images in the portfolio were **corrupted at the binary level** before being zipped. None of them are displayable — they are not a code or deployment issue.

### Corruption Details

| File | Status | Issue |
|------|--------|-------|
| `src/assets/images/about-me/portrait.png` | ❌ Corrupted | Binary data destroyed (635,416 bytes replaced) |
| `src/assets/images/case-studies/revise-smarter.png` | ❌ Corrupted | Binary data destroyed |
| `src/assets/images/case-studies/textile-traceability.png` | ❌ Corrupted | Binary data destroyed |
| `src/assets/images/case-studies/travelmatic-platform.png` | ❌ Corrupted | Binary data destroyed |
| `src/assets/images/case-studies/yolearn-landing.png` | ❌ Corrupted | Binary data destroyed |
| `src/assets/images/hobbies/hobby-01.png` | ❌ Missing | Contains HTML `<html><body>404</body></html>` — a 404 page was saved instead of the image |
| `src/assets/images/hobbies/hobby-02.png` | ❌ Corrupted | Binary data destroyed |
| `src/assets/images/hobbies/hobby-03.png` | ❌ Corrupted | Binary data destroyed |
| `src/assets/images/hobbies/hobby-04.png` | ❌ Corrupted | Binary data destroyed |
| `src/assets/images/hobbies/hobby-05.png` | ❌ Corrupted | Binary data destroyed |
| `src/assets/images/profile_sarthak_crt_1780142857794.png` | ✅ Valid | JPEG — this one is fine |

### Why It Happened

The PNG binary files contain a byte `0x89` as their first byte (part of the PNG signature `\x89PNG`). When files were committed to git **without LFS (Large File Storage)** or transferred through a text-encoding pipeline, this byte was interpreted as invalid UTF-8 and replaced with the 3-byte UTF-8 replacement character `\xEF\xBF\xBD` — expanding every such byte to 3 bytes and completely destroying the binary structure.

**The corruption is NOT reversible.** The original data is lost.

---

## Code Fixes Applied (this release)

All three components now have proper `onError` fallback handlers so the UI degrades gracefully instead of showing broken image icons:

- **`Playground.tsx`** (About Me portrait) — React state-based fallback shows a styled ASCII placeholder
- **`CaseStudies.tsx`** (case study screenshots + modal) — `onError` DOM fallback added to both grid cards and the modal view
- **`HobbiesInterests.tsx`** (hobby photos) — existing `onError` improved with better fallback styling and frame title

---

## ✅ How to Fix the Images

You need to **re-export your original images** and place them at these paths:

```
src/assets/images/about-me/portrait.png
src/assets/images/case-studies/revise-smarter.png
src/assets/images/case-studies/textile-traceability.png
src/assets/images/case-studies/travelmatic-platform.png
src/assets/images/case-studies/yolearn-landing.png
src/assets/images/hobbies/hobby-01.png
src/assets/images/hobbies/hobby-02.png
src/assets/images/hobbies/hobby-03.png
src/assets/images/hobbies/hobby-04.png
src/assets/images/hobbies/hobby-05.png
```

### To prevent this from happening again

Add a `.gitattributes` file at your project root:

```
# Treat all PNG/JPG/WEBP as binary — never mangle them through text encoding
*.png binary
*.jpg binary
*.jpeg binary
*.webp binary
*.gif binary
*.ico binary
*.svg text eol=lf
```

This tells git to never apply line-ending conversion or text encoding to these files.
