import { ArrowLeft, MapPin, Clock, Package, DollarSign, Navigation } from 'lucide-react';
import Card from '../../ui-system/Card';
import Badge from '../../ui-system/Badge';
import Button from '../../ui-system/Button';
import BottomNav from '../../ui-system/BottomNav';
import { motion } from 'motion/react';

interface Props {
  navigate: (screen: string, data?: any) => void;
  appState: any;
}

const availableOrders = [
  {
    id: 'D001',
    chefName: 'Annapurna Kitchen',
    chefPhone: '+91 98765 43210',
    pickupLocation: 'Hostel 5, Ground Floor',
    dropLocation: 'CCD (Central Canteen)',
    pickupTime: '12:30 PM',
    deliveryTime: '12:45 PM',
    orderCount: 8,
    totalAmount: 560,
    deliveryFee: 32,
    distance: '0.8 km',
    paymentStatus: 'paid',
    priority: 'high'
  },
  {
    id: 'D002',
    chefName: 'Home Bites',
    chefPhone: '+91 98765 43211',
    pickupLocation: 'Hostel 3, Block A',
    dropLocation: 'LHC (Lecture Hall Complex)',
    pickupTime: '1:00 PM',
    deliveryTime: '1:15 PM',
    orderCount: 5,
    totalAmount: 350,
    deliveryFee: 24,
    distance: '0.6 km',
    paymentStatus: 'paid',
    priority: 'medium'
  },
  {
    id: 'D003',
    chefName: 'Spice Route',
    chefPhone: '+91 98765 43212',
    pickupLocation: 'Hostel 7, Room 204',
    dropLocation: 'VMCC (Visitor\'s Mess)',
    pickupTime: '1:15 PM',
    deliveryTime: '1:30 PM',
    orderCount: 10,
    totalAmount: 700,
    deliveryFee: 40,
    distance: '1.2 km',
    paymentStatus: 'cod',
    priority: 'high'
  },
  {
    id: 'D004',
    chefName: 'Desi Dhaba',
    chefPhone: '+91 98765 43213',
    pickupLocation: 'Hostel 2, Ground Floor',
    dropLocation: 'SOM (School of Management)',
    pickupTime: '12:45 PM',
    deliveryTime: '1:00 PM',
    orderCount: 6,
    totalAmount: 420,
    deliveryFee: 28,
    distance: '0.9 km',
    paymentStatus: 'paid',
    priority: 'medium'
  },
  {
    id: 'D005',
    chefName: 'Healthy Bites',
    chefPhone: '+91 98765 43214',
    pickupLocation: 'Hostel 4, Block B',
    dropLocation: 'CCD (Central Canteen)',
    pickupTime: '1:30 PM',
    deliveryTime: '1:45 PM',
    orderCount: 4,
    totalAmount: 280,
    deliveryFee: 20,
    distance: '0.5 km',
    paymentStatus: 'paid',
    priority: 'low'
  }
];

export default function AvailableDeliveriesScreen({ navigate, appState }: Props) {
  const handleAcceptOrder = (orderId: string) => {
    // In a real app, this would update the backend and add to active deliveries
    console.log('Accepted order:', orderId);
    navigate('active-deliveries');
  };

  return (
    <div className="w-full h-full bg-neutral-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 pt-6 pb-4 border-b border-neutral-100">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => navigate('delivery-dashboard')}
            className="w-10 h-10 bg-neutral-100 rounded-xl flex items-center justify-center cursor-pointer hover:bg-neutral-200 transition-colors"
          >
            <ArrowLeft className="text-neutral-900" size={20} />
          </button>
          <div className="flex-1">
            <h2 className="text-neutral-900">Available Deliveries</h2>
            <p className="text-neutral-600 text-sm">{availableOrders.length} orders waiting</p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button className="px-4 py-2 bg-primary text-white rounded-full text-sm whitespace-nowrap">
            All ({availableOrders.length})
          </button>
          <button className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-full text-sm whitespace-nowrap hover:bg-neutral-200">
            High Priority (2)
          </button>
          <button className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-full text-sm whitespace-nowrap hover:bg-neutral-200">
            Near Me (8)
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 px-6 pt-4">
        <div className="space-y-4">
          {availableOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="elevated" padding="md" className="relative">
                {/* Priority Badge */}
                {order.priority === 'high' && (
                  <div className="absolute top-3 right-3">
                    <Badge variant="error" size="sm">High Priority</Badge>
                  </div>
                )}

                {/* Order ID and Chef */}
                <div className="mb-3 pr-20">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-neutral-900">{order.chefName}</h4>
                    <Badge variant="neutral" size="sm">#{order.id}</Badge>
                  </div>
                  <p className="text-neutral-600 text-sm">{order.chefPhone}</p>
                </div>

                {/* Route Info */}
                <div className="space-y-3 mb-4 bg-neutral-50 rounded-xl p-3">
                  {/* Pickup */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="text-white" size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-neutral-600 text-xs mb-0.5">Pickup from</p>
                      <p className="text-neutral-900 text-sm">{order.pickupLocation}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="text-primary" size={14} />
                        <span className="text-primary text-xs">{order.pickupTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="flex items-center gap-2 pl-4">
                    <div className="w-px h-6 bg-neutral-300"></div>
                    <span className="text-neutral-500 text-xs">{order.distance}</span>
                  </div>

                  {/* Drop */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Navigation className="text-white" size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-neutral-600 text-xs mb-0.5">Deliver to</p>
                      <p className="text-neutral-900 text-sm">{order.dropLocation}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="text-secondary" size={14} />
                        <span className="text-secondary text-xs">by {order.deliveryTime}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-blue-50 rounded-lg p-2">
                    <div className="flex items-center gap-1 mb-1">
                      <Package className="text-blue-700" size={14} />
                    </div>
                    <p className="text-blue-700 text-xs">Orders</p>
                    <p className="text-blue-900">{order.orderCount}</p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-2">
                    <div className="flex items-center gap-1 mb-1">
                      <DollarSign className="text-green-700" size={14} />
                    </div>
                    <p className="text-green-700 text-xs">You Earn</p>
                    <p className="text-green-900">₹{order.deliveryFee}</p>
                  </div>

                  <div className={`${order.paymentStatus === 'paid' ? 'bg-green-50' : 'bg-amber-50'} rounded-lg p-2`}>
                    <p className={`${order.paymentStatus === 'paid' ? 'text-green-700' : 'text-amber-700'} text-xs mb-1`}>
                      Payment
                    </p>
                    <p className={`${order.paymentStatus === 'paid' ? 'text-green-900' : 'text-amber-900'} text-xs uppercase`}>
                      {order.paymentStatus}
                    </p>
                    {order.paymentStatus === 'cod' && (
                      <p className="text-amber-900 text-xs">₹{order.totalAmount}</p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="outlined"
                    size="md"
                    className="flex-1"
                    onClick={() => {/* View details */}}
                  >
                    Details
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    className="flex-1"
                    onClick={() => handleAcceptOrder(order.id)}
                    icon={<Package size={18} />}
                  >
                    Accept
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State if no orders */}
        {availableOrders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-6">
            <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
              <Package className="text-neutral-400" size={40} />
            </div>
            <h3 className="text-neutral-900 mb-2">No Deliveries Available</h3>
            <p className="text-neutral-600 text-center text-sm">
              Check back soon for new delivery opportunities
            </p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav
        activeScreen={appState.currentScreen}
        onNavigate={navigate}
        role="delivery"
      />
    </div>
  );
}
