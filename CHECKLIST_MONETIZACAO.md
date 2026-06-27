# Checklist de Monetização — KPI Spark Card

> Status: `[x]` implementado · `[ ]` pendente (depende de ativar a monetização no Partner Center).

## 1. Configuração de Monetização
- [ ] `MONETIZATION_ENABLED = true` na build de produção (hoje `false` em DEV).
- [ ] `PREMIUM_SERVICE_PLAN` corresponde ao plano configurado no portal.
- [x] `SERVICE_PLAN_STATE_ACTIVE` alinhado ao enum oficial (`ServicePlanState.Active = 1`).

## 2. Fluxo de Licença
- [x] `LicenseGuard.refreshLicense()` é chamado no `update()`.
- [x] `cachedStatus` inicializado como `null` e populado pela API.
- [x] `isPremium()` nunca bloqueia features em DEV (`MONETIZATION_ENABLED=false` → `true`).
- [x] Ambientes sem suporte (`isLicenseUnsupportedEnv`) não bloqueiam features.

## 3. Watermark
- [x] `applyWatermark(root, featureName)` chamado apenas quando `isPremium() === false`.
- [x] Overlay inserido dentro de `root`, nunca no parent.
- [x] `pointer-events:none` (usuário continua interagindo com o visual).
- [x] Texto claro: "Feature X — requer licença Premium".
- [x] `root` é limpo (`clearElement`) a cada `update()` → sem duplicação de overlay.

## 4. Features Premium
- [x] `premiumFeatureInUse(ctx)` detecta: Layout Split, Sparkline Bar/Step, KPIs Secundários, Linha de referência, Linha de média.
- [x] Features free continuam funcionando sem licença (apenas sinalização visual).

## 5. Comunicação
- [x] README explica Premium vs Free.
- [ ] README explica como adquirir a licença Premium (após registrar a oferta).
- [x] Sem mensagens invasivas (sem `alert`/`confirm`).
- [x] Nenhuma chamada de rede externa para validar licença (apenas host).

## 6. Testes
- [x] DEV (`MONETIZATION_ENABLED=false`) → sempre premium, sem watermark (`test/components.test.ts`).
- [ ] Produção: licença ativa → sem watermark (validar no Service após registrar oferta).
- [ ] Produção: licença inativa → watermark visível.
- [x] Ambiente sem suporte / erro na API → fallback seguro (coberto no `LicenseGuard`).
