import { useState } from 'react';
import { ArrowLeft, Plus, Image as ImageIcon, DollarSign, Package } from 'lucide-react';
import Card from '../../ui-system/Card';
import Button from '../../ui-system/Button';
import BottomNav from '../../ui-system/BottomNav';

interface Props {
  navigate: (screen: string, data?: any) => void;
  appState: any;
}

const savedMeals = [
  { id: '1', name: 'Paneer Butter Masala', price: 65, quantity: 20, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=200' },
  { id: '2', name: 'Dal Makhani with Rice', price: 60, quantity: 25, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=200' }
];

export default function MenuSetupScreen({ navigate, appState }: Props) {
  const [meals, setMeals] = useState(savedMeals);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMeal, setNewMeal] = useState({ name: '', price: '', quantity: '' });

  const currentTime = new Date().getHours();
  const canEdit = currentTime >= 17 || currentTime < 1; // 5 PM to 12 AM

  return (
    <div className="w-full h-full bg-neutral-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center gap-4 border-b border-neutral-100">
        <button onClick={() => navigate('chef-dashboard')} className="text-neutral-700">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h2 className="text-neutral-900">Menu Setup</h2>
          <p className="text-neutral-600 text-sm">Setup: 5 PM - 12 AM</p>
        </div>
      </div>

      {!canEdit && (
        <div className="px-6 pt-4">
          <Card variant="default" padding="md" className="bg-amber-50 border border-amber-200">
            <p className="text-amber-900 text-sm">
              ⏰ Menu setup is available from 5 PM to 12 AM only
            </p>
          </Card>
        </div>
      )}

      <div className="flex-1 overflow-y-auto pb-32 px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-neutral-900">Today's Menu</h3>
          {canEdit && (
            <Button
              size="sm"
              icon={<Plus size={16} />}
              onClick={() => setShowAddForm(true)}
            >
              Add Meal
            </Button>
          )}
        </div>

        {showAddForm && canEdit && (
          <Card variant="elevated" padding="md" className="mb-4">
            <h4 className="text-neutral-900 mb-4">Add New Meal</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-neutral-700 mb-2">Meal Name</label>
                <input
                  type="text"
                  value={newMeal.name}
                  onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
                  placeholder="e.g., Paneer Butter Masala"
                  className="w-full px-4 py-3 bg-neutral-100 rounded-xl outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-neutral-700 mb-2">Price (₹50-₹70)</label>
                  <input
                    type="number"
                    value={newMeal.price}
                    onChange={(e) => setNewMeal({ ...newMeal, price: e.target.value })}
                    placeholder="60"
                    min="50"
                    max="70"
                    className="w-full px-4 py-3 bg-neutral-100 rounded-xl outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm text-neutral-700 mb-2">Quantity (max 120)</label>
                  <input
                    type="number"
                    value={newMeal.quantity}
                    onChange={(e) => setNewMeal({ ...newMeal, quantity: e.target.value })}
                    placeholder="50"
                    max="120"
                    className="w-full px-4 py-3 bg-neutral-100 rounded-xl outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-neutral-700 mb-2">Photo</label>
                <button className="w-full py-6 bg-neutral-100 rounded-xl border-2 border-dashed border-neutral-300 flex flex-col items-center gap-2 hover:bg-blue-50 hover:border-blue-300 transition-colors">
                  <ImageIcon className="text-neutral-500" size={32} />
                  <span className="text-neutral-600 text-sm">Upload meal photo</span>
                </button>
              </div>

              <div className="flex gap-2">
                <Button fullWidth onClick={() => setShowAddForm(false)} variant="outlined">
                  Cancel
                </Button>
                <Button fullWidth>Save Meal</Button>
              </div>
            </div>
          </Card>
        )}

        <div className="space-y-3">
          {meals.map((meal) => (
            <Card key={meal.id} variant="elevated" padding="none">
              <div className="flex gap-3 p-3">
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="text-neutral-900 mb-2">{meal.name}</h4>
                  <div className="flex items-center gap-4 text-sm text-neutral-600">
                    <div className="flex items-center gap-1">
                      <DollarSign size={14} />
                      <span>₹{meal.price}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Package size={14} />
                      <span>{meal.quantity} units</span>
                    </div>
                  </div>
                </div>
                {canEdit && (
                  <button className="text-primary text-sm hover:underline">Edit</button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="absolute bottom-20 left-0 right-0 px-6 py-4 bg-white border-t border-neutral-100">
        <Button fullWidth onClick={() => navigate('chef-dashboard')}>
          Save Menu for Tomorrow
        </Button>
      </div>

      <BottomNav activeScreen={appState.currentScreen} onNavigate={navigate} role="chef" />
    </div>
  );
}
