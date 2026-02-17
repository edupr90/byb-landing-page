import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

/* ── Phone Mockup ────────────────────────────────────────── */
function PhoneMockup() {
  return (
    <div className="relative mx-auto w-full max-w-4xl">
      {/* Three phones container */}
      <div className="relative flex items-center justify-center">
        {/* Left Phone - Budget (angled) */}
        <motion.div
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          className="absolute left-0 lg:left-8 w-44 sm:w-48 lg:w-56 z-10"
          style={{ transform: 'rotate(-8deg)' }}
        >
          <div className="relative bg-slate-900 rounded-[1.8rem] p-1 shadow-2xl shadow-black/40 ring-1 ring-white/10">
            <div className="rounded-[1.3rem] overflow-hidden aspect-[9/19.5]">
              {/* Light mode: show dark image */}
              <img
                src="/screenshots/Budget.png"
                alt="Budget screen"
                className="w-full h-full object-cover dark:hidden"
              />
              {/* Dark mode: show light image */}
              <img
                src="/screenshots/BudgetDark.png"
                alt="Budget screen"
                className="w-full h-full object-cover hidden dark:block"
              />
            </div>
          </div>
        </motion.div>

        {/* Center Phone - Expenses (main, floating) */}
        <motion.div
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-20 w-56 sm:w-64 lg:w-72"
        >
          <div className="relative bg-slate-900 rounded-[2rem] p-1.5 shadow-2xl shadow-black/40 ring-1 ring-white/10">
            <div className="rounded-[1.5rem] overflow-hidden aspect-[9/19.5]">
              {/* Light mode: show dark image */}
              <img
                src="/screenshots/Expenses.png"
                alt="Expenses screen"
                className="w-full h-full object-cover dark:hidden"
              />
              {/* Dark mode: show light image */}
              <img
                src="/screenshots/ExpensesDark.png"
                alt="Expenses screen"
                className="w-full h-full object-cover hidden dark:block"
              />
            </div>
          </div>
          {/* Glow effect behind center phone */}
          <div className="absolute -inset-8 -z-10 bg-gradient-to-b from-teal-500/20 via-cyan-500/10 to-transparent rounded-full blur-3xl" />
        </motion.div>

        {/* Right Phone - Report (angled) */}
        <motion.div
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          className="absolute right-0 lg:right-8 w-44 sm:w-48 lg:w-56 z-10"
          style={{ transform: 'rotate(8deg)' }}
        >
          <div className="relative bg-slate-900 rounded-[1.8rem] p-1 shadow-2xl shadow-black/40 ring-1 ring-white/10">
            <div className="rounded-[1.3rem] overflow-hidden aspect-[9/19.5]">
              {/* Light mode: show dark image */}
              <img
                src="/screenshots/Report.png"
                alt="Report screen"
                className="w-full h-full object-cover dark:hidden"
              />
              {/* Dark mode: show light image */}
              <img
                src="/screenshots/ReportDark.png"
                alt="Report screen"
                className="w-full h-full object-cover hidden dark:block"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
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
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />

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
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
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
                    className="absolute bottom-1 left-0 h-3 bg-cyan-400/30 rounded-full -z-0"
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
                className="inline-block hover:scale-[1.02] active:scale-[0.98] transition-transform"
              >
                <img
                  src="/screenshots/appstore.png"
                  alt="Download on the App Store"
                  className="h-12 sm:h-14 w-auto"
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.evelez.byb"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block hover:scale-[1.02] active:scale-[0.98] transition-transform"
              >
                <img
                  src="/screenshots/playstore.png"
                  alt="Get it on Google Play"
                  className="h-12 sm:h-14 w-auto"
                />
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
    </section>
  );
}
