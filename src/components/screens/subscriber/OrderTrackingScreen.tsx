import { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Phone, Clock, Check, Package, Truck, Home as HomeIcon } from 'lucide-react';
import Card from '../../ui-system/Card';
import Button from '../../ui-system/Button';
import Badge from '../../ui-system/Badge';

interface Props {
  navigate: (screen: string, data?: any) => void;
  appState: any;
}

const stages = [
  { id: 'confirmed', label: 'Order Confirmed', icon: Check },
  { id: 'preparing', label: 'Preparing', icon: Package },
  { id: 'dispatched', label: 'Dispatched', icon: Truck },
  { id: 'delivered', label: 'Delivered', icon: HomeIcon }
];

export default function OrderTrackingScreen({ navigate, appState }: Props) {
  const order = appState.currentOrder || {};
  const [currentStage, setCurrentStage] = useState(0);
  const [countdown, setCountdown] = useState(15 * 60); // 15 minutes

  useEffect(() => {
    // Simulate order progression
    const stageInterval = setInterval(() => {
      setCurrentStage(prev => (prev < stages.length - 1 ? prev + 1 : prev));
    }, 10000); // Progress every 10 seconds

    // Countdown timer
    const countdownInterval = setInterval(() => {
      setCountdown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(stageInterval);
      clearInterval(countdownInterval);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full h-full bg-neutral-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center gap-4 border-b border-neutral-100">
        <button onClick={() => navigate('order-history')} className="text-neutral-700">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h2 className="text-neutral-900">Track Order</h2>
          <p className="text-neutral-600 text-sm">Order #{order.id}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-6">
        {/* Countdown Timer */}
        <div className="px-6 py-4">
          <Card variant="gradient" padding="lg" className="gradient-primary text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Clock className="text-white" size={24} />
              <h1 className="text-white">{formatTime(countdown)}</h1>
            </div>
            <p className="text-white/90">Estimated delivery time</p>
          </Card>
        </div>

        {/* Map Placeholder */}
        <div className="px-6 py-4">
          <Card variant="default" padding="none" className="h-48 bg-neutral-100 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="text-primary mx-auto mb-2" size={32} />
                <p className="text-neutral-700">IIT Bombay Campus</p>
                <p className="text-neutral-500 text-sm mt-1">{appState.selectedLocation}</p>
              </div>
            </div>
            
            {/* Simulated route dots */}
            <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-primary rounded-full animate-pulse" />
            <div className="absolute top-1/3 left-1/2 w-3 h-3 bg-primary/60 rounded-full" />
            <div className="absolute top-2/3 right-1/4 w-3 h-3 bg-primary/30 rounded-full" />
          </Card>
        </div>

        {/* Order Progress */}
        <div className="px-6 py-4">
          <Card variant="elevated" padding="lg">
            <h3 className="text-neutral-900 mb-6">Order Status</h3>
            
            <div className="space-y-6">
              {stages.map((stage, index) => {
                const Icon = stage.icon;
                const isComplete = index <= currentStage;
                const isCurrent = index === currentStage;

                return (
                  <div key={stage.id} className="flex items-start gap-4">
                    <div className="relative">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        isComplete 
                          ? 'bg-primary text-white' 
                          : 'bg-neutral-100 text-neutral-400'
                      } ${isCurrent ? 'ring-4 ring-primary/20' : ''}`}>
                        <Icon size={20} />
                      </div>
                      {index < stages.length - 1 && (
                        <div className={`absolute top-12 left-1/2 -translate-x-1/2 w-0.5 h-6 ${
                          isComplete ? 'bg-primary' : 'bg-neutral-200'
                        }`} />
                      )}
                    </div>

                    <div className="flex-1 pt-2">
                      <h4 className={`${isComplete ? 'text-neutral-900' : 'text-neutral-400'} mb-1`}>
                        {stage.label}
                      </h4>
                      {isCurrent && (
                        <Badge variant="primary" size="sm">In Progress</Badge>
                      )}
                      {isComplete && !isCurrent && (
                        <Badge variant="success" size="sm">Completed</Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Delivery Partner Info */}
        {currentStage >= 2 && (
          <div className="px-6 py-4">
            <Card variant="default" padding="md">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center">
                  <Truck className="text-white" size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="text-neutral-900">Rahul Kumar</h4>
                  <p className="text-neutral-600 text-sm">Delivery Partner</p>
                </div>
                <Button variant="ghost" size="sm" icon={<Phone size={16} />}>
                  Call
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Order Details */}
        <div className="px-6 py-4">
          <Card variant="default" padding="md">
            <h4 className="text-neutral-900 mb-3">Order Details</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Chef</span>
                <span className="text-neutral-900">{order.chefName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Slot</span>
                <span className="text-neutral-900">{order.slot}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Location</span>
                <span className="text-neutral-900">{order.location}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Total</span>
                <span className="text-neutral-900">₹{order.total}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Help Button */}
      <div className="px-6 py-4 bg-white border-t border-neutral-100">
        <Button fullWidth variant="outlined">
          Need Help?
        </Button>
      </div>
    </div>
  );
}
