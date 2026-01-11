import React from 'react';

const ColorPalette = () => {
  const colors = [
    {
      name: 'Light Background',
      hex: '#FFFFFF',
      rgb: 'RGB(255, 255, 255)',
      className: 'bg-background',
      textClass: 'text-foreground'
    },
    {
      name: 'Dark Purple',
      hex: '#07003b',
      rgb: 'RGB(7, 0, 59)',
      className: 'bg-[#07003b]',
      textClass: 'text-white'
    },
    {
      name: 'Bright Purple',
      hex: '#4400cc',
      rgb: 'RGB(68, 0, 204)',
      className: 'bg-primary',
      textClass: 'text-primary-foreground'
    },
    {
      name: 'Accent Purple',
      hex: '#4400cc',
      rgb: 'RGB(68, 0, 204)',
      className: 'bg-accent',
      textClass: 'text-accent-foreground'
    }
  ];

  const themeColors = [
    { name: 'Background', className: 'bg-background', textClass: 'text-foreground' },
    { name: 'Card', className: 'bg-card', textClass: 'text-card-foreground' },
    { name: 'Secondary', className: 'bg-secondary', textClass: 'text-secondary-foreground' },
    { name: 'Muted', className: 'bg-muted', textClass: 'text-muted-foreground' },
    { name: 'Primary', className: 'bg-primary', textClass: 'text-primary-foreground' },
    { name: 'Tertiary', className: 'bg-tertiary', textClass: 'text-tertiary-foreground' },
    { name: 'Accent', className: 'bg-accent', textClass: 'text-accent-foreground' },
    { name: 'Border', className: 'bg-border', textClass: 'text-foreground' }
  ];

  return (
    <div className="py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-display-medium mb-8">Brand Color Palette</h2>
        
        {/* Main Colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {colors.map((color) => (
            <div key={color.name} className="space-y-2">
              <div className={`${color.className} ${color.textClass} rounded-lg p-8 h-32 flex items-end`}>
                <span className="font-medium">{color.hex}</span>
              </div>
              <div>
                <h3 className="font-medium">{color.name}</h3>
                <p className="text-sm text-muted-foreground">{color.rgb}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Theme Colors */}
        <h3 className="typography-header mb-6">Theme Color Scale</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
          {themeColors.map((item) => (
            <div key={item.name} className="text-center">
              <div className={`${item.className} ${item.textClass} rounded-lg border border-border p-6 h-28 flex items-center justify-center mb-2`}>
                <span className="text-xs font-medium">{item.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* UI Elements */}
        <h3 className="typography-header mb-6">UI Elements</h3>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-md transition-colors">
              Primary Button
            </button>
            <button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6 py-2 rounded-md transition-colors">
              Secondary Button
            </button>
            <button className="bg-tertiary text-tertiary-foreground hover:bg-tertiary/90 px-6 py-2 rounded-md transition-colors">
              Tertiary Button
            </button>
            <button className="bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-2 rounded-md transition-colors">
              Accent Button
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-card text-card-foreground p-6 rounded-lg border border-border">
              <h4 className="font-medium mb-2">Card Component</h4>
              <p className="text-sm text-muted-foreground">This is how cards look with the new color scheme.</p>
            </div>
            <div className="bg-muted text-muted-foreground p-6 rounded-lg">
              <h4 className="font-medium mb-2">Muted Background</h4>
              <p className="text-sm">Used for subtle backgrounds and disabled states.</p>
            </div>
            <div className="bg-secondary text-secondary-foreground p-6 rounded-lg border border-border">
              <h4 className="font-medium mb-2">Secondary Background</h4>
              <p className="text-sm">Used for subtle contrast sections.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPalette;