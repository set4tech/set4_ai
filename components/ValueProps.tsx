'use client';

import { useEffect, useState } from 'react';

export default function ValueProps() {
  const values = [
    {
      title: "Prevent resubmissions",
      description: "Catch compliance issues before submission with AI-powered analysis"
    },
    {
      title: "Reduce litigation risk",
      description: "Ensure regulatory compliance with automated checks and documentation"
    },
    {
      title: "AI intelligence plus human expertise",
      description: "Combine cutting-edge AI with experienced professional review"
    }
  ];

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    console.log('Setting up scroll listener for ValueProps');

    const handleScroll = () => {
      const viewportHeight = window.innerHeight;

      console.log('ValueProps scroll position:', {
        scrollY: window.scrollY,
        viewportHeight
      });

      if (window.scrollY > viewportHeight * 0.2) {
        console.log('Scrolled past hero - showing ValueProps');
        setIsVisible(true);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    console.log('Scroll listener attached to ValueProps');

    return () => {
      window.removeEventListener('scroll', handleScroll);
      console.log('Scroll listener removed from ValueProps');
    };
  }, []);

  return (
    <section className={`relative py-12 px-6 bg-secondary/50 transition-all duration-1000 ease-out ${
      isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-30 translate-y-10 blur-sm'
    }`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10">
          {values.map((value, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-40 translate-y-8 blur-sm'
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 150}ms` : '0ms'
              }}
            >
              <div className="w-10 h-px mb-4 bg-primary/60" />
              <h3 className="text-display-small mb-2 text-foreground">
                {value.title}
              </h3>
              <p className="typography-body text-muted-foreground leading-snug">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
