'use client';

import { useEffect } from 'react';
import { initPostHog, posthog } from '@/lib/posthog';

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initPostHog();

    // Track the specific page
    posthog.capture('destin_permit_study_viewed', {
      page: 'permit-fee-study',
      client: 'destin',
    });
  }, []);

  return <>{children}</>;
}
