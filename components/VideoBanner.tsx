'use client';

import { useEffect, useRef, useState } from 'react';

export default function VideoBanner() {
  const steps = [
    {
      number: "01",
      title: "Extract from PDF",
      description: "Upload architectural drawings in PDF, DWG, or image format.",
      video: '/demo-video.mp4'
    },
    {
      number: "02",
      title: "Measure Geometries",
      description: "Measure walls, doors, elements and any plan element.",
      video: '/demo-video-2.mp4'
    },
    {
      number: "03",
      title: "Agent Analysis",
      description: "Custom agents for takeoff, construction, code and digital twin creation.",
      video: '/demo-video-3.mp4'
    }
  ];

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    console.log('Setting up scroll listener for VideoBanner');

    const handleScroll = () => {
      // Get viewport height
      const viewportHeight = window.innerHeight;

      console.log('Scroll position:', {
        scrollY: window.scrollY,
        viewportHeight,
        heroHeight: viewportHeight // Assuming hero is full viewport height
      });

      // Trigger animation when we've scrolled past some of the hero section
      if (window.scrollY > viewportHeight * 0.2) {
        console.log('Scrolled past hero - showing VideoBanner');
        setIsVisible(true);
      }
    };

    // Check on mount in case already scrolled
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    console.log('Scroll listener attached');

    return () => {
      window.removeEventListener('scroll', handleScroll);
      console.log('Scroll listener removed');
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`py-12 px-6 bg-background transition-all duration-1000 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0 blur-0'
          : 'opacity-30 translate-y-10 blur-sm'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        {/* <div className="mb-12">
          <h2 className="text-display-medium text-foreground mb-3">
            How It Works
          </h2>
          <p className="typography-subheadline text-muted-foreground max-w-2xl">
            Building code compliance in three steps
          </p>
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative rounded-3xl overflow-hidden shadow-lg aspect-square transition-all duration-700 ease-out hover:scale-[1.02] ${
                isVisible
                  ? 'opacity-100 translate-y-0 blur-0'
                  : 'opacity-40 translate-y-8 blur-sm'
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 150}ms` : '0ms'
              }}
            >
              {/* Video background */}
              <video
                className="w-full h-full object-cover"
                style={{ filter: 'contrast(0.5) brightness(0.7)' }}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              >
                <source src={step.video} type="video/mp4" />
              </video>

              {/* Overlay content - centered */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-transparent via-transparent to-foreground/20">
                {/* <div
                  className="text-5xl font-serif text-white mb-3"
                  style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.9)' }}
                >
                  {step.number}
                </div> */}
                <h3
                  className="text-display-small text-white mb-3"
                  style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.9)' }}
                >
                  {step.title}
                </h3>
                <p
                  className="typography-body text-white leading-relaxed"
                  style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.95)' }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
