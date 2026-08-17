# Music Band — background music

Drop one looping track per ensemble here. The file name must match the
ensemble `id` in `public/data/musicband/ensembles.ts`:

| File              | Ensemble            |
| ----------------- | ------------------- |
| `jazz.mp3`        | วงแจ๊ส / Jazz Band |
| `string.mp3`      | วงสตริง / String Band |
| `stringcombo.mp3` | วงสตริงคอมโบ / String Combo Band |
| `folk.mp3`        | วงโฟล์ค / Folk Band |
| `chamber.mp3`     | วงแชมเบอร์ / Chamber Music |
| `orchestra.mp3`   | วงออร์เคสตรา / Orchestra Band |

No code change is needed — the stage picks the file up automatically.

Any ensemble without a file falls back to the synthesised Web Audio theme in
`components/MusicBand/useBandAudio.ts`, so the tool always has sound.

Guidelines:

- **Format:** MP3 (widest browser support). 128 kbps mono is plenty.
- **Length:** roughly 1–2 minutes; the track loops.
- **Loop:** trim so the end runs straight back into the start without a gap.
- **Level:** keep it quiet — it plays under the activity, and the stage sets
  volume to about half.
- **Size:** aim under ~2 MB per file so the page stays quick to load.
- **Rights:** only use music you are licensed to publish.
