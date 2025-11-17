import { useState } from 'react';
import { ArrowLeft, Clock, AlertCircle } from 'lucide-react';
import Card from '../../ui-system/Card';
import Badge from '../../ui-system/Badge';
import Button from '../../ui-system/Button';
import BottomNav from '../../ui-system/BottomNav';

interface Props {
  navigate: (screen: string, data?: any) => void;
  appState: any;
}

const orders = {
  new: [
    { id: 'ORD001', items: '2x Paneer Masala, 1x Dal', slot: '12:00 PM', dispatchIn: 15, total: 190 },
    { id: 'ORD002', items: '1x Thali', slot: '12:00 PM', dispatchIn: 15, total: 65 }
  ],
  preparing: [
    { id: 'ORD003', items: '3x Dosa', slot: '12:30 PM', dispatchIn: 45, total: 165 }
  ],
  completed: [
    { id: 'ORD004', items: '2x Biryani', slot: '11:45 AM', completed: true, total: 140 }
  ]
};

export default function OrdersScreen({ navigate, appState }: Props) {
  const [activeTab, setActiveTab] = useState<'new' | 'preparing' | 'completed'>('new');
  const currentOrders = orders[activeTab];

  return (
    <div className="w-full h-full bg-neutral-50 flex flex-col">
      <div className="bg-white px-6 py-4 border-b border-neutral-100">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => navigate('chef-dashboard')} className="text-neutral-700">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-neutral-900">Orders</h2>
        </div>

        <div className="flex gap-2">
          {(['new', 'preparing', 'completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm transition-all ${
                activeTab === tab ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-md' : 'bg-neutral-100 text-neutral-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} ({orders[tab].length})
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 px-6 py-4">
        {currentOrders.map((order: any) => (
          <Card key={order.id} variant="elevated" padding="md" className="mb-3">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-neutral-900 mb-1">Order #{order.id}</h4>
                <p className="text-neutral-600 text-sm">{order.items}</p>
              </div>
              <Badge variant={order.completed ? 'success' : 'warning'} size="sm">{order.slot}</Badge>
            </div>

            {!order.completed && (
              <div className="flex items-center gap-2 mb-3 p-2 bg-amber-50 rounded-lg">
                <Clock className="text-amber-600" size={16} />
                <span className="text-sm text-amber-900">Dispatch in {order.dispatchIn} mins</span>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
              <span className="text-neutral-700">₹{order.total}</span>
              {activeTab === 'new' && (
                <Button size="sm">Accept</Button>
              )}
              {activeTab === 'preparing' && (
                <Button size="sm" variant="outlined">Mark Ready</Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      <BottomNav activeScreen={appState.currentScreen} onNavigate={navigate} role="chef" />
    </div>
  );
}
