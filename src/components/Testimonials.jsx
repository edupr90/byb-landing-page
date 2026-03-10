import { Star } from 'lucide-react';
import { StaggerContainer, StaggerItem } from './AnimatedSection';
import AnimatedSection from './AnimatedSection';

const TESTIMONIALS = [
  {
    name: 'Sarah M.',
    role: 'Freelance Designer',
    quote:
      'I finally feel in control of my spending. The emoji categories make budgeting actually fun!',
    rating: 5,
  },
  {
    name: 'David R.',
    role: 'College Student',
    quote:
      'The debt snowball planner changed everything for me. I can see the light at the end of the tunnel now.',
    rating: 5,
  },
  {
    name: 'Maria L.',
    role: 'Small Business Owner',
    quote:
      'Love that my data stays on my phone. Simple, private, and exactly what I needed. No other app comes close.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding bg-white dark:bg-surface-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 text-sm font-semibold mb-6 border border-amber-100 dark:border-amber-900/50">
            Testimonials
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-surface-900 dark:text-white tracking-tight">
            Loved by budgeters{' '}
            <span className="text-gradient">everywhere</span>
          </h2>
        </AnimatedSection>

        <StaggerContainer className="grid md:grid-cols-3 gap-6 lg:gap-8" staggerDelay={0.1}>
          {TESTIMONIALS.map((t) => (
            <StaggerItem key={t.name}>
              <div className="h-full p-8 rounded-2xl bg-surface-50 dark:bg-surface-800/40 border border-surface-200/80 dark:border-surface-700/40 hover:border-surface-300 dark:hover:border-surface-600 transition-colors duration-300">
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                {/* Quote */}
                <p className="text-surface-600 dark:text-surface-300 leading-relaxed mb-8">
                  &ldquo;{t.quote}&rdquo;
                </p>
                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-surface-900 dark:text-white text-sm">
                      {t.name}
                    </p>
                    <p className="text-surface-500 dark:text-surface-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
