import { PieChart, Zap, ScanLine, Users, TrendingDown, BarChart3, Palette, ShieldCheck } from 'lucide-react';
import AnimatedSection, { StaggerContainer, StaggerItem } from './AnimatedSection';
import { useT } from '../i18n';
import Eyebrow from './Eyebrow';

/* Icon + accent per feature, in the order of features.items in the locale file. */
const META = [
  { Icon: PieChart, cls: 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50' },
  { Icon: Zap, cls: 'text-accent-600 dark:text-accent-400 bg-accent-50 dark:bg-accent-950/40' },
  { Icon: ScanLine, cls: 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40' },
  { Icon: Users, cls: 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50' },
  { Icon: TrendingDown, cls: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40' },
  { Icon: BarChart3, cls: 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40' },
  { Icon: Palette, cls: 'text-fuchsia-600 dark:text-fuchsia-400 bg-fuchsia-50 dark:bg-fuchsia-950/40' },
  { Icon: ShieldCheck, cls: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40' },
];

export default function Features() {
  const { t } = useT();
  const items = t('features.items');

  return (
    <section id="features" className="section-padding bg-white dark:bg-surface-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <Eyebrow className="mb-6">{t('features.eyebrow')}</Eyebrow>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-surface-900 dark:text-white tracking-tight leading-[1.12]">
            {t('features.title')}
          </h2>
          <p className="mt-5 text-lg text-surface-500 dark:text-surface-400 leading-relaxed">
            {t('features.subtitle')}
          </p>
        </AnimatedSection>

        <StaggerContainer
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
          staggerDelay={0.07}
        >
          {(Array.isArray(items) ? items : []).map((item, i) => {
            const { Icon, cls } = META[i] || META[0];
            return (
              <StaggerItem key={item.title}>
                <div className="h-full p-6 lg:p-7 rounded-2xl bg-surface-50/80 dark:bg-surface-900/50 border border-surface-200/70 dark:border-surface-800 hover:border-brand-300 dark:hover:border-brand-800 hover:shadow-xl hover:shadow-brand-600/[0.07] hover:-translate-y-1 transition-all duration-300">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${cls}`}>
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-surface-900 dark:text-white mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-surface-500 dark:text-surface-400 text-sm leading-relaxed">{item.body}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
