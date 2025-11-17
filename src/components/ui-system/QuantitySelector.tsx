import { motion } from 'motion/react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function QuantitySelector({
  value,
  onChange,
  min = 0,
  max = 99,
  size = 'md'
}: QuantitySelectorProps) {
  const sizeStyles = {
    sm: { button: 'w-6 h-6', text: 'text-sm', container: 'gap-2' },
    md: { button: 'w-8 h-8', text: 'text-base', container: 'gap-3' },
    lg: { button: 'w-10 h-10', text: 'text-lg', container: 'gap-4' }
  };

  const styles = sizeStyles[size];

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  if (value === 0) {
    return (
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleIncrement}
        className="px-6 py-2 bg-primary/10 text-primary rounded-xl border-2 border-primary hover:bg-primary hover:text-white transition-colors"
      >
        Add
      </motion.button>
    );
  }

  return (
    <div className={`inline-flex items-center ${styles.container}`}>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleDecrement}
        disabled={value <= min}
        className={`${styles.button} flex items-center justify-center rounded-lg bg-primary text-white disabled:opacity-40 disabled:cursor-not-allowed`}
      >
        <Minus size={size === 'sm' ? 14 : size === 'md' ? 16 : 18} />
      </motion.button>

      <span className={`${styles.text} min-w-[32px] text-center text-neutral-900`}>
        {value}
      </span>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleIncrement}
        disabled={value >= max}
        className={`${styles.button} flex items-center justify-center rounded-lg bg-primary text-white disabled:opacity-40 disabled:cursor-not-allowed`}
      >
        <Plus size={size === 'sm' ? 14 : size === 'md' ? 16 : 18} />
      </motion.button>
    </div>
  );
}
