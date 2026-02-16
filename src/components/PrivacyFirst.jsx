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
    <section className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900" />
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="privacy-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#privacy-grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <div>
            <AnimatedSection>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold mb-6">
                <Shield size={14} />
                Privacy First
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Your data stays{' '}
                <span className="text-gradient-accent">on your device</span>
              </h2>
              <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-lg">
                We believe your financial data is deeply personal. That&apos;s why Budget Your Budget
                stores everything locally on your device. No accounts, no servers, no tracking. Just
                you and your budget.
              </p>
            </AnimatedSection>
          </div>

          {/* Right: Points */}
          <StaggerContainer className="space-y-6" staggerDelay={0.12}>
            {POINTS.map((point) => (
              <StaggerItem key={point.title}>
                <div className="flex gap-5 p-5 rounded-2xl bg-white/5 backdrop-blur border border-white/5 hover:bg-white/[0.08] transition-colors">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <point.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{point.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{point.description}</p>
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
