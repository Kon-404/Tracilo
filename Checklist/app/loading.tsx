import Loading from '@/components/Loading';

/**
 * Global loading UI for Suspense boundaries
 *
 * Shown automatically by Next.js when pages are loading
 */
export default function GlobalLoading() {
  return <Loading fullScreen message="Loading..." />;
}
