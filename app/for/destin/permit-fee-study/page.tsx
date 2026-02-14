'use client';

import { useMemo, useEffect, useState } from 'react';
import { Inter, IBM_Plex_Mono } from 'next/font/google';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import PostHogProvider from '@/components/destin/PostHogProvider';
import ComparisonTable from '@/components/destin/ComparisonTable';
import CityCard from '@/components/destin/CityCard';
import demographicsData from '@/data/destin/demographics.json';
import permitFeesData from '@/data/destin/permit-fees.json';
import developmentData from '@/data/destin/development-highlights.json';

const Map = dynamic(() => import('@/components/destin/Map'), { ssr: false });

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
});

const VALID_TOKEN = '15da594312316b24aa41e1a06ce4e87d';

function AccessGate({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (token === VALID_TOKEN) {
      setAuthorized(true);
      // Store in session so they don't lose access on navigation
      sessionStorage.setItem('destin_access', 'true');
    } else if (sessionStorage.getItem('destin_access') === 'true') {
      setAuthorized(true);
    }
  }, [token]);

  if (!authorized) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f5f2e8',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '400px', padding: '24px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              background: '#566560',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '18px',
              fontWeight: 700,
              margin: '0 auto 16px',
            }}
          >
            S4
          </div>
          <h1 style={{ fontSize: '18px', fontWeight: 600, color: '#0B0F19', margin: '0 0 8px' }}>
            Access Required
          </h1>
          <p style={{ fontSize: '14px', color: '#4B5563', margin: 0 }}>
            This document requires a private access link. Please use the link provided in your email.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

