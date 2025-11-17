import { ArrowLeft, Star, RotateCcw, ChevronRight } from 'lucide-react';
import Card from '../../ui-system/Card';
import Badge from '../../ui-system/Badge';
import Button from '../../ui-system/Button';
import BottomNav from '../../ui-system/BottomNav';

interface Props {
  navigate: (screen: string, data?: any) => void;
  appState: any;
  updateAppState: (updates: any) => void;
}

const mockOrders = [
  {
    id: 'ORD1234567890',
    chefName: 'Maharaj Kitchen',
    items: [{ name: 'Paneer Butter Masala', quantity: 2 }, { name: 'Dal Makhani', quantity: 1 }],
    total: 285,
    status: 'delivered',
    date: 'Today, 1:30 PM',
    slot: '12:30 PM',
    canReorder: true,
    needsRating: true
  },
  {
    id: 'ORD1234567889',
    chefName: 'South Delight',
    items: [{ name: 'Dosa', quantity: 2 }],
    total: 165,
    status: 'delivered',
    date: 'Yesterday, 12:45 PM',
    slot: '12:00 PM',
    canReorder: true,
    needsRating: false
  },
  {
    id: 'ORD1234567888',
    chefName: 'Thali Express',
    items: [{ name: 'Veg Thali', quantity: 1 }],
    total: 145,
    status: 'delivered',
    date: 'Nov 6, 1:15 PM',
    slot: '1:00 PM',
    canReorder: true,
    needsRating: false
  }
];

export default function OrderHistoryScreen({ navigate, appState, updateAppState }: Props) {
  const orders = appState.orderHistory?.length > 0 ? appState.orderHistory : mockOrders;

  const handleReorder = (order: any) => {
    // Set cart with previous order items
    updateAppState({ cart: order.items });
    navigate('cart');
  };

  const handleViewDetails = (order: any) => {
    updateAppState({ currentOrder: order });
    navigate('order-tracking');
  };

  return (
    <div className="w-full h-full bg-neutral-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center gap-4 border-b border-neutral-100">
        <button onClick={() => navigate('subscriber-home')} className="text-neutral-700">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-neutral-900">Order History</h2>
      </div>

      {orders.length === 0 ? (
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto bg-neutral-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-4xl">📦</span>
            </div>
            <h3 className="text-neutral-900 mb-2">No orders yet</h3>
            <p className="text-neutral-600 mb-6">Start ordering delicious meals from campus chefs</p>
            <Button onClick={() => navigate('subscriber-home')}>
              Browse Chefs
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto pb-24 px-6 py-4">
          <div className="space-y-4">
            {orders.map((order: any) => (
              <Card key={order.id} variant="elevated" padding="md">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-neutral-900 mb-1">{order.chefName}</h4>
                    <p className="text-neutral-600 text-sm">{order.date}</p>
                  </div>
                  <Badge 
                    variant={order.status === 'delivered' ? 'success' : 'info'}
                    size="sm"
                  >
                    {order.status}
                  </Badge>
                </div>

                <div className="py-3 border-t border-b border-neutral-100 space-y-1">
                  {order.items.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-neutral-700">{item.name} x{item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-3 mb-4">
                  <span className="text-neutral-700">Total</span>
                  <span className="text-neutral-900">₹{order.total}</span>
                </div>

                {order.needsRating && (
                  <div className="mb-3 p-3 bg-amber-50 rounded-xl border border-amber-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="text-amber-500" size={16} />
                      <span className="text-sm text-amber-900">Rate your experience</span>
                    </div>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          className="w-8 h-8 rounded-lg bg-white border border-amber-200 flex items-center justify-center hover:bg-amber-100 transition-colors"
                        >
                          <Star size={16} className="text-amber-500" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  {order.canReorder && (
                    <Button
                      variant="outlined"
                      size="sm"
                      icon={<RotateCcw size={16} />}
                      onClick={() => handleReorder(order)}
                      className="flex-1"
                    >
                      Reorder
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<ChevronRight size={16} />}
                    iconPosition="right"
                    onClick={() => handleViewDetails(order)}
                    className="flex-1"
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNav 
        activeScreen={appState.currentScreen} 
        onNavigate={navigate} 
        role="subscriber"
      />
    </div>
  );
}
