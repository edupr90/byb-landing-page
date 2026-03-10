import { Shield, Smartphone, CloudOff, Lock } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { StaggerContainer, StaggerItem } from './AnimatedSection';

const POINTS = [
  {
    icon: Smartphone,
    title: 'On-Device Storage',
    description: 'All your data stays on your phone. Nothing is sent to external servers — ever.',
  },
  {
    icon: CloudOff,
    title: 'No Cloud Required',
    description: 'Works 100% offline. No accounts, no cloud sync, no data collection.',
  },
  {
    icon: Lock,
    title: 'You Own Your Data',
    description: 'Built-in backup & restore. Export anytime. Delete anytime. Full control is yours.',
  },
];

export default function PrivacyFirst() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-950 via-brand-950 to-surface-950" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -left-32 w-[400px] h-[400px] bg-accent-500/8 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left: Text */}
          <div>
            <AnimatedSection>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-sm font-semibold mb-8">
                <Shield size={14} />
                Privacy First
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
                Your data stays{' '}
                <span className="text-gradient-accent">on your device</span>
              </h2>
              <p className="mt-6 text-lg text-surface-400 leading-relaxed max-w-lg">
                We believe your financial data is deeply personal. That&apos;s why Budget Your Budget
                stores everything locally on your device. No accounts, no servers, no tracking. Just
                you and your budget.
              </p>
            </AnimatedSection>
          </div>

          {/* Right: Points */}
          <StaggerContainer className="space-y-5" staggerDelay={0.12}>
            {POINTS.map((point) => (
              <StaggerItem key={point.title}>
                <div className="flex gap-5 p-6 rounded-2xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] hover:bg-white/[0.07] hover:border-white/[0.1] transition-all duration-300">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center">
                    <point.icon className="w-6 h-6 text-brand-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1.5">{point.title}</h3>
                    <p className="text-surface-400 text-sm leading-relaxed">{point.description}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
