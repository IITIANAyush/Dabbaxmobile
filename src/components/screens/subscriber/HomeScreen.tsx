import { useState } from 'react';
import { Search, MapPin, Star, Clock, Flame } from 'lucide-react';
import Card from '../../ui-system/Card';
import Badge from '../../ui-system/Badge';
import BottomNav from '../../ui-system/BottomNav';
import { motion } from 'motion/react';

interface Props {
  navigate: (screen: string, data?: any) => void;
  appState: any;
  updateAppState: (updates: any) => void;
}

const categories = [
  { id: 'north', name: 'North Indian', emoji: '🍛' },
  { id: 'south', name: 'South Indian', emoji: '🥘' },
  { id: 'thali', name: 'Thali', emoji: '🍱' },
  { id: 'snacks', name: 'Snacks', emoji: '🍟' }
];

const chefs = [
  {
    id: '1',
    name: 'Maharaj Kitchen',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400',
    rating: 4.5,
    price: 60,
    remaining: 25,
    slots: 3,
    category: 'north',
    distance: '0.5 km'
  },
  {
    id: '2',
    name: 'South Delight',
    image: 'https://images.unsplash.com/photo-1630851840633-8e6e1f48f29a?w=400',
    rating: 4.7,
    price: 55,
    remaining: 18,
    slots: 2,
    category: 'south',
    distance: '0.8 km'
  },
  {
    id: '3',
    name: 'Thali Express',
    image: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400',
    rating: 4.3,
    price: 65,
    remaining: 30,
    slots: 3,
    category: 'thali',
    distance: '1.2 km'
  },
  {
    id: '4',
    name: 'Snack Shack',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
    rating: 4.6,
    price: 50,
    remaining: 40,
    slots: 4,
    category: 'snacks',
    distance: '0.3 km'
  }
];

export default function HomeScreen({ navigate, appState, updateAppState }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredChefs = selectedCategory 
    ? chefs.filter(chef => chef.category === selectedCategory)
    : chefs;

  const handleChefClick = (chef: any) => {
    updateAppState({ selectedChef: chef });
    navigate('chef-menu');
  };

  return (
    <div className="w-full h-full bg-neutral-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-neutral-600 text-sm">Delivering to</p>
            <div className="flex items-center gap-2 mt-1">
              <MapPin className="text-primary" size={16} />
              <h3 className="text-neutral-900">IIT Bombay</h3>
            </div>
          </div>
          <div 
            onClick={() => navigate('profile')}
            className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
          >
            <span className="text-white">U</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
          <input
            type="text"
            placeholder="Search for chefs, meals..."
            className="w-full pl-12 pr-4 py-3 bg-neutral-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all"
            onClick={() => navigate('chef-list')}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Extra Meals Banner */}
        <div className="px-6 mt-4">
          <Card variant="gradient" padding="md" className="bg-gradient-to-r from-orange-100 to-red-100 border-2 border-primary/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Flame className="text-white" size={24} />
              </div>
              <div className="flex-1">
                <h4 className="text-neutral-900 mb-1">Extra Meals Available!</h4>
                <p className="text-neutral-600 text-sm">₹5 off after 12:45 PM</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Categories */}
        <div className="px-6 mt-6">
          <h3 className="text-neutral-900 mb-4">Categories</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                className={`flex flex-col items-center gap-2 px-6 py-4 rounded-2xl transition-all flex-shrink-0 ${
                  selectedCategory === cat.id 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-white text-neutral-900'
                }`}
              >
                <span className="text-2xl">{cat.emoji}</span>
                <span className="text-sm whitespace-nowrap">{cat.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Popular Chefs */}
        <div className="px-6 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-neutral-900">Popular Chefs</h3>
            <button 
              onClick={() => navigate('chef-list')}
              className="text-primary text-sm hover:underline"
            >
              See all
            </button>
          </div>

          <div className="space-y-4">
            {filteredChefs.map((chef) => (
              <Card
                key={chef.id}
                variant="elevated"
                padding="none"
                onClick={() => handleChefClick(chef)}
                hoverable
              >
                <div className="flex gap-3">
                  <div className="w-24 h-24 flex-shrink-0">
                    <img 
                      src={chef.image} 
                      alt={chef.name}
                      className="w-full h-full object-cover rounded-l-2xl"
                    />
                  </div>
                  <div className="flex-1 py-3 pr-4">
                    <h4 className="text-neutral-900 mb-1">{chef.name}</h4>
                    <div className="flex items-center gap-3 text-sm text-neutral-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="text-amber-500" size={14} fill="currentColor" />
                        <span>{chef.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{chef.distance}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="primary" size="sm">₹{chef.price}</Badge>
                      <Badge variant="success" size="sm">{chef.remaining} left</Badge>
                      <Badge variant="info" size="sm" icon={<Clock size={12} />}>
                        {chef.slots} slots
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav 
        activeScreen={appState.currentScreen} 
        onNavigate={navigate} 
        role="subscriber"
      />
    </div>
  );
}