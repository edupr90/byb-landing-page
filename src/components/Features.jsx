import {
  CalendarDays,
  Scan,
  TrendingDown,
  Smile,
  FileBarChart,
  RefreshCw,
} from 'lucide-react';
import { StaggerContainer, StaggerItem } from './AnimatedSection';
import AnimatedSection from './AnimatedSection';

const FEATURES = [
  {
    icon: CalendarDays,
    title: 'Budget Planning',
    description:
      'Plan your monthly budget with recurring and custom categories. Set limits, adjust anytime, and always know where you stand.',
    color: 'from-brand-500 to-brand-600',
    iconColor: 'text-brand-600 dark:text-brand-400',
    bgLight: 'bg-brand-50 dark:bg-brand-950/40',
  },
  {
    icon: Scan,
    title: 'AI Receipt Scanner',
    description:
      'Scan receipts with your camera and let AI automatically extract expenses. No more manual typing - just snap, scan, and save.',
    color: 'from-accent-500 to-accent-600',
    iconColor: 'text-accent-600 dark:text-accent-400',
    bgLight: 'bg-accent-50 dark:bg-accent-950/40',
  },
  {
    icon: TrendingDown,
    title: 'Debt Planner (Snowball)',
    description:
      'Tackle your debts with the snowball method. Prioritize payments automatically and watch your balances shrink.',
    color: 'from-violet-500 to-purple-600',
    iconColor: 'text-violet-600 dark:text-violet-400',
    bgLight: 'bg-violet-50 dark:bg-violet-950/40',
  },
  {
    icon: Smile,
    title: 'Custom Categories & Emojis',
    description:
      'Make your budget personal. Create categories with custom names, emojis, and colors that fit your lifestyle.',
    color: 'from-amber-500 to-orange-500',
    iconColor: 'text-amber-600 dark:text-amber-400',
    bgLight: 'bg-amber-50 dark:bg-amber-950/40',
  },
  {
    icon: FileBarChart,
    title: 'Reports (PDF & Excel)',
    description:
      'Compare months, view trends, and see exactly where your money goes. Export to PDF or Excel anytime.',
    color: 'from-rose-500 to-pink-500',
    iconColor: 'text-rose-600 dark:text-rose-400',
    bgLight: 'bg-rose-50 dark:bg-rose-950/40',
  },
  {
    icon: RefreshCw,
    title: 'Recurring Expenses',
    description:
      'Track subscriptions and bills with recurring expenses that repeat each month automatically.',
    color: 'from-cyan-500 to-sky-500',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    bgLight: 'bg-cyan-50 dark:bg-cyan-950/40',
  },
];

export default function Features() {
  return (
    <section id="features" className="section-padding bg-surface-50 dark:bg-surface-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 text-sm font-semibold mb-6 border border-brand-100 dark:border-brand-900/50">
            Features
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-surface-900 dark:text-white tracking-tight">
            Everything you need to{' '}
            <span className="text-gradient">budget smarter</span>
          </h2>
          <p className="mt-5 text-lg text-surface-500 dark:text-surface-400 max-w-2xl mx-auto">
            Powerful tools wrapped in a simple, beautiful interface. No complexity, no learning curve.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.08}>
          {FEATURES.map((feature) => (
            <StaggerItem key={feature.title}>
              <div className="group h-full p-7 sm:p-8 rounded-2xl bg-white dark:bg-surface-800/40 border border-surface-200/80 dark:border-surface-700/40 hover:border-surface-300 dark:hover:border-surface-600 shadow-sm hover:shadow-xl hover:shadow-brand-500/[0.04] dark:hover:shadow-black/20 hover:-translate-y-1 transition-all duration-300">
                <div
                  className={`w-12 h-12 rounded-2xl ${feature.bgLight} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className={`w-6 h-6 ${feature.iconColor}`} strokeWidth={1.8} />
                </div>
                <h3 className="font-display text-lg font-bold text-surface-900 dark:text-white mb-2.5">
                  {feature.title}
                </h3>
                <p className="text-surface-500 dark:text-surface-400 leading-relaxed text-[0.9rem]">
                  {feature.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
