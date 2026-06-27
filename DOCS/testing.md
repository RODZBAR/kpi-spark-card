# Testes — KPI Spark Card

## Como rodar

```sh
npm test                 # Jest + jsdom + jest-axe
npm run test:coverage    # com cobertura (limite global: 80% / branches 75%)
```

> ESM: `powerbi-visuals-utils-formattingmodel` e `-formattingutils` são publicados como ESM
> e não são transformados pelo Jest em `node_modules`. São substituídos por mocks via
> `moduleNameMapper` (`test/__mocks__/`).

## Cobertura por área

| Suite | Cenários cobertos |
|---|---|
| `ValueFormatter.test.ts` | null/Infinity → "—"; K/M/B/T; sinal (antes do prefixo); displayUnits; locale pt-BR; sanitização. |
| `VarianceCalculator.test.ts` | positivo/negativo/neutro; `positiveIsGood` invertido; nulos; threshold; `comparison=0` (não-neutro). |
| `SparklineBuilder.test.ts` | line/area/bar/step; NaN filtrado; `range=0` (sem NaN, área→linha); ref line fora do range; ponto final não cortado; suavização (curva C). |
| `dataViewMapper.test.ts` | sem categorical/mainValue → inválido; completo; sparkValue fallback; null/strings; secundários slots 1–4. |
| `ProgressBarRenderer` (`components.test.ts`) | target>0; target=0 ("Sem meta"); excedido; ARIA. |
| `colorUtils` (`components.test.ts`) | hex curto/longo; rgba; inválidos; `applyOpacity` 0/50/100. |
| `LicenseGuard` / `watermark` (`components.test.ts`) | DEV sempre premium; overlay dentro do root. |
| `cardParts.test.ts` | variância (modos/indicador/neutro); categoria uppercase; título; secundários (unidade por KPI, tipos mistos R$+%); rodapé override; `premiumFeatureInUse`. |
| `renderers.test.ts` | Standard/Compact/Split; categoria/variância/secundários/footer; 1 ponto (degradação). |
| `a11y.test.ts` | `jest-axe` sem violações (regra `color-contrast` desabilitada no jsdom). |

## Notas
- O `jsdom` não calcula layout nem cores reais; o contraste é garantido pelos defaults
  (`constants.ts`), não pelo teste axe.
- Validação visual final (Split, mobile, export PDF/PPT) deve ser feita no Power BI Desktop.
