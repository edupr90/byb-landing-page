/* Budget (planner) screen — lib/ui/views/planner_view.dart PlannerPage._buildMainPlannerScaffold.
 *
 * Layout, top to bottom (all values from the Dart source, pt):
 *   app bar       buildModernAppBar under the 62 safe area: HamburgerMenuButton leading, RevealAddButton with 16
 *                 right padding. Pinned: the SingleChildScrollView body starts under it (y 118) and clips there.
 *   hero          Padding(20, 10, 20, 4): MonthPickerButton(minHeight 44, the month 13/700/+1.6 centred in it) ·
 *                 6 · Row(FittedBox(monoAmount 44 → Bold, height 1, −1) · 14 · _comparisonBadge) · 8 ·
 *                 "of $4,080.00 planned · 58% used" 14/500 · 14 · 7pt budget-used bar
 *   stats         Padding(20, 14, 20, 4): two _BudgetStatTile 12 apart (cardDecoration radius 16, padding 14 × 12:
 *                 label 12/600 · 5 · FittedBox(monoAmount 18 → Bold, height 1.1))
 *   members       Padding(top 18) MemberSharesSection: label (20, 4, 20, 12) 12/700/+0.8 · rows (16, 0, 16, 10) of
 *                 _MemberShareDonut pairs · 10
 *   allocation    Padding(20, 22, 20, 4): Row(label 13/700/+1.4, 30pt info button) · 14 · PlanningPieChart
 *                 (width 400, outer radius 144, box 400 × 322.56) — petal_ring_painter.dart ported below
 *   by category   Padding(top 22): label (20, 0, 20, 14) · Padding(h 16) CategoryRingGrid (pairs 10 apart) · 100
 *
 * States: top · ring (scrolled to "Where it goes") · tooltip (ring + the Housing petal tapped) · top-dark-royal,
 * plus the dark reference captures (ring-dark-royal, top-dark-sunset, ring-dark-sunset).
 * params.selected = a category id: that petal pops out with its tooltip (the tooltip state sets "housing").
 * params.glyphPhase = the petal icons' device-pixel snapping phase (pt) for a fractional capture scroll;
 * params.capture = { lang: { scrollShift, glyphPhase } }, compare renders only (see CAPTURE_ES_RING).
 *
 * data-pop anchors
 *   month-header        the hero's month label + total row (SEPTEMBER 2026 · $2,370.36 · vs-last-month badge)
 *   mom-badge           the "vs last month" comparison badge (circle + label)
 *   hero-total          the big spent figure (one Text, its line box)
 *   hero-subtitle       "of $4,080.00 planned · 58% used" (sized to its text, as the Text in its start-aligned Column)
 *   budget-progress     the 7pt budget-used bar
 *   hero                the whole hero block, padding included (month → bar)
 *   income-cards        the Total Income + Left to budget tile pair (outer edges of both tiles)
 *   total-income        the Total Income tile
 *   left-to-budget      the Left to budget tile
 *   who-spending        the "Who's spending what" section, tight: label line top → last card bottom, x 16 → 424
 *                       (the cards' outer edges; no row padding, no trailing 10)
 *   who-spending-label  the WHO'S SPENDING WHAT label line (sized to its text)
 *   member-owner        the owner's (your) card
 *   member-partner      the partner's card
 *   where-it-goes       the "Where it goes" label row (label + info button, 30 tall, 20 → 420)
 *   where-it-goes-info  the round info button
 *   ring-scroll         zero-size scroll mark at the label row's top-left (the ring states scroll to it); not a pop-out.
 *                       A compare render (spec.data "capture") moves it by params.capture[lang].scrollShift
 *   ring-box            the PlanningPieChart box (400 × 322.56 at x 20)
 *   petal-ring          a square centred on the ring's centre, side = the petals' diameter (2 × 144); holds the ring
 *                       SVG (petals, halo, icons; not the tooltip), so an isolated pop-out paints the ring alone.
 *                       With a petal selected it grows (still centred, in 1/64 pt steps) to the farthest painted
 *                       point from the centre, the popped petal's halo (27.375 pt more on each side for Housing), so
 *                       a square or disc crop of it holds the popped petal and its halo whole
 *   petal-<id>          each category petal (petal-housing …): rect = the petal outline's bounds; when selected, the
 *                       union of the popped outline and its halo, which is what an isolated copy paints
 *   ring-tooltip        the tooltip card (tooltip state / params.selected only)
 *   budget-by-category  the "Budget by category" section, tight: label line top → last card row bottom, x 16 → 424
 *   budget-by-category-label  the BUDGET BY CATEGORY label line (sized to its text)
 *   category-<id>       each category ring card (category-housing, category-restaurants …)
 *   category-row-<n>    each pair of category cards (0-based row)
 */
