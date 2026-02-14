import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Destin, FL — Building Permit Comparison Study | Set4',
  description:
    'Benchmarking analysis of permit fees, processes, and development activity across comparable Florida municipalities.',
  robots: { index: false, follow: false },
};

export default function DestinStudyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
