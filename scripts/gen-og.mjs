// Generates public/og.png — run once with: bun run scripts/gen-og.mjs
import { Resvg } from '@resvg/resvg-js'
import { writeFileSync } from 'fs'

const W = 1200
const H = 630

const svg = /* xml */ `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">

  <!-- ── Background ── -->
  <rect width="${W}" height="${H}" fill="#0a0a0a"/>

  <!-- ── Outer frame ── -->
  <rect x="40" y="40" width="1120" height="550" fill="none" stroke="#1f1f1f" stroke-width="1"/>

  <!-- ── Left accent bar ── -->
  <rect x="80" y="80" width="1" height="470" fill="#2a2a2a"/>

  <!-- ── I-beam brand mark (large, right half) ── -->
  <!-- Top bar -->
  <rect x="820" y="190" width="230" height="16" fill="#181818"/>
  <!-- Stem -->
  <rect x="902" y="206" width="66" height="218" fill="#181818"/>
  <!-- Bottom bar -->
  <rect x="820" y="424" width="230" height="16" fill="#181818"/>

  <!-- ── Brand name ── -->
  <!-- "interra" — light weight -->
  <text
    x="108" y="310"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="108"
    font-weight="400"
    letter-spacing="-3"
    fill="#ffffff">interra</text>

  <!-- "Form" — bold italic -->
  <text
    x="108" y="430"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="108"
    font-weight="700"
    font-style="italic"
    letter-spacing="-3"
    fill="#ffffff">Form</text>

  <!-- ── Divider ── -->
  <rect x="108" y="468" width="300" height="1" fill="#333333"/>

  <!-- ── Tagline ── -->
  <text
    x="108" y="510"
    font-family="Arial, Helvetica, sans-serif"
    font-size="17"
    font-weight="400"
    letter-spacing="5"
    fill="#555555">WORKSPACE DESIGN &amp; CONSTRUCTION</text>

  <!-- ── Location bottom-right ── -->
  <text
    x="1120" y="572"
    font-family="Arial, Helvetica, sans-serif"
    font-size="13"
    letter-spacing="2"
    fill="#383838"
    text-anchor="end">ISLAMABAD, PAKISTAN</text>

</svg>
`

const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: W },
  font: {
    // Use system fonts — Georgia and Arial are always present on Windows & macOS
    loadSystemFonts: true,
    defaultFontFamily: 'Georgia',
  },
})

const pngData = resvg.render()
const pngBuffer = pngData.asPng()

writeFileSync('./public/og.png', pngBuffer)
console.log(`✓  Generated public/og.png  (${W}×${H})`)
