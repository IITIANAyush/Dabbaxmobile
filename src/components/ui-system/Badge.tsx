import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  className?: string;
}

export default function Badge({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = ''
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center gap-1.5 rounded-full';
  
  const variantStyles = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-green-50 text-green-600',
    warning: 'bg-amber-50 text-amber-600',
    error: 'bg-red-50 text-red-600',
    info: 'bg-blue-50 text-blue-600',
    neutral: 'bg-neutral-100 text-neutral-700'
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5'
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
