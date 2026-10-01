# ArcMirror website logo exports

These exports reproduce the existing website identity rather than introducing a new logo. The owner explicitly requested consistency with the live website on 2026-10-01.

- **Upload to a square project-logo field:** [arcmirror-avatar.png](arcmirror-avatar.png), 1024 x 1024, with the website's light background.
- **Transparent icon:** [arcmirror-icon.png](arcmirror-icon.png), 1024 x 1024; [SVG](arcmirror-icon.svg).
- **Full horizontal logo:** [arcmirror-logo.png](arcmirror-logo.png), 1640 x 420, transparent; [SVG](arcmirror-logo.svg).
- [Avatar SVG](arcmirror-avatar.svg) provides a scalable square version.

Source of truth: `Mark` in `apps/web/components/icons.tsx`; `.brand`, `.mark`, `.mark i`, `.mark i + i` and root colors in `apps/web/app/globals.css`; the header wordmark in `apps/web/app/layout.tsx`. The production HTML and CSS were checked against these values.

Geometry: CSS border-box ellipses are 23 x 31, with a 1.8 border and top 1; the second starts at left 11. SVG centerline radii are (23 - 1.8) / 2 = 10.6 and (31 - 1.8) / 2 = 14.6. Rotations are +26 and -26 degrees. Colors are #182e2c and #5c9079, with background #f7f8f5. The wordmark uses Arial, weight 600, size 23 and letter spacing -0.8, with the website's 10-unit gap after its 34-unit mark box. SVG wordmark rendering requires Arial or the declared fallback; PNG is ready to upload without fonts.

The final files are deterministic SVG exports rendered to PNG with Sharp; no image-generation model was used for these selected exports. An earlier generated M-shaped concept was rejected because it did not match the website. That draft is not part of the published brand assets. No application code or live branding was changed.

Regenerate the PNG files from the repository root:

```sh
node --input-type=module -e 'import sharp from "sharp"; for (const name of ["arcmirror-avatar", "arcmirror-icon", "arcmirror-logo"]) await sharp("assets/brand/" + name + ".svg").png().toFile("assets/brand/" + name + ".png");'
```

Use the transparent files on light backgrounds, matching the current site. They are dark marks and are not optimized for dark backgrounds.
