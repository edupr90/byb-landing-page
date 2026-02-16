import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Sparkles, Zap } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const PLANS = {
  free: {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Great for getting started — all the basics, no cost.',
    features: [
      { text: 'Daily budget tracking', included: true },
      { text: 'Default categories', included: true },
      { text: 'Manual expense entry', included: true },
      { text: 'Real-time budget overview', included: true },
      { text: 'Dark mode', included: true },
      { text: 'Motivation quotes', included: true },
      { text: 'Custom categories & emojis', included: false },
      { text: 'Recurring budgets & expenses', included: false },
      { text: 'Reports & insights', included: false },
      { text: 'Export to PDF / Excel', included: false },
      { text: 'Ad-free experience', included: false },
    ],
  },
  monthly: {
    name: 'Premium Monthly',
    price: '$4.99',
    period: '/month',
    description: 'Unlock everything. Cancel anytime.',
    features: [
      { text: 'Everything in Free', included: true },
      { text: 'Custom categories & emojis', included: true },
      { text: 'Recurring budgets & expenses', included: true },
      { text: 'Reports & insights', included: true },
      { text: 'Export to PDF / Excel', included: true },
      { text: 'Ad-free experience', included: true },
    ],
  },
  annual: {
    name: 'Premium Annual',
    price: '$29.99',
    period: '/year',
    description: 'Best value — save over 50% yearly.',
    badge: 'Best Value',
    features: [
      { text: 'Everything in Free', included: true },
      { text: 'Custom categories & emojis', included: true },
      { text: 'Recurring budgets & expenses', included: true },
      { text: 'Reports & insights', included: true },
      { text: 'Export to PDF / Excel', included: true },
      { text: 'Ad-free experience', included: true },
      { text: 'Save over 50% vs monthly', included: true },
    ],
  },
};

export default function Pricing() {
  const [billing, setBilling] = useState('annual');

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-slate-50/50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-semibold mb-4">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
            Simple, transparent{' '}
            <span className="text-gradient">pricing</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Start free, upgrade when you&apos;re ready. No hidden fees, cancel anytime.
          </p>
        </AnimatedSection>

        {/* Billing toggle */}
        <AnimatedSection delay={0.1} className="flex justify-center mb-12">
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-slate-200/80 dark:bg-slate-800">
            <button
              onClick={() => setBilling('monthly')}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                billing === 'monthly'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling('annual')}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                billing === 'annual'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              Annual
              <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                Save 50%
              </span>
            </button>
          </div>
        </AnimatedSection>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Card */}
          <AnimatedSection delay={0.15}>
            <div className="h-full p-8 rounded-3xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 shadow-sm">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Zap size={20} className="text-slate-400" />
                  {PLANS.free.name}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                  {PLANS.free.description}
                </p>
              </div>
              <div className="mb-8">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                  {PLANS.free.price}
                </span>
                <span className="text-slate-500 dark:text-slate-400 ml-1">
                  {PLANS.free.period}
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {PLANS.free.features.map((f) => (
                  <li key={f.text} className="flex items-start gap-3">
                    {f.included ? (
                      <Check size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X size={18} className="text-slate-300 dark:text-slate-600 flex-shrink-0 mt-0.5" />
                    )}
                    <span
                      className={`text-sm ${
                        f.included
                          ? 'text-slate-700 dark:text-slate-300'
                          : 'text-slate-400 dark:text-slate-600'
                      }`}
                    >
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="https://apps.apple.com/us/app/id6472663180"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-6 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-white font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
              >
                Get Started Free
              </a>
            </div>
          </AnimatedSection>

          {/* Premium Card */}
          <AnimatedSection delay={0.25}>
            <div className="h-full p-8 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl shadow-indigo-500/25 relative overflow-hidden">
              {/* Glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-400/10 rounded-full blur-3xl" />

              <div className="relative">
                {/* Badge */}
                {billing === 'annual' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2"
                  >
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-400 text-emerald-950 text-xs font-bold shadow-lg">
                      <Sparkles size={12} />
                      Best Value
                    </span>
                  </motion.div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Sparkles size={20} className="text-indigo-200" />
                    Premium
                  </h3>
                  <p className="text-white/70 text-sm mt-1">
                    {billing === 'annual' ? PLANS.annual.description : PLANS.monthly.description}
                  </p>
                </div>
                <div className="mb-8">
                  <motion.span
                    key={billing}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-extrabold"
                  >
                    {billing === 'annual' ? PLANS.annual.price : PLANS.monthly.price}
                  </motion.span>
                  <span className="text-white/60 ml-1">
                    {billing === 'annual' ? PLANS.annual.period : PLANS.monthly.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {(billing === 'annual' ? PLANS.annual : PLANS.monthly).features.map((f) => (
                    <li key={f.text} className="flex items-start gap-3">
                      <Check size={18} className="text-emerald-300 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white/90">{f.text}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="https://apps.apple.com/us/app/id6472663180"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-6 py-3.5 rounded-2xl bg-white text-indigo-600 font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Upgrade to Premium
                </a>
                <p className="text-center text-white/50 text-xs mt-3">
                  Auto-renews. Cancel anytime in App Store / Google Play.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
