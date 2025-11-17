import { motion } from 'motion/react';
import { Home, Search, ShoppingBag, User, ChefHat, Truck, Package } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: any;
  screen: string;
}

interface BottomNavProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
  role: 'subscriber' | 'chef' | 'delivery';
}

const navConfigs = {
  subscriber: [
    { id: 'home', label: 'Home', icon: Home, screen: 'subscriber-home' },
    { id: 'explore', label: 'Explore', icon: Search, screen: 'chef-list' },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, screen: 'order-history' },
    { id: 'profile', label: 'Profile', icon: User, screen: 'profile' }
  ],
  chef: [
    { id: 'dashboard', label: 'Dashboard', icon: Home, screen: 'chef-dashboard' },
    { id: 'menu', label: 'Menu', icon: ChefHat, screen: 'menu-setup' },
    { id: 'orders', label: 'Orders', icon: Package, screen: 'chef-orders' },
    { id: 'profile', label: 'Profile', icon: User, screen: 'profile' }
  ],
  delivery: [
    { id: 'dashboard', label: 'Dashboard', icon: Home, screen: 'delivery-dashboard' },
    { id: 'available', label: 'Available', icon: Package, screen: 'available-deliveries' },
    { id: 'active', label: 'Active', icon: Truck, screen: 'active-deliveries' },
    { id: 'profile', label: 'Profile', icon: User, screen: 'profile' }
  ]
};

export default function BottomNav({ activeScreen, onNavigate, role }: BottomNavProps) {
  const navItems = navConfigs[role];

  return (
    <div className="absolute bottom-0 left-0 right-0 h-20 bg-white border-t border-neutral-100 px-4 flex items-center justify-around shadow-lg">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeScreen === item.screen;

        return (
          <motion.button
            key={item.id}
            onClick={() => onNavigate(item.screen)}
            className="flex flex-col items-center gap-1 py-2 px-3 min-w-[64px] relative"
            whileTap={{ scale: 0.95 }}
          >
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-primary/10 rounded-2xl"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            <div className="relative z-10">
              <Icon 
                size={24} 
                className={`transition-colors ${isActive ? 'text-primary' : 'text-neutral-500'}`}
                strokeWidth={isActive ? 2.5 : 2}
              />
            </div>
            <span className={`text-xs relative z-10 transition-colors ${isActive ? 'text-primary' : 'text-neutral-500'}`}>
              {item.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}