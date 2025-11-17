import { Bike, Car, Zap } from 'lucide-react';

interface VehicleTagProps {
  type: 'bike' | 'auto' | 'ev-small';
  isSelected?: boolean;
  onClick?: () => void;
  capacity?: string;
  showDetails?: boolean;
}

export default function VehicleTag({
  type,
  isSelected = false,
  onClick,
  capacity,
  showDetails = false
}: VehicleTagProps) {
  const vehicleConfig = {
    bike: {
      icon: Bike,
      label: 'Bike',
      capacity: '5 boxes',
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    auto: {
      icon: Car,
      label: 'Auto',
      capacity: '15 boxes',
      color: 'bg-green-50 text-green-600 border-green-200'
    },
    'ev-small': {
      icon: Zap,
      label: 'EV Small',
      capacity: '10 boxes',
      color: 'bg-purple-50 text-purple-600 border-purple-200'
    }
  };

  const config = vehicleConfig[type];
  const Icon = config.icon;

  const baseStyles = 'inline-flex items-center gap-2 rounded-xl transition-all duration-200';
  
  const stateStyles = isSelected
    ? 'bg-primary text-white shadow-md border-2 border-primary'
    : `${config.color} border-2 hover:scale-105`;

  const clickableStyles = onClick ? 'cursor-pointer' : '';

  if (showDetails) {
    return (
      <button
        onClick={onClick}
        className={`${baseStyles} ${stateStyles} ${clickableStyles} flex-col p-6 min-w-[100px]`}
      >
        <Icon size={32} strokeWidth={2} />
        <span className="mt-2">{config.label}</span>
        <span className="text-xs opacity-80">{capacity || config.capacity}</span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${stateStyles} ${clickableStyles} px-3 py-1.5`}
    >
      <Icon size={16} />
      <span className="text-sm">{config.label}</span>
    </button>
  );
}
