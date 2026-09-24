import { useEffect, useRef, useState } from 'react';
import { useT } from '../i18n';

/*
 * ============================================================
 *  LIVE APP SCREEN
 *
 *  Renders a real Budget Your Budget screen inside a phone frame,
 *  driven by the same engine that produces the App Store
 *  screenshots (public/appscreens — copied from
 *  byb_project/store_screenshots/app).
 *
 *  It is an <iframe> deliberately: the engine's CSS redefines the
 *  `Inter` @font-face against local .ttf files, which would fight
 *  the site's Google-Fonts Inter in the main document.
 *
 *  The iframe only gets a src once it is near the viewport, so a
 *  page with eight phones still loads like a page with none.
 * ============================================================
 */

const PHONE_W = 440;
const PHONE_H = 956;

export default function AppScreen({
  screen,
  state,
  mode = 'light',
  palette = 'royal',
  className = '',
  /** Render sooner — for phones above the fold. */
  eager = false,
  label,
  /** [data-pop] names to measure, for <PhoneCallouts>. */
  pops,
  /** Called with { name: {x,y,w,h} } as fractions of the phone. */
  onRects,
}) {
  const holderRef = useRef(null);
  const [show, setShow] = useState(eager);
  const [ready, setReady] = useState(false);
  const frameRef = useRef(null);
  const { screenLang } = useT();
  const popKey = (pops || []).join(',');

  useEffect(() => {
    if (show) return undefined;
    const el = holderRef.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      setShow(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: '600px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [show]);


  useEffect(() => {
    if (!popKey || !onRects) return undefined;
    const onMessage = (e) => {
      if (!frameRef.current || e.source !== frameRef.current.contentWindow) return;
      if (e.data && e.data.type === 'byb-screen-ready' && e.data.rects) onRects(e.data.rects);
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [popKey, onRects]);

  const params = new URLSearchParams({ screen, mode, palette, lang: screenLang });
  if (state) params.set('state', state);
  if (popKey) params.set('pops', popKey);
  const src = `/appscreens/frame.html?${params.toString()}`;

  // The screen area must carry the phone's exact ratio, not the bezel's outer box:
  // the bezel's padding would otherwise shrink the box off-ratio and the engine
  // would letterbox the phone inside it, showing the ground behind as bars.
  // Ground colour follows the SCREEN's mode, not the site theme, so a sub-pixel
  // remainder is invisible either way (the app's dark page is OLED black).
  const ground = mode === 'dark' ? '#000000' : '#FFFFFF';

  return (
    <div ref={holderRef} className={`relative select-none ${className}`}>
      {/* Bezel */}
      <div className="rounded-[2.2rem] sm:rounded-[2.6rem] bg-surface-900 dark:bg-black p-[3px] sm:p-[4px] shadow-2xl shadow-black/30 dark:shadow-black/60 ring-1 ring-surface-800/60 dark:ring-white/10">
        <div
          className="relative w-full rounded-[1.95rem] sm:rounded-[2.35rem] overflow-hidden"
          style={{ aspectRatio: `${PHONE_W} / ${PHONE_H}`, background: ground }}
        >
          {/* Placeholder until the engine has painted */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{ background: ground, opacity: ready ? 0 : 1 }}
            aria-hidden="true"
          />
          {show && (
            <iframe
              ref={frameRef}
              src={src}
              title={label || `Budget Your Budget — ${screen}`}
              loading={eager ? 'eager' : 'lazy'}
              scrolling="no"
              tabIndex={-1}
              onLoad={() => {
                setReady(true);
                // The frame may have posted its rects before this listener existed.
                if (popKey && frameRef.current) {
                  frameRef.current.contentWindow.postMessage({ type: 'byb-screen-remeasure' }, '*');
                }
              }}
              className={`absolute inset-0 w-full h-full border-0 transition-opacity duration-500 ${
                ready ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}
          {/* Screens are decorative here; the real app is on the stores. */}
          <div className="absolute inset-0" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
