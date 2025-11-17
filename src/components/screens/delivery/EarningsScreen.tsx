import { ArrowLeft, DollarSign, TrendingUp, Calendar, Download, Package } from 'lucide-react';
import Card from '../../ui-system/Card';
import Badge from '../../ui-system/Badge';
import Button from '../../ui-system/Button';
import BottomNav from '../../ui-system/BottomNav';
import { motion } from 'motion/react';

interface Props {
  navigate: (screen: string, data?: any) => void;
  appState: any;
}

const earningsData = {
  today: 504,
  week: 3472,
  month: 14680,
  total: 87420,
  pendingPayout: 2840
};

const weeklyBreakdown = [
  { day: 'Mon', earnings: 520, deliveries: 16 },
  { day: 'Tue', earnings: 480, deliveries: 15 },
  { day: 'Wed', earnings: 560, deliveries: 18 },
  { day: 'Thu', earnings: 440, deliveries: 14 },
  { day: 'Fri', earnings: 592, deliveries: 19 },
  { day: 'Sat', earnings: 376, deliveries: 12 },
  { day: 'Sun', earnings: 504, deliveries: 18 }
];

const recentPayouts = [
  {
    id: 'P001',
    amount: 3250,
    date: 'Nov 10, 2025',
    period: 'Nov 3 - Nov 9',
    status: 'completed',
    method: 'Bank Transfer'
  },
  {
    id: 'P002',
    amount: 3180,
    date: 'Nov 3, 2025',
    period: 'Oct 27 - Nov 2',
    status: 'completed',
    method: 'Bank Transfer'
  },
  {
    id: 'P003',
    amount: 2940,
    date: 'Oct 27, 2025',
    period: 'Oct 20 - Oct 26',
    status: 'completed',
    method: 'Bank Transfer'
  }
];

const deliveryHistory = [
  {
    id: 'D045',
    date: 'Today, 1:30 PM',
    from: 'Spice Route',
    to: 'VMCC',
    amount: 40,
    status: 'completed'
  },
  {
    id: 'D044',
    date: 'Today, 1:15 PM',
    from: 'Home Bites',
    to: 'LHC',
    amount: 24,
    status: 'completed'
  },
  {
    id: 'D043',
    date: 'Today, 12:45 PM',
    from: 'Annapurna Kitchen',
    to: 'CCD',
    amount: 32,
    status: 'completed'
  },
  {
    id: 'D042',
    date: 'Today, 12:30 PM',
    from: 'Desi Dhaba',
    to: 'SOM',
    amount: 28,
    status: 'completed'
  }
];

