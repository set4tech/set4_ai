'use client';

import { useState, useMemo } from 'react';

interface CityRow {
  id: string;
  name: string;
  isHighlighted: boolean;
  population: number | null;
  populationGrowthPct: number | null;
  medianHouseholdIncome: number | null;
  medianHomeValue: number | null;
  fee250k: number;
  fee1m: number;
  planReviewPct: number;
  technologyPlatform: string;
  feeLastUpdated: string;
}

interface ComparisonTableProps {
  cities: CityRow[];
}

type SortKey = keyof CityRow;

function getRank(cities: CityRow[], key: SortKey, cityId: string, direction: 'asc' | 'desc' = 'asc'): string {
  const values = cities
    .filter((c) => c[key] != null && typeof c[key] === 'number')
    .sort((a, b) => {
      const aVal = a[key] as number;
      const bVal = b[key] as number;
      return direction === 'asc' ? aVal - bVal : bVal - aVal;
    });
  const idx = values.findIndex((c) => c.id === cityId);
  if (idx === -1) return '';
  const rank = idx + 1;
  const suffix = rank === 1 ? 'st' : rank === 2 ? 'nd' : rank === 3 ? 'rd' : 'th';
  return `${rank}${suffix}`;
}

function formatNumber(val: number | null | undefined): string {
  if (val == null) return '—';
  return val.toLocaleString();
}

function formatCurrency(val: number | null | undefined): string {
  if (val == null) return '—';
  return '$' + val.toLocaleString();
}

function formatPct(val: number | null | undefined): string {
  if (val == null) return '—';
  return val.toFixed(1) + '%';
}

const COLUMNS: {
  key: SortKey;
  label: string;
  format: (val: unknown) => string;
  rankDir?: 'asc' | 'desc';
  align?: string;
}[] = [
  { key: 'name', label: 'Municipality', format: (v) => String(v) },
  { key: 'population', label: 'Population', format: (v) => formatNumber(v as number), rankDir: 'desc' },
  { key: 'populationGrowthPct', label: 'Growth %', format: (v) => formatPct(v as number), rankDir: 'desc' },
  { key: 'medianHouseholdIncome', label: 'Median HH Income', format: (v) => formatCurrency(v as number), rankDir: 'desc' },
  { key: 'medianHomeValue', label: 'Home Value', format: (v) => formatCurrency(v as number), rankDir: 'desc' },
  { key: 'fee250k', label: '$250K Home Fee', format: (v) => formatCurrency(v as number), rankDir: 'asc', align: 'right' },
  { key: 'fee1m', label: '$1M Comm. Fee', format: (v) => formatCurrency(v as number), rankDir: 'asc', align: 'right' },
  { key: 'planReviewPct', label: 'Plan Review', format: (v) => (v as number) + '%' },
  { key: 'technologyPlatform', label: 'Platform', format: (v) => String(v) },
  { key: 'feeLastUpdated', label: 'Fees Updated', format: (v) => String(v) },
];

export default function ComparisonTable({ cities }: ComparisonTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const sorted = useMemo(() => {
    return [...cities].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });
  }, [cities, sortKey, sortDir]);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  return (
    <div className="overflow-x-auto" style={{ border: '1px solid var(--color-line)', borderRadius: '8px' }}>
      <table className="table-base w-full" style={{ minWidth: '900px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--color-line)', background: 'var(--color-sage-50)' }}>
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                onClick={() => handleSort(col.key)}
                style={{
                  cursor: 'pointer',
                  userSelect: 'none',
                  textAlign: col.align === 'right' ? 'right' : 'left',
                  padding: '10px 8px',
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--color-ink-500)',
                  whiteSpace: 'nowrap',
                }}
              >
                {col.label}
                {sortKey === col.key && (
                  <span style={{ marginLeft: '4px' }}>{sortDir === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((city) => (
            <tr
              key={city.id}
              style={{
                background: city.isHighlighted ? 'rgba(17,130,122,0.06)' : 'white',
                borderBottom: '0.5px solid var(--color-line)',
                fontWeight: city.isHighlighted ? 600 : 400,
              }}
            >
              {COLUMNS.map((col) => {
                const val = city[col.key];
                const isDestin = city.isHighlighted;
                const rank = col.rankDir && isDestin ? getRank(cities, col.key, city.id, col.rankDir) : null;

                return (
                  <td
                    key={col.key}
                    style={{
                      padding: '10px 8px',
                      fontSize: '13px',
                      whiteSpace: 'nowrap',
                      textAlign: col.align === 'right' ? 'right' : 'left',
                      color: isDestin ? 'var(--color-accent-600)' : 'var(--color-ink-900)',
                    }}
                  >
                    <span>{col.format(val)}</span>
                    {rank && (
                      <span
                        style={{
                          marginLeft: '6px',
                          fontSize: '10px',
                          color: 'var(--color-accent-500)',
                          background: 'rgba(17,130,122,0.1)',
                          padding: '1px 5px',
                          borderRadius: '4px',
                          fontWeight: 500,
                        }}
                      >
                        {rank}
                      </span>
                    )}
                    {col.key === 'name' && isDestin && (
                      <span
                        style={{
                          marginLeft: '8px',
                          fontSize: '10px',
                          background: '#e8f0e8',
                          color: '#2d5a2d',
                          padding: '2px 6px',
                          borderRadius: '9999px',
                          fontWeight: 500,
                        }}
                      >
                        Subject
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
