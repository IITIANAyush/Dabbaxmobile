import { ArrowLeft, MapPin, Clock, Package, Phone, Navigation, CheckCircle2, AlertCircle } from 'lucide-react';
import Card from '../../ui-system/Card';
import Badge from '../../ui-system/Badge';
import Button from '../../ui-system/Button';
import BottomNav from '../../ui-system/BottomNav';
import { motion } from 'motion/react';
import { useState } from 'react';

interface Props {
  navigate: (screen: string, data?: any) => void;
  appState: any;
}

interface Delivery {
  id: string;
  chefName: string;
  chefPhone: string;
  customerPhone: string;
  pickupLocation: string;
  dropLocation: string;
  pickupTime: string;
  deliveryTime: string;
  orderCount: number;
  totalAmount: number;
  deliveryFee: number;
  distance: string;
  paymentStatus: 'paid' | 'cod';
  status: 'picked-up' | 'in-transit' | 'at-pickup';
  instructions?: string;
}

const activeDeliveries: Delivery[] = [
  {
    id: 'D001',
    chefName: 'Annapurna Kitchen',
    chefPhone: '+91 98765 43210',
    customerPhone: '+91 98765 55555',
    pickupLocation: 'Hostel 5, Ground Floor, Room 102',
    dropLocation: 'CCD (Central Canteen), Near Main Gate',
    pickupTime: '12:30 PM',
    deliveryTime: '12:45 PM',
    orderCount: 8,
    totalAmount: 560,
    deliveryFee: 32,
    distance: '0.8 km',
    paymentStatus: 'paid',
    status: 'in-transit',
    instructions: 'Call before reaching. Handle with care.'
  },
  {
    id: 'D003',
    chefName: 'Spice Route',
    chefPhone: '+91 98765 43212',
    customerPhone: '+91 98765 66666',
    pickupLocation: 'Hostel 7, Block A, Room 204',
    dropLocation: 'VMCC (Visitor\'s Mess), 2nd Floor',
    pickupTime: '1:15 PM',
    deliveryTime: '1:30 PM',
    orderCount: 10,
    totalAmount: 700,
    deliveryFee: 40,
    distance: '1.2 km',
    paymentStatus: 'cod',
    status: 'at-pickup',
    instructions: 'Collect ₹700 cash on delivery'
  }
];

