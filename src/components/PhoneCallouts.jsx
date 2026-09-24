import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import AppScreen from './AppScreen';

/*
 * ============================================================
 *  PHONE WITH POP-OUT CALLOUTS
 *
 *  Same idea as the pop-outs in the App Store screenshots
 *  (store_screenshots/slides): point at a real element inside a
 *  real screen, by the [data-pop] name the screen already gives
 *  it — so a callout can never drift away from the thing it
 *  describes.
 *
 *  The frame reports each element's box as a FRACTION of the
 *  440 x 956 phone, so everything here is percentages and the
 *  whole thing survives any resize with no re-measuring.
 *
 *  Below `lg` the gutters disappear, so the callouts render as a
 *  plain list under the phone instead of overlapping it.
 * ============================================================
 */

export default function PhoneCallouts({
  screen,
  state,
  mode = 'light',
  palette = 'royal',
  pops = [],
  eager = false,
  phoneClass = 'w-[240px] sm:w-[280px]',
  className = '',
}) {
  const [rects, setRects] = useState(null);
  const names = pops.map((p) => p.el);

  // Identity-stable so AppScreen's effect does not re-subscribe every render.
  const onRects = useCallback((r) => setRects(r), []);

  const left = pops.filter((p) => p.side === 'left');
  const right = pops.filter((p) => p.side !== 'left');

  return (
    <div className={`relative ${className}`}>
      {/* Desktop: gutters for the cards, phone in the middle */}
      <div className="hidden lg:grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-6 xl:gap-8 items-center">
        <Gutter pops={left} rects={rects} align="right" />

        <div className={`relative ${phoneClass}`}>
          <AppScreen
            screen={screen}
            state={state}
            mode={mode}
            palette={palette}
            eager={eager}
            pops={names}
            onRects={onRects}
          />
          {/* Rings sit over the phone, in the phone's own coordinate space. */}
          {rects &&
            pops.map((p, i) => {
              const r = rects[p.el];
              if (!r) return null;
              return (
                <motion.span
                  key={p.el}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.45, delay: 0.25 + i * 0.12, ease: 'easeOut' }}
                  aria-hidden="true"
                  className="absolute rounded-xl ring-2 ring-brand-500 bg-brand-500/[0.07] shadow-[0_0_0_4px_rgba(47,91,189,0.14)] pointer-events-none"
                  style={{
                    left: `${r.x * 100}%`,
                    top: `${r.y * 100}%`,
                    width: `${r.w * 100}%`,
                    height: `${r.h * 100}%`,
                  }}
                />
              );
            })}
        </div>

        <Gutter pops={right} rects={rects} align="left" />
      </div>

      {/* Below lg: phone, then the same points as a list */}
      <div className="lg:hidden flex flex-col items-center gap-8">
        <div className={phoneClass}>
          <AppScreen screen={screen} state={state} mode={mode} palette={palette} eager={eager} />
        </div>
        <ul className="w-full max-w-sm space-y-3">
          {pops.map((p) => (
            <li
              key={p.el}
              className="rounded-2xl border border-surface-200 dark:border-surface-700/60 bg-white dark:bg-surface-900 p-4"
            >
              <p className="font-display font-semibold text-sm text-surface-900 dark:text-white">{p.title}</p>
              <p className="mt-1 text-sm text-surface-500 dark:text-surface-400 leading-relaxed">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* Minimum vertical gap between two cards, as a fraction of the phone's height.
   A card is roughly 90px tall against a ~670px phone, so 0.17 keeps them clear. */
const MIN_GAP = 0.17;

/* Anchor each card to its element, then push overlapping ones apart — two pops a
   few points apart on the phone would otherwise stack their cards on top of each
   other. Order is preserved, so a card never crosses its neighbour's connector. */
function layout(pops, rects) {
  const items = pops.map((p, i) => ({
    pop: p,
    anchor: rects && rects[p.el] ? rects[p.el].y + rects[p.el].h / 2 : (i + 1) / (pops.length + 1),
  }));
  items.sort((a, b) => a.anchor - b.anchor);

  const tops = items.map((it) => it.anchor);
  for (let i = 1; i < tops.length; i += 1) {
    if (tops[i] - tops[i - 1] < MIN_GAP) tops[i] = tops[i - 1] + MIN_GAP;
  }
  // If the push ran past the bottom, walk the whole stack back up.
  const overflow = tops.length ? tops[tops.length - 1] - (1 - MIN_GAP / 2) : 0;
  if (overflow > 0) {
    for (let i = tops.length - 1; i >= 0; i -= 1) {
      tops[i] -= overflow;
      if (i > 0 && tops[i] - tops[i - 1] >= MIN_GAP) break;
    }
  }
  return items.map((it, i) => ({ ...it, top: Math.max(MIN_GAP / 2, tops[i]) }));
}

/* One side's stack of cards, each pulled to its element's height. */
function Gutter({ pops, rects, align }) {
  if (!pops.length) return <div aria-hidden="true" />;
  const placed = layout(pops, rects);

  return (
    <div className="relative h-full min-h-[1px]">
      {placed.map(({ pop: p, top: topFrac }, i) => {
        const top = topFrac * 100;
        return (
          <motion.div
            key={p.el}
            initial={{ opacity: 0, x: align === 'left' ? 24 : -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.12, ease: 'easeOut' }}
            className={`absolute w-full ${align === 'left' ? 'text-left' : 'text-right'}`}
            style={{ top: `${top}%`, transform: 'translateY(-50%)' }}
          >
            <div
              className={`relative inline-block max-w-[15rem] rounded-2xl border border-surface-200 dark:border-surface-700/60 bg-white dark:bg-surface-900 shadow-xl shadow-black/[0.07] dark:shadow-black/40 px-4 py-3 ${
                align === 'left' ? 'text-left' : 'text-left'
              }`}
            >
              <p className="font-display font-semibold text-[13px] leading-snug text-surface-900 dark:text-white">
                {p.title}
              </p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-surface-500 dark:text-surface-400">{p.body}</p>

              {/* Connector: a hairline out to the phone, ending in a dot. */}
              <span
                aria-hidden="true"
                className={`absolute top-1/2 h-px w-6 xl:w-8 bg-brand-400/60 ${
                  align === 'left' ? 'right-full mr-0' : 'left-full ml-0'
                }`}
              />
              <span
                aria-hidden="true"
                className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-500 ring-4 ring-brand-500/20 ${
                  align === 'left' ? 'right-full mr-5 xl:mr-7' : 'left-full ml-5 xl:ml-7'
                }`}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
