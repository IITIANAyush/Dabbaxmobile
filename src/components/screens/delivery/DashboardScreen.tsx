import { TrendingUp, Package, DollarSign, Clock, MapPin, Bike } from 'lucide-react';
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
  totalDeliveries: 18,
  activeDeliveries: 2,
  earnings: 504,
  avgDeliveryTime: 12,
  acceptanceRate: 92
};

const recentDeliveries = [
  { 
    id: '1', 
    from: 'Annapurna Kitchen', 
    to: 'CCD', 
    time: '12:45 PM',
    amount: 32,
    status: 'completed'
  },
  { 
    id: '2', 
    from: 'Home Bites', 
    to: 'LHC', 
    time: '1:15 PM',
    amount: 24,
    status: 'completed'
  },
  { 
    id: '3', 
    from: 'Spice Route', 
    to: 'VMCC', 
    time: '1:30 PM',
    amount: 40,
    status: 'in-progress'
  }
];

export default function DashboardScreen({ navigate, appState }: Props) {
  return (
    <div className="w-full h-full bg-neutral-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-neutral-900 mb-1">Delivery Dashboard</h2>
            <p className="text-neutral-600 text-sm">Today, Nov 16, 2025</p>
          </div>
          <button 
            onClick={() => navigate('profile')}
            className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
          >
            <Bike className="text-white" size={24} />
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
            <p className="text-neutral-600 text-sm mb-1">Deliveries</p>
            <h3 className="text-neutral-900">{todayStats.totalDeliveries}</h3>
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
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="text-blue-700" size={16} />
              </div>
            </div>
            <p className="text-neutral-600 text-sm mb-1">Avg Time</p>
            <h3 className="text-neutral-900">{todayStats.avgDeliveryTime}m</h3>
          </Card>

          <Card variant="elevated" padding="md">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-amber-600" size={16} />
              </div>
            </div>
            <p className="text-neutral-600 text-sm mb-1">Accept Rate</p>
            <h3 className="text-neutral-900">{todayStats.acceptanceRate}%</h3>
          </Card>
        </div>

        {/* Active Deliveries Card */}
        {todayStats.activeDeliveries > 0 && (
          <Card variant="elevated" padding="md" className="mb-6 bg-gradient-to-r from-blue-50 to-primary/5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <Package className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="text-neutral-900">Active Deliveries</h4>
                  <p className="text-neutral-600 text-sm">You have {todayStats.activeDeliveries} ongoing</p>
                </div>
              </div>
            </div>
            <Button
              variant="primary"
              fullWidth
              onClick={() => navigate('active-deliveries')}
              icon={<MapPin size={18} />}
            >
              View Active
            </Button>
          </Card>
        )}

        {/* Available Deliveries Banner */}
        <Card 
          variant="outlined" 
          padding="md" 
          className="mb-6 border-primary cursor-pointer"
          onClick={() => navigate('available-deliveries')}
          hoverable
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center">
              <Package className="text-white" size={24} />
            </div>
            <div className="flex-1">
              <h4 className="text-neutral-900 mb-1">New Deliveries Available</h4>
              <p className="text-neutral-600 text-sm">Tap to see available orders</p>
            </div>
            <Badge variant="primary" size="sm">12</Badge>
          </div>
        </Card>

        {/* Quick Stats */}
        <Card variant="elevated" padding="md" className="mb-6">
          <h4 className="text-neutral-900 mb-4">This Week Summary</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-neutral-600 text-sm">Total Deliveries</span>
              <span className="text-neutral-900">124</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-600 text-sm">Total Earnings</span>
              <span className="text-neutral-900">₹3,472</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-600 text-sm">Peak Hours</span>
              <span className="text-neutral-900">12 PM - 2 PM</span>
            </div>
          </div>
        </Card>

        {/* Recent Deliveries */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-neutral-900">Recent Deliveries</h3>
            <button
              onClick={() => navigate('delivery-earnings')}
              className="text-primary text-sm hover:underline"
            >
              View all
            </button>
          </div>

          <div className="space-y-3">
            {recentDeliveries.map((delivery) => (
              <Card key={delivery.id} variant="default" padding="md" hoverable>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-neutral-100 rounded-lg flex items-center justify-center">
                      <MapPin className="text-primary" size={16} />
                    </div>
                    <div>
                      <h4 className="text-neutral-900 text-sm">{delivery.from}</h4>
                      <p className="text-neutral-600 text-xs">to {delivery.to}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={delivery.status === 'completed' ? 'success' : 'warning'}
                    size="sm"
                  >
                    {delivery.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">{delivery.time}</span>
                  <span className="text-neutral-900">₹{delivery.amount}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Performance Banner */}
        <Card variant="gradient" padding="md" className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center">
              <TrendingUp className="text-white" size={24} />
            </div>
            <div className="flex-1">
              <h4 className="text-neutral-900 mb-1">Excellent Performance!</h4>
              <p className="text-neutral-600 text-sm">Keep up the great work this week</p>
            </div>
          </div>
        </Card>
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
