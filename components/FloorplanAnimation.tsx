'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AlertCircle, ZoomIn, ZoomOut, Maximize2, Eye, EyeOff, Hand } from 'lucide-react';

export default function FloorplanAnimation() {
  const [scanProgress, setScanProgress] = useState(0);
  const [issuesVisible, setIssuesVisible] = useState<number[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [selectedFixture, setSelectedFixture] = useState<string | null>(null);
  const [showDimensions, setShowDimensions] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const svgRef = useRef<SVGSVGElement>(null);

  const issues = [
    { id: 1, x: 180, y: 120, title: "Door Width", detail: "32\" - Below ADA minimum of 36\"", delay: 1200 },
    { id: 2, x: 280, y: 200, title: "Turning Radius", detail: "48\" clearance not met", delay: 2000 },
    { id: 3, x: 120, y: 260, title: "Grab Bar Missing", detail: "Required per IBC §1109.2.1.3", delay: 2800 }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsScanning(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isScanning) return;

    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    issues.forEach(issue => {
      setTimeout(() => {
        setIssuesVisible(prev => [...prev, issue.id]);
      }, issue.delay);
    });

    return () => clearInterval(progressInterval);
  }, [isScanning]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });

    if (isPanning) {
      const dx = x - panStart.x;
      const dy = y - panStart.y;
      setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }));
      setPanStart({ x, y });
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.max(0.5, Math.min(5, prev * delta)));
    console.log('Zoom level:', zoom * delta);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsPanning(true);
      const rect = e.currentTarget.getBoundingClientRect();
      setPanStart({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      console.log('Started panning');
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    console.log('Stopped panning');
  };

  const zoomIn = () => {
    setZoom(prev => Math.min(5, prev * 1.3));
    console.log('Zoomed in to:', zoom * 1.3);
  };

  const zoomOut = () => {
    setZoom(prev => Math.max(0.5, prev / 1.3));
    console.log('Zoomed out to:', zoom / 1.3);
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    console.log('Reset view');
  };

  const fixtures = [
    { id: 'toilet', name: 'Toilet', type: 'Standard Wall-Hung', location: 'West Wall' },
    { id: 'sink', name: 'Sink', type: 'ADA Compliant Vanity', location: 'East Wall' },
    { id: 'door', name: 'Entry Door', type: 'Single Swing', location: 'North Wall' }
  ];

  return (
    <div
      className="relative bg-card rounded-2xl overflow-hidden border border-border"
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      style={{ cursor: isPanning ? 'grabbing' : 'grab' }}
    >
      {/* Scan Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-muted z-30">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${scanProgress}%` }}
        />
      </div>

      {/* Control Panel */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 z-40">
        <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-2 shadow-lg">
          <div className="flex flex-col gap-1">
            <button
              onClick={zoomIn}
              className="p-2 hover:bg-primary/10 rounded transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button
              onClick={zoomOut}
              className="p-2 hover:bg-primary/10 rounded transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <button
              onClick={resetView}
              className="p-2 hover:bg-primary/10 rounded transition-colors"
              title="Reset View"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-2 shadow-lg">
          <div className="flex flex-col gap-1">
            <button
              onClick={() => {
                setShowDimensions(!showDimensions);
                console.log('Dimensions:', !showDimensions);
              }}
              className={`p-2 rounded transition-colors ${showDimensions ? 'bg-primary/20' : 'hover:bg-primary/10'}`}
              title="Toggle Dimensions"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                setShowGrid(!showGrid);
                console.log('Grid:', !showGrid);
              }}
              className={`p-2 rounded transition-colors ${showGrid ? 'bg-primary/20' : 'hover:bg-primary/10'}`}
              title="Toggle Grid"
            >
              <Hand className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Zoom indicator */}
      <div className="absolute top-4 right-4 bg-card/95 backdrop-blur-sm border border-border rounded-lg px-3 py-2 text-sm font-mono z-40">
        {Math.round(zoom * 100)}%
      </div>

      {/* SVG Floorplan */}
      <svg
        ref={svgRef}
        viewBox="0 0 500 400"
        className="w-full h-full transition-transform"
        style={{
          minHeight: '400px',
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: 'center'
        }}
      >
        {/* Define patterns and gradients */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5"/>
          </pattern>

          {/* Tile floor pattern */}
          <pattern id="tileFloor" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="hsl(var(--card))"/>
            <rect x="1" y="1" width="38" height="38" fill="hsl(var(--background))"/>
            <rect x="2" y="2" width="36" height="36" fill="hsl(var(--card))"/>
            <line x1="0" y1="0" x2="40" y2="0" stroke="hsl(var(--border))" strokeWidth="0.5"/>
            <line x1="0" y1="0" x2="0" y2="40" stroke="hsl(var(--border))" strokeWidth="0.5"/>
          </pattern>

          {/* Wood grain for door */}
          <pattern id="woodGrain" width="60" height="10" patternUnits="userSpaceOnUse">
            <rect width="60" height="10" fill="hsl(var(--muted))"/>
            <path d="M 0,5 Q 15,3 30,5 T 60,5" stroke="hsl(var(--foreground))" strokeWidth="0.5" fill="none" opacity="0.3"/>
            <path d="M 0,3 Q 20,4 40,3 T 60,3" stroke="hsl(var(--foreground))" strokeWidth="0.3" fill="none" opacity="0.2"/>
          </pattern>

          {/* Wall gradient with 3D effect */}
          <linearGradient id="wallGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--muted))" />
            <stop offset="50%" stopColor="hsl(var(--card))" />
            <stop offset="100%" stopColor="hsl(var(--muted))" />
          </linearGradient>

          {/* Floor shadow */}
          <radialGradient id="floorShadow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="hsl(var(--foreground))" stopOpacity="0.05"/>
            <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity="0"/>
          </radialGradient>

          {/* Chrome/metal finish for fixtures */}
          <linearGradient id="chrome" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--muted))" />
            <stop offset="30%" stopColor="hsl(var(--card))" />
            <stop offset="50%" stopColor="hsl(var(--muted))" />
            <stop offset="70%" stopColor="hsl(var(--card))" />
            <stop offset="100%" stopColor="hsl(var(--muted))" />
          </linearGradient>

          {/* Porcelain finish */}
          <radialGradient id="porcelain">
            <stop offset="0%" stopColor="hsl(var(--card))" />
            <stop offset="80%" stopColor="hsl(var(--background))" />
            <stop offset="100%" stopColor="hsl(var(--muted))" />
          </radialGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Drop shadow for fixtures */}
          <filter id="dropShadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
            <feOffset dx="2" dy="2" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Inner shadow for recessed elements */}
          <filter id="innerShadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur"/>
            <feOffset in="blur" dx="1" dy="1" result="offsetBlur"/>
            <feFlood floodColor="#000000" floodOpacity="0.3" result="color"/>
            <feComposite in="color" in2="offsetBlur" operator="in" result="shadow"/>
            <feComposite in="shadow" in2="SourceAlpha" operator="in"/>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background */}
        <rect width="500" height="400" fill={showGrid ? "url(#grid)" : "hsl(var(--background))"}/>

        {/* Room outline - Bathroom with tile floor */}
        <rect x="80" y="80" width="300" height="250" fill="url(#tileFloor)" stroke="url(#wallGradient)" strokeWidth="10"/>

        {/* Wall inner edge (3D effect) */}
        <rect x="85" y="85" width="290" height="240" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.15"/>

        {/* Floor shadow around edges */}
        <rect x="90" y="90" width="280" height="10" fill="url(#floorShadow)" opacity="0.3"/>

        {/* Door with wood texture */}
        <g
          onClick={() => {
            setSelectedFixture(selectedFixture === 'door' ? null : 'door');
            console.log('Door clicked');
          }}
          style={{ cursor: 'pointer' }}
          filter="url(#dropShadow)"
        >
          <rect x="170" y="80" width="60" height="10" fill="url(#woodGrain)" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.8"/>
          <rect x="172" y="82" width="56" height="6" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5"/>
          {/* Door swing arc */}
          <path d="M 170 90 Q 200 105 230 90" stroke="hsl(var(--muted-foreground))" strokeWidth="2" fill="none" strokeDasharray="4,2" opacity="0.4"/>
          {/* Door handle */}
          <circle cx="225" cy="85" r="2" fill="url(#chrome)"/>
        </g>

        {/* Door dimension line */}
        {scanProgress > 20 && showDimensions && (
          <g className="animate-fade-in">
            <line x1="170" y1="65" x2="230" y2="65" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
            <line x1="170" y1="60" x2="170" y2="70" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
            <line x1="230" y1="60" x2="230" y2="70" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
            <text x="200" y="55" textAnchor="middle" fill="hsl(var(--primary))" fontSize="12" fontWeight="bold">32&quot;</text>
          </g>
        )}

        {/* Toilet - More realistic */}
        <g
          onClick={() => {
            setSelectedFixture(selectedFixture === 'toilet' ? null : 'toilet');
            console.log('Toilet clicked');
          }}
          style={{ cursor: 'pointer' }}
          filter="url(#dropShadow)"
        >
          {/* Tank shadow */}
          <ellipse cx="142" cy="252" rx="26" ry="12" fill="hsl(var(--foreground))" opacity="0.05"/>
          {/* Tank */}
          <rect x="115" y="235" width="50" height="30" rx="3" fill="url(#porcelain)" stroke="hsl(var(--border))" strokeWidth="1.5"/>
          {/* Tank highlights */}
          <rect x="118" y="238" width="44" height="3" rx="1" fill="hsl(var(--card))" opacity="0.6"/>
          {/* Bowl shadow */}
          <ellipse cx="142" cy="282" rx="28" ry="12" fill="hsl(var(--foreground))" opacity="0.05"/>
          {/* Bowl */}
          <ellipse cx="140" cy="275" rx="26" ry="32" fill="url(#porcelain)" stroke="hsl(var(--border))" strokeWidth="2"/>
          {/* Bowl highlight */}
          <ellipse cx="135" cy="265" rx="12" ry="15" fill="hsl(var(--card))" opacity="0.4"/>
          {/* Seat */}
          <ellipse cx="140" cy="268" rx="22" ry="26" fill="none" stroke="hsl(var(--muted))" strokeWidth="4"/>
          <ellipse cx="140" cy="268" rx="18" ry="22" fill="none" stroke="hsl(var(--muted))" strokeWidth="2" filter="url(#innerShadow)"/>
          {/* Flush lever */}
          <rect x="162" y="245" width="3" height="12" rx="1.5" fill="url(#chrome)"/>
        </g>

        {/* Sink - More realistic vanity with cabinet */}
        <g
          onClick={() => {
            setSelectedFixture(selectedFixture === 'sink' ? null : 'sink');
            console.log('Sink clicked');
          }}
          style={{ cursor: 'pointer' }}
          filter="url(#dropShadow)"
        >
          {/* Vanity cabinet shadow */}
          <rect x="278" y="200" width="74" height="52" fill="hsl(var(--foreground))" opacity="0.05"/>
          {/* Vanity cabinet */}
          <rect x="275" y="195" width="70" height="50" rx="2" fill="hsl(var(--muted))" stroke="hsl(var(--foreground))" strokeWidth="2" opacity="0.8"/>
          {/* Cabinet door */}
          <rect x="280" y="200" width="30" height="40" rx="1" fill="hsl(var(--card))" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.8"/>
          <rect x="315" y="200" width="30" height="40" rx="1" fill="hsl(var(--card))" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.8"/>
          {/* Door handles */}
          <circle cx="305" cy="220" r="2" fill="url(#chrome)"/>
          <circle cx="320" cy="220" r="2" fill="url(#chrome)"/>
          {/* Countertop */}
          <rect x="273" y="192" width="74" height="8" rx="1" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1"/>
          {/* Countertop highlight */}
          <rect x="274" y="193" width="72" height="2" fill="hsl(var(--card))" opacity="0.6"/>
          {/* Sink basin */}
          <ellipse cx="310" cy="197" rx="24" ry="18" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1.5" filter="url(#innerShadow)"/>
          {/* Sink highlight */}
          <ellipse cx="305" cy="192" rx="10" ry="7" fill="hsl(var(--card))" opacity="0.5"/>
          {/* Faucet */}
          <path d="M 310 185 L 310 175 Q 310 170 315 170 L 325 170" stroke="url(#chrome)" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <circle cx="325" cy="170" r="3" fill="url(#chrome)"/>
          {/* Water droplet */}
          <ellipse cx="315" cy="185" rx="1.5" ry="2" fill="hsl(var(--primary))" opacity="0.6">
            <animate attributeName="cy" values="185;197;185" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite"/>
          </ellipse>
        </g>

        {/* Turning circle overlay */}
        {scanProgress > 40 && showDimensions && (
          <g>
            <circle
              cx="240"
              cy="200"
              r="72"
              fill="none"
              stroke="hsl(var(--tertiary))"
              strokeWidth="2"
              strokeDasharray="5,5"
              className="animate-pulse"
              opacity="0.5"
            />
            <text x="240" y="280" textAnchor="middle" fill="hsl(var(--tertiary))" fontSize="11" fontWeight="bold">
              60&quot; Turning Circle
            </text>
          </g>
        )}

        {/* Selected fixture highlight */}
        {selectedFixture === 'toilet' && (
          <circle cx="140" cy="260" r="45" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" strokeDasharray="8,4" opacity="0.8">
            <animate attributeName="r" values="45;50;45" dur="1.5s" repeatCount="indefinite"/>
          </circle>
        )}
        {selectedFixture === 'sink' && (
          <rect x="265" y="185" width="90" height="65" rx="5" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" strokeDasharray="8,4" opacity="0.8">
            <animate attributeName="stroke-width" values="3;4;3" dur="1.5s" repeatCount="indefinite"/>
          </rect>
        )}
        {selectedFixture === 'door' && (
          <rect x="165" y="75" width="70" height="20" rx="3" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" strokeDasharray="8,4" opacity="0.8">
            <animate attributeName="stroke-width" values="3;4;3" dur="1.5s" repeatCount="indefinite"/>
          </rect>
        )}

        {/* Scanning beam effect */}
        {isScanning && scanProgress < 100 && (
          <line
            x1="80"
            y1={80 + (250 * scanProgress / 100)}
            x2="380"
            y2={80 + (250 * scanProgress / 100)}
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            opacity="0.6"
            filter="url(#glow)"
          >
            <animate
              attributeName="opacity"
              values="0.3;0.8;0.3"
              dur="1s"
              repeatCount="indefinite"
            />
          </line>
        )}

        {/* Mouse crosshair */}
        {scanProgress > 10 && showDimensions && !isPanning && (
          <g>
            <line x1={mousePos.x} y1="0" x2={mousePos.x} y2="400" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.3"/>
            <line x1="0" y1={mousePos.y} x2="500" y2={mousePos.y} stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.3"/>
            <circle cx={mousePos.x} cy={mousePos.y} r="3" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.5"/>
          </g>
        )}

        {/* Issue markers */}
        {issues.map(issue => issuesVisible.includes(issue.id) && (
          <g key={issue.id} className="animate-fade-in">
            <circle
              cx={issue.x}
              cy={issue.y}
              r="8"
              fill="hsl(var(--primary))"
              className="animate-pulse"
            />
            <circle
              cx={issue.x}
              cy={issue.y}
              r="14"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              opacity="0.4"
            >
              <animate
                attributeName="r"
                values="14;20;14"
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.4;0;0.4"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}
      </svg>

      {/* Issue Callout Boxes */}
      {issues.map(issue => issuesVisible.includes(issue.id) && (
        <div
          key={`callout-${issue.id}`}
          className="absolute bg-card border-2 border-tertiary rounded-lg p-4 animate-slide-in shadow-lg"
          style={{
            left: `${(issue.x / 500) * 100}%`,
            top: `${(issue.y / 400) * 100}%`,
            transform: 'translate(20px, -50%)',
            minWidth: '240px',
            zIndex: 20
          }}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              <AlertCircle className="w-5 h-5 text-highlight" />
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-1">{issue.title}</h3>
              <p className="text-sm text-muted-foreground">{issue.detail}</p>
              <div className="mt-2 pt-2 border-t border-border">
                <span className="text-xs font-semibold text-highlight uppercase tracking-wide">
                  Non-Compliant
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Scan Complete Badge */}
      {scanProgress >= 100 && (
        <div className="absolute bottom-4 right-4 bg-tertiary text-white px-6 py-3 rounded-lg animate-fade-in font-semibold shadow-lg">
          ✓ Scan Complete: {issuesVisible.length} Issues Found
        </div>
      )}

      {/* Fixture Info Panel */}
      {selectedFixture && (
        <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm border-2 border-border rounded-lg p-4 shadow-xl animate-slide-in z-40 min-w-[280px]">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-lg text-foreground">
              {fixtures.find(f => f.id === selectedFixture)?.name}
            </h3>
            <button
              onClick={() => {
                setSelectedFixture(null);
                console.log('Fixture deselected');
              }}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              ✕
            </button>
          </div>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-muted-foreground">Type:</span>{' '}
              <span className="font-medium text-foreground">
                {fixtures.find(f => f.id === selectedFixture)?.type}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Location:</span>{' '}
              <span className="font-medium text-foreground">
                {fixtures.find(f => f.id === selectedFixture)?.location}
              </span>
            </div>
            <div className="pt-2 border-t border-border">
              <span className="text-xs text-muted-foreground">
                Click fixture again to deselect
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
