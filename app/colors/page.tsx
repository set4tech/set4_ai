import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ColorPalette from '@/components/ColorPalette';

export default function ColorsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      <main className="flex-1">
        <ColorPalette />
      </main>
      
      <Footer />
    </div>
  );
}