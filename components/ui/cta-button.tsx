"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  external?: boolean;
}

export function CTAButton({ 
  href, 
  children, 
  variant = 'primary', 
  size = 'md', 
  className,
  external = false 
}: CTAButtonProps) {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary-900 text-white hover:bg-primary-950 focus:ring-primary-900 border border-transparent hover:border-accent-400",
    secondary: "bg-white text-primary-900 hover:bg-neutral-100 focus:ring-primary-900 border border-primary-900 hover:border-primary-950",
    outline: "bg-transparent text-primary-900 hover:bg-primary-900 hover:text-white focus:ring-primary-900 border border-primary-900",
    accent: "bg-accent-400 text-white hover:bg-accent-500 focus:ring-accent-400 border border-transparent hover:border-accent-600"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const buttonClasses = cn(
    baseClasses,
    variants[variant],
    sizes[size],
    className
  );

  const MotionLink = motion(Link);

  if (external) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <MotionLink
      href={href}
      className={buttonClasses}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </MotionLink>
  );
}