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
    <section className="py-20 sm:py-28 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-semibold mb-4">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
            Start budgeting in{' '}
            <span className="text-gradient-accent">3 simple steps</span>
          </h2>
        </AnimatedSection>

        <StaggerContainer
          className="grid md:grid-cols-3 gap-8 lg:gap-12 relative"
          staggerDelay={0.15}
        >
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-px bg-gradient-to-r from-indigo-200 via-purple-200 to-emerald-200 dark:from-indigo-800 dark:via-purple-800 dark:to-emerald-800" />

          {STEPS.map((step, i) => (
            <StaggerItem key={step.number}>
              <div className="relative text-center">
                {/* Number badge */}
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center shadow-lg">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
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