(function () {
  "use strict";

  const A = (window.BYBApp = window.BYBApp || {});

  // ================================================================ petal ring geometry (petal_ring_painter.dart)

  const TAU = Math.PI * 2;
  const MIN_PETALS = 6; // kMinPetals
  const FULL_PETAL_SHARE = 0.5; // kFullPetalShare
  const MIN_FILL_BAND = 2.5; // kMinFillBand
  const POP_SHIFT = 0.05; // kPopShift
  const POP_GROW = 0.03; // kPopGrow
  const HALO_GROWTH = 0.11; // kHaloGrowth
  const BOX_MARGIN = 0.12; // kBoxMargin

  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const r3 = (n) => Math.round(n * 1000) / 1000;
  const r6 = (n) => Math.round(n * 1e6) / 1e6;

  // The hero total is Expanded(FittedBox(fit: scaleDown, alignment: centerLeft)) in the app (planner_view.dart:816):
  // a total wider than what the vs-last-month badge leaves is scaled down, height included, so the rows below move up.
  // kit.fitText mirrors that — for these languages only. Measured 2026-09-18 with kit.text: the ink of pt-BR
  // "R$ 7.111,08", tr-TR "TL35.555,40" and ko "₩2,133,324" ends at x 282.6 / 299.0 / 291.8 against an Expanded ending
  // at 266 and a badge starting at 280 — those three already run under the badge, where the app draws them at about
  // ×0.94 / ×0.88 / ×0.91. Their sets were exported as they are and fitting them changes their Budget and Sync images
  // (every row under the hero moves up), so that is the owner's call: add them here (or drop the list) and re-export.
  // zh-Hant's "NT$71,110.80" (×30, cents shown) is new and ships fitted.
  const HERO_FITTED_LANGS = ["zh-Hant"];

  // PetalRingGeometry.forSize
  function geometryFor(w, h) {
    const side = Math.min(w, h);
    const outer = side / 2 / (1 + BOX_MARGIN);
    return {
      cx: w / 2,
      cy: h / 2,
      outer,
      inner: outer * 0.26,
      gap: clamp(outer * 0.042, 3.5, 7.0),
      outerCorner: outer * 0.17,
      innerCorner: outer * 0.1,
    };
  }
  const heightFor = (outer) => outer * 2 * (1 + BOX_MARGIN);
  const radiansOf = (turn) => turn * TAU - Math.PI / 2;
  const directionOf = (turn) => {
    const a = radiansOf(turn);
    return [Math.cos(a), Math.sin(a)];
  };

  // uniformArcs
  function uniformArcs(keys, fills) {
    const n = keys.length;
    const sweep = 1 / n;
    const origin = -sweep / 2;
    return keys.map((key, i) => ({ key, start: origin + i * sweep, sweep, fill: fills ? clamp(fills[i], 0, 1) : 0 }));
  }

  // petalFillFor
  const petalFillFor = (share) => (Number.isFinite(share) && share > 0 ? Math.min(share / FULL_PETAL_SHARE, 1) : 0);

  const rimRadius = (g, bloom = 1, pop = 0) => (g.inner + (g.outer - g.inner) * bloom) * (1 + POP_GROW * pop);

  function popOffset(g, arc, pop) {
    if (pop === 0) return [0, 0];
    const open = clamp((1 - arc.sweep) / 0.05, 0, 1);
    if (open === 0) return [0, 0];
    const d = directionOf(arc.start + arc.sweep / 2);
    const k = g.outer * POP_SHIFT * pop * open;
    return [d[0] * k, d[1] * k];
  }

  function cornerAngle(h, c, rho, outer) {
    const dc = outer ? rho - c : rho + c;
    const y = h + c;
    if (dc <= y) return Infinity;
    return Math.asin(y / dc);
  }
  function sideX(h, c, rho, outer) {
    const dc = outer ? rho - c : rho + c;
    const y = h + c;
    return Math.sqrt(Math.max(0, dc * dc - y * y));
  }

  // fitPetal
  function fitPetal(o) {
    const s = o.sweepAngle;
    if (!(s > 0) || !(o.outerRadius > o.innerRadius) || o.innerRadius < 0) return null;
    const h0 = Math.max(0, o.insetStart);
    const h1 = Math.max(0, o.insetEnd);
    const rOut = o.outerRadius;
    if (!(cornerAngle(h0, 0, rOut, true) + cornerAngle(h1, 0, rOut, true) < s)) return null;

    let rIn = o.innerRadius;
    let ci0 = o.innerCornerStart || 0;
    let ci1 = o.innerCornerEnd || 0;
    const tip = Math.min(Math.max(o.innerCornerStart || 0, o.innerCornerEnd || 0), 1.5);
    const fitsAt = (r, c) => cornerAngle(h0, c, r, false) + cornerAngle(h1, c, r, false) < s;
    if (!fitsAt(rIn, 0)) {
      let lo = rIn;
      let hi = rOut;
      for (let i = 0; i < 32; i++) {
        const mid = (lo + hi) / 2;
        if (fitsAt(mid, tip)) hi = mid;
        else lo = mid;
      }
      rIn = hi;
      ci0 = Math.min(ci0, tip);
      ci1 = Math.min(ci1, tip);
      if (rIn >= rOut - 0.5) return null;
    }

    const radial = rOut - rIn;
    let co0 = clamp(o.outerCornerStart || 0, 0, radial * 0.5);
    let co1 = clamp(o.outerCornerEnd || 0, 0, radial * 0.5);
    ci0 = clamp(ci0, 0, radial * 0.3);
    ci1 = clamp(ci1, 0, radial * 0.3);

    for (let i = 0; i < 40; i++) {
      if (cornerAngle(h0, co0, rOut, true) + cornerAngle(h1, co1, rOut, true) <= s) break;
      co0 *= 0.85;
      co1 *= 0.85;
      if (i === 39) co0 = co1 = 0;
    }
    for (let i = 0; i < 40; i++) {
      if (cornerAngle(h0, ci0, rIn, false) + cornerAngle(h1, ci1, rIn, false) <= s) break;
      ci0 *= 0.85;
      ci1 *= 0.85;
      if (i === 39) ci0 = ci1 = 0;
    }
    for (let i = 0; i < 40; i++) {
      const ok0 = sideX(h0, ci0, rIn, false) <= sideX(h0, co0, rOut, true);
      const ok1 = sideX(h1, ci1, rIn, false) <= sideX(h1, co1, rOut, true);
      if (ok0 && ok1) break;
      if (!ok0) { co0 *= 0.85; ci0 *= 0.85; }
      if (!ok1) { co1 *= 0.85; ci1 *= 0.85; }
    }
    return { hub: rIn, h0, h1, co0, co1, ci0, ci1 };
  }

  // _corner
  function corner(ox, oy, rayAngle, side, h, c, rho, outer) {
    const dc = outer ? rho - c : rho + c;
    const y = h + c;
    const x = Math.sqrt(Math.max(0, dc * dc - y * y));
    const cosA = Math.cos(rayAngle);
    const sinA = Math.sin(rayAngle);
    const toCanvas = (lx, ly) => {
      const yy = side * ly;
      return [ox + lx * cosA - yy * sinA, oy + lx * sinA + yy * cosA];
    };
    const k = dc === 0 ? 1 : rho / dc;
    return { center: toCanvas(x, y), onLine: toCanvas(x, h), onCircle: toCanvas(x * k, y * k), radius: c, angle: Math.atan2(y, x) };
  }

  // A path as SVG `d` plus a dense polygon (for bounds and point-in-path).
  function pathBuilder() {
    const d = [];
    const pts = [];
    let cur = null;
    const f = (n) => r3(n);
    return {
      moveTo(x, y) { d.push(`M${f(x)} ${f(y)}`); pts.push([x, y]); cur = [x, y]; },
      lineTo(x, y) { d.push(`L${f(x)} ${f(y)}`); pts.push([x, y]); cur = [x, y]; },
      // Flutter arcTo(forceMoveTo: false): a line to the arc's start, then the arc
      arc(cx, cy, r, a0, sweep) {
        const sx = cx + r * Math.cos(a0);
        const sy = cy + r * Math.sin(a0);
        if (!cur || Math.abs(cur[0] - sx) > 1e-6 || Math.abs(cur[1] - sy) > 1e-6) this.lineTo(sx, sy);
        if (Math.abs(sweep) < 1e-9) return;
        const ex = cx + r * Math.cos(a0 + sweep);
        const ey = cy + r * Math.sin(a0 + sweep);
        d.push(`A${f(r)} ${f(r)} 0 ${Math.abs(sweep) > Math.PI ? 1 : 0} ${sweep > 0 ? 1 : 0} ${f(ex)} ${f(ey)}`);
        const steps = Math.max(2, Math.ceil((Math.abs(sweep) * r) / 1.5));
        for (let i = 1; i <= steps; i++) {
          const a = a0 + (sweep * i) / steps;
          pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
        }
        cur = [ex, ey];
      },
      close() { d.push("Z"); },
      circle(cx, cy, r) {
        d.push(`M${f(cx - r)} ${f(cy)}A${f(r)} ${f(r)} 0 1 1 ${f(cx + r)} ${f(cy)}A${f(r)} ${f(r)} 0 1 1 ${f(cx - r)} ${f(cy)}Z`);
      },
      result() { return { d: d.join(""), pts }; },
    };
  }

  // _fillet
  function fillet(p, k, from, to) {
    if (k.radius < 0.01) {
      p.lineTo(to[0], to[1]);
      return;
    }
    const a0 = Math.atan2(from[1] - k.center[1], from[0] - k.center[0]);
    const a1 = Math.atan2(to[1] - k.center[1], to[0] - k.center[0]);
    let sweep = a1 - a0;
    while (sweep > Math.PI) sweep -= TAU;
    while (sweep < -Math.PI) sweep += TAU;
    p.arc(k.center[0], k.center[1], k.radius, a0, sweep);
  }

  // petalPath
  function petalPath(o) {
    const p = pathBuilder();
    const s = o.sweepAngle;
    if (!(s > 0) || !(o.outerRadius > o.innerRadius) || o.innerRadius < 0) return p.result();
    const [cx, cy] = o.center;
    if (s >= TAU - 1e-4) {
      p.circle(cx, cy, o.outerRadius);
      p.circle(cx, cy, o.innerRadius);
      return Object.assign(p.result(), { evenOdd: true });
    }
    const fit = fitPetal(o);
    if (!fit) return p.result();
    const { hub, h0, h1, co0, co1, ci0, ci1 } = fit;
    const rOut = o.outerRadius;
    const rIn = hub;
    const st = o.startAngle;
    const o0 = corner(cx, cy, st, 1, h0, co0, rOut, true);
    const o1 = corner(cx, cy, st + s, -1, h1, co1, rOut, true);
    const i0 = corner(cx, cy, st, 1, h0, ci0, rIn, false);
    const i1 = corner(cx, cy, st + s, -1, h1, ci1, rIn, false);
    const outerSweep = Math.max(0, s - o0.angle - o1.angle);
    const innerSweep = Math.max(0, s - i0.angle - i1.angle);

    p.moveTo(o0.onCircle[0], o0.onCircle[1]);
    p.arc(cx, cy, rOut, st + o0.angle, outerSweep);
    fillet(p, o1, o1.onCircle, o1.onLine);
    p.lineTo(i1.onLine[0], i1.onLine[1]);
    fillet(p, i1, i1.onLine, i1.onCircle);
    p.arc(cx, cy, rIn, st + s - i1.angle, -innerSweep);
    fillet(p, i0, i0.onCircle, i0.onLine);
    p.lineTo(o0.onLine[0], o0.onLine[1]);
    fillet(p, o0, o0.onLine, o0.onCircle);
    p.close();
    return p.result();
  }

  // PetalRingGeometry.pathFor
  function pathFor(g, arc, o = {}) {
    const bloom = o.bloom == null ? 1 : o.bloom;
    const pop = o.pop || 0;
    const joinStart = o.joinStart == null ? 1 : o.joinStart;
    const joinEnd = o.joinEnd == null ? 1 : o.joinEnd;
    const gapScale = o.gapScale == null ? 1 : o.gapScale;
    const rim = rimRadius(g, bloom, pop) + g.outer * (o.rimExtra || 0);
    const off = popOffset(g, arc, pop);
    return petalPath({
      center: [g.cx + off[0], g.cy + off[1]],
      innerRadius: g.inner,
      outerRadius: rim,
      startAngle: radiansOf(arc.start),
      sweepAngle: arc.sweep * TAU,
      insetStart: (g.gap / 2) * joinStart * gapScale,
      insetEnd: (g.gap / 2) * joinEnd * gapScale,
      outerCornerStart: g.outerCorner * joinStart,
      outerCornerEnd: g.outerCorner * joinEnd,
      innerCornerStart: g.innerCorner * joinStart,
      innerCornerEnd: g.innerCorner * joinEnd,
    });
  }

  // tightBounds (from the dense outline)
  function boundsOf(pts) {
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (const [x, y] of pts) {
      if (x < x0) x0 = x;
      if (y < y0) y0 = y;
      if (x > x1) x1 = x;
      if (y > y1) y1 = y;
    }
    return Number.isFinite(x0) ? { l: x0, t: y0, r: x1, b: y1 } : { l: 0, t: 0, r: 0, b: 0 };
  }

  function contains(pts, x, y) {
    let inside = false;
    for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
      const [xi, yi] = pts[i];
      const [xj, yj] = pts[j];
      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
  }

  // _cornerCut / _cornerCutArea
  function cornerCut(c, y) {
    if (c <= 0 || y >= c) return 0;
    if (y <= 0) return c;
    const t = c - y;
    return c - Math.sqrt(c * c - t * t);
  }
  function cornerCutArea(c, y) {
    if (c <= 0 || y <= 0) return 0;
    const d = Math.min(y, c);
    const quarter = (t) => (t * Math.sqrt(Math.max(0, c * c - t * t)) + c * c * Math.asin(clamp(t / c, -1, 1))) / 2;
    return c * d - (quarter(c) - quarter(c - d));
  }

  // PetalRingGeometry._areaRadius
  function areaRadius(g, rim, fill, sweep) {
    const theta = sweep * TAU;
    const fit = theta >= TAU - 1e-4
      ? { hub: g.inner, h0: 0, h1: 0, co0: 0, co1: 0, ci0: 0, ci1: 0 }
      : fitPetal({
        innerRadius: g.inner, outerRadius: rim, sweepAngle: theta, insetStart: g.gap / 2, insetEnd: g.gap / 2,
        outerCornerStart: g.outerCorner, outerCornerEnd: g.outerCorner, innerCornerStart: g.innerCorner, innerCornerEnd: g.innerCorner,
      });
    if (!fit) return g.inner + (rim - g.inner) * fill;
    const hub = fit.hub;
    const sides = fit.h0 + fit.h1;
    const ci = fit.ci0 + fit.ci1;
    const hubCut = ci > 0 ? clamp((theta * hub - sides) / ci, 0, 1) : 1;
    const width = (r) =>
      theta * r - sides - hubCut * (cornerCut(fit.ci0, r - hub) + cornerCut(fit.ci1, r - hub)) -
      cornerCut(fit.co0, rim - r) - cornerCut(fit.co1, rim - r);
    const rimCutBelow = (c, r) => cornerCutArea(c, c) - cornerCutArea(c, rim - r);
    const area = (r) =>
      (theta / 2) * (r * r - hub * hub) - sides * (r - hub) -
      hubCut * (cornerCutArea(fit.ci0, r - hub) + cornerCutArea(fit.ci1, r - hub)) -
      rimCutBelow(fit.co0, r) - rimCutBelow(fit.co1, r);
    const target = fill * area(rim);
    let lo = hub;
    let hi = rim;
    let r = hub + (rim - hub) * Math.sqrt(fill);
    for (let i = 0; i < 24; i++) {
      const e = area(r) - target;
      if (Math.abs(e) < 1e-4) break;
      if (e > 0) hi = r;
      else lo = r;
      const w = width(r);
      const next = w > 1e-9 ? r - e / w : NaN;
      r = next > lo && next < hi ? next : (lo + hi) / 2;
    }
    return r;
  }

  // PetalRingGeometry.fillRadius
  function fillRadius(g, rim, fill, sweep, minBand = MIN_FILL_BAND) {
    if (fill <= 0) return g.inner;
    const r = fill >= 1 ? rim : areaRadius(g, rim, fill, sweep);
    return Math.min(rim, Math.max(r, g.inner + minBand));
  }

  // glyphFit
  function glyphFit(chord, size) {
    if (!Number.isFinite(chord) || size <= 0) return { scale: 1, alpha: 1 };
    const fit = clamp(chord / (size * 1.3), 0, 1);
    return { scale: Math.max(fit, 0.55), alpha: clamp((fit - 0.45) / 0.1, 0, 1) };
  }

  // ================================================================ colours (Flutter Color maths)

  const hexRgb = (hex) => {
    const n = parseInt(String(hex).replace("#", ""), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  };
  const lerpRgb = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
  const cssRgb = (c) => `rgb(${c.map((v) => Math.round(v)).join(",")})`;
  const WHITE = [255, 255, 255];
  const BLACK = [0, 0, 0];
  const lum = (c) => {
    const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
  };
  const hsvSat = (c) => {
    const mx = Math.max(...c);
    const mn = Math.min(...c);
    return mx === 0 ? 0 : (mx - mn) / mx;
  };
  // petalTint
  const petalTint = (c, dark) =>
    dark ? lerpRgb(BLACK, lerpRgb(c, WHITE, 0.15), 0.5) : lerpRgb(WHITE, c, hsvSat(c) < 0.35 ? 0.4 : 0.22);
  // iconOnTint
  const iconOnTint = (c, dark) => (dark ? WHITE : lerpRgb(c, BLACK, 0.5));
  // iconNeedsKeyline (Color.computeLuminance)
  const needsKeyline = (c) => lum(c) > 0.3;
  const RING_TRACK = { light: hexRgb("#E5E7EB"), dark: hexRgb("#2A2A34") }; // chartRingTrackLight/Dark

  // ================================================================ browser measuring (layout needs sizes CSS can't give)

  let measureHost = null;
  function measure(html, rootCls) {
    if (typeof document === "undefined" || !document.body) return null;
    if (!measureHost) {
      measureHost = document.createElement("div");
      measureHost.setAttribute("aria-hidden", "true");
    }
    measureHost.className = `byb-app ${rootCls}`;
    measureHost.style.cssText = "position:absolute;left:-50000px;top:0;width:4000px;height:auto;visibility:hidden;pointer-events:none;contain:layout style;background:none";
    if (!measureHost.isConnected) document.body.appendChild(measureHost);
    measureHost.innerHTML = html;
    const r = measureHost.firstElementChild.getBoundingClientRect();
    measureHost.innerHTML = "";
    return { w: r.width, h: r.height };
  }

  // The petal icon is a TextPainter(TextStyle(fontSize: s, height: 1.0)) with no family, i.e. the iOS system font
  // (SF Pro): its line box is s tall with SF's proportional baseline (ascent 1950 / descent 494 of 2048), and a
  // code point SF Pro has a glyph for is drawn from SF even with U+FE0F after it — the capture's ✈ is SF's
  // right-pointing plane, not the emoji. Everything else falls back to Apple Color Emoji. In Chrome the system-ui
  // family is SF Pro, so those code points go to system-ui without their U+FE0F.
  const SF_GLYPHS = new Set([0x2708]); // ✈ (the only built-in category emoji SF Pro draws itself)
  // Per face, in em of the icon size: the TextPainter's width (adv) and where the glyph's baseline lands below the
  // top of its 1.0-height box (base). Skia snaps the glyph origin to the device pixel, so both were fitted on
  // raw/en/01_budget_top.png with the origin snapped to 1/3 pt (every icon lands on the capture's pixels):
  // Apple Color Emoji 22.33 / 17.66 at 22pt (SF Pro's proportional baseline would be 17.56), SF Pro's ✈ below.
  const FACES = {
    emoji: { family: '"Apple Color Emoji"', adv: 22.33 / 22, base: 17.66 / 22 },
    sf: { family: "system-ui", adv: 22 / 22, base: 18.1 / 22 },
  };
  function glyphFace(emoji) {
    const base = String(emoji || "").replace(/\uFE0F/g, "");
    const cps = [...base];
    if (cps.length === 1 && SF_GLYPHS.has(cps[0].codePointAt(0))) return Object.assign({ text: base }, FACES.sf);
    return Object.assign({ text: emoji }, FACES.emoji);
  }

  let seq = 0;

  // Compare-only corrections for a capture taken at a different scroll position than the English one:
  // scrollShift (pt, negative = the capture scrolled less) moves the ring-scroll mark, glyphPhase replaces the
  // state's. Applied only when the spec renders the capture's own data (spec.data "capture").
  const CAPTURE_ES_RING = { "es-419": { scrollShift: -4 / 3, glyphPhase: 0.063 } };

  // ================================================================ screen

  A.screen({
    id: "budget",
    title: "Budget",
    states: {
      top: {},
      // Scrolled so "Where it goes" sits where 01_budget_ring has it. The capture's scroll offset is fractional
      // (484.21–484.33 pt: the range where every petal icon lands on its pixels); the render scrolls a whole device
      // pixel (484.333) and hands the remaining 0.063 pt to the icon snapping as glyphPhase.
      // The Spanish capture was scrolled 4 raw px (1.333 pt) less (slides/01-budget.js measures the same 4 px):
      // params.capture[lang] moves the scroll mark and the glyph phase for a compare render (spec.data "capture")
      // only, so store renders keep one scroll position in every language.
      ring: { scroll: "@ring-scroll", scrollOffset: -145.667, params: { glyphPhase: 0.063, capture: CAPTURE_ES_RING } },
      tooltip: { scroll: "@ring-scroll", scrollOffset: -145.667, params: { glyphPhase: 0.063, capture: CAPTURE_ES_RING, selected: "housing" } },
      "top-dark-royal": { mode: "dark", palette: "royal" },
      // the dark reference captures were scrolled 1.2 / 2.3 pt less far (fitted the same way)
      "ring-dark-royal": { mode: "dark", palette: "royal", scroll: "@ring-scroll", scrollOffset: -146.85, params: { glyphPhase: -0.15 } },
      "top-dark-sunset": { mode: "dark", palette: "sunset" },
      "ring-dark-sunset": { mode: "dark", palette: "sunset", scroll: "@ring-scroll", scrollOffset: -148 },
    },
    captures: {
      top: "01_budget_top",
      ring: "01_budget_ring",
      tooltip: "01_budget_ring_tooltip",
      "top-dark-royal": "06_budget_top_dark_royal",
      "ring-dark-royal": "06_budget_ring_dark_royal",
      "top-dark-sunset": "06_budget_top_dark_sunset",
      "ring-dark-sunset": "06_budget_ring_dark_sunset",
    },

    render(ctx) {
      const { t, d, fmt, kit, data, esc } = ctx;
      const dark = ctx.mode === "dark";
      const B = data.budget;
      const id = `bud${++seq}`;
      const money = (n) => fmt.money(n);
      // compare-only corrections for this language's capture (see CAPTURE_ES_RING)
      const capture = (ctx.spec.data === "capture" && ctx.params.capture && ctx.params.capture[ctx.lang]) || {};

      // ---------------------------------------------------------- app bar (pinned)
      const bar =
        `<div class="bud-bar">` +
        kit.appBar({ safe: true, leading: kit.menuButton(), actions: kit.addButton(), actionsPad: 16 }) +
        `</div>`;

      // ---------------------------------------------------------- hero (_buildHero)
      const monthDate = `${data.month}-01`;
      const monthLabel = fmt.date(monthDate, "yMMMM", { case: "upper" });
      const hasPlan = B.planned > 0;
      const heroValue = hasPlan ? B.spent : B.income;
      const subtitle = hasPlan
        ? `${t("plannerHeroOfPlanned", { planned: money(B.planned) })} · ${t("plannerHeroPctUsed", { pct: fmt.round((B.spent / B.planned) * 100) })}`
        : t("plannerHeroAddCategoriesHint");
      // _spentComparison: hasPrev needs a plan and last month's spend
      const diff = B.vsLastMonth;
      let badge = "";
      if (hasPlan && B.prevSpent > 0) {
        const same = Math.abs(diff) < 1;
        const amountStr = fmt.money(Math.abs(diff), { digits: 0 });
        const label = same
          ? t("plannerHeroSameAsLastMonth")
          : diff > 0 ? t("plannerHeroAboveLastMonth", { amount: amountStr }) : t("plannerHeroBelowLastMonth", { amount: amountStr });
        badge = `<div class="bud-badge-gap"></div>` + kit.compareBadge(label, { tone: same ? "same" : diff > 0 ? "up" : "down", pop: "mom-badge" });
      }
      const hero =
        `<div class="bud-hero" data-pop="hero">` +
        `<div class="bud-month-head" data-pop="month-header">` +
        `<div class="bud-month">${kit.sectionLabel(monthLabel, { variant: "month" })}</div>` +
        `<div class="bud-hero-row">` +
        `<div class="bud-total-box">${(HERO_FITTED_LANGS.includes(ctx.lang) ? kit.fitText : kit.text)(money(heroValue), { size: 44, weight: 700, lh: 1, ls: -1, gf: true, tnum: true, cls: "bud-total", pop: "hero-total" })}</div>` +
        badge +
        `</div></div>` +
        kit.text(subtitle, { size: 14, weight: 500, cls: "bud-subtitle", pop: "hero-subtitle" }) +
        (hasPlan
          ? kit.progressBar(B.usage, { height: 7, color: B.isOver ? "var(--red)" : "var(--green)", track: "var(--chart-track)", cls: "bud-progress", pop: "budget-progress" })
          : "") +
        `</div>`;

      // ---------------------------------------------------------- stat tiles (_buildStatsRow)
      const tile = (label, value, color, pop) =>
        kit.card(
          kit.text(label, { size: 12, weight: 600, lines: 1, color: "var(--ink-sub)" }) +
          `<div class="bud-tile-value">${kit.text(value, { size: 18, weight: 700, lh: 1.1, gf: true, tnum: true, color: color || "var(--ink)", cls: "k-nowrap" })}</div>`,
          { radius: 16, pad: "12px 14px", cls: "bud-tile", pop },
        );
      const left = B.income > 0 ? B.leftToBudget : 0;
      const stats =
        `<div class="bud-stats"><div class="bud-stats-row" data-pop="income-cards">` +
        tile(t("plannerTotalIncome"), money(B.income), null, "total-income") +
        `<div class="bud-stats-gap"></div>` +
        tile(t("plannerLeftToBudget"), money(left), left >= 0 ? "var(--green)" : "var(--red)", "left-to-budget") +
        `</div></div>`;

      // ---------------------------------------------------------- who's spending what (MemberSharesSection)
      let membersHtml = "";
      if (data.members.length > 1) {
        // viewer first (orderedForViewer), the rest as they come
        const viewer = data.signedIn;
        const ordered = [...data.members.filter((m) => m.id === viewer), ...data.members.filter((m) => m.id !== viewer)];
        const card = (m) => {
          const hasCeiling = true; // MemberDenominator.income on the Planning screen, every income counted
          const over = m.spent - m.income > 0.005; // MemberShare.isOver (kMoneyEpsilon)
          return kit.ringCard({
            kind: "member",
            value: m.usage,
            ringColor: kit.spendColor(m.spent, m.income),
            avatar: kit.avatar({ size: 52, src: m.avatar, tint: kit.memberTint(m.paletteIndex) }),
            title: d(m.name),
            amount: money(m.spent),
            amountColor: over ? "var(--red)" : null,
            lines: hasCeiling
              ? [{ text: over ? t("plannerMembersOverIncome") : t("plannerMembersOfIncome", { income: money(m.income) }), color: over ? "var(--red)" : null }]
              : [],
            pop: `member-${m.id}`,
          });
        };
        const rows = [];
        for (let i = 0; i < ordered.length; i += 2) rows.push(kit.pair(ordered.slice(i, i + 2).map(card), { cls: "bud-member-row" }));
        membersHtml =
          `<div class="bud-members-wrap"><div class="bud-members" data-pop="who-spending">` +
          // member_shares_section.dart:183 uppercases through localizedUpper, and since 2026-09-17 so do the two
          // planner section labels below (planner_view.dart:706 _sectionLabel): Turkish draws "KİM NE HARCIYOR",
          // "NEREYE GİDİYOR" and "KATEGORİYE GÖRE BÜTÇE", all three with the dotted capital İ.
          `<div class="bud-members-label">${kit.sectionLabel(fmt.upperLocalized(t("plannerMembersTitle")), { variant: "members", pop: "who-spending-label" })}</div>` +
          rows.join("") +
          `</div><div class="bud-members-after"></div></div>`;
      }

      // ---------------------------------------------------------- where it goes (PlanningPieChart)
      const ringW = 400;
      const outerR = clamp(ringW * 0.36, 100, 150);
      const ringH = heightFor(outerR);
      const g = geometryFor(ringW, ringH);
      const glyphSize = Math.round(clamp(outerR * 0.15, 14, 22));
      const selected = ctx.params.selected || null;
      const glyphPhase = capture.glyphPhase != null ? capture.glyphPhase : +ctx.params.glyphPhase || 0;
      const ring = buildRing(ctx, { g, W: ringW, H: ringH, glyphSize, glyphPhase, selected, dark, id });

      const allocation =
        `<div class="bud-alloc"><div class="bud-alloc-inner">` +
        `<div class="bud-alloc-head" data-pop="where-it-goes">` +
        `<i class="bud-scroll-mark" data-pop="ring-scroll" style="translate:0 ${capture.scrollShift || 0}px"></i>` +
        // planner_view.dart:706 _sectionLabel → localizedUpper, so this is upperLocalized, not upper
        kit.sectionLabel(fmt.upperLocalized(t("plannerAllocationTitle")), { variant: "planner", cls: "bud-alloc-label" }) +
        kit.infoButton({ pop: "where-it-goes-info" }) +
        `</div>` +
        `<div class="bud-ring" data-pop="ring-box" style="height:${r3(ringH)}px">` +
        `<div class="bud-ring-square" data-pop="petal-ring" style="left:${r6(ring.square.l)}px;top:${r6(ring.square.t)}px;width:${r6(ring.square.side)}px;height:${r6(ring.square.side)}px">${ring.svg}</div>` +
        ring.tooltip +
        `</div></div></div>`;

      // ---------------------------------------------------------- budget by category (CategoryPlanningList)
      const catCard = (c) => {
        const planned = c.plan;
        const spent = Math.max(0, c.spent);
        const leftC = planned - spent;
        const isOver = leftC < -0.005;
        const usage = planned > 0 ? clamp(spent / planned, 0, 1) : spent > 0 ? 1 : 0;
        return kit.ringCard({
          kind: "category",
          emoji: c.emoji || "📦",
          color: c.color,
          title: t(c.name),
          recurrent: !!c.recurrent,
          value: usage,
          ringColor: kit.categoryRingColor(spent, planned),
          amount: money(spent),
          amountColor: isOver ? "var(--red)" : null,
          lines: [
            { text: t("plannerCategoryCardOfPlan", { planned: money(planned) }), color: isOver ? "var(--red)" : null },
            {
              text: isOver ? t("plannerCategoryCardOver", { amount: money(-leftC) }) : t("plannerCategoryCardLeft", { amount: money(leftC < 0 ? 0 : leftC) }),
              color: isOver ? "var(--red)" : leftC > 0.005 ? "var(--green)" : null,
              emphasis: true,
            },
          ],
          pop: `category-${c.id}`,
        });
      };
      const catRows = [];
      for (let i = 0; i < data.categories.length; i += 2) {
        catRows.push(kit.pair(data.categories.slice(i, i + 2).map(catCard), { cls: "bud-cat-row", pop: `category-row-${i / 2}` }));
      }
      const byCategory =
        `<div class="bud-cats-wrap"><div class="bud-cats" data-pop="budget-by-category">` +
        // planner_view.dart:706 _sectionLabel → localizedUpper (same call site as the allocation label above)
        `<div class="bud-cats-label">${kit.sectionLabel(fmt.upperLocalized(t("plannerBudgetByCategory")), { variant: "planner", pop: "budget-by-category-label" })}</div>` +
        `<div class="bud-cat-grid">${catRows.join("")}</div>` +
        `</div></div>`;

      const body =
        `<div class="bud-viewport"><div class="app-scroll">` +
        hero + stats + membersHtml + allocation + byCategory +
        `<div class="bud-bottom"></div>` +
        `</div></div>`;

      return body + bar;
    },
  });

  // ================================================================ the ring, drawn

  function buildRing(ctx, o) {
    const { t, fmt, data, esc } = ctx;
    const { g, W, H, glyphSize, glyphPhase, selected, dark, id } = o;
    const B = data.budget;
    const cats = data.categories;
    const byId = Object.fromEntries(cats.map((c) => [c.id, c]));

    // _ringFor without an order hint: largest first (data.budget.ring.order), empty slots up to six
    const slots = B.ring.order.filter((k) => byId[k]);
    const wanted = Math.max(MIN_PETALS, slots.length);
    while (slots.length < wanted) slots.push(null);
    const keys = slots.map((k, i) => k || `__slot_${i}__`);
    const arcs = uniformArcs(keys, slots.map((k) => (k ? petalFillFor(byId[k].share) : 0)));

    const focus = selected && byId[selected] ? 1 : 0;
    const specs = arcs.map((arc, i) => {
      const cat = slots[i] ? byId[slots[i]] : null;
      const color = cat ? hexRgb(cat.color) : dark ? RING_TRACK.dark : RING_TRACK.light;
      const pop = cat && focus && cat.id === selected ? 1 : 0;
      const lit = Math.max(clamp(pop, 0, 1), 1 - focus);
      const floor = cat ? 0.42 : 0.6;
      return {
        arc,
        cat,
        color,
        track: cat ? petalTint(color, dark) : null,
        mark: iconOnTint(color, dark),
        pop,
        opacity: floor + (1 - floor) * lit,
        emoji: cat ? cat.emoji || "📦" : null,
        haloAlpha: dark ? 0.24 : 0.1,
      };
    });

    const filters = new Map();
    const defs = [];
    let clipN = 0;
    const colorFilter = (rgb, alpha, keyline) => {
      const k = `${rgb.join(",")}|${r3(alpha)}|${keyline ? keyline.join(",") : ""}`;
      if (filters.has(k)) return filters.get(k);
      const fid = `${id}-f${filters.size}`;
      const m = (c, a) => `0 0 0 0 ${r3(c[0] / 255)} 0 0 0 0 ${r3(c[1] / 255)} 0 0 0 0 ${r3(c[2] / 255)} 0 0 0 ${r3(a)} 0`;
      let body = `<feColorMatrix in="SourceGraphic" type="matrix" values="${m(rgb, alpha)}" result="g"/>`;
      if (keyline) {
        body =
          `<feMorphology in="SourceAlpha" operator="dilate" radius="1" result="dl"/>` +
          `<feColorMatrix in="dl" type="matrix" values="${m(keyline, alpha)}" result="k"/>` +
          body +
          `<feMerge><feMergeNode in="k"/><feMergeNode in="g"/></feMerge>`;
      }
      defs.push(`<filter id="${fid}" x="-50%" y="-50%" width="200%" height="200%" color-interpolation-filters="sRGB">${body}</filter>`);
      filters.set(k, fid);
      return fid;
    };
    const clip = (d) => {
      const cid = `${id}-c${clipN++}`;
      defs.push(`<clipPath id="${cid}"><path d="${d}"/></clipPath>`);
      return cid;
    };

    // _iconOf
    const iconOf = (p) => {
      if (!p.emoji) return null;
      const opacity = p.opacity;
      const rim = rimRadius(g, 1, p.pop);
      const rho = g.inner + (rim - g.inner) * 0.56;
      const sweep = p.arc.sweep * TAU;
      const chord = sweep >= Math.PI ? Infinity : 2 * rho * Math.sin(sweep / 2) - g.gap;
      const face = glyphFace(p.emoji);
      const tw = face.adv * glyphSize;
      const th = glyphSize;
      const fit = glyphFit(chord, Math.max(tw, th));
      const alpha = clamp(opacity * fit.alpha, 0, 1);
      if (alpha <= 0.01) return null;
      const dir = directionOf(p.arc.start + p.arc.sweep / 2);
      const off = popOffset(g, p.arc, p.pop);
      const at = [g.cx + dir[0] * rho + off[0], g.cy + dir[1] * rho + off[1]];
      const scale = 1 * fit.scale;
      const along = (scale * (tw * Math.abs(dir[0]) + th * Math.abs(dir[1]))) / 2;
      return { at, scale, alpha, rho, reach: along + 2, tw, th, face };
    };

    // _paintGlyph: the emoji as a one-colour silhouette (srcIn), a darker keyline under it on a bright fill
    const glyph = (p, icon, tint, keylineOn, opacity) => {
      const a = opacity == null ? icon.alpha : opacity;
      const kl = keylineOn && needsKeyline(keylineOn) ? lerpRgb(keylineOn, BLACK, 0.45) : null;
      const fid = colorFilter(tint, a, kl);
      // Skia draws the glyph on whole device pixels (3x) of the SCREEN: a scroll that is not a whole device pixel
      // moves that grid under the ring, which params.glyphPhase (pt) carries (see the ring states)
      const phase = glyphPhase;
      const snap = (v, ph = 0) => Math.round((v + ph) * 3) / 3 - ph;
      const x = snap(icon.at[0] - icon.tw / 2);
      const y = snap(icon.at[1] - icon.th / 2 + icon.face.base * icon.th, phase);
      const tr = icon.scale !== 1 ? ` transform="translate(${r3(icon.at[0])} ${r3(icon.at[1])}) scale(${r3(icon.scale)}) translate(${r3(-icon.at[0])} ${r3(-icon.at[1])})"` : "";
      return `<text class="bud-glyph" x="${r3(x)}" y="${r3(y)}" font-size="${glyphSize}" font-family='${icon.face.family}' filter="url(#${fid})"${tr}>${esc(icon.face.text)}</text>`;
    };

    const halo = [];
    const petals = [];
    const anchors = [];
    // the farthest painted outline point from the ring's centre (petal-ring's half side), and each popped petal's
    // halo bounds (its petal-<id> rect is the union with the outline)
    let reach = g.outer;
    const reachOf = (pts) => {
      for (const [x, y] of pts) reach = Math.max(reach, Math.hypot(x - g.cx, y - g.cy));
    };
    const haloBounds = new Map();
    // one <g data-pop="petal-<id>"> per category petal (placeholders are plain groups)
    const paint = (p) => {
      const shapes = [];
      paintInto(p, shapes);
      petals.push(`<g${p.cat ? ` data-pop="petal-${p.cat.id}"` : ""}>${shapes.join("")}</g>`);
    };
    const paintInto = (p, shapes) => {
      const track = pathFor(g, p.arc, { pop: p.pop });
      if (p.pop > 0.001) reachOf(track.pts);
      if (p.cat) {
        // the petal's own outline bounds (+ its halo when popped): first in the SVG, so BYBApp.layout measures this
        // and not the group (whose box would include the unclipped fill disc)
        const bb = boundsOf(track.pts);
        const hb = haloBounds.get(p);
        if (hb) {
          bb.l = Math.min(bb.l, hb.l);
          bb.t = Math.min(bb.t, hb.t);
          bb.r = Math.max(bb.r, hb.r);
          bb.b = Math.max(bb.b, hb.b);
        }
        anchors.push(`<rect data-pop="petal-${p.cat.id}" x="${r3(bb.l)}" y="${r3(bb.t)}" width="${r3(bb.r - bb.l)}" height="${r3(bb.b - bb.t)}" fill="none"/>`);
      }
      const op = r3(p.opacity);
      const icon = iconOf(p);
      if (!p.track) {
        // an empty slot: the kit's chartRingTrack token (RING_TRACK is the same colour, for the maths)
        const fill = p.cat ? `fill="${cssRgb(p.color)}"` : `style="fill:var(--ring-track-petal)"`;
        shapes.push(`<path d="${track.d}" ${fill} fill-opacity="${op}"/>`);
        if (icon) shapes.push(glyph(p, icon, WHITE, p.color));
        return;
      }
      shapes.push(`<path d="${track.d}" fill="${cssRgb(p.track)}" fill-opacity="${op}"/>`);
      let fillLine = g.inner;
      let discD = null;
      let trackClip = null;
      if (p.arc.fill > 0) {
        const off = popOffset(g, p.arc, p.pop);
        const rad = fillRadius(g, rimRadius(g, 1, p.pop), p.arc.fill, p.arc.sweep, MIN_FILL_BAND);
        fillLine = rad;
        const pb = pathBuilder();
        pb.circle(g.cx + off[0], g.cy + off[1], rad);
        discD = pb.result().d;
        trackClip = clip(track.d);
        shapes.push(`<path d="${discD}" fill="${cssRgb(p.color)}" fill-opacity="${op}" clip-path="url(#${trackClip})"/>`);
      }
      if (!icon) return;
      const markWhite = p.mark.every((v) => v === 255);
      if (!discD || fillLine <= icon.rho - icon.reach) {
        shapes.push(glyph(p, icon, p.mark, null));
        return;
      }
      if (fillLine >= icon.rho + icon.reach || (markWhite && !needsKeyline(p.color))) {
        shapes.push(glyph(p, icon, WHITE, p.color));
        return;
      }
      const grouped = icon.alpha < 0.999;
      const inner = grouped ? 1 : icon.alpha;
      const discClip = clip(discD);
      shapes.push(
        (grouped ? `<g opacity="${r3(icon.alpha)}">` : "") +
        glyph(p, icon, p.mark, null, inner) +
        `<g clip-path="url(#${trackClip})"><g clip-path="url(#${discClip})">${glyph(p, icon, WHITE, p.color, inner)}</g></g>` +
        (grouped ? `</g>` : ""),
      );
    };

    for (const p of specs) {
      if (p.pop <= 0.001) continue;
      const hp = pathFor(g, p.arc, { pop: p.pop, rimExtra: HALO_GROWTH * clamp(p.pop, 0, 1.2), gapScale: 0.4 });
      haloBounds.set(p, boundsOf(hp.pts));
      reachOf(hp.pts);
      // under every petal, as in the painter; it carries the petal's anchor too, so an isolated popped petal
      // keeps its halo
      halo.push(`<path${p.cat ? ` data-pop="petal-${p.cat.id}"` : ""} d="${hp.d}" fill="${cssRgb(p.color)}" fill-opacity="${r3(p.haloAlpha * clamp(p.pop, 0, 1) * p.opacity)}"/>`);
    }
    for (const p of specs) if (p.pop <= 0.001) paint(p);
    for (const p of specs) if (p.pop > 0.001) paint(p);

    // the petal-ring square: 2 × outer, grown in whole 1/64 pt steps (Chrome's layout unit) when a popped petal or its
    // halo reaches past the rim, so the SVG inside keeps the exact device position it has in the unselected ring
    const grow = reach - g.outer > 1e-6 ? Math.ceil((reach - g.outer) * 64 - 1e-6) / 64 : 0;
    const half = g.outer + grow;
    const square = { l: r6(g.cx - half), t: r6(g.cy - half), side: r6(half * 2) };
    // the SVG covers the chart box; it sits inside the petal-ring square (so isolating that square paints it)
    const svg =
      `<svg class="bud-ring-svg" width="${W}" height="${r3(H)}" viewBox="0 0 ${W} ${r3(H)}" aria-hidden="true" ` +
      `style="left:${-square.l}px;top:${-square.t}px">` +
      `<defs>${defs.join("")}</defs>${anchors.join("")}${halo.join("")}${petals.join("")}</svg>`;

    // ---- tooltip (_tooltip + _TooltipPlacement)
    let tooltip = "";
    const sel = focus ? specs.find((p) => p.cat && p.cat.id === selected) : null;
    if (sel) {
      const c = sel.cat;
      const share = B.ring.ofIncome
        ? t("plannerShareOfIncome", { pct: fmt.number(c.share * 100, 1) })
        : t("plannerShareOfPlan", { pct: fmt.number(c.share * 100, 1) });
      const card =
        `<div class="bud-tip" data-pop="ring-tooltip">` +
        `<div class="bud-tip-badge" style="background:${esc(c.color)}">${ctx.kit.emojiSpan(c.emoji || "📦", 14, 1)}</div>` +
        `<div class="bud-tip-col">` +
        ctx.kit.text(t(c.name), { size: 13, weight: 600, lines: 1, color: "var(--ink)", cls: "bud-tip-name" }) +
        `<div class="bud-tip-wrap">` +
        ctx.kit.text(fmt.money(c.plan), { size: 13, weight: 600, gf: true, tnum: true, color: "var(--ink)", cls: "bud-tip-amount" }) +
        ctx.kit.text(share, { size: 11.5, weight: 500, color: "var(--ink-sub)", cls: "bud-tip-share" }) +
        `</div></div></div>`;
      const settled = pathFor(g, sel.arc, { pop: 1 });
      const bb = boundsOf(settled.pts);
      const size = measure(card, `mode-${ctx.mode} pal-${ctx.palette} scr-budget`) || { w: 220, h: 60 };
      const pos = placeTooltip(settled.pts, bb, directionOf(sel.arc.start + sel.arc.sweep / 2), size.w, size.h, W, H);
      tooltip = `<div class="bud-tip-layer" style="left:${r3(pos[0])}px;top:${r3(pos[1])}px">${card}</div>`;
    }

    return { svg, tooltip, square };
  }

  // _TooltipPlacement.getPositionForChild
  function placeTooltip(pts, bounds, direction, w, h, W, H) {
    const GAP = 10;
    const OVER = 4;
    const STEP = 6;
    const allowed = { l: -OVER, t: 0, r: W + OVER, b: H };
    const bw = bounds.r - bounds.l;
    const bh = bounds.b - bounds.t;
    const bcx = bounds.l + bw / 2;
    const bcy = bounds.t + bh / 2;
    const place = (u) => {
      const reach = (bw / 2) * Math.abs(u[0]) + (bh / 2) * Math.abs(u[1]) + GAP + (w / 2) * Math.abs(u[0]) + (h / 2) * Math.abs(u[1]);
      const cx = bcx + u[0] * reach;
      const cy = bcy + u[1] * reach;
      let l = cx - w / 2;
      let tp = cy - h / 2;
      const dx = l < allowed.l ? allowed.l - l : l + w > allowed.r ? allowed.r - (l + w) : 0;
      const dy = tp < allowed.t ? allowed.t - tp : tp + h > allowed.b ? allowed.b - (tp + h) : 0;
      l += dx;
      tp += dy;
      return { l, t: tp, r: l + w, b: tp + h };
    };
    const covered = (r) => {
      const il = Math.max(r.l, bounds.l);
      const it = Math.max(r.t, bounds.t);
      const ir = Math.min(r.r, bounds.r);
      const ib = Math.min(r.b, bounds.b);
      if (ir - il <= 0 || ib - it <= 0) return 0;
      let hits = 0;
      for (let y = it + STEP / 2; y < ib; y += STEP) {
        for (let x = il + STEP / 2; x < ir; x += STEP) if (contains(pts, x, y)) hits++;
      }
      return hits;
    };
    const cands = [direction, [0, -1], [0, 1], [-1, 0], [1, 0], [-direction[0], -direction[1]]];
    let best = null;
    let bestScore = Infinity;
    cands.forEach((u, i) => {
      const r = place(u);
      const score = covered(r) + i * 0.01;
      if (score < bestScore) {
        bestScore = score;
        best = r;
      }
    });
    return [best.l, best.t];
  }
})();
