import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import PrivacyFirst from '../components/PrivacyFirst';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';

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
      <HowItWorks />
      <PrivacyFirst />
      <Pricing />
      <Testimonials />
      <FAQ />
    </motion.div>
  );
}
