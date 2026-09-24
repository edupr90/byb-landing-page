import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Showcase from '../components/Showcase';
import HowItWorks from '../components/HowItWorks';
import PrivacyFirst from '../components/PrivacyFirst';
import FAQ from '../components/FAQ';
import CallToAction from '../components/CallToAction';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Hero />
      <Features />

      <Showcase tKey="plan" screens={[{ screen: 'budget', state: 'ring' }]} tone="tinted" />

      <Showcase
        tKey="track"
        flip
        screens={[{ screen: 'expenses', state: 'all' }]}
      />

      {/* The flagship: one budget on two phones. */}
      <Showcase
        id="shared"
        tKey="shared"
        tone="brand"
        screens={[
          { screen: 'budget', state: 'top' },
          { screen: 'expenses', state: 'all', mode: 'dark' },
        ]}
        note
        noteTo="/terms"
        ctaTo="/shared"
      />

      <Showcase tKey="scan" flip screens={[{ screen: 'expense-form', state: 'new' }]} note />

      <Showcase tKey="insights" tone="tinted" screens={[{ screen: 'insights', state: 'top' }]} />

      <Showcase tKey="reports" flip screens={[{ screen: 'reports-compare', state: 'compare' }]} />

      <Showcase
        tKey="themes"
        tone="tinted"
        screens={[
          { screen: 'theme-picker', state: 'light-royal' },
          { screen: 'theme-picker', state: 'dark-sunset', mode: 'dark', palette: 'sunset' },
        ]}
      />

      <HowItWorks />
      <PrivacyFirst />
      <FAQ />
      <CallToAction />
    </motion.div>
  );
}
