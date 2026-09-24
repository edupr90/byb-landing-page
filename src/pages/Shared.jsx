import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Lock, Users, ArrowRight, Info } from 'lucide-react';
import AppScreen from '../components/AppScreen';
import PhoneCallouts from '../components/PhoneCallouts';
import AnimatedSection, { StaggerContainer, StaggerItem } from '../components/AnimatedSection';
import { useT } from '../i18n';
import { APP_STORE_URL, PLAY_STORE_URL } from '../constants';
import Eyebrow from '../components/Eyebrow';

/*
 * /shared — the Shared Budget feature in full.
 *
 * The callouts point at real [data-pop] elements inside real screens
 * (see PhoneCallouts), so they cannot drift from what the app does.
 * Everything claimed here is also in /terms section 6.
 */

export default function Shared() {
  const { t } = useT();

  useEffect(() => {
    const prev = document.title;
    document.title = t('sharedPage.metaTitle');
    return () => {
      document.title = prev;
    };
  }, [t]);

  const steps = t('sharedPage.steps');
  const sharedItems = t('sharedPage.sharedItems');
  const privateItems = t('sharedPage.privateItems');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-hero dark:bg-hero-dark pt-28 sm:pt-36 pb-20 sm:pb-28">
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-40 -right-32 w-[620px] h-[620px] bg-brand-400/20 rounded-full blur-[130px]" />
          <div className="absolute -bottom-52 -left-32 w-[520px] h-[520px] bg-accent-400/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Eyebrow tone="dark" className="mb-7">{t('sharedPage.eyebrow')}</Eyebrow>
          <h1 className="font-display text-[2.5rem] sm:text-6xl font-extrabold text-white leading-[1.06] tracking-tight">
            {t('sharedPage.title')}
          </h1>
          <p className="mt-7 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-light">
            {t('sharedPage.subtitle')}
          </p>
        </div>
      </section>

      {/* ── The category, with callouts ──────────────────── */}
      <section className="section-padding bg-white dark:bg-surface-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white tracking-tight">
              {t('sharedPage.seeTitle')}
            </h2>
            <p className="mt-5 text-lg text-surface-500 dark:text-surface-400 leading-relaxed">
              {t('sharedPage.seeSubtitle')}
            </p>
          </AnimatedSection>

          <PhoneCallouts
            screen="category-detail"
            state="housing"
            eager
            phoneClass="w-[250px] sm:w-[290px] xl:w-[310px]"
            pops={[
              {
                el: 'member-owner',
                side: 'left',
                title: 'Your share, at a glance',
                body: 'What you agreed to cover in this category, and what you have actually spent against it.',
              },
              {
                el: 'member-partner',
                side: 'right',
                title: "And your partner's",
                body: 'The same card for them. Nobody has to ask how the other one is doing.',
              },
              {
                el: 'split-button',
                side: 'left',
                title: 'Split it however you like',
                body: 'Change who covers what at any time. It is your agreement — the app just keeps score.',
              },
              {
                el: 'expense-rent-partner',
                side: 'right',
                title: 'Who logged it',
                body: 'Every expense carries the name and photo of whoever added it, on both phones.',
              },
            ]}
          />

          <p className="mt-14 text-center text-sm text-surface-400 dark:text-surface-500">
            {t('sharedPage.heroCaption')}
          </p>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────── */}
      <section className="section-padding bg-surface-50 dark:bg-surface-900/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white tracking-tight">
              {t('sharedPage.stepsTitle')}
            </h2>
            <p className="mt-4 text-lg text-surface-500 dark:text-surface-400">{t('sharedPage.stepsSubtitle')}</p>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-3 gap-6 lg:gap-8" staggerDelay={0.1}>
            {(Array.isArray(steps) ? steps : []).map((step, i) => (
              <StaggerItem key={step.title}>
                <div className="h-full rounded-2xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 p-7">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-600 text-white font-display font-bold text-sm shadow-lg shadow-brand-600/25">
                    {i + 1}
                  </span>
                  <h3 className="mt-5 font-display font-semibold text-lg text-surface-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-surface-500 dark:text-surface-400 text-sm leading-relaxed">{step.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Attribution, with callouts on the list ───────── */}
      <section className="section-padding bg-white dark:bg-surface-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white tracking-tight">
              {t('sharedPage.attributionTitle')}
            </h2>
            <p className="mt-5 text-lg text-surface-500 dark:text-surface-400 leading-relaxed">
              {t('sharedPage.attributionBody')}
            </p>
          </AnimatedSection>

          <PhoneCallouts
            screen="budget"
            state="top"
            phoneClass="w-[250px] sm:w-[290px] xl:w-[310px]"
            pops={[
              {
                el: 'total-income',
                side: 'left',
                title: 'Both incomes, one plan',
                body: 'The household total is what the month is planned against, not just yours.',
              },
              {
                el: 'who-spending',
                side: 'right',
                title: "Who's spending what",
                body: 'A card each, side by side, so the split is never a conversation you have to have twice.',
              },
              {
                el: 'petal-ring',
                side: 'left',
                title: 'One ring for the household',
                body: 'Every category you both spend from, in one picture of the month.',
              },
            ]}
          />
        </div>
      </section>

      {/* ── Shared vs private ────────────────────────────── */}
      <section className="section-padding bg-surface-50 dark:bg-surface-900/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white tracking-tight">
              {t('sharedPage.privacyTitle')}
            </h2>
            <p className="mt-5 text-lg text-surface-500 dark:text-surface-400 leading-relaxed">
              {t('sharedPage.privacySubtitle')}
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            <AnimatedSection>
              <div className="h-full rounded-3xl border border-brand-200 dark:border-brand-900/60 bg-brand-50/60 dark:bg-brand-950/25 p-7 lg:p-8">
                <div className="flex items-center gap-2.5 mb-6">
                  <Users size={18} className="text-brand-600 dark:text-brand-400" />
                  <h3 className="font-display font-bold text-surface-900 dark:text-white">
                    {t('sharedPage.sharedLabel')}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {(Array.isArray(sharedItems) ? sharedItems : []).map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <Check size={16} className="mt-0.5 flex-shrink-0 text-brand-600 dark:text-brand-400" />
                      <span className="text-surface-700 dark:text-surface-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="h-full rounded-3xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-7 lg:p-8">
                <div className="flex items-center gap-2.5 mb-6">
                  <Lock size={18} className="text-surface-500 dark:text-surface-400" />
                  <h3 className="font-display font-bold text-surface-900 dark:text-white">
                    {t('sharedPage.privateLabel')}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {(Array.isArray(privateItems) ? privateItems : []).map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <Lock size={14} className="mt-1 flex-shrink-0 text-surface-400" />
                      <span className="text-surface-700 dark:text-surface-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>

          {/* The honest note. Keep it — it is the same promise /terms makes. */}
          <AnimatedSection>
            <div className="mt-8 rounded-3xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/70 dark:bg-amber-950/20 p-7 lg:p-8">
              <div className="flex items-start gap-4">
                <Info size={20} className="mt-0.5 flex-shrink-0 text-amber-600 dark:text-amber-500" />
                <div>
                  <h3 className="font-display font-bold text-surface-900 dark:text-white">
                    {t('sharedPage.honestTitle')}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-surface-600 dark:text-surface-300">
                    {t('sharedPage.honestBody')}
                  </p>
                  <Link
                    to="/terms"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:gap-3 transition-all"
                  >
                    {t('sharedPage.honestCta')}
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Split detail + CTA ───────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-950 dark:bg-black section-padding">
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute top-0 -right-40 w-[560px] h-[560px] bg-brand-500/15 rounded-full blur-[130px]" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <AnimatedSection className="flex justify-center">
              <AppScreen
                screen="expenses"
                state="all"
                mode="dark"
                className="w-[250px] sm:w-[290px] xl:w-[310px]"
              />
            </AnimatedSection>
            <AnimatedSection>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight leading-[1.12]">
                {t('sharedPage.splitTitle')}
              </h2>
              <p className="mt-5 text-lg text-surface-300 leading-relaxed">{t('sharedPage.splitBody')}</p>

              <div className="mt-10">
                <h3 className="font-display text-2xl font-bold text-white">{t('sharedPage.ctaTitle')}</h3>
                <p className="mt-2 text-surface-400">{t('sharedPage.ctaSubtitle')}</p>
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="inline-block hover:scale-[1.03] active:scale-[0.97] transition-transform duration-200">
                    <img src="/screenshots/appstore.png" alt={t('common.appStore')} className="h-[52px] w-auto" />
                  </a>
                  <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="inline-block hover:scale-[1.03] active:scale-[0.97] transition-transform duration-200">
                    <img src="/screenshots/playstore.png" alt={t('common.googlePlay')} className="h-[52px] w-auto" />
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
