'use client';

import { useState } from 'react';

type Persona = 'developer' | 'owner';

interface Benefit {
  title: string;
  body: string;
}

export default function UserSegmentBenefits() {
  const [activePersona, setActivePersona] = useState<Persona>('developer');

  const benefitsData: Record<Persona, Benefit[]> = {
    developer: [
      {
        title: "Avoid delays and costly resubmissions",
        body: "Identify 2–4× more code issues than traditional plan review, helping you pass faster with fewer surprises."
      },
      {
        title: "Reduce change orders",
        body: "Catch code-related problems early so they never reach pre-con or the field."
      },
      {
        title: "Reduce litigation risk",
        body: "Protect your project with full-set accessibility and life-safety markups tied to specific code references."
      }
    ],
    owner: [
      {
        title: "Clear permit backlogs safely and efficiently",
        body: "Cut plan review time by up to 80% while maintaining strict code compliance."
      },
      {
        title: "Customized to your city",
        body: "We encode your local amendments and interpretations so every review reflects your standards."
      },
      {
        title: "Fully outsourced service",
        body: "No new software, training, or capital outlay—our team and AI handle the entire review workflow."
      }
    ]
  };

  return (
    <section
      id="audience-section"
      aria-label="Audience selector and benefits"
      className="max-w-[1100px] mx-auto px-6 py-16"
    >
      {/* Persona tiles - no borders, shadow on active */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <button
          className={`bg-card rounded-3xl p-8 text-left transition-all duration-200 ease-out ${
            activePersona === 'developer'
              ? 'shadow-[0_8px_30px_rgba(7,0,59,0.12)] -translate-y-1 scale-[1.02]'
              : 'hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:-translate-y-0.5'
          }`}
          onClick={() => setActivePersona('developer')}
          aria-pressed={activePersona === 'developer'}
        >
          <h2 className="typography-header text-xl mb-3">
            Developer
          </h2>
          <p className="typography-body text-muted-foreground">
            Streamline your plan submissions and reduce review cycles
          </p>
        </button>

        <button
          className={`bg-card rounded-3xl p-8 text-left transition-all duration-200 ease-out ${
            activePersona === 'owner'
              ? 'shadow-[0_8px_30px_rgba(7,0,59,0.12)] -translate-y-1 scale-[1.02]'
              : 'hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:-translate-y-0.5'
          }`}
          onClick={() => setActivePersona('owner')}
          aria-pressed={activePersona === 'owner'}
        >
          <h2 className="typography-header text-xl mb-3">
            City
          </h2>
          <p className="typography-body text-muted-foreground">
            Accelerate plan reviews and manage backlogs effectively
          </p>
        </button>
      </div>

      {/* Benefits container - no borders, clean spacing */}
      <div className="bg-card rounded-3xl shadow-sm p-8 md:p-10">
        <div className="typography-small-header tracking-wider uppercase text-muted-foreground mb-8">
          Benefits
        </div>
        <div className="flex flex-col gap-8">
          {benefitsData[activePersona].map((benefit, index) => (
            <article
              key={index}
              className="flex gap-4 items-start"
            >
              {/* Icon circle - subtle accent */}
              <div className="w-3 h-3 mt-2 rounded-full bg-tertiary flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-xl font-medium mb-2 text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {benefit.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
