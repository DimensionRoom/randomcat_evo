# Award logos

One logo per institution, referenced from `public/data/awards.ts`:

| File                  | Institution |
| --------------------- | ----------- |
| `chulalongkorn.png`   | จุฬาลงกรณ์มหาวิทยาลัย — Chulalongkorn University |
| `khonkaen.png`        | มหาวิทยาลัยขอนแก่น — Khon Kaen University |
| `suansunandha.png`    | มหาวิทยาลัยราชภัฏสวนสุนันทา — Suan Sunandha Rajabhat University |
| `kasetsart.png`       | มหาวิทยาลัยเกษตรศาสตร์ — Kasetsart University |
| `sripatum.png`        | มหาวิทยาลัยศรีปทุม — Sripatum University |

Guidelines:

- Roughly square works best; the card box crops to a square and fits the logo
  inside with `object-fit: contain`.
- The band shows every logo desaturated (`filter: grayscale`) and brings back
  colour on hover, so a colour source file is fine — no need to pre-convert.
- Until a file is here the card shows the site's default image instead, so the
  section stays usable while logos are still being collected.
