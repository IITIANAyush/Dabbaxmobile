import { TrendingUp, Clock, Star, DollarSign, Package, ChefHat } from 'lucide-react';
import Card from '../../ui-system/Card';
import Badge from '../../ui-system/Badge';
import Button from '../../ui-system/Button';
import BottomNav from '../../ui-system/BottomNav';
import { motion } from 'motion/react';

interface Props {
  navigate: (screen: string, data?: any) => void;
  appState: any;
}

const todayStats = {
  totalOrders: 42,
  mealsRemaining: 28,
  totalCapacity: 70,
  earnings: 2940,
  avgRating: 4.6
};

const slotOrders = [
  { slot: '12:00 PM', orders: 15, status: 'completed' },
  { slot: '12:30 PM', orders: 12, status: 'preparing' },
  { slot: '1:00 PM', orders: 15, status: 'pending' }
];

export default function DashboardScreen({ navigate, appState }: Props) {
  const capacityPercent = (todayStats.mealsRemaining / todayStats.totalCapacity) * 100;

  return (
    <div className="w-full h-full bg-neutral-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-neutral-900 mb-1">Chef Dashboard</h2>
            <p className="text-neutral-600 text-sm">Today, Nov 8, 2025</p>
          </div>
          <button 
            onClick={() => navigate('profile')}
            className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
          >
            <ChefHat className="text-white" size={24} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 px-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card variant="elevated" padding="md">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Package className="text-primary" size={16} />
              </div>
            </div>
            <p className="text-neutral-600 text-sm mb-1">Orders Today</p>
            <h3 className="text-neutral-900">{todayStats.totalOrders}</h3>
          </Card>

          <Card variant="elevated" padding="md">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="text-green-600" size={16} />
              </div>
            </div>
            <p className="text-neutral-600 text-sm mb-1">Earnings</p>
            <h3 className="text-neutral-900">₹{todayStats.earnings}</h3>
          </Card>

          <Card variant="elevated" padding="md">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <Star className="text-amber-600" size={16} fill="currentColor" />
              </div>
            </div>
            <p className="text-neutral-600 text-sm mb-1">Rating</p>
            <h3 className="text-neutral-900">{todayStats.avgRating}</h3>
          </Card>

          <Card variant="elevated" padding="md">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-blue-700" size={16} />
              </div>
            </div>
            <p className="text-neutral-600 text-sm mb-1">Remaining</p>
            <h3 className="text-neutral-900">{todayStats.mealsRemaining}</h3>
          </Card>
        </div>

        {/* Capacity Status */}
        <Card variant="elevated" padding="md" className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-neutral-900">Today's Capacity</h4>
            <Badge 
              variant={capacityPercent > 50 ? 'success' : capacityPercent > 20 ? 'warning' : 'error'}
              size="sm"
            >
              {Math.round(capacityPercent)}%
            </Badge>
          </div>
          <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${capacityPercent}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={`h-full ${capacityPercent > 50 ? 'bg-blue-600' : capacityPercent > 20 ? 'bg-amber-500' : 'bg-red-500'}`}
            />
          </div>
          <p className="text-neutral-600 text-sm">
            {todayStats.mealsRemaining} meals remaining out of {todayStats.totalCapacity}
          </p>
        </Card>

        {/* Quick Actions */}
        <div className="mb-6">
          <h3 className="text-neutral-900 mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outlined"
              onClick={() => navigate('menu-setup')}
              icon={<ChefHat size={20} />}
              className="justify-start"
            >
              Setup Menu
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('slot-scheduling')}
              icon={<Clock size={20} />}
              className="justify-start"
            >
              Manage Slots
            </Button>
          </div>
        </div>

        {/* Slot-wise Orders */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-neutral-900">Today's Slots</h3>
            <button
              onClick={() => navigate('chef-orders')}
              className="text-primary text-sm hover:underline"
            >
              View all
            </button>
          </div>

          <div className="space-y-3">
            {slotOrders.map((slot) => (
              <Card key={slot.slot} variant="default" padding="md" hoverable>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                      <Clock className="text-primary" size={20} />
                    </div>
                    <div>
                      <h4 className="text-neutral-900">{slot.slot}</h4>
                      <p className="text-neutral-600 text-sm">{slot.orders} orders</p>
                    </div>
                  </div>
                  <Badge 
                    variant={
                      slot.status === 'completed' ? 'success' :
                      slot.status === 'preparing' ? 'warning' : 'neutral'
                    }
                    size="sm"
                  >
                    {slot.status}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Performance Banner */}
        <Card variant="gradient" padding="md" className="bg-gradient-to-r from-blue-50 to-orange-50 border-2 border-blue-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center">
              <TrendingUp className="text-white" size={24} />
            </div>
            <div className="flex-1">
              <h4 className="text-neutral-900 mb-1">Great Performance!</h4>
              <p className="text-neutral-600 text-sm">You're in top 10% this week</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <BottomNav
        activeScreen={appState.currentScreen}
        onNavigate={navigate}
        role="chef"
      />
    </div>
  );
}
