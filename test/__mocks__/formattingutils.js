// Mock minimo de powerbi-visuals-utils-formattingutils (ESM, nao transformado pelo
// Jest em node_modules). Reproduz valueFormatter.create/format o suficiente para os
// testes: respeita "%" no format, aplica unidade pela opts.value e precisao.

function fmtUnit(n, repValue, precision) {
    const rep = Math.abs(Number(repValue) || 0);
    let div = 1;
    let unit = "";
    if (rep >= 1e12) { div = 1e12; unit = "T"; }
    else if (rep >= 1e9) { div = 1e9; unit = "B"; }
    else if (rep >= 1e6) { div = 1e6; unit = "M"; }
    else if (rep >= 1e3) { div = 1e3; unit = "K"; }
    const p = precision == null ? 1 : precision;
    return (n / div).toFixed(p).replace(".", ",") + unit;
}

const valueFormatter = {
    create: (opts) => {
        const o = opts || {};
        return {
            format: (v) => {
                if (v == null || !isFinite(Number(v))) return "";
                const n = Number(v);
                const f = typeof o.format === "string" ? o.format : "";
                if (f.indexOf("%") !== -1) {
                    const p = o.precision == null ? 1 : o.precision;
                    return (n * 100).toFixed(p).replace(".", ",") + "%";
                }
                return fmtUnit(n, o.value, o.precision);
            },
        };
    },
    format: (value, format) => {
        if (value == null) return "";
        const n = Number(value);
        if (typeof format === "string" && format.indexOf("%") !== -1) {
            return (Math.round(n * 1000) / 10).toString().replace(".", ",") + "%";
        }
        return n.toString().replace(".", ",");
    },
};

module.exports = { valueFormatter };
