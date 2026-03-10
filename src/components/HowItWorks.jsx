import { Wallet, LayoutGrid, TrendingUp } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { StaggerContainer, StaggerItem } from './AnimatedSection';

const STEPS = [
  {
    number: '01',
    icon: Wallet,
    title: 'Set Your Income',
    description:
      'Add your income after taxes and let the app do the math. See instantly how much you have to allocate.',
  },
  {
    number: '02',
    icon: LayoutGrid,
    title: 'Create Your Budget',
    description:
      'Set up categories with custom names and limits. Use emojis, colors, and recurring budgets to match your life.',
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'Track & Thrive',
    description:
      'Log expenses in seconds. Watch your progress in real time. Stay motivated with daily affirmations and insights.',
  },
];

export default function HowItWorks() {
  return (
    <section className="section-padding bg-white dark:bg-surface-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-50 dark:bg-accent-950/40 text-accent-600 dark:text-accent-400 text-sm font-semibold mb-6 border border-accent-100 dark:border-accent-900/50">
            How It Works
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-surface-900 dark:text-white tracking-tight">
            Start budgeting in{' '}
            <span className="text-gradient-accent">3 simple steps</span>
          </h2>
        </AnimatedSection>

        <StaggerContainer
          className="grid md:grid-cols-3 gap-8 lg:gap-12 relative"
          staggerDelay={0.15}
        >
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-px bg-gradient-to-r from-brand-200 via-accent-200 to-brand-200 dark:from-brand-900 dark:via-accent-900 dark:to-brand-900" />

          {STEPS.map((step) => (
            <StaggerItem key={step.number}>
              <div className="relative text-center group">
                {/* Number badge */}
                <div className="relative inline-flex items-center justify-center mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/25 group-hover:shadow-brand-500/40 transition-shadow duration-300">
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent-500 text-white text-xs font-bold flex items-center justify-center shadow-lg ring-4 ring-white dark:ring-surface-950">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-surface-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-surface-500 dark:text-surface-400 leading-relaxed max-w-sm mx-auto">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
