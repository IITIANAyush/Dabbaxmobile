import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'gradient';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  hoverable?: boolean;
}

export default function Card({
  children,
  variant = 'default',
  padding = 'md',
  onClick,
  className = '',
  hoverable = false
}: CardProps) {
  const baseStyles = 'bg-white rounded-2xl transition-all duration-200';
  
  const variantStyles = {
    default: 'shadow-sm',
    elevated: 'shadow-md hover:shadow-lg',
    outlined: 'border-2 border-neutral-100',
    gradient: 'gradient-card shadow-sm'
  };

  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  const interactiveStyles = (onClick || hoverable) 
    ? 'cursor-pointer hover:shadow-lg active:scale-[0.99]' 
    : '';

  const Component = (onClick || hoverable) ? motion.div : 'div';
  const motionProps = (onClick || hoverable) ? {
    whileTap: { scale: 0.99 },
    whileHover: { y: -2 }
  } : {};

  return (
    <Component
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${interactiveStyles} ${className}`}
      {...motionProps}
    >
      {children}
    </Component>
  );
}
