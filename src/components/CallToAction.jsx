import AnimatedSection from './AnimatedSection';
import { useT } from '../i18n';
import { APP_STORE_URL, PLAY_STORE_URL } from '../constants';

export default function CallToAction() {
  const { t } = useT();

  return (
    <section className="relative overflow-hidden bg-hero dark:bg-hero-dark">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 left-1/3 w-[520px] h-[520px] bg-brand-400/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 right-1/4 w-[420px] h-[420px] bg-accent-400/10 rounded-full blur-[110px]" />
      </div>

      <AnimatedSection className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.12]">
          {t('cta.title')}
        </h2>
        <p className="mt-5 text-lg text-white/65 max-w-xl mx-auto">{t('cta.subtitle')}</p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block hover:scale-[1.03] active:scale-[0.97] transition-transform duration-200"
          >
            <img src="/screenshots/appstore.png" alt={t('common.appStore')} className="h-[52px] sm:h-14 w-auto mx-auto" />
          </a>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block hover:scale-[1.03] active:scale-[0.97] transition-transform duration-200"
          >
            <img src="/screenshots/playstore.png" alt={t('common.googlePlay')} className="h-[52px] sm:h-14 w-auto mx-auto" />
          </a>
        </div>
      </AnimatedSection>
    </section>
  );
}
