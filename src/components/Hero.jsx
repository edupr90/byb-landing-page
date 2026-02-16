import { motion } from 'framer-motion';
import { ArrowDown, Apple, Play } from 'lucide-react';

/* ── Phone Mockup ────────────────────────────────────────── */
function PhoneMockup() {
  return (
    <motion.div
      animate={{ y: [0, -16, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      className="relative mx-auto w-56 sm:w-64 lg:w-72"
    >
      {/* Phone Frame */}
      <div className="relative bg-slate-900 rounded-[2.5rem] p-2.5 shadow-2xl shadow-black/40 ring-1 ring-white/10">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-slate-900 rounded-b-2xl z-10" />
        {/* Screen */}
        <div className="rounded-[2rem] overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 aspect-[9/19.5] relative">
          {/* Placeholder App UI */}
          <div className="p-5 pt-10 space-y-4">
            {/* Status bar mockup */}
            <div className="flex justify-between text-white/50 text-[10px]">
              <span>9:41</span>
              <div className="flex gap-1">
                <div className="w-4 h-1.5 bg-white/30 rounded-full" />
                <div className="w-4 h-1.5 bg-white/30 rounded-full" />
                <div className="w-6 h-1.5 bg-white/50 rounded-full" />
              </div>
            </div>

            {/* Greeting */}
            <div className="space-y-1">
              <div className="w-20 h-2.5 bg-white/20 rounded-full" />
              <div className="w-32 h-3.5 bg-white/30 rounded-full" />
            </div>

            {/* Balance card */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 space-y-3">
              <div className="w-16 h-2 bg-white/20 rounded-full" />
              <div className="w-24 h-5 bg-white/30 rounded-full" />
              {/* Progress bar */}
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '68%' }}
                  transition={{ duration: 2, delay: 1, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full"
                />
              </div>
              <div className="flex justify-between">
                <div className="w-12 h-1.5 bg-white/15 rounded-full" />
                <div className="w-8 h-1.5 bg-emerald-400/40 rounded-full" />
              </div>
            </div>

            {/* Category items */}
            {[0.6, 0.45, 0.8, 0.3].map((width, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + i * 0.15 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-white/10 flex-shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="w-16 h-2 bg-white/15 rounded-full" />
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white/25 rounded-full"
                      style={{ width: `${width * 100}%` }}
                    />
                  </div>
                </div>
                <div className="w-10 h-2 bg-white/15 rounded-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Glow effect behind phone */}
      <div className="absolute -inset-8 -z-10 bg-gradient-to-b from-indigo-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl" />
    </motion.div>
  );
}

/* ── Progress Bar Motif ──────────────────────────────────── */
function ProgressMotif() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 sm:w-64"
    >
      <div className="flex items-center gap-2 text-white/40 text-xs">
        <span>$0</span>
        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '75%' }}
            transition={{ duration: 2.5, delay: 2, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full"
          />
        </div>
        <span>Goal</span>
      </div>
    </motion.div>
  );
}

/* ── Hero Section ────────────────────────────────────────── */
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-hero dark:bg-hero-dark">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-32 sm:pb-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur text-white/80 text-sm font-medium border border-white/10 mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Free on iOS & Android
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.1] tracking-tight"
            >
              Take Control{' '}
              <span className="block">
                of Your{' '}
                <span className="relative">
                  <span className="relative z-10">Money</span>
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
                    className="absolute bottom-1 left-0 h-3 bg-emerald-400/30 rounded-full -z-0"
                  />
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 text-lg sm:text-xl text-white/70 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              Budget Your Budget makes it easy to plan, track, and crush your
              financial goals — all from your phone. Simple, motivating, and
              completely private.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href="https://apps.apple.com/us/app/id6472663180"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-white text-slate-900 font-semibold shadow-xl shadow-black/10 hover:shadow-black/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Apple size={22} className="group-hover:scale-110 transition-transform" />
                Download on App Store
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.evelez.byb"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-white/10 backdrop-blur text-white font-semibold border border-white/20 hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Play size={20} className="group-hover:scale-110 transition-transform" />
                Get on Google Play
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-10 flex items-center gap-6 justify-center lg:justify-start text-white/40 text-sm"
            >
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 1l2.39 4.845 5.346.777-3.868 3.77.913 5.323L10 13.347l-4.781 2.368.913-5.323-3.868-3.77 5.346-.777L10 1z" /></svg>
                4.8 Rating
              </span>
              <span className="w-px h-4 bg-white/20" />
              <span>100% Privacy</span>
              <span className="w-px h-4 bg-white/20" />
              <span>Free to Start</span>
            </motion.div>
          </div>

          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <PhoneMockup />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/30"
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>

      <ProgressMotif />
    </section>
  );
}
