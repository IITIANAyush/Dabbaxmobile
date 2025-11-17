import { Clock } from 'lucide-react';

interface SlotBadgeProps {
  time: string;
  isSelected?: boolean;
  isAvailable?: boolean;
  ordersCount?: number;
  onClick?: () => void;
  variant?: 'default' | 'compact';
}

export default function SlotBadge({
  time,
  isSelected = false,
  isAvailable = true,
  ordersCount,
  onClick,
  variant = 'default'
}: SlotBadgeProps) {
  const baseStyles = 'inline-flex items-center gap-2 rounded-xl transition-all duration-200 cursor-pointer';
  
  const stateStyles = isSelected
    ? 'bg-primary text-white shadow-md'
    : isAvailable
    ? 'bg-white border-2 border-neutral-200 text-neutral-900 hover:border-primary hover:bg-primary/5'
    : 'bg-neutral-100 text-neutral-400 cursor-not-allowed opacity-60';

  const sizeStyles = variant === 'compact' ? 'px-3 py-1.5' : 'px-4 py-2.5';

  return (
    <button
      onClick={isAvailable ? onClick : undefined}
      disabled={!isAvailable}
      className={`${baseStyles} ${stateStyles} ${sizeStyles}`}
    >
      <Clock size={variant === 'compact' ? 14 : 16} />
      <span className={variant === 'compact' ? 'text-sm' : ''}>{time}</span>
      {ordersCount !== undefined && ordersCount > 0 && (
        <span className={`px-2 py-0.5 rounded-full ${isSelected ? 'bg-white/20' : 'bg-primary/10 text-primary'} text-xs`}>
          {ordersCount}
        </span>
      )}
    </button>
  );
}
