# Arquitetura — KPI Spark Card

## Fluxo geral

```
DataView (host)
   → DataViewMapper.map()      → MappedKPIData (tipado)
   → settings (FormattingSettingsService.populateFormattingSettingsModel)
   → Renderer (Standard | Compact | Split)
        → cardParts.* (constroi cada peca)
        → components (Sparkline, ProgressBar, Variance, ValueFormatter)
   → DOM dentro de options.element
```

## Responsabilidades por módulo

| Módulo | Responsabilidade |
|---|---|
| `visual.ts` | Ciclo de vida (`constructor`/`update`/`getFormattingModel`/`destroy`), rendering events, seleção de layout, watermark, visibilidade condicional do painel, acessibilidade do root. |
| `settings.ts` | `VisualFormattingSettingsModel` (10 cards). FontControl, fx em cores e textos, fontes em pt. |
| `utils/dataViewMapper.ts` | Extrai e valida o `DataView` categorical → `MappedKPIData`. |
| `utils/domUtils.ts` | Criação segura de elementos (whitelists HTML/SVG; `style` só via objeto tipado). |
| `utils/colorUtils.ts` | Validação de cor (`safeColor`) e transparência (`applyOpacity`). |
| `components/ValueFormatter.ts` | Formatação K/M/B/T (Intl pt-BR) + sanitização de texto. |
| `components/VarianceCalculator.ts` | Variância (direção semântica, `comparison=0`, threshold neutro). |
| `components/SparklineBuilder.ts` | Sparkline SVG inline (line/area/bar/step, suavização, ref/mean line, ponto final). |
| `components/ProgressBarRenderer.ts` | Barra de progresso vs. meta (ARIA `progressbar`). |
| `components/LicenseGuard.ts` | Licença IAP (Licensing API nativa; `MONETIZATION_ENABLED`). |
| `components/watermark.ts` | Overlay de feature premium (dentro do root). |
| `renderers/cardParts.ts` | Construtores das peças + motor de formatação nativo (`formatValueNative`). |
| `renderers/*Renderer.ts` | Arranjo de cada layout. |

## Decisões de semântica

- **`mainValue` = último valor finito** da medida no contexto de filtro. Medidas tipo
  "acumulado/último mês" devem refletir o total na própria DAX.
- **Formatação de valor (estilo cartão nativo):** `formatValueNative` usa o
  `valueFormatter` oficial, respeitando o **format string da medida** (%, moeda) e aplicando
  **unidade** (Auto/Nenhum/Mil/Milhão/Bilhão/Trilhão) e **casas decimais** (Auto ou manual).
- **Rótulos (categoria/título/secundários):** texto override com **fx** (medida de texto DAX);
  vazio → assume o nome do campo/medida. Fonte, cor (fx), alinhamento e quebra de texto.
- **`comparison = 0`** não é neutro: a direção vem do sinal do absoluto.
- **fx de cor** é resolvido a nível de cartão pelo `FormattingSettingsService` (não há
  coloração por ponto neste cartão).

## Segurança / Acessibilidade
- Sem `innerHTML`/`eval`/rede. Texto sempre via `textContent` + `sanitizeText`.
- Root `role="group"` + `aria-label`; progress bar `role="progressbar"`; sparkline `aria-hidden`.
- Contraste dos defaults ≥ 4.5:1. Sinais (▲/▼/±) além de cor.