function StudyContent() {
  const cityPins = useMemo(() => {
    return demographicsData.cities.map((demo) => {
      const fees = permitFeesData.cities.find((f) => f.id === demo.id);
      const devCity = developmentData.find((d) =>
        d.cityName.toLowerCase().includes(demo.city.toLowerCase())
      );
      return {
        id: demo.id,
        name: demo.city,
        lat: demo.lat,
        lng: demo.lng,
        population: demo.population,
        feeStructureType: fees?.feeStructureType || 'Unknown',
        isHighlighted: demo.isHighlighted,
        description: demo.description,
        benchmarkFees: fees?.benchmarkFees || {
          residential250k: { total: 0 },
          commercial1m: { total: 0 },
        },
        highlights: devCity?.highlights || [],
      };
    });
  }, []);

  const tableRows = useMemo(() => {
    return demographicsData.cities.map((demo) => {
      const fees = permitFeesData.cities.find((f) => f.id === demo.id);
      return {
        id: demo.id,
        name: demo.city,
        isHighlighted: demo.isHighlighted,
        population: demo.population,
        populationGrowthPct: demo.populationGrowthPct,
        medianHouseholdIncome: demo.medianHouseholdIncome,
        medianHomeValue: demo.medianHomeValue,
        fee250k: fees?.benchmarkFees.residential250k.total || 0,
        fee1m: fees?.benchmarkFees.commercial1m.total || 0,
        planReviewPct: fees?.planReviewPct || 0,
        technologyPlatform: fees?.technologyPlatform || 'Unknown',
        feeLastUpdated: fees?.lastUpdated || 'Unknown',
      };
    });
  }, []);

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ padding: '32px 24px 24px', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              background: '#566560',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '14px',
              fontWeight: 700,
              fontFamily: 'var(--font-plex-mono), monospace',
            }}
          >
            S4
          </div>
          <span style={{ fontSize: '13px', color: '#4B5563', fontWeight: 500 }}>set4</span>
        </div>
        <h1
          style={{
            margin: '0 0 8px',
            fontSize: '30px',
            lineHeight: '36px',
            fontWeight: 700,
            color: '#0B0F19',
            letterSpacing: '-0.02em',
          }}
        >
          Destin, FL — Building Permit Comparison Study
        </h1>
        <p
          style={{
            margin: '0 0 4px',
            fontSize: '16px',
            lineHeight: '24px',
            color: '#4B5563',
            maxWidth: '720px',
          }}
        >
          Benchmarking analysis of permit fees, processes, and development activity across comparable
          Florida municipalities
        </p>
        <p style={{ margin: 0, fontSize: '12px', color: '#889a90' }}>
          February 2026 &middot; Prepared for the City of Destin Management Team
        </p>
      </header>

      {/* Map */}
      <section style={{ padding: '0 24px 32px', maxWidth: '1280px', margin: '0 auto' }}>
        <Map cities={cityPins} />
        <p style={{ margin: '8px 0 0', fontSize: '11px', color: '#889a90', textAlign: 'center' }}>
          Click a pin to view city details, permit fees, and recent development highlights
        </p>
      </section>

      {/* Key Metrics */}
      <section style={{ padding: '0 24px 32px', maxWidth: '1280px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '12px',
            marginBottom: '24px',
          }}
        >
          {[
            { label: 'Destin Population', value: '14,018', sub: '4.5M+ annual visitors' },
            {
              label: 'Avg. Permit Fee ($250K Home)',
              value:
                '$' +
                Math.round(
                  tableRows.reduce((s, r) => s + r.fee250k, 0) / tableRows.length
                ).toLocaleString(),
              sub: 'Across 6 municipalities',
            },
            {
              label: 'Destin Fee Rank ($250K)',
              value: (() => {
                const sorted = [...tableRows].sort((a, b) => a.fee250k - b.fee250k);
                const idx = sorted.findIndex((r) => r.isHighlighted);
                return `${idx + 1}${idx === 0 ? 'st' : idx === 1 ? 'nd' : idx === 2 ? 'rd' : 'th'} of 6`;
              })(),
              sub: 'Lowest fee = 1st',
            },
            { label: 'Median Home Value', value: '$454,726', sub: 'Destin, FL' },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                background: 'white',
                borderRadius: '8px',
                border: '1px solid #E7E5DE',
                padding: '16px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#6b7d73',
                  marginBottom: '4px',
                  fontWeight: 500,
                }}
              >
                {stat.label}
              </div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#0B0F19', lineHeight: '32px' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '11px', color: '#889a90', marginTop: '2px' }}>{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Table */}
      <section style={{ padding: '0 24px 40px', maxWidth: '1280px', margin: '0 auto' }}>
        <h2 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: 600, color: '#0B0F19' }}>
          Municipality Comparison
        </h2>
        <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#4B5563' }}>
          Click column headers to sort. Destin&apos;s rank is shown for each numeric metric.
        </p>
        <ComparisonTable cities={tableRows} />
      </section>

      {/* Development Highlights */}
      <section style={{ padding: '0 24px 40px', maxWidth: '1280px', margin: '0 auto' }}>
        <h2 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: 600, color: '#0B0F19' }}>
          Recent Development Activity
        </h2>
        <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#4B5563' }}>
          Notable projects across comparable municipalities (2023–2026)
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
            gap: '16px',
          }}
        >
          {developmentData.map((city, i) => (
            <CityCard key={i} cityName={city.cityName} highlights={city.highlights} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: '24px',
          borderTop: '1px solid #E7E5DE',
          textAlign: 'center',
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '8px',
          }}
        >
          <div
            style={{
              width: '20px',
              height: '20px',
              background: '#566560',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '9px',
              fontWeight: 700,
              fontFamily: 'var(--font-plex-mono), monospace',
            }}
          >
            S4
          </div>
          <span style={{ fontSize: '13px', color: '#243040', fontWeight: 500 }}>
            Prepared by Set4
          </span>
        </div>
        <p style={{ margin: 0, fontSize: '12px', color: '#889a90' }}>
          set4.co &middot; February 2026 &middot; For the City of Destin Management Team
        </p>
        <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#a8bab0' }}>
          Data sourced from official municipal fee schedules, U.S. Census Bureau, and public records.
          Fees are approximate and subject to additional surcharges.
        </p>
      </footer>
    </div>
  );
}

export default function DestinPermitStudyPage() {
  return (
    <div className={`${inter.variable} ${plexMono.variable}`}>
      <style jsx global>{`
        .destin-study {
          font-family: Inter, system-ui, sans-serif;
          background: #f5f2e8;
          color: #0b0f19;
          -webkit-font-smoothing: antialiased;
        }
      `}</style>
      <div className="destin-study">
        <Suspense>
          <AccessGate>
            <PostHogProvider>
              <StudyContent />
            </PostHogProvider>
          </AccessGate>
        </Suspense>
      </div>
    </div>
  );
}
