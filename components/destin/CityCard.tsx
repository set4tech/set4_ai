'use client';

interface Highlight {
  title: string;
  type: string;
  description: string;
  year: number;
  estimatedValue: string;
}

interface CityCardProps {
  cityName: string;
  highlights: Highlight[];
}

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  resort: { bg: '#e8ecf0', text: '#3d4f5f' },
  commercial: { bg: '#f0ede8', text: '#5c4d3d' },
  residential: { bg: '#e8f0e8', text: '#2d5a2d' },
  infrastructure: { bg: '#e8eeea', text: '#48544d' },
  'mixed-use': { bg: '#f0e8f0', text: '#5c3d5c' },
};

export default function CityCard({ cityName, highlights }: CityCardProps) {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <h3
        style={{
          margin: 0,
          fontSize: '16px',
          fontWeight: 600,
          color: 'var(--color-ink-900)',
        }}
      >
        {cityName}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {highlights.map((h, i) => {
          const typeStyle = TYPE_COLORS[h.type] || TYPE_COLORS.commercial;
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                paddingBottom: i < highlights.length - 1 ? '10px' : 0,
                borderBottom: i < highlights.length - 1 ? '0.5px solid var(--color-line)' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'var(--color-ink-900)',
                  }}
                >
                  {h.title}
                </span>
                <span
                  className="badge"
                  style={{
                    background: typeStyle.bg,
                    color: typeStyle.text,
                    fontSize: '10px',
                    padding: '1px 6px',
                  }}
                >
                  {h.type}
                </span>
                {h.estimatedValue && h.estimatedValue !== 'Not disclosed' && (
                  <span style={{ fontSize: '11px', color: 'var(--color-ink-500)' }}>
                    {h.estimatedValue}
                  </span>
                )}
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: '12px',
                  lineHeight: '1.5',
                  color: 'var(--color-ink-500)',
                }}
              >
                {h.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
