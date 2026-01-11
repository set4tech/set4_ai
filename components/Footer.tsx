'use client';

import React, { useEffect, useState } from 'react';
import Logo from "./Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    console.log('Setting up scroll listener for Footer');

    const handleScroll = () => {
      const viewportHeight = window.innerHeight;

      console.log('Footer scroll position:', {
        scrollY: window.scrollY,
        viewportHeight
      });

      if (window.scrollY > viewportHeight * 0.2) {
        console.log('Scrolled past hero - showing Footer');
        setIsVisible(true);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    console.log('Scroll listener attached to Footer');

    return () => {
      window.removeEventListener('scroll', handleScroll);
      console.log('Scroll listener removed from Footer');
    };
  }, []);

  return (
    <footer className={`bg-background py-12 px-6 transition-all duration-1000 ease-out ${
      isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-30 translate-y-10 blur-sm'
    }`}>
      <div className="max-w-6xl mx-auto">
        <div className="pt-8">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8"></div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="typography-small text-muted-foreground">
              © {currentYear} set4. All rights reserved.
            </p>
            <p className="typography-small text-muted-foreground">
              Durham, North Carolina
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;  