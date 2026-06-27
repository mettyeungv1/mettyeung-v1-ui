"use client";

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = 'up',
  duration = 0.55,
}: AnimatedSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  const getInitialPosition = () => {
    if (shouldReduceMotion) {
      return { opacity: 1, x: 0, y: 0, filter: "blur(0px)" };
    }

    switch (direction) {
      case 'up':
        return { opacity: 0, y: 18, filter: "blur(6px)" };
      case 'down':
        return { opacity: 0, y: -14, filter: "blur(6px)" };
      case 'left':
        return { opacity: 0, x: -14, filter: "blur(6px)" };
      case 'right':
        return { opacity: 0, x: 14, filter: "blur(6px)" };
      case 'none':
        return { opacity: 0, x: 0, y: 0, filter: "blur(6px)" };
      default:
        return { opacity: 0, y: 18, filter: "blur(6px)" };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, margin: "-80px" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
