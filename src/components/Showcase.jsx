import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import AppScreen from './AppScreen';
import AnimatedSection from './AnimatedSection';
import { useT } from '../i18n';
import Eyebrow from './Eyebrow';

/*
 * One feature, told with a real screen beside it. `flip` alternates which side
 * the phone sits on; `screens` takes one or two specs (two for Shared Budget,
 * where the point is that the same budget is on both phones).
 */

export default function Showcase({
  id,
  tKey,
  screens,
  flip = false,
  tone = 'plain',
  note,
  noteTo,
  /** Route for an "explore" button under the bullets. */
  ctaTo,
}) {
  const { t } = useT();
  const bullets = t(`showcase.${tKey}.bullets`);

  const grounds = {
    plain: 'bg-white dark:bg-surface-950',
    tinted: 'bg-surface-50 dark:bg-surface-900/40',
    brand: 'bg-brand-950 dark:bg-black',
  };
  const onBrand = tone === 'brand';

  return (
    <section id={id} className={`section-padding relative overflow-hidden ${grounds[tone]}`}>
      {onBrand && (
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute top-0 -right-40 w-[560px] h-[560px] bg-brand-500/15 rounded-full blur-[130px]" />
          <div className="absolute -bottom-40 -left-40 w-[460px] h-[460px] bg-accent-500/10 rounded-full blur-[110px]" />
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Phones */}
          <AnimatedSection
            className={`flex justify-center gap-4 sm:gap-6 ${flip ? 'lg:order-2' : 'lg:order-1'}`}
          >
            {screens.map((s, i) => (
              <div
                key={`${s.screen}-${s.state || 'default'}-${i}`}
                className={screens.length > 1 && i === 1 ? 'mt-10 sm:mt-14' : ''}
              >
                <AppScreen
                  {...s}
                  className={
                    screens.length > 1
                      ? 'w-[150px] sm:w-[200px] lg:w-[228px]'
                      : 'w-[255px] sm:w-[300px] lg:w-[330px]'
                  }
                />
              </div>
            ))}
          </AnimatedSection>

          {/* Copy */}
          <AnimatedSection className={flip ? 'lg:order-1' : 'lg:order-2'}>
            <Eyebrow tone={onBrand ? 'dark' : 'light'} className="mb-6">
              {t(`showcase.${tKey}.eyebrow`)}
            </Eyebrow>

            <h2
              className={`font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.12] ${
                onBrand ? 'text-white' : 'text-surface-900 dark:text-white'
              }`}
            >
              {t(`showcase.${tKey}.title`)}
            </h2>

            <p
              className={`mt-5 text-lg leading-relaxed ${
                onBrand ? 'text-surface-300' : 'text-surface-500 dark:text-surface-400'
              }`}
            >
              {t(`showcase.${tKey}.body`)}
            </p>

            <ul className="mt-8 space-y-3.5">
              {(Array.isArray(bullets) ? bullets : []).map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                      onBrand ? 'bg-brand-500/25' : 'bg-brand-100 dark:bg-brand-900/50'
                    }`}
                  >
                    <Check size={12} className={onBrand ? 'text-brand-200' : 'text-brand-600 dark:text-brand-400'} />
                  </span>
                  <span className={onBrand ? 'text-surface-300' : 'text-surface-600 dark:text-surface-300'}>{b}</span>
                </li>
              ))}
            </ul>

            {ctaTo && (
              <Link
                to={ctaTo}
                className={`mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:gap-3 ${
                  onBrand
                    ? 'bg-white text-brand-900 hover:bg-brand-50'
                    : 'bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-600/25'
                }`}
              >
                {t(`showcase.${tKey}.cta`)}
                <ArrowRight size={16} />
              </Link>
            )}

            {note && (
              <p
                className={`mt-8 text-sm leading-relaxed rounded-2xl p-4 border ${
                  onBrand
                    ? 'bg-white/[0.04] border-white/10 text-surface-400'
                    : 'bg-surface-50 dark:bg-surface-800/50 border-surface-200/80 dark:border-surface-700/50 text-surface-500 dark:text-surface-400'
                }`}
              >
                {t(`showcase.${tKey}.note`)}{' '}
                {noteTo && (
                  <Link
                    to={noteTo}
                    className={`font-semibold whitespace-nowrap ${
                      onBrand ? 'text-brand-300 hover:text-brand-200' : 'text-brand-600 dark:text-brand-400 hover:underline'
                    }`}
                  >
                    {t(`showcase.${tKey}.noteLink`)}
                  </Link>
                )}
              </p>
            )}
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
