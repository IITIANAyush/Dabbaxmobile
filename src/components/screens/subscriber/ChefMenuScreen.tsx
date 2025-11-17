import { useState } from 'react';
import { ArrowLeft, Star, Clock, MapPin, ShoppingCart } from 'lucide-react';
import Card from '../../ui-system/Card';
import Badge from '../../ui-system/Badge';
import Button from '../../ui-system/Button';
import QuantitySelector from '../../ui-system/QuantitySelector';
import SlotBadge from '../../ui-system/SlotBadge';

interface Props {
  navigate: (screen: string, data?: any) => void;
  appState: any;
  updateAppState: (updates: any) => void;
}

const meals = [
  { id: '1', name: 'Paneer Butter Masala', price: 65, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400', available: true },
  { id: '2', name: 'Dal Makhani with Rice', price: 60, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400', available: true },
  { id: '3', name: 'Chicken Curry', price: 70, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400', available: true },
  { id: '4', name: 'Veg Thali', price: 55, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400', available: false }
];

const availableSlots = ['12:00 PM', '12:30 PM', '1:00 PM'];

export default function ChefMenuScreen({ navigate, appState, updateAppState }: Props) {
  const chef = appState.selectedChef || {};
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selectedSlot, setSelectedSlot] = useState('12:00 PM');
  const currentTime = new Date().getHours() * 60 + new Date().getMinutes();
  const isAfter1245 = currentTime > 12 * 60 + 45;

  const updateQuantity = (mealId: string, quantity: number) => {
    setQuantities(prev => ({ ...prev, [mealId]: quantity }));
  };

  const getCartItemsCount = () => {
    return Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  };

  const handleAddToCart = () => {
    const cartItems = meals
      .filter(meal => quantities[meal.id] > 0)
      .map(meal => ({
        id: meal.id,
        name: meal.name,
        price: isAfter1245 ? meal.price - 5 : meal.price,
        quantity: quantities[meal.id],
        chefName: chef.name,
        chefId: chef.id,
        slot: selectedSlot
      }));

    updateAppState({ cart: cartItems });
    navigate('cart');
  };

  return (
    <div className="w-full h-full bg-neutral-50 flex flex-col">
      {/* Header with Chef Info */}
      <div className="bg-white">
        <div className="relative h-48">
          <img 
            src={chef.image} 
            alt={chef.name}
            className="w-full h-full object-cover"
          />
          <button 
            onClick={() => navigate('chef-list')}
            className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
          >
            <ArrowLeft size={20} className="text-neutral-900" />
          </button>
        </div>

        <div className="px-6 py-4">
          <h2 className="text-neutral-900 mb-2">{chef.name}</h2>
          <div className="flex items-center gap-4 text-sm text-neutral-600 mb-3">
            <div className="flex items-center gap-1">
              <Star className="text-amber-500" size={14} fill="currentColor" />
              <span>{chef.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              <span>{chef.distance}</span>
            </div>
            <Badge variant="success" size="sm">{chef.remaining} left</Badge>
          </div>

          {isAfter1245 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
              <p className="text-amber-900 text-sm">
                🔥 <span>Extra Meals: ₹5 off on all items!</span>
              </p>
            </div>
          )}

          {/* Slot Selection */}
          <div>
            <p className="text-neutral-700 mb-3">Select Delivery Slot</p>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {availableSlots.map(slot => (
                <SlotBadge
                  key={slot}
                  time={slot}
                  isSelected={selectedSlot === slot}
                  onClick={() => setSelectedSlot(slot)}
                  variant="compact"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto px-6 py-4 pb-32">
        <h3 className="text-neutral-900 mb-4">Menu</h3>
        
        <div className="space-y-4">
          {meals.map(meal => (
            <Card key={meal.id} variant="elevated" padding="none" className={!meal.available ? 'opacity-50' : ''}>
              <div className="flex gap-4 p-4">
                <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                  <img 
                    src={meal.image} 
                    alt={meal.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <h4 className="text-neutral-900 mb-1">{meal.name}</h4>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-neutral-900">₹{isAfter1245 ? meal.price - 5 : meal.price}</span>
                    {isAfter1245 && (
                      <span className="text-neutral-500 text-sm line-through">₹{meal.price}</span>
                    )}
                  </div>
                  
                  {meal.available ? (
                    <QuantitySelector
                      value={quantities[meal.id] || 0}
                      onChange={(val) => updateQuantity(meal.id, val)}
                      size="sm"
                    />
                  ) : (
                    <Badge variant="error" size="sm">Not Available</Badge>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Floating Cart Button */}
      {getCartItemsCount() > 0 && (
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-neutral-100">
          <Button
            fullWidth
            onClick={handleAddToCart}
            icon={<ShoppingCart size={20} />}
          >
            Add {getCartItemsCount()} item{getCartItemsCount() > 1 ? 's' : ''} to Cart
          </Button>
        </div>
      )}
    </div>
  );
}
