import React, { ReactNode } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  threshold?: number;
  rootMargin?: string;
  className?: string;
}

const ScrollReveal = ({
  children,
  delay = 0,
  direction = 'up',
  threshold = 0.1,
  rootMargin = '0px',
  className = '',
}: ScrollRevealProps) => {
  const ref = useScrollReveal({ threshold, rootMargin }) as React.RefObject<HTMLDivElement>;

  let transformInitial = '';
  switch (direction) {
    case 'up':
      transformInitial = 'translateY(30px)';
      break;
    case 'down':
      transformInitial = 'translateY(-30px)';
      break;
    case 'left':
      transformInitial = 'translateX(30px)';
      break;
    case 'right':
      transformInitial = 'translateX(-30px)';
      break;
    default:
      transformInitial = 'none';
  }

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${className}`}
      style={{
        transform: transformInitial,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal; 