export default function ActiveDeliveriesScreen({ navigate, appState }: Props) {
  const [expandedDelivery, setExpandedDelivery] = useState<string | null>(activeDeliveries[0]?.id || null);

  const handlePickup = (deliveryId: string) => {
    console.log('Marking as picked up:', deliveryId);
    // Update status to picked-up/in-transit
  };

  const handleDeliver = (deliveryId: string) => {
    console.log('Marking as delivered:', deliveryId);
    // Complete the delivery
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'at-pickup':
        return { label: 'At Pickup', color: 'warning', icon: AlertCircle };
      case 'picked-up':
        return { label: 'Picked Up', color: 'info', icon: Package };
      case 'in-transit':
        return { label: 'In Transit', color: 'info', icon: Navigation };
      default:
        return { label: status, color: 'neutral', icon: Package };
    }
  };

  return (
    <div className="w-full h-full bg-neutral-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 pt-6 pb-4 border-b border-neutral-100">
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={() => navigate('delivery-dashboard')}
            className="w-10 h-10 bg-neutral-100 rounded-xl flex items-center justify-center cursor-pointer hover:bg-neutral-200 transition-colors"
          >
            <ArrowLeft className="text-neutral-900" size={20} />
          </button>
          <div className="flex-1">
            <h2 className="text-neutral-900">Active Deliveries</h2>
            <p className="text-neutral-600 text-sm">{activeDeliveries.length} ongoing</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 px-6 pt-4">
        {activeDeliveries.length > 0 ? (
          <div className="space-y-4">
            {activeDeliveries.map((delivery, index) => {
              const statusInfo = getStatusInfo(delivery.status);
              const StatusIcon = statusInfo.icon;
              const isExpanded = expandedDelivery === delivery.id;

              return (
                <motion.div
                  key={delivery.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    variant="elevated" 
                    padding="md" 
                    className={`border-2 ${delivery.status === 'in-transit' ? 'border-primary' : 'border-transparent'}`}
                  >
                    {/* Header with Status */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                          <Package className="text-white" size={20} />
                        </div>
                        <div>
                          <h4 className="text-neutral-900">{delivery.chefName}</h4>
                          <Badge variant="neutral" size="sm">#{delivery.id}</Badge>
                        </div>
                      </div>
                      <Badge variant={statusInfo.color as any} size="sm" icon={<StatusIcon size={14} />}>
                        {statusInfo.label}
                      </Badge>
                    </div>

                    {/* Route Overview */}
                    <div className="space-y-3 mb-4 bg-neutral-50 rounded-xl p-4">
                      {/* Pickup Section */}
                      <div>
                        <div className="flex items-start gap-3 mb-2">
                          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                            <MapPin className="text-white" size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-neutral-600 text-xs mb-0.5">Pickup from</p>
                            <p className="text-neutral-900 text-sm">{delivery.pickupLocation}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Clock className="text-primary" size={14} />
                              <span className="text-primary text-xs">{delivery.pickupTime}</span>
                            </div>
                          </div>
                        </div>

                        {/* Chef Contact */}
                        <div className="flex items-center gap-2 pl-11">
                          <a 
                            href={`tel:${delivery.chefPhone}`}
                            className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg text-primary text-xs hover:bg-primary/5 transition-colors"
                          >
                            <Phone size={14} />
                            <span>Call Chef</span>
                          </a>
                          <span className="text-neutral-500 text-xs">{delivery.chefPhone}</span>
                        </div>
                      </div>

                      {/* Journey Line */}
                      <div className="flex items-center gap-2 pl-4">
                        <div className="w-px h-8 bg-neutral-300 relative">
                          {delivery.status === 'in-transit' && (
                            <motion.div 
                              className="absolute w-2 h-2 bg-primary rounded-full -left-[3px]"
                              animate={{ top: ['0%', '100%'] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          )}
                        </div>
                        <span className="text-neutral-500 text-xs">{delivery.distance} • {delivery.orderCount} orders</span>
                      </div>

                      {/* Drop Section */}
                      <div>
                        <div className="flex items-start gap-3 mb-2">
                          <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Navigation className="text-white" size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-neutral-600 text-xs mb-0.5">Deliver to</p>
                            <p className="text-neutral-900 text-sm">{delivery.dropLocation}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Clock className="text-secondary" size={14} />
                              <span className="text-secondary text-xs">by {delivery.deliveryTime}</span>
                            </div>
                          </div>
                        </div>

                        {/* Customer Contact */}
                        <div className="flex items-center gap-2 pl-11">
                          <a 
                            href={`tel:${delivery.customerPhone}`}
                            className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg text-secondary text-xs hover:bg-secondary/5 transition-colors"
                          >
                            <Phone size={14} />
                            <span>Call Customer</span>
                          </a>
                          <span className="text-neutral-500 text-xs">{delivery.customerPhone}</span>
                        </div>
                      </div>
                    </div>

                    {/* Payment & Order Info */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="bg-green-50 rounded-lg p-2.5">
                        <p className="text-green-700 text-xs mb-0.5">Your Earning</p>
                        <p className="text-green-900">₹{delivery.deliveryFee}</p>
                      </div>

                      <div className={`${delivery.paymentStatus === 'paid' ? 'bg-green-50' : 'bg-amber-50'} rounded-lg p-2.5`}>
                        <p className={`${delivery.paymentStatus === 'paid' ? 'text-green-700' : 'text-amber-700'} text-xs mb-0.5`}>
                          Payment
                        </p>
                        <p className={`${delivery.paymentStatus === 'paid' ? 'text-green-900' : 'text-amber-900'} text-xs uppercase`}>
                          {delivery.paymentStatus}
                        </p>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-2.5">
                        <p className="text-blue-700 text-xs mb-0.5">Total Value</p>
                        <p className="text-blue-900 text-sm">₹{delivery.totalAmount}</p>
                      </div>
                    </div>

                    {/* COD Collection Alert */}
                    {delivery.paymentStatus === 'cod' && (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 flex items-start gap-2">
                        <AlertCircle className="text-amber-600 flex-shrink-0 mt-0.5" size={16} />
                        <div>
                          <p className="text-amber-900 text-sm">Collect ₹{delivery.totalAmount} cash</p>
                          <p className="text-amber-700 text-xs">Cash on Delivery - Verify before handover</p>
                        </div>
                      </div>
                    )}

                    {/* Instructions */}
                    {delivery.instructions && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                        <p className="text-blue-900 text-xs mb-1">Special Instructions:</p>
                        <p className="text-blue-700 text-sm">{delivery.instructions}</p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outlined"
                        size="md"
                        onClick={() => {/* Open maps/navigation */}}
                        icon={<Navigation size={18} />}
                      >
                        Navigate
                      </Button>

                      {delivery.status === 'at-pickup' ? (
                        <Button
                          variant="primary"
                          size="md"
                          onClick={() => handlePickup(delivery.id)}
                          icon={<Package size={18} />}
                        >
                          Mark Picked Up
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          size="md"
                          onClick={() => handleDeliver(delivery.id)}
                          icon={<CheckCircle2 size={18} />}
                        >
                          Mark Delivered
                        </Button>
                      )}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16 px-6">
            <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
              <Package className="text-neutral-400" size={40} />
            </div>
            <h3 className="text-neutral-900 mb-2">No Active Deliveries</h3>
            <p className="text-neutral-600 text-center text-sm mb-6">
              You don't have any ongoing deliveries at the moment
            </p>
            <Button
              variant="primary"
              onClick={() => navigate('available-deliveries')}
              icon={<Package size={18} />}
            >
              Browse Available Orders
            </Button>
          </div>
        )}

        {/* Quick Tips */}
        {activeDeliveries.length > 0 && (
          <Card variant="outlined" padding="md" className="mt-4 border-primary/30">
            <h4 className="text-neutral-900 mb-2">Quick Tips</h4>
            <ul className="space-y-1 text-sm text-neutral-600">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Call ahead if you're running late</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Verify COD amount before handover</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Handle food packages with care</span>
              </li>
            </ul>
          </Card>
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
