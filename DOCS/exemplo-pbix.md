# Guia — `.pbix` de exemplo e screenshots (AppSource)

> Os arquivos em `marketing/screenshots/*_DRAFT.png` são **rascunhos de composição**
> (gerados fora do Power BI) só para referência de layout. Para a submissão ao AppSource,
> **substitua por capturas reais** seguindo o passo a passo abaixo.

## 1. Criar a tabela de exemplo (offline, sem fonte externa)

No Power BI Desktop → **Inserir dados** (Enter Data), cole a tabela `Vendas`:

| Mes | Receita | ReceitaAnterior | Meta | Custo | Margem | Churn |
|-----|---------|-----------------|------|-------|--------|-------|
| 2024-01 | 3800000 | 3600000 | 4450000 | 2050000 | 0.171 | 0.031 |
| 2024-02 | 4100000 | 3800000 | 4450000 | 2080000 | 0.175 | 0.030 |
| 2024-03 | 3950000 | 4100000 | 4450000 | 2100000 | 0.172 | 0.033 |
| 2024-04 | 4300000 | 3950000 | 4450000 | 2090000 | 0.178 | 0.029 |
| 2024-05 | 4500000 | 4300000 | 4450000 | 2110000 | 0.180 | 0.032 |
| 2024-06 | 4650000 | 4700000 | 4450000 | 2100000 | 0.182 | 0.034 |

> Marque `Mes` como tipo Data/Texto e os demais como número decimal.

## 2. Medidas DAX (formato importa — o visual respeita o format string)

```DAX
Receita Bruta = SUM(Vendas[Receita])            -- formato: "R$ #.##0,00" ou moeda
Mês Anterior  = SUM(Vendas[ReceitaAnterior])    -- moeda
Meta Receita  = SUM(Vendas[Meta])               -- moeda
YTD Receita   = TOTALYTD([Receita Bruta], Vendas[Mes])
Margem %      = AVERAGE(Vendas[Margem])          -- formato: "0,0%"
Churn %       = AVERAGE(Vendas[Churn])           -- formato: "0,0%"
Período (txt) = "Jan – Jun 2024"                 -- exemplo de medida de texto p/ o rodapé (fx)
```

## 3. Importar o visual

Painel de Visualizações → **⋯ (Mais)** → **Importar visual de um arquivo** →
selecione `dist/kpiSparkCard...1.1.1.0.pbiviz`.

## 4. Preencher os campos (data roles)

| Campo do visual | Medida |
|---|---|
| Valor Principal | `Receita Bruta` |
| Eixo de Tempo (Sparkline) | `Vendas[Mes]` |
| Valor da Sparkline | `Receita Bruta` |
| Valor de Comparação | `Mês Anterior` |
| Meta | `Meta Receita` |
| KPI Secundário 1 | `Mês Anterior` |
| KPI Secundário 2 | `YTD Receita` |
| KPI Secundário 3 | `Margem %` |
| KPI Secundário 4 | `Churn %` |

## 5. Conferir (cenários do cartão nativo)
- KPI 3/4 (`Margem %`, `Churn %`) devem aparecer com **%** (formato da medida respeitado).
- Em **KPIs Secundários**, ajuste **Unidade** (Auto/Mil/Milhão/…/**Trilhão**) e **Casas decimais (Auto/manual)** por KPI.
- **Rodapé**: no campo Período, use **fx → Por valor do campo → `Período (txt)`** para texto via medida.
- Teste os 3 layouts (Aparência Geral → Layout) e a opção **Idioma dos números**.

## 6. Capturar os screenshots reais (1366×768)
1. Deixe o visual ocupando boa parte da página; aplique cada layout (Standard/Compacto/Split).
2. Capture a tela e recorte/exporte em **1366×768 PNG (≤ 1024 KB)**.
3. Salve em `marketing/screenshots/` substituindo os `*_DRAFT.png`.

## 7. Salvar o `.pbix`
**Arquivo → Salvar como** → `exemplo/kpi-spark-card-exemplo.pbix`. Confirme que abre **offline**
(sem conexões externas) — requisito do AppSource.
