# Lekkantu brand mirror

## Source of truth

Lekkantu remains its own product and repository. The canonical logo source is:

- repository: `mosn221/lekkantu`
- commit: `a06694eb3a9f4a86ee2eab05b8c2d44ee98f9c39`
- file: `static/img/logo-final-lekkantu.png`
- canonical blob: `3bfbd2240fe54932a938513b7f4f19cbe1a19fbd`

M221Tech keeps an exact byte-for-byte copy at `public/assets/lekkantu/mark-master.png` for the Nutrition presentation page. Do not redraw or reinterpret the fruit mark in this repository.

The small icon source is mirrored from `static/img/lekkantu-favicon.png`, blob `8201c5f7832c6bc5b2e1cf0a8002bd7407a8c5af`.

## Product palette

The palette follows the current Lekkantu visual system in its own repository:

- ink — `#173C36`
- green — `#0A5E57`
- deep green — `#063F3A`
- mint — `#00BFA6`
- sun — `#FFC300`
- sand — `#F0EEE9`
- paper — `#FFFDF8`

M221Tech dark background remains `#0B1020` when Lekkantu is presented inside the parent site.

## Asset hierarchy

- `mark-master.png` — exact approved product logo, untouched
- `favicon-source.png` — exact small icon from the Lekkantu repo
- `mark-256.png`, `mark-512.png` — generated display derivatives
- `icon-180.png`, `icon-192.png`, `icon-512.png` — generated device/app sizes
- `avatar-512.png` — generated square profile asset
- `social-base.png` — M221Tech social foundation using the exact logo tile

Run `npm run brand:generate` to rebuild generated derivatives.

## Usage

The warm square background is part of the approved raster logo. Do not remove it, recolor it, trace a substitute mark, distort the proportions or add effects to the logo itself.

On M221Tech, use the mark as a product identifier inside the Nutrition vertical. The wider page still belongs to M221Tech, while Lekkantu keeps its own visual identity and direct link to `lekkantu.com`.
