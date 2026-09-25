/*
 * ============================================================
 *  EYEBROW
 *
 *  Section kicker. Deliberately NOT a pill: the rounded chip with
 *  a translucent fill, a hairline border and a pulsing dot is the
 *  single most over-used hero device on the web, and it made every
 *  section here look like the same template.
 *
 *  Instead: the app's own petal ring, shrunk to a mark, next to
 *  letterspaced caps. The ring is the thing BYB actually looks
 *  like — the bloom of category petals on the Planning screen —
 *  so the kicker is borrowed from the product rather than from a
 *  component library.
 * ============================================================
 */

import { useT } from '../i18n';

/* Five teardrops around a centre, the shape the Planning ring draws.
   Colours are the brand blues with two amber petals for warmth; all
   mid-tones, so the mark holds on a white page and on the dark hero. */
const PETALS = ['#2f5bbd', '#5c86e0', '#f59e0b', '#3e6bcd', '#fcd34d'];

function PetalMark({ className = '' }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`w-[18px] h-[18px] shrink-0 ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      {PETALS.map((fill, i) => (
        <path
          key={fill + i}
          d="M10 10.4C7.5 7.9 7.3 4 10 1.4C12.7 4 12.5 7.9 10 10.4Z"
          fill={fill}
          transform={`rotate(${i * 72} 10 10)`}
        />
      ))}
    </svg>
  );
}

export default function Eyebrow({ children, tone = 'light', mark = true, className = '' }) {
  const { isCjk } = useT();
  const text =
    tone === 'dark'
      ? 'text-white/75' // on the hero / brand grounds
      : 'text-brand-700 dark:text-brand-300';

  /* Kana and kanji have no case, so `uppercase` does nothing for them — but it
     does reach the Latin a Japanese kicker embeds, turning "iOSとAndroid" into
     "IOSとANDROID". Wide tracking is also a Latin small-caps device; CJK is
     already airy at this size, so it gets half of it. */
  const type = isCjk
    ? 'text-[11px] sm:text-xs font-bold tracking-[0.08em]'
    : 'text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em]';

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {mark && <PetalMark />}
      <span className={`font-display ${type} ${text}`}>{children}</span>
    </span>
  );
}

export { PetalMark };
