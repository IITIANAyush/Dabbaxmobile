import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Card from '../../ui-system/Card';
import Button from '../../ui-system/Button';
import SlotBadge from '../../ui-system/SlotBadge';
import BottomNav from '../../ui-system/BottomNav';

interface Props {
  navigate: (screen: string, data?: any) => void;
  appState: any;
}

const availableSlots = [
  { time: '12:00 PM', orders: 15 },
  { time: '12:15 PM', orders: 8 },
  { time: '12:30 PM', orders: 12 },
  { time: '12:45 PM', orders: 5 },
  { time: '1:00 PM', orders: 15 },
  { time: '1:15 PM', orders: 7 },
  { time: '1:30 PM', orders: 10 }
];

export default function SlotSchedulingScreen({ navigate, appState }: Props) {
  const [selectedSlots, setSelectedSlots] = useState(['12:00 PM', '12:30 PM', '1:00 PM']);

  const toggleSlot = (time: string) => {
    if (selectedSlots.includes(time)) {
      setSelectedSlots(selectedSlots.filter(s => s !== time));
    } else if (selectedSlots.length < 3) {
      setSelectedSlots([...selectedSlots, time]);
    }
  };

  return (
    <div className="w-full h-full bg-neutral-50 flex flex-col">
      <div className="bg-white px-6 py-4 border-b border-neutral-100">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('chef-dashboard')} className="text-neutral-700">
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
            <h2 className="text-neutral-900">Slot Scheduling</h2>
            <p className="text-neutral-600 text-sm">Select 3 delivery slots</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-32 px-6 py-4">
        <Card variant="default" padding="md" className="bg-blue-50 border border-blue-200 mb-4">
          <p className="text-blue-900 text-sm">
            ℹ️ Selected {selectedSlots.length}/3 slots. Orders will be assigned to these time slots.
          </p>
        </Card>

        <div className="space-y-3">
          {availableSlots.map((slot) => (
            <Card
              key={slot.time}
              variant="default"
              padding="md"
              onClick={() => toggleSlot(slot.time)}
              hoverable
              className={`border-2 ${selectedSlots.includes(slot.time) ? 'border-primary bg-primary/5' : 'border-transparent'}`}
            >
              <div className="flex items-center justify-between">
                <SlotBadge time={slot.time} isSelected={selectedSlots.includes(slot.time)} ordersCount={slot.orders} />
                <span className="text-neutral-600 text-sm">{slot.orders} current orders</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="absolute bottom-20 left-0 right-0 px-6 py-4 bg-white border-t border-neutral-100">
        <Button fullWidth disabled={selectedSlots.length !== 3}>
          Save Slot Plan
        </Button>
      </div>

      <BottomNav activeScreen={appState.currentScreen} onNavigate={navigate} role="chef" />
    </div>
  );
}
