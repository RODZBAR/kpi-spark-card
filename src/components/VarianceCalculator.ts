// VarianceCalculator.ts — calculo de variancia com direcao semantica

export interface VarianceResult {
    absolute: number | null;
    percentage: number | null;
    direction: "positive" | "negative" | "neutral";
    isGood: boolean;
}

export class VarianceCalculator {
    /**
     * @param current         Valor atual
     * @param comparison      Valor de comparacao (anterior, meta, etc.)
     * @param positiveIsGood  true = aumento favoravel; false = reducao favoravel
     * @param neutralThreshold Percentual (0-100) abaixo do qual e considerado neutro
     */
    public static calculate(
        current: number | null | undefined,
        comparison: number | null | undefined,
        positiveIsGood = true,
        neutralThreshold = 0.5
    ): VarianceResult {
        if (
            current == null || comparison == null ||
            !isFinite(current) || !isFinite(comparison)
        ) {
            return { absolute: null, percentage: null, direction: "neutral", isGood: false };
        }

        const absolute = current - comparison;

        // comparison = 0: nao ha percentual definido, mas a variacao NAO e neutra
        // (ex.: 50 vs 0 e um aumento). Direcao vem do sinal do absoluto.
        if (comparison === 0) {
            const direction: VarianceResult["direction"] =
                absolute > 0 ? "positive" : absolute < 0 ? "negative" : "neutral";
            const isGood =
                direction === "neutral"
                    ? true
                    : positiveIsGood
                    ? direction === "positive"
                    : direction === "negative";
            return { absolute, percentage: null, direction, isGood };
        }

        const percentage = (absolute / Math.abs(comparison)) * 100;
        const absPct = Math.abs(percentage);

        let direction: VarianceResult["direction"];
        if (absPct <= neutralThreshold) {
            direction = "neutral";
        } else {
            direction = absolute > 0 ? "positive" : "negative";
        }

        const isGood =
            direction === "neutral"
                ? true
                : positiveIsGood
                ? direction === "positive"
                : direction === "negative";

        return { absolute, percentage, direction, isGood };
    }
}
