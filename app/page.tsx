import React from 'react';
import Hero from '@/components/Hero';
import VideoBanner from '@/components/VideoBanner';
import AIToolsSection from '@/components/AIToolsSection';
import UserSegmentBenefits from '@/components/UserSegmentBenefits';
import Team from '@/components/Team';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <AIToolsSection />
      <VideoBanner />
      <Team />
      <Footer />
    </div>
  );
}
