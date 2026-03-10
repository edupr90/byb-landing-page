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
    <section id="pricing" className="section-padding bg-surface-50 dark:bg-surface-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 text-sm font-semibold mb-6 border border-purple-100 dark:border-purple-900/50">
            Pricing
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-surface-900 dark:text-white tracking-tight">
            Simple, transparent{' '}
            <span className="text-gradient">pricing</span>
          </h2>
          <p className="mt-5 text-lg text-surface-500 dark:text-surface-400">
            Start free, upgrade when you&apos;re ready. No hidden fees, cancel anytime.
          </p>
        </AnimatedSection>

        {/* Billing toggle */}
        <AnimatedSection delay={0.1} className="flex justify-center mb-14">
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-surface-100 dark:bg-surface-800 border border-surface-200/60 dark:border-surface-700/40">
            <button
              onClick={() => setBilling('monthly')}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                billing === 'monthly'
                  ? 'bg-white dark:bg-surface-700 text-surface-900 dark:text-white shadow-sm'
                  : 'text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-surface-200'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling('annual')}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                billing === 'annual'
                  ? 'bg-white dark:bg-surface-700 text-surface-900 dark:text-white shadow-sm'
                  : 'text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-surface-200'
              }`}
            >
              Annual
              <span className="px-2 py-0.5 rounded-md bg-accent-100 dark:bg-accent-900/40 text-accent-700 dark:text-accent-400 text-xs font-bold">
                Save 50%
              </span>
            </button>
          </div>
        </AnimatedSection>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Card */}
          <AnimatedSection delay={0.15}>
            <div className="h-full p-8 rounded-3xl bg-white dark:bg-surface-800/40 border border-surface-200 dark:border-surface-700/40 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="mb-6">
                <h3 className="font-display text-xl font-bold text-surface-900 dark:text-white flex items-center gap-2">
                  <Zap size={20} className="text-surface-400" />
                  {PLANS.free.name}
                </h3>
                <p className="text-surface-500 dark:text-surface-400 text-sm mt-1">
                  {PLANS.free.description}
                </p>
              </div>
              <div className="mb-8">
                <span className="font-display text-4xl font-extrabold text-surface-900 dark:text-white">
                  {PLANS.free.price}
                </span>
                <span className="text-surface-500 dark:text-surface-400 ml-1">
                  {PLANS.free.period}
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {PLANS.free.features.map((f) => (
                  <li key={f.text} className="flex items-start gap-3">
                    {f.included ? (
                      <Check size={18} className="text-accent-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X size={18} className="text-surface-300 dark:text-surface-600 flex-shrink-0 mt-0.5" />
                    )}
                    <span
                      className={`text-sm ${
                        f.included
                          ? 'text-surface-700 dark:text-surface-300'
                          : 'text-surface-400 dark:text-surface-600'
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
                className="block w-full text-center px-6 py-3.5 rounded-2xl bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-white font-semibold hover:bg-surface-200 dark:hover:bg-surface-600 transition-all duration-200"
              >
                Get Started Free
              </a>
            </div>
          </AnimatedSection>

          {/* Premium Card */}
          <AnimatedSection delay={0.25}>
            <div className="h-full p-8 rounded-3xl bg-gradient-to-br from-brand-600 to-brand-700 text-white shadow-xl shadow-brand-500/20 relative overflow-hidden">
              {/* Glow */}
              <div className="absolute -top-24 -right-24 w-56 h-56 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent-400/10 rounded-full blur-3xl" />

              <div className="relative">
                {/* Badge */}
                {billing === 'annual' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2"
                  >
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent-400 text-accent-950 text-xs font-bold shadow-lg">
                      <Sparkles size={12} />
                      Best Value
                    </span>
                  </motion.div>
                )}

                <div className="mb-6">
                  <h3 className="font-display text-xl font-bold flex items-center gap-2">
                    <Sparkles size={20} className="text-brand-200" />
                    Premium
                  </h3>
                  <p className="text-white/65 text-sm mt-1">
                    {billing === 'annual' ? PLANS.annual.description : PLANS.monthly.description}
                  </p>
                </div>
                <div className="mb-8">
                  <motion.span
                    key={billing}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-display text-4xl font-extrabold"
                  >
                    {billing === 'annual' ? PLANS.annual.price : PLANS.monthly.price}
                  </motion.span>
                  <span className="text-white/55 ml-1">
                    {billing === 'annual' ? PLANS.annual.period : PLANS.monthly.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {(billing === 'annual' ? PLANS.annual : PLANS.monthly).features.map((f) => (
                    <li key={f.text} className="flex items-start gap-3">
                      <Check size={18} className="text-accent-300 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white/85">{f.text}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="https://apps.apple.com/us/app/id6472663180"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-6 py-3.5 rounded-2xl bg-white text-brand-700 font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  Upgrade to Premium
                </a>
                <p className="text-center text-white/40 text-xs mt-3">
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
