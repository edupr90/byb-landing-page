import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { StaggerContainer, StaggerItem } from './AnimatedSection';

const FAQS = [
  {
    question: 'Is my data really private?',
    answer:
      'Yes! All your financial data is stored locally on your device. We do not collect, transmit, or store any personal or financial information on external servers. You are in full control.',
  },
  {
    question: 'Is there a free version?',
    answer:
      'Absolutely. The free version includes daily budget tracking, default categories, manual expense entry, real-time budget overview, dark mode, and daily motivation quotes. No credit card required.',
  },
  {
    question: 'Can I export my data?',
    answer:
      'With Premium, you can export your budget data to PDF or Excel. This is great for record-keeping, sharing with a financial advisor, or just having a backup of your financial history.',
  },
  {
    question: 'Does it work offline?',
    answer:
      'Yes! Budget Your Budget works 100% offline. Since all data is stored on your device, you never need an internet connection to use the app.',
  },
  {
    question: 'How do I cancel my subscription?',
    answer:
      'You can cancel anytime through your App Store (iOS) or Google Play (Android) account settings. Your premium features will remain active until the end of your current billing period.',
  },
  {
    question: 'What is the debt snowball feature?',
    answer:
      'The debt snowball method helps you prioritize paying off your debts by focusing on the smallest balance first. As each debt is paid off, you roll that payment into the next debt, creating a "snowball" effect that accelerates your debt payoff.',
  },
];

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${open ? 'border-brand-200 dark:border-brand-800/50 bg-brand-50/30 dark:bg-brand-950/20' : 'border-surface-200 dark:border-surface-700/40 hover:border-surface-300 dark:hover:border-surface-600'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <span className="font-display font-semibold text-surface-900 dark:text-white pr-4">{faq.question}</span>
        <ChevronDown
          size={20}
          className={`flex-shrink-0 text-surface-400 transition-transform duration-300 ${
            open ? 'rotate-180 text-brand-500' : ''
          }`}
        />
      </button>
      <div className={`accordion-content ${open ? 'open' : ''}`}>
        <div className="accordion-inner">
          <p className="px-6 pb-5 text-surface-500 dark:text-surface-400 leading-relaxed">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="section-padding bg-white dark:bg-surface-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 text-sm font-semibold mb-6 border border-violet-100 dark:border-violet-900/50">
            FAQ
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-surface-900 dark:text-white tracking-tight">
            Frequently asked{' '}
            <span className="text-gradient">questions</span>
          </h2>
        </AnimatedSection>

        <StaggerContainer className="space-y-4" staggerDelay={0.06}>
          {FAQS.map((faq) => (
            <StaggerItem key={faq.question}>
              <FAQItem faq={faq} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
