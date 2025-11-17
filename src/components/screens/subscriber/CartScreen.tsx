import { useState } from 'react';
import { ArrowLeft, MapPin, Clock, Info } from 'lucide-react';
import Card from '../../ui-system/Card';
import Button from '../../ui-system/Button';
import QuantitySelector from '../../ui-system/QuantitySelector';

interface Props {
  navigate: (screen: string, data?: any) => void;
  appState: any;
  updateAppState: (updates: any) => void;
}

export default function CartScreen({ navigate, appState, updateAppState }: Props) {
  const [cart, setCart] = useState(appState.cart || []);
  const [priorityDelivery, setPriorityDelivery] = useState(false);
  const distance = 1.8; // km

  const updateCartQuantity = (itemId: string, quantity: number) => {
    const updatedCart = cart.map((item: any) =>
      item.id === itemId ? { ...item, quantity } : item
    ).filter((item: any) => item.quantity > 0);
    
    setCart(updatedCart);
    updateAppState({ cart: updatedCart });
  };

  const calculateCharges = () => {
    const subtotal = cart.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    const totalBoxes = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
    
    const deliveryCharge = totalBoxes * 8;
    
    let distanceCharge = 0;
    if (distance <= 1.5) {
      distanceCharge = 7;
    } else {
      distanceCharge = 7 + Math.ceil((distance - 1.5) / 0.5) * 1;
    }
    
    const platformFee = Math.round(subtotal * 0.1);
    const priorityFee = priorityDelivery ? 10 : 0;
    
    const total = subtotal + deliveryCharge + distanceCharge + platformFee + priorityFee;
    
    return { subtotal, deliveryCharge, distanceCharge, platformFee, priorityFee, total, totalBoxes };
  };

  const charges = calculateCharges();

  if (cart.length === 0) {
    return (
      <div className="w-full h-full bg-neutral-50 flex flex-col items-center justify-center p-6">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto bg-neutral-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-4xl">🛒</span>
          </div>
          <h3 className="text-neutral-900 mb-2">Your cart is empty</h3>
          <p className="text-neutral-600 mb-6">Add some delicious meals to get started</p>
          <Button onClick={() => navigate('subscriber-home')}>
            Browse Chefs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-neutral-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center gap-4 border-b border-neutral-100">
        <button onClick={() => navigate('chef-menu')} className="text-neutral-700">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-neutral-900">Cart</h2>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Items */}
        <div className="px-6 py-4">
          <Card variant="elevated" padding="md">
            <h4 className="text-neutral-900 mb-4">Order from {cart[0]?.chefName}</h4>
            
            <div className="space-y-4">
              {cart.map((item: any) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-neutral-900 mb-1">{item.name}</h4>
                    <p className="text-neutral-600 text-sm">₹{item.price}</p>
                  </div>
                  <QuantitySelector
                    value={item.quantity}
                    onChange={(val) => updateCartQuantity(item.id, val)}
                    size="sm"
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-neutral-100">
              <Clock size={16} className="text-primary" />
              <span className="text-sm text-neutral-700">Slot: {cart[0]?.slot}</span>
            </div>
          </Card>
        </div>

        {/* Delivery Location */}
        <div className="px-6 py-4">
          <Card variant="default" padding="md" onClick={() => navigate('drop-location')} hoverable>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <MapPin className="text-primary" size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-neutral-600">Deliver to</p>
                <p className="text-neutral-900">{appState.selectedLocation || 'Select location'}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Priority Delivery */}
        <div className="px-6 py-4">
          <Card variant="default" padding="md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-lg">⚡</span>
                </div>
                <div>
                  <h4 className="text-neutral-900">Priority Delivery</h4>
                  <p className="text-neutral-600 text-sm">Get it faster +₹10</p>
                </div>
              </div>
              <button
                onClick={() => setPriorityDelivery(!priorityDelivery)}
                className={`w-12 h-6 rounded-full transition-colors ${priorityDelivery ? 'bg-primary' : 'bg-neutral-300'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${priorityDelivery ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </button>
            </div>
          </Card>
        </div>

        {/* Bill Details */}
        <div className="px-6 py-4">
          <Card variant="elevated" padding="md">
            <h4 className="text-neutral-900 mb-4">Bill Details</h4>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-neutral-700">Meal cost ({charges.totalBoxes} boxes)</span>
                <span className="text-neutral-900">₹{charges.subtotal}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-neutral-700">Delivery charge</span>
                  <Info size={14} className="text-neutral-400" />
                </div>
                <span className="text-neutral-900">₹{charges.deliveryCharge}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-neutral-700">Distance charge ({distance} km)</span>
                <span className="text-neutral-900">₹{charges.distanceCharge}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-neutral-700">Platform fee (10%)</span>
                <span className="text-neutral-900">₹{charges.platformFee}</span>
              </div>
              
              {priorityDelivery && (
                <div className="flex items-center justify-between">
                  <span className="text-neutral-700">Priority delivery</span>
                  <span className="text-neutral-900">₹{charges.priorityFee}</span>
                </div>
              )}
              
              <div className="pt-3 border-t-2 border-neutral-200 flex items-center justify-between">
                <span className="text-neutral-900">Total</span>
                <span className="text-neutral-900">₹{charges.total}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-neutral-100">
        <Button
          fullWidth
          onClick={() => navigate('payment')}
          disabled={!appState.selectedLocation}
        >
          Proceed to Payment • ₹{charges.total}
        </Button>
      </div>
    </div>
  );
}
