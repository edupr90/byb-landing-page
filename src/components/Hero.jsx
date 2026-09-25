import { motion } from 'framer-motion';
import { Star, WifiOff, Sparkles } from 'lucide-react';
import AppScreen from './AppScreen';
import { useT } from '../i18n';
import { APP_STORE_URL, PLAY_STORE_URL } from '../constants';
import Eyebrow from './Eyebrow';

export default function Hero() {
  const { t, wordSpace } = useT();

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-hero dark:bg-hero-dark">
      {/* Ambient light */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -right-32 w-[620px] h-[620px] bg-brand-400/20 rounded-full blur-[130px]" />
        <div className="absolute -bottom-52 -left-32 w-[520px] h-[520px] bg-accent-400/10 rounded-full blur-[120px]" />
      </div>

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.07]" aria-hidden="true">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 sm:pt-32 sm:pb-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <Eyebrow tone="dark" className="mb-7">
                {t('hero.badge')}
              </Eyebrow>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-display text-[2.75rem] sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.04] tracking-tight"
            >
              {t('hero.titleA')}{wordSpace}
              <span className="block">
                {t('hero.titleB')}{wordSpace}
                <span className="relative inline-block">
                  <span className="relative z-10 text-gradient-hero">{t('hero.titleAccent')}</span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 1.1, ease: 'easeOut' }}
                    className="absolute -bottom-1 left-0 right-0 h-3 bg-accent-400/30 rounded-full origin-left"
                  />
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-7 text-lg sm:text-xl text-white/70 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-9 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block hover:scale-[1.03] active:scale-[0.97] transition-transform duration-200"
              >
                <img src="/screenshots/appstore.png" alt={t('common.appStore')} className="h-[52px] sm:h-14 w-auto" />
              </a>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block hover:scale-[1.03] active:scale-[0.97] transition-transform duration-200"
              >
                <img src="/screenshots/playstore.png" alt={t('common.googlePlay')} className="h-[52px] sm:h-14 w-auto" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-9 flex items-center gap-5 justify-center lg:justify-start text-white/55 text-sm flex-wrap"
            >
              <span className="flex items-center gap-1.5">
                <Star size={15} className="fill-accent-400 text-accent-400" />
                {t('hero.rating')} {t('hero.statRating')}
              </span>
              <span className="w-px h-4 bg-white/15" />
              <span className="flex items-center gap-1.5">
                <WifiOff size={15} />
                {t('hero.statPrivate')}
              </span>
              <span className="w-px h-4 bg-white/15" />
              <span className="flex items-center gap-1.5">
                <Sparkles size={15} />
                {t('hero.statFree')}
              </span>
            </motion.div>
          </div>

          {/* Live phone */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="order-1 lg:order-2 flex flex-col items-center"
          >
            <div className="relative">
              <div
                className="absolute -inset-10 bg-brand-400/20 rounded-[50%] blur-[70px]"
                aria-hidden="true"
              />
              <AppScreen
                screen="budget"
                state="ring"
                mode="light"
                eager
                label="Budget Your Budget — monthly plan"
                className="relative w-[260px] sm:w-[300px] lg:w-[330px] animate-float"
              />
            </div>
            <p className="mt-7 text-white/40 text-xs sm:text-sm text-center max-w-[15rem]">
              {t('hero.caption')}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
