import { Link } from 'react-router-dom';
import { Shield, Smartphone, Cloud, Lock, Landmark, ArrowRight } from 'lucide-react';
import AnimatedSection, { StaggerContainer, StaggerItem } from './AnimatedSection';
import { useT } from '../i18n';
import Eyebrow from './Eyebrow';

const ICONS = [Smartphone, Cloud, Lock, Landmark];

export default function PrivacyFirst() {
  const { t } = useT();
  const points = t('privacy.points');

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-surface-950 via-brand-950 to-surface-950" aria-hidden="true" />
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-brand-500/12 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -left-32 w-[400px] h-[400px] bg-accent-500/8 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div>
            <AnimatedSection>
              <Eyebrow tone="dark" className="mb-7">{t('privacy.eyebrow')}</Eyebrow>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.12] tracking-tight">
                {t('privacy.title')}
              </h2>
              <p className="mt-6 text-lg text-surface-400 leading-relaxed max-w-lg">
                {t('privacy.subtitle')}
              </p>
              <Link
                to="/privacypolicy"
                className="mt-8 inline-flex items-center gap-2 text-brand-300 hover:text-brand-200 font-semibold transition-colors group"
              >
                {t('privacy.cta')}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </AnimatedSection>
          </div>

          <StaggerContainer className="space-y-4" staggerDelay={0.1}>
            {(Array.isArray(points) ? points : []).map((point, i) => {
              const Icon = ICONS[i] || Shield;
              return (
                <StaggerItem key={point.title}>
                  <div className="flex gap-5 p-6 rounded-2xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] hover:bg-white/[0.07] hover:border-white/[0.1] transition-all duration-300">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-500/12 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-brand-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1.5">{point.title}</h3>
                      <p className="text-surface-400 text-sm leading-relaxed">{point.body}</p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
