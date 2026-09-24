import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import AnimatedSection, { StaggerContainer, StaggerItem } from './AnimatedSection';
import { useT } from '../i18n';
import Eyebrow from './Eyebrow';

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
        open
          ? 'border-brand-200 dark:border-brand-800/50 bg-brand-50/40 dark:bg-brand-950/20'
          : 'border-surface-200 dark:border-surface-700/40 hover:border-surface-300 dark:hover:border-surface-600'
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
      >
        <span className="font-display font-semibold text-surface-900 dark:text-white">{faq.q}</span>
        <ChevronDown
          size={20}
          className={`flex-shrink-0 text-surface-400 transition-transform duration-300 ${
            open ? 'rotate-180 text-brand-600 dark:text-brand-400' : ''
          }`}
        />
      </button>
      <div className={`accordion-content ${open ? 'open' : ''}`}>
        <div className="accordion-inner">
          <p className="px-6 pb-5 text-surface-500 dark:text-surface-400 leading-relaxed">{faq.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { t } = useT();
  const items = t('faq.items');

  return (
    <section id="faq" className="section-padding bg-white dark:bg-surface-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14 lg:mb-16">
          <Eyebrow className="mb-6">{t('faq.eyebrow')}</Eyebrow>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-surface-900 dark:text-white tracking-tight">
            {t('faq.title')}
          </h2>
        </AnimatedSection>

        <StaggerContainer className="space-y-4" staggerDelay={0.05}>
          {(Array.isArray(items) ? items : []).map((faq) => (
            <StaggerItem key={faq.q}>
              <FAQItem faq={faq} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