export default function EarningsScreen({ navigate, appState }: Props) {
  const maxEarnings = Math.max(...weeklyBreakdown.map(d => d.earnings));

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
            <h2 className="text-neutral-900">Earnings</h2>
            <p className="text-neutral-600 text-sm">Your delivery income</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 px-6 pt-4">
        {/* Current Balance Card */}
        <Card variant="elevated" padding="lg" className="mb-6 bg-gradient-to-br from-primary to-primary-dark">
          <div className="text-white">
            <p className="text-white/80 text-sm mb-2">Total Earnings</p>
            <h1 className="text-white mb-4">₹{earningsData.total.toLocaleString()}</h1>
            
            <div className="flex items-center justify-between pt-4 border-t border-white/20">
              <div>
                <p className="text-white/80 text-sm">Pending Payout</p>
                <p className="text-white">₹{earningsData.pendingPayout}</p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                icon={<Download size={16} />}
              >
                Request Payout
              </Button>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card variant="elevated" padding="md">
            <p className="text-neutral-600 text-xs mb-1">Today</p>
            <h3 className="text-neutral-900">₹{earningsData.today}</h3>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="text-green-600" size={12} />
              <span className="text-green-600 text-xs">+12%</span>
            </div>
          </Card>

          <Card variant="elevated" padding="md">
            <p className="text-neutral-600 text-xs mb-1">This Week</p>
            <h3 className="text-neutral-900">₹{earningsData.week.toLocaleString()}</h3>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="text-green-600" size={12} />
              <span className="text-green-600 text-xs">+8%</span>
            </div>
          </Card>

          <Card variant="elevated" padding="md">
            <p className="text-neutral-600 text-xs mb-1">This Month</p>
            <h3 className="text-neutral-900">₹{(earningsData.month / 1000).toFixed(1)}k</h3>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="text-green-600" size={12} />
              <span className="text-green-600 text-xs">+15%</span>
            </div>
          </Card>
        </div>

        {/* Weekly Breakdown Chart */}
        <Card variant="elevated" padding="md" className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-neutral-900">This Week</h3>
            <Badge variant="success" size="sm" icon={<TrendingUp size={12} />}>
              ₹{earningsData.week}
            </Badge>
          </div>

          <div className="flex items-end justify-between gap-2 h-32 mb-3">
            {weeklyBreakdown.map((day, index) => {
              const heightPercent = (day.earnings / maxEarnings) * 100;
              const isToday = day.day === 'Sun'; // Today is Sunday according to system date

              return (
                <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center justify-end flex-1">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${heightPercent}%` }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className={`w-full rounded-t-lg ${isToday ? 'bg-primary' : 'bg-primary/30'}`}
                    />
                  </div>
                  <p className={`text-xs ${isToday ? 'text-primary' : 'text-neutral-600'}`}>
                    {day.day}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-neutral-100">
            <div>
              <p className="text-neutral-600 text-sm">Avg per day</p>
              <p className="text-neutral-900">₹{Math.round(earningsData.week / 7)}</p>
            </div>
            <div>
              <p className="text-neutral-600 text-sm">Total deliveries</p>
              <p className="text-neutral-900">{weeklyBreakdown.reduce((sum, day) => sum + day.deliveries, 0)}</p>
            </div>
          </div>
        </Card>

        {/* Recent Payouts */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-neutral-900">Recent Payouts</h3>
            <button className="text-primary text-sm hover:underline">
              View all
            </button>
          </div>

          <div className="space-y-3">
            {recentPayouts.map((payout) => (
              <Card key={payout.id} variant="default" padding="md">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <DollarSign className="text-green-700" size={20} />
                    </div>
                    <div>
                      <h4 className="text-neutral-900">₹{payout.amount}</h4>
                      <p className="text-neutral-600 text-xs">{payout.period}</p>
                    </div>
                  </div>
                  <Badge variant="success" size="sm">Paid</Badge>
                </div>
                <div className="flex items-center justify-between text-sm pt-2 border-t border-neutral-100">
                  <span className="text-neutral-600">{payout.method}</span>
                  <span className="text-neutral-600">{payout.date}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Delivery History */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-neutral-900">Delivery History</h3>
            <button className="text-primary text-sm hover:underline">
              View all
            </button>
          </div>

          <div className="space-y-2">
            {deliveryHistory.map((delivery) => (
              <Card key={delivery.id} variant="default" padding="sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Package className="text-primary" size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-neutral-900 text-sm truncate">{delivery.from} → {delivery.to}</h4>
                      <p className="text-neutral-600 text-xs">{delivery.date}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <p className="text-green-700">+₹{delivery.amount}</p>
                    <Badge variant="success" size="sm">Done</Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Earnings Insights */}
        <Card variant="gradient" padding="md" className="bg-gradient-to-r from-blue-50 to-primary/5 border-2 border-blue-200">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center flex-shrink-0">
              <TrendingUp className="text-white" size={24} />
            </div>
            <div className="flex-1">
              <h4 className="text-neutral-900 mb-1">Peak Hours Alert</h4>
              <p className="text-neutral-600 text-sm mb-2">
                Most orders come between 12 PM - 2 PM. Stay online during these hours to maximize earnings!
              </p>
              <div className="flex gap-2">
                <Badge variant="primary" size="sm">12 PM - 1 PM</Badge>
                <Badge variant="primary" size="sm">1 PM - 2 PM</Badge>
              </div>
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
