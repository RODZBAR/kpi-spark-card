# KPI Spark Card

A premium KPI card for Power BI: a headline metric with an integrated **sparkline**,
**variance** (MoM / YoY / vs. target) and a **progress bar**, in three layouts
(Standard, Compact, Split). Built with inline SVG/HTML (no D3 in the bundle), ready for
AppSource and eligible for Microsoft certification, with IAP monetization via the native
Licensing API. (Versão em português: [README.md](README.md).)

## Highlights
- **Native-style value formatting**: font, color (+ fx), display units (Auto / None /
  Thousands / Millions / Billions / **Trillions**), decimal places (Auto or manual) and
  text wrap. The measure format (%, currency) is always respected.
- **Labels with fx**: category, title and secondary labels accept a custom text box and
  a DAX text measure (fx); empty falls back to the field/measure name.
- **Variance** with semantic direction (`positiveIsGood`), neutral threshold and a
  configurable indicator (triangle ▲▼ / arrow ↑↓ / none with +/− sign — never color only).
- **Sparkline**: line / area / bar / step, optional smoothing, reference (target) and mean lines.
- **Up to 4 secondary KPIs** (shared font/color; per-KPI units/decimals/label — mixes R$ and %).
- **Internationalization**: number language Auto (report locale) / pt-BR / en-US.
- **Accessibility**: `role="group"` + dynamic `aria-label`, progress bar `role="progressbar"`,
  secondary chips with `aria-label`, sparkline `aria-hidden`; default contrast ≥ 4.5:1.

## Data roles
| Field | Type | Required |
|---|---|:--:|
| Main Value | Measure | **Yes** |
| Time Axis (Sparkline) | Grouping/Measure | No |
| Sparkline Value | Measure | No |
| Comparison Value | Measure | No |
| Target | Measure | No |
| Category | Grouping | No |
| Secondary KPI 1–4 | Measure | No (premium) |

## Free vs. Premium
| Feature | Free | Premium |
|---|:--:|:--:|
| Standard / Compact layouts | ✅ | ✅ |
| Split layout | ⚠️ watermark | ✅ |
| Line / Area sparkline | ✅ | ✅ |
| Bar / Step sparkline | ⚠️ watermark | ✅ |
| Variance + progress bar | ✅ | ✅ |
| Secondary KPIs | ⚠️ watermark | ✅ |
| Reference / mean line | ⚠️ watermark | ✅ |

Without a license, free features keep working (Microsoft requirement). Premium features are
only visually flagged with a watermark.

## Privacy
No data is collected, stored or transmitted. No external network calls. See [PRIVACY.md](PRIVACY.md).

## Build & test
```sh
npm install
npm run package   # dist/*.pbiviz
npm test          # Jest + jsdom + jest-axe
```

## License
[MIT](LICENSE).
