'use client';

import Logo from "./Logo";
import FloorplanAnimation from "./FloorplanAnimation";
import ContactForm from "./ContactForm";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative py-12 px-6 bg-background">
      <div className="relative max-w-6xl mx-auto">
        {/* Logo */}
        <div className="mb-16">
          <Logo />
        </div>

        {/* Main content grid - 50/50 split */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Headline and Copy */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-display-large text-foreground">
                <span>Read your floorplans.</span>{' '}
                <span className="text-primary">With AI.</span>
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center pt-2">
              <ContactForm>
                <Button
                  size="lg"
                  className="text-base px-6 py-5 font-medium transition-all bg-primary text-white hover:bg-primary/90"
                >
                  Talk to us
                </Button>
              </ContactForm>
              <a
                href="https://www.linkedin.com/company/set4"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
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
                <span className="typography-body font-medium">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right: Product Screenshot */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl">
            <FloorplanAnimation />
          </div>
        </div>
      </div>
    </section>
  );
}
