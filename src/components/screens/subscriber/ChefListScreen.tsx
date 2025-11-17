import { useState } from 'react';
import { ArrowLeft, Search, Star, Clock, TrendingUp } from 'lucide-react';
import Card from '../../ui-system/Card';
import Badge from '../../ui-system/Badge';
import BottomNav from '../../ui-system/BottomNav';

interface Props {
  navigate: (screen: string, data?: any) => void;
  appState: any;
  updateAppState: (updates: any) => void;
}

const allChefs = [
  {
    id: '1',
    name: 'Maharaj Kitchen',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400',
    rating: 4.5,
    priceRange: '₹55-₹65',
    distance: '0.5 km',
    remaining: 25,
    totalCapacity: 50,
    specialty: 'North Indian, Punjabi'
  },
  {
    id: '2',
    name: 'South Delight',
    image: 'https://images.unsplash.com/photo-1630851840633-8e6e1f48f29a?w=400',
    rating: 4.7,
    priceRange: '₹50-₹60',
    distance: '0.8 km',
    remaining: 18,
    totalCapacity: 40,
    specialty: 'South Indian, Dosa'
  },
  {
    id: '3',
    name: 'Thali Express',
    image: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400',
    rating: 4.3,
    priceRange: '₹60-₹70',
    distance: '1.2 km',
    remaining: 30,
    totalCapacity: 60,
    specialty: 'Thali, Gujarati'
  },
  {
    id: '4',
    name: 'Snack Shack',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
    rating: 4.6,
    priceRange: '₹50-₹55',
    distance: '0.3 km',
    remaining: 40,
    totalCapacity: 50,
    specialty: 'Snacks, Fast Food'
  },
  {
    id: '5',
    name: 'Biryani House',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400',
    rating: 4.8,
    priceRange: '₹65-₹70',
    distance: '1.0 km',
    remaining: 15,
    totalCapacity: 35,
    specialty: 'Biryani, Hyderabadi'
  },
  {
    id: '6',
    name: 'Healthy Bites',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400',
    rating: 4.4,
    priceRange: '₹55-₹65',
    distance: '0.7 km',
    remaining: 22,
    totalCapacity: 45,
    specialty: 'Salads, Healthy Food'
  }
];

export default function ChefListScreen({ navigate, appState, updateAppState }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'distance' | 'price'>('rating');

  const filteredChefs = allChefs
    .filter(chef => 
      chef.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chef.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'distance') return parseFloat(a.distance) - parseFloat(b.distance);
      return 0;
    });

  const handleChefClick = (chef: any) => {
    updateAppState({ selectedChef: chef });
    navigate('chef-menu');
  };

  return (
    <div className="w-full h-full bg-neutral-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-neutral-100">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => navigate('subscriber-home')} className="text-neutral-700">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-neutral-900">All Chefs</h2>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chefs or cuisines..."
            className="w-full pl-12 pr-4 py-3 bg-neutral-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>

        {/* Sort Options */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSortBy('rating')}
            className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-all ${
              sortBy === 'rating' ? 'bg-primary text-white' : 'bg-neutral-100 text-neutral-700'
            }`}
          >
            Top Rated
          </button>
          <button
            onClick={() => setSortBy('distance')}
            className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-all ${
              sortBy === 'distance' ? 'bg-primary text-white' : 'bg-neutral-100 text-neutral-700'
            }`}
          >
            Nearest
          </button>
          <button
            onClick={() => setSortBy('price')}
            className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-all ${
              sortBy === 'price' ? 'bg-primary text-white' : 'bg-neutral-100 text-neutral-700'
            }`}
          >
            Price
          </button>
        </div>
      </div>

      {/* Chef List */}
      <div className="flex-1 overflow-y-auto pb-24 px-6 pt-4">
        <p className="text-neutral-600 text-sm mb-4">{filteredChefs.length} chefs available</p>
        
        <div className="space-y-4">
          {filteredChefs.map((chef) => {
            const capacityPercent = (chef.remaining / chef.totalCapacity) * 100;
            
            return (
              <Card
                key={chef.id}
                variant="elevated"
                padding="none"
                onClick={() => handleChefClick(chef)}
                hoverable
              >
                <div className="flex gap-4 p-4">
                  <div className="w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden">
                    <img 
                      src={chef.image} 
                      alt={chef.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-neutral-900 mb-1">{chef.name}</h4>
                        <p className="text-neutral-600 text-sm">{chef.specialty}</p>
                      </div>
                      {chef.rating >= 4.5 && (
                        <Badge variant="warning" size="sm" icon={<TrendingUp size={12} />}>
                          Top
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm text-neutral-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="text-amber-500" size={14} fill="currentColor" />
                        <span>{chef.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{chef.distance}</span>
                      <span>•</span>
                      <span>{chef.priceRange}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-600">Capacity</span>
                        <span className={`${capacityPercent > 50 ? 'text-green-600' : capacityPercent > 20 ? 'text-amber-600' : 'text-red-600'}`}>
                          {chef.remaining}/{chef.totalCapacity} left
                        </span>
                      </div>
                      <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all ${capacityPercent > 50 ? 'bg-green-500' : capacityPercent > 20 ? 'bg-amber-500' : 'bg-red-500'}`}
                          style={{ width: `${capacityPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
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
