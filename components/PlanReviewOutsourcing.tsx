'use client';

import { useEffect, useState } from 'react';

export default function PlanReviewOutsourcing() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    console.log('Setting up scroll listener for PlanReviewOutsourcing');

    const handleScroll = () => {
      const viewportHeight = window.innerHeight;

      console.log('PlanReviewOutsourcing scroll position:', {
        scrollY: window.scrollY,
        viewportHeight
      });

      if (window.scrollY > viewportHeight * 0.4) {
        console.log('Scrolled past trigger point - showing PlanReviewOutsourcing');
        setIsVisible(true);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    console.log('Scroll listener attached to PlanReviewOutsourcing');

    return () => {
      window.removeEventListener('scroll', handleScroll);
      console.log('Scroll listener removed from PlanReviewOutsourcing');
    };
  }, []);

  return (
    <section className={`relative py-12 px-6 bg-secondary/50 transition-all duration-1000 ease-out ${
      isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-30 translate-y-10 blur-sm'
    }`}>
      <div className="max-w-6xl mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="w-10 h-px mb-4 bg-primary/60" />
          <h2 className="text-display-small mb-4 text-foreground">
            AI Plan Review Outsourcing
          </h2>
          <p className="typography-body text-muted-foreground leading-snug mb-8">
            Dealing with backlogs? We can provide comprehensive plan review services for any project, with quick turnarounds designed to help you tackle even the most challenging backlogs.
          </p>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <div className="w-10 h-px mb-4 bg-primary/60" />
              <h3 className="text-display-small mb-2 text-foreground">
                Any Project
              </h3>
              <p className="typography-body text-muted-foreground leading-snug">
                From residential to commercial, we handle all types of building plan reviews
              </p>
            </div>
            <div>
              <div className="w-10 h-px mb-4 bg-primary/60" />
              <h3 className="text-display-small mb-2 text-foreground">
                Quick Turnarounds
              </h3>
              <p className="typography-body text-muted-foreground leading-snug">
                Fast, efficient review process to help you clear backlogs and stay on schedule
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
