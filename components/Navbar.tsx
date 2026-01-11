import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const Navbar = ({ className }: { className?: string }) => {
  return (
    <nav className={cn("w-full py-6 px-4 md:px-8 bg-card border-b border-border", className)}>
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 md:w-14 md:h-14">
            <Image
              src="/icon.svg"
              alt="set4 logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="typography-title text-tertiary group-hover:text-primary transition-colors text-2xl md:text-3xl">
            set4
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;