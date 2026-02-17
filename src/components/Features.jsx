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
    color: 'from-teal-600 to-cyan-500',
    bgLight: 'bg-teal-50 dark:bg-teal-950/30',
  },
  {
    icon: Scan,
    title: 'AI Receipt Scanner',
    description:
      'Scan receipts with your camera and let AI automatically extract expenses. No more manual typing - just snap, scan, and save.',
    color: 'from-emerald-500 to-teal-500',
    bgLight: 'bg-emerald-50 dark:bg-emerald-950/30',
  },
  {
    icon: TrendingDown,
    title: 'Debt Planner (Snowball)',
    description:
      'Tackle your debts with the snowball method. Prioritize payments automatically and watch your balances shrink.',
    color: 'from-purple-500 to-violet-500',
    bgLight: 'bg-purple-50 dark:bg-purple-950/30',
  },
  {
    icon: Smile,
    title: 'Custom Categories & Emojis',
    description:
      'Make your budget personal. Create categories with custom names, emojis, and colors that fit your lifestyle.',
    color: 'from-amber-500 to-orange-500',
    bgLight: 'bg-amber-50 dark:bg-amber-950/30',
  },
  {
    icon: FileBarChart,
    title: 'Reports (PDF & Excel)',
    description:
      'Compare months, view trends, and see exactly where your money goes. Export to PDF or Excel anytime.',
    color: 'from-rose-500 to-pink-500',
    bgLight: 'bg-rose-50 dark:bg-rose-950/30',
  },
  {
    icon: RefreshCw,
    title: 'Recurring Expenses',
    description:
      'Track subscriptions and bills with recurring expenses that repeat each month automatically.',
    color: 'from-cyan-500 to-sky-500',
    bgLight: 'bg-cyan-50 dark:bg-cyan-950/30',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 sm:py-28 bg-slate-50/50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 text-sm font-semibold mb-4">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
            Everything you need to{' '}
            <span className="text-gradient">budget smarter</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Powerful tools wrapped in a simple, beautiful interface. No complexity, no learning curve.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
          {FEATURES.map((feature) => (
            <StaggerItem key={feature.title}>
              <div className="group h-full p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/50 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 hover:-translate-y-1 transition-all duration-300">
                <div
                  className={`w-12 h-12 rounded-2xl ${feature.bgLight} flex items-center justify-center mb-5`}
                >
                  <feature.icon
                    className={`w-6 h-6 bg-gradient-to-br ${feature.color} bg-clip-text`}
                    style={{
                      stroke: 'url(#icon-gradient)',
                    }}
                    strokeWidth={2}
                  />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* SVG gradient for icons (hidden) */}
        <svg className="absolute w-0 h-0">
          <defs>
            <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00687a" />
              <stop offset="100%" stopColor="#40B5AD" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}
