// watermark.ts
// Sobreposicao para features premium. Inserida DENTRO do root (nunca no parentElement).
// pointer-events:none, sem alert/confirm, sem chamada de rede. Features free continuam
// funcionando — apenas sinaliza visualmente. Funciona em temas claros e escuros: scrim
// neutro + "pilula" solida com contraste proprio (nao depende da cor do fundo do relatorio).

const WATERMARK_CLASS = "kpi-spark-watermark";

/** Remove caracteres potencialmente perigosos (defesa em profundidade; ja vem do codigo interno). */
function sanitize(input: string): string {
    return String(input).replace(/[<>&"'`]/g, "");
}

export function applyWatermark(root: HTMLElement, featureName: string): void {
    root.style.position = "relative";

    // Remove overlay anterior (evita duplicacao em updates subsequentes).
    const existing = root.querySelector(`.${WATERMARK_CLASS}`);
    if (existing) existing.remove();

    const overlay = document.createElement("div");
    overlay.className = WATERMARK_CLASS;
    overlay.style.cssText = [
        "position:absolute",
        "inset:0",
        "display:flex",
        "align-items:center",
        "justify-content:center",
        // Scrim neutro e leve: escurece um pouco em fundo claro e clareia em fundo escuro.
        "background:rgba(127,127,127,0.18)",
        "font-family:Segoe UI,sans-serif",
        "pointer-events:none",
        "z-index:10",
    ].join(";");

    // Pilula central com contraste proprio (funciona em claro e escuro).
    const pill = document.createElement("div");
    pill.style.cssText = [
        "display:flex",
        "align-items:center",
        "gap:6px",
        "background:rgba(32,32,32,0.92)",
        "color:#FFFFFF",
        "border-radius:14px",
        "padding:6px 12px",
        "max-width:90%",
        "box-shadow:0 1px 4px rgba(0,0,0,0.3)",
    ].join(";");

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "16");
    svg.setAttribute("height", "16");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("stroke", "#FFFFFF");
    svg.setAttribute("stroke-width", "1.6");
    svg.setAttribute("fill", "none");
    svg.setAttribute("aria-hidden", "true");

    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", "3");
    rect.setAttribute("y", "11");
    rect.setAttribute("width", "18");
    rect.setAttribute("height", "11");
    rect.setAttribute("rx", "2");

    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", "M7 11V7a5 5 0 0 1 10 0v4");

    svg.appendChild(rect);
    svg.appendChild(path);

    const text = document.createElement("span");
    text.textContent = `${sanitize(featureName)} — requer licenca Premium`;
    text.style.fontSize = "12px";

    pill.appendChild(svg);
    pill.appendChild(text);
    overlay.appendChild(pill);
    root.appendChild(overlay);
}
