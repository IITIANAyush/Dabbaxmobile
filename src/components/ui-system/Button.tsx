import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outlined' | 'ghost' | 'text';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  onClick,
  className = ''
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer select-none';
  
  const variantStyles = {
    primary: 'gradient-primary text-white shadow-md hover:shadow-lg active:scale-[0.98]',
    secondary: 'bg-neutral-900 text-white shadow-md hover:shadow-lg active:scale-[0.98]',
    outlined: 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white active:scale-[0.98]',
    ghost: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-300 active:scale-[0.98]',
    text: 'bg-transparent text-primary hover:bg-primary/10 active:scale-[0.98]'
  };

  const sizeStyles = {
    sm: 'h-9 px-3 rounded-lg gap-1.5',
    md: 'h-12 px-5 rounded-xl gap-2',
    lg: 'h-14 px-6 rounded-2xl gap-2.5'
  };

  const disabledStyles = disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : '';
  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <motion.button
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${widthStyles} ${className}`}
    >
      {icon && iconPosition === 'left' && <span>{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span>{icon}</span>}
    </motion.button>
  );
}
