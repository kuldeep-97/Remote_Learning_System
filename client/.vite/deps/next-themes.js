"use client";
import {
  require_react
} from "./chunk-TXWKGKUG.js";
import {
  __toESM
} from "./chunk-DC5AMYBS.js";

// node_modules/next-themes/dist/index.mjs
var t = __toESM(require_react(), 1);
var M = (e, i, s, u, m, a, l, h) => {
  let d = document.documentElement, w = ["light", "dark"];
  function p(n) {
    (Array.isArray(e) ? e : [e]).forEach((y) => {
      let k = y === "class", S = k && a ? m.map((f) => a[f] || f) : m;
      k ? (d.classList.remove(...S), d.classList.add(a && a[n] ? a[n] : n)) : d.setAttribute(y, n);
    }), R(n);
  }
  function R(n) {
    h && w.includes(n) && (d.style.colorScheme = n);
  }
  function c() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  if (u) p(u);
  else try {
    let n = localStorage.getItem(i) || s, y = l && n === "system" ? c() : n;
    p(y);
  } catch (n) {
  }
};
var b = ["light", "dark"];
var I = "(prefers-color-scheme: dark)";
var O = typeof window == "undefined";
var x = t.createContext(void 0);
var U = { setTheme: (e) => {
}, themes: [] };
var z = () => {
  var e;
  return (e = t.useContext(x)) != null ? e : U;
};
var J = (e) => t.useContext(x) ? t.createElement(t.Fragment, null, e.children) : t.createElement(V, { ...e });
var N = ["light", "dark"];
var V = ({ forcedTheme: e, disableTransitionOnChange: i = false, enableSystem: s = true, enableColorScheme: u = true, storageKey: m = "theme", themes: a = N, defaultTheme: l = s ? "system" : "light", attribute: h = "data-theme", value: d, children: w, nonce: p, scriptProps: R }) => {
  let [c, n] = t.useState(() => H(m, l)), [T, y] = t.useState(() => c === "system" ? E() : c), k = d ? Object.values(d) : a, S = t.useCallback((o) => {
    let r = o;
    if (!r) return;
    o === "system" && s && (r = E());
    let v = d ? d[r] : r, C = i ? W(p) : null, P = document.documentElement, L = (g) => {
      g === "class" ? (P.classList.remove(...k), v && P.classList.add(v)) : g.startsWith("data-") && (v ? P.setAttribute(g, v) : P.removeAttribute(g));
    };
    if (Array.isArray(h) ? h.forEach(L) : L(h), u) {
      let g = b.includes(l) ? l : null, D = b.includes(r) ? r : g;
      P.style.colorScheme = D;
    }
    C == null || C();
  }, [p]), f = t.useCallback((o) => {
    let r = typeof o == "function" ? o(c) : o;
    n(r);
    try {
      localStorage.setItem(m, r);
    } catch (v) {
    }
  }, [c]), A = t.useCallback((o) => {
    let r = E(o);
    y(r), c === "system" && s && !e && S("system");
  }, [c, e]);
  t.useEffect(() => {
    let o = window.matchMedia(I);
    return o.addListener(A), A(o), () => o.removeListener(A);
  }, [A]), t.useEffect(() => {
    let o = (r) => {
      r.key === m && (r.newValue ? n(r.newValue) : f(l));
    };
    return window.addEventListener("storage", o), () => window.removeEventListener("storage", o);
  }, [f]), t.useEffect(() => {
    S(e != null ? e : c);
  }, [e, c]);
  let Q = t.useMemo(() => ({ theme: c, setTheme: f, forcedTheme: e, resolvedTheme: c === "system" ? T : c, themes: s ? [...a, "system"] : a, systemTheme: s ? T : void 0 }), [c, f, e, T, s, a]);
  return t.createElement(x.Provider, { value: Q }, t.createElement(_, { forcedTheme: e, storageKey: m, attribute: h, enableSystem: s, enableColorScheme: u, defaultTheme: l, value: d, themes: a, nonce: p, scriptProps: R }), w);
};
var _ = t.memo(({ forcedTheme: e, storageKey: i, attribute: s, enableSystem: u, enableColorScheme: m, defaultTheme: a, value: l, themes: h, nonce: d, scriptProps: w }) => {
  let p = JSON.stringify([s, i, a, e, h, l, u, m]).slice(1, -1);
  return t.createElement("script", { ...w, suppressHydrationWarning: true, nonce: typeof window == "undefined" ? d : "", dangerouslySetInnerHTML: { __html: `(${M.toString()})(${p})` } });
});
var H = (e, i) => {
  if (O) return;
  let s;
  try {
    s = localStorage.getItem(e) || void 0;
  } catch (u) {
  }
  return s || i;
};
var W = (e) => {
  let i = document.createElement("style");
  return e && i.setAttribute("nonce", e), i.appendChild(document.createTextNode("*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")), document.head.appendChild(i), () => {
    window.getComputedStyle(document.body), setTimeout(() => {
      document.head.removeChild(i);
    }, 1);
  };
};
var E = (e) => (e || (e = window.matchMedia(I)), e.matches ? "dark" : "light");
export {
  J as ThemeProvider,
  z as useTheme
};
//# sourceMappingURL=next-themes.js.map
