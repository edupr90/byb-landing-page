import { Wallet, LayoutGrid, TrendingUp } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { StaggerContainer, StaggerItem } from './AnimatedSection';
import { useT } from '../i18n';
import Eyebrow from './Eyebrow';

const ICONS = [Wallet, LayoutGrid, TrendingUp];

export default function HowItWorks() {
  const { t } = useT();
  const steps = (t('howItWorks.steps') || []).map((step, i) => ({
    ...step,
    number: String(i + 1).padStart(2, '0'),
    icon: ICONS[i] || Wallet,
  }));

  return (
    <section className="section-padding bg-white dark:bg-surface-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-20">
          <Eyebrow className="mb-6">{t('howItWorks.eyebrow')}</Eyebrow>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-surface-900 dark:text-white tracking-tight">
            {t('howItWorks.titleA')}{' '}
            <span className="text-gradient-accent">{t('howItWorks.titleAccent')}</span>
          </h2>
          <p className="mt-5 text-lg text-surface-500 dark:text-surface-400 leading-relaxed">
            {t('howItWorks.subtitle')}
          </p>
        </AnimatedSection>

        <StaggerContainer
          className="grid md:grid-cols-3 gap-8 lg:gap-12 relative"
          staggerDelay={0.15}
        >
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-px bg-gradient-to-r from-brand-200 via-accent-200 to-brand-200 dark:from-brand-900 dark:via-accent-900 dark:to-brand-900" />

          {steps.map((step) => (
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
                  {step.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
