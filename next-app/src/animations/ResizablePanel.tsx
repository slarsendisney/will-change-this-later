"use client"
import { useRef } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import useResizeObserver from 'use-resize-observer';


const ignoreCircularReferences = () => {
  const seen = new WeakSet();

  return (key: string, value: string) => {
    if (key.startsWith('_')) {
      return;
    } // Don't compare React's internal props.
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }

    return value;
  };
};

const DURATION = 0.25;

export const ResizablePanel = ({
  children,
  initialHeight,
}: {
  children: React.ReactNode;
  initialHeight?: number;
}): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const { height } = useResizeObserver({ ref });

  return (
    <m.div
      initial={{ height: initialHeight }}
      animate={{ height: height ? height+10  : 'auto' }}
      className="relative overflow-scroll w-full"
      // className="relative overflow-hidden w-full"
    >
      <AnimatePresence initial={false}>
        <m.div
          key={JSON.stringify(children, ignoreCircularReferences())}
          animate={{
            transition: { duration: DURATION / 2, delay: DURATION / 2 },
          }}
          exit={{
            transition: { duration: DURATION / 2 },
          }}
        >
          <div ref={ref}>{children}</div>
        </m.div>
      </AnimatePresence>
    </m.div>
  );
};
