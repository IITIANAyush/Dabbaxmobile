import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Global Screens
import SplashScreen from './components/screens/global/SplashScreen';
import RoleSelectionScreen from './components/screens/global/RoleSelectionScreen';
import LoginScreen from './components/screens/global/LoginScreen';
import SignupScreen from './components/screens/global/SignupScreen';
import WaitingListScreen from './components/screens/global/WaitingListScreen';
import ProfileScreen from './components/screens/global/ProfileScreen';
import DropLocationScreen from './components/screens/global/DropLocationScreen';

// Subscriber Screens
import SubscriberHomeScreen from './components/screens/subscriber/HomeScreen';
import ChefListScreen from './components/screens/subscriber/ChefListScreen';
import ChefMenuScreen from './components/screens/subscriber/ChefMenuScreen';
import CartScreen from './components/screens/subscriber/CartScreen';
import PaymentScreen from './components/screens/subscriber/PaymentScreen';
import OrderTrackingScreen from './components/screens/subscriber/OrderTrackingScreen';
import OrderHistoryScreen from './components/screens/subscriber/OrderHistoryScreen';

// Chef Screens
import ChefDashboardScreen from './components/screens/chef/DashboardScreen';
import MenuSetupScreen from './components/screens/chef/MenuSetupScreen';
import ChefOrdersScreen from './components/screens/chef/OrdersScreen';
import SlotSchedulingScreen from './components/screens/chef/SlotSchedulingScreen';
// import ExtraMealsScreen from './components/screens/chef/ExtraMealsScreen';
// import ChefEarningsScreen from './components/screens/chef/EarningsScreen';

// Delivery Partner Screens
import DeliveryDashboardScreen from './components/screens/delivery/DashboardScreen';
import AvailableDeliveriesScreen from './components/screens/delivery/AvailableDeliveriesScreen';
import ActiveDeliveriesScreen from './components/screens/delivery/ActiveDeliveriesScreen';
import DeliveryEarningsScreen from './components/screens/delivery/EarningsScreen';

// Style Guide
import StyleGuideScreen from './components/screens/StyleGuideScreen';

export type UserRole = 'subscriber' | 'chef' | 'delivery' | null;

export interface AppState {
  currentScreen: string;
  userRole: UserRole;
  userName: string;
  userPhone: string;
  cart: CartItem[];
  selectedChef: any;
  selectedMeal: any;
  selectedLocation: string;
  currentOrder: any;
  orderHistory: any[];
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  chefName: string;
  chefId: string;
  slot: string;
}

export default function App() {
  const [appState, setAppState] = useState<AppState>({
    currentScreen: 'splash',
    userRole: null,
    userName: '',
    userPhone: '',
    cart: [],
    selectedChef: null,
    selectedMeal: null,
    selectedLocation: '',
    currentOrder: null,
    orderHistory: []
  });

  const navigate = (screen: string, data?: any) => {
    setAppState(prev => ({
      ...prev,
      currentScreen: screen,
      ...(data || {})
    }));
  };

  const updateAppState = (updates: Partial<AppState>) => {
    setAppState(prev => ({ ...prev, ...updates }));
  };

  // Auto-navigate from splash to role selection
  useEffect(() => {
    if (appState.currentScreen === 'splash') {
      const timer = setTimeout(() => {
        navigate('role-selection');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [appState.currentScreen]);

  const renderScreen = () => {
    const screenProps = { navigate, appState, updateAppState };

    switch (appState.currentScreen) {
      // Global Screens
      case 'splash':
        return <SplashScreen {...screenProps} />;
      case 'role-selection':
        return <RoleSelectionScreen {...screenProps} />;
      case 'login':
        return <LoginScreen {...screenProps} />;
      case 'signup':
        return <SignupScreen {...screenProps} />;
      case 'waiting-list':
        return <WaitingListScreen {...screenProps} />;
      case 'profile':
        return <ProfileScreen {...screenProps} />;
      case 'drop-location':
        return <DropLocationScreen {...screenProps} />;
      case 'style-guide':
        return <StyleGuideScreen {...screenProps} />;

      // Subscriber Screens
      case 'subscriber-home':
        return <SubscriberHomeScreen {...screenProps} />;
      case 'chef-list':
        return <ChefListScreen {...screenProps} />;
      case 'chef-menu':
        return <ChefMenuScreen {...screenProps} />;
      case 'cart':
        return <CartScreen {...screenProps} />;
      case 'payment':
        return <PaymentScreen {...screenProps} />;
      case 'order-tracking':
        return <OrderTrackingScreen {...screenProps} />;
      case 'order-history':
        return <OrderHistoryScreen {...screenProps} />;

      // Chef Screens
      case 'chef-dashboard':
        return <ChefDashboardScreen {...screenProps} />;
      case 'menu-setup':
        return <MenuSetupScreen {...screenProps} />;
      case 'chef-orders':
        return <ChefOrdersScreen {...screenProps} />;
      case 'slot-scheduling':
        return <SlotSchedulingScreen {...screenProps} />;
      // case 'extra-meals':
      //   return <ExtraMealsScreen {...screenProps} />;
      // case 'chef-earnings':
      //   return <ChefEarningsScreen {...screenProps} />;

      // Delivery Partner Screens
      case 'delivery-dashboard':
        return <DeliveryDashboardScreen {...screenProps} />;
      case 'available-deliveries':
        return <AvailableDeliveriesScreen {...screenProps} />;
      case 'active-deliveries':
        return <ActiveDeliveriesScreen {...screenProps} />;
      case 'delivery-earnings':
        return <DeliveryEarningsScreen {...screenProps} />;

      default:
        return <SplashScreen {...screenProps} />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-neutral-100 flex items-center justify-center p-4">
      <div className="w-full max-w-[430px] h-[932px] bg-white rounded-[32px] overflow-hidden shadow-2xl relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={appState.currentScreen}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}