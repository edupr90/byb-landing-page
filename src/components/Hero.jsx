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
          <div className="relative bg-surface-950 rounded-[1.8rem] p-1 shadow-2xl shadow-black/50 ring-1 ring-white/10">
            <div className="rounded-[1.3rem] overflow-hidden aspect-[9/19.5]">
              <img
                src="/screenshots/Budget.png"
                alt="Budget screen"
                className="w-full h-full object-cover dark:hidden"
              />
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
          <div className="relative bg-surface-950 rounded-[2rem] p-1.5 shadow-2xl shadow-black/50 ring-1 ring-white/10">
            <div className="rounded-[1.5rem] overflow-hidden aspect-[9/19.5]">
              <img
                src="/screenshots/Expenses.png"
                alt="Expenses screen"
                className="w-full h-full object-cover dark:hidden"
              />
              <img
                src="/screenshots/ExpensesDark.png"
                alt="Expenses screen"
                className="w-full h-full object-cover hidden dark:block"
              />
            </div>
          </div>
          {/* Glow effect behind center phone */}
          <div className="absolute -inset-10 -z-10 bg-gradient-to-b from-accent-400/25 via-brand-400/15 to-transparent rounded-full blur-3xl" />
        </motion.div>

        {/* Right Phone - Report (angled) */}
        <motion.div
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          className="absolute right-0 lg:right-8 w-44 sm:w-48 lg:w-56 z-10"
          style={{ transform: 'rotate(8deg)' }}
        >
          <div className="relative bg-surface-950 rounded-[1.8rem] p-1 shadow-2xl shadow-black/50 ring-1 ring-white/10">
            <div className="rounded-[1.3rem] overflow-hidden aspect-[9/19.5]">
              <img
                src="/screenshots/Report.png"
                alt="Report screen"
                className="w-full h-full object-cover dark:hidden"
              />
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
      {/* Animated gradient mesh */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-accent-400/15 rounded-full blur-[120px] animate-pulse-soft" />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-brand-300/20 rounded-full blur-[100px] animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/5 rounded-full blur-[80px]" />
      </div>

      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 sm:pt-36 sm:pb-24 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white/90 text-sm font-medium border border-white/15 mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-400"></span>
                </span>
                Free on iOS & Android
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-extrabold text-white leading-[1.05] tracking-tight"
            >
              Take Control{' '}
              <span className="block">
                of Your{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-gradient-hero">Money</span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
                    className="absolute -bottom-1 left-0 right-0 h-3 bg-accent-400/25 rounded-full origin-left"
                  />
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 text-lg sm:text-xl text-white/65 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light"
            >
              Budget Your Budget makes it easy to plan, track, and crush your
              financial goals — all from your phone. Simple, motivating, and
              completely private.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href="https://apps.apple.com/us/app/id6472663180"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block hover:scale-[1.03] active:scale-[0.97] transition-transform duration-200"
              >
                <img
                  src="/screenshots/appstore.png"
                  alt="Download on the App Store"
                  className="h-13 sm:h-14 w-auto"
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.evelez.byb"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block hover:scale-[1.03] active:scale-[0.97] transition-transform duration-200"
              >
                <img
                  src="/screenshots/playstore.png"
                  alt="Get it on Google Play"
                  className="h-13 sm:h-14 w-auto"
                />
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-12 flex items-center gap-6 justify-center lg:justify-start text-white/40 text-sm font-medium"
            >
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 1l2.39 4.845 5.346.777-3.868 3.77.913 5.323L10 13.347l-4.781 2.368.913-5.323-3.868-3.77 5.346-.777L10 1z" /></svg>
                4.8 Rating
              </span>
              <span className="w-px h-4 bg-white/15" />
              <span>100% Private</span>
              <span className="w-px h-4 bg-white/15" />
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
          className="text-white/25"
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
