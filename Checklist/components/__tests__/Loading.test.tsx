import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Loading, { LoadingSkeleton, CardSkeleton, TableSkeleton } from '../Loading';

describe('Loading Component', () => {
  it('renders a loading spinner', () => {
    render(<Loading />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute('aria-label', 'Loading');
  });

  it('renders with custom message', () => {
    render(<Loading message="Loading data..." />);
    expect(screen.getByText('Loading data...')).toBeInTheDocument();
  });

  it('renders full screen when fullScreen prop is true', () => {
    const { container } = render(<Loading fullScreen />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('min-h-screen');
  });

  it('renders with different sizes', () => {
    const { container: smallContainer } = render(<Loading size="small" />);
    const smallSpinner = smallContainer.querySelector('.h-6.w-6');
    expect(smallSpinner).toBeInTheDocument();

    const { container: largeContainer } = render(<Loading size="large" />);
    const largeSpinner = largeContainer.querySelector('.h-16.w-16');
    expect(largeSpinner).toBeInTheDocument();
  });
});

describe('LoadingSkeleton Component', () => {
  it('renders with default styles', () => {
    const { container } = render(<LoadingSkeleton />);
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveClass('animate-pulse', 'bg-gray-200', 'rounded');
    expect(skeleton).toHaveAttribute('role', 'status');
  });

  it('applies custom className', () => {
    const { container } = render(<LoadingSkeleton className="h-10 w-full" />);
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveClass('h-10', 'w-full');
  });
});

describe('CardSkeleton Component', () => {
  it('renders a card skeleton with multiple loading bars', () => {
    const { container } = render(<CardSkeleton />);
    const skeletons = container.querySelectorAll('[role="status"]');
    expect(skeletons).toHaveLength(3);
  });
});

describe('TableSkeleton Component', () => {
  it('renders default number of rows', () => {
    const { container } = render(<TableSkeleton />);
    const rows = container.querySelectorAll('[role="status"]');
    expect(rows).toHaveLength(5);
  });

  it('renders custom number of rows', () => {
    const { container } = render(<TableSkeleton rows={3} />);
    const rows = container.querySelectorAll('[role="status"]');
    expect(rows).toHaveLength(3);
  });
});
