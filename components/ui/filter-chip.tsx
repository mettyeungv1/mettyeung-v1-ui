"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterChipProps {
  label: string;
  active?: boolean;
  removable?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

export function FilterChip({
  label,
  active = false,
  removable = false,
  onClick,
  onRemove,
  variant = 'default',
  size = 'default',
  className,
}: FilterChipProps) {
  const baseClasses = "inline-flex items-center gap-1 rounded-full font-medium transition-all duration-200 cursor-pointer select-none";
  
  const variantClasses = {
    default: active 
      ? "bg-primary-900 text-white border border-primary-900 shadow-sm hover:bg-primary-950 active:bg-primary-950" 
      : "bg-white text-text-primary border border-neutral-300 hover:bg-primary-50 hover:border-primary-300 hover:text-primary-900 active:bg-primary-100",
    outline: active 
      ? "bg-primary-900 text-white border border-primary-900 shadow-sm hover:bg-primary-950 active:bg-primary-950" 
      : "bg-transparent text-primary-900 border border-primary-900 hover:bg-primary-900 hover:text-white active:bg-primary-950 active:text-white",
    secondary: active 
      ? "bg-accent-400 text-white border border-accent-400 shadow-sm hover:bg-accent-500 active:bg-accent-600" 
      : "bg-neutral-100 text-text-primary border border-neutral-300 hover:bg-neutral-200 hover:border-neutral-400 active:bg-neutral-300",
  };
  
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    default: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.();
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove?.();
  };

  return (
    <motion.div
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
    >
      <span className="truncate">{label}</span>
      {removable && (
        <button
          onClick={handleRemove}
          className={cn(
            "ml-1 rounded-full p-0.5 transition-colors duration-200",
            active 
              ? "hover:bg-white/20 text-white/80 hover:text-white" 
              : "hover:bg-neutral-200 text-text-muted hover:text-text-primary"
          )}
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </motion.div>
  );
}