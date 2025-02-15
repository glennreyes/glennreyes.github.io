'use client';

import type { ReactNode } from 'react';

import { useRef, useState } from 'react';

import { Intersection } from './intersection';

interface IntersectionProviderProps {
  children: ReactNode;
}

export const IntersectionProvider = ({
  children,
}: IntersectionProviderProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [instance, setInstance] = useState<IntersectionObserverEntry | null>(
    null,
  );
  const isInView = instance?.isIntersecting ?? true;

  return (
    <Intersection.Provider value={{ isInView, ref, setInstance }}>
      {children}
    </Intersection.Provider>
  );
};
