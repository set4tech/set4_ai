'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Team() {
  const teamMembers = [
    {
      name: "Will Maclean",
      role: "Co-founder",
      description: "Lead AI engineer in compliance and carbon markets at",
      companies: ["Maiven", "Sylvera"],
      education: {
        degree: "BA, Cambridge",
        year: "'20s"
      },
      image: "/ed.png",
      logos: ["/cambridge-logo.png"],
      linkedin: "https://www.linkedin.com/in/willmaclean/"
    },
    {
      name: "Ed Maclean",
      role: "Co-founder",
      description: "Founder of AI ESG compliance startup, econscia, and energy tech PM at",
      companies: ["Piclo"],
      image: "/will.png",
      logos: ["/duke-logo.png", "/oxford-logo.svg"],
      linkedin: "https://www.linkedin.com/in/edward-maclean/"
    }
  ];

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    console.log('Setting up scroll listener for Team');

    const handleScroll = () => {
      const viewportHeight = window.innerHeight;

      console.log('Team scroll position:', {
        scrollY: window.scrollY,
        viewportHeight
      });

      if (window.scrollY > viewportHeight * 0.2) {
        console.log('Scrolled past hero - showing Team');
        setIsVisible(true);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    console.log('Scroll listener attached to Team');

    return () => {
      window.removeEventListener('scroll', handleScroll);
      console.log('Scroll listener removed from Team');
    };
  }, []);

  return (
    <section className={`py-20 px-6 bg-background transition-all duration-1000 ease-out ${
      isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-30 translate-y-10 blur-sm'
    }`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-display-medium mb-12 text-foreground">
          Our team
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`p-8 rounded-3xl bg-card shadow-sm hover:shadow-md transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-40 translate-y-8 blur-sm'
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 150}ms` : '0ms'
              }}
            >
              <div className="flex flex-col items-center text-center">
                {/* Team member image */}
                <div className="w-28 h-28 rounded-full mb-5 relative overflow-hidden shadow-md">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <h3 className="text-display-small mb-1 text-foreground">
                  {member.name}
                </h3>
                <p className="typography-body italic mb-3 text-muted-foreground">
                  {member.role}
                </p>

                <p className="typography-body mb-2">
                  {member.description}
                </p>

                <div className="flex flex-wrap gap-2 justify-center mb-3">
                  {member.companies.map((company, i) => (
                    <span key={i} className="typography-body font-medium text-primary">
                      {company}
                    </span>
                  ))}
                </div>

                {/* LinkedIn link */}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 transition-colors mb-3 text-primary hover:text-primary/80"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="typography-small font-medium">LinkedIn</span>
                  </a>
                )}

                <div className="pt-5 w-full mb-5">
                  <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
                </div>

                {/* University logos */}
                <div className="flex gap-4 items-center justify-center bg-muted/30 px-6 py-4 rounded-2xl">
                  {member.logos.map((logo, i) => (
                    <div key={i} className="relative h-14 w-28">
                      <Image
                        src={logo}
                        alt="University logo"
                        fill
                        className="object-contain opacity-70"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
