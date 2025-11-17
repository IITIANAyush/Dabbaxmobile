import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, User, Mail, MapPin } from 'lucide-react';
import Button from '../../ui-system/Button';
import Card from '../../ui-system/Card';

interface Props {
  navigate: (screen: string, data?: any) => void;
  appState: any;
  updateAppState: (updates: any) => void;
}

export default function SignupScreen({ navigate, appState, updateAppState }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    hostel: ''
  });

  const hostels = ['Hostel 1', 'Hostel 2', 'Hostel 3', 'Hostel 4', 'Hostel 5', 'Hostel 6', 'Hostel 7', 'Hostel 8', 'Hostel 9', 'Hostel 10', 'Hostel 11', 'Hostel 12', 'Hostel 13', 'Hostel 14', 'Hostel 15', 'Hostel 16'];

  const handleSignup = () => {
    if (formData.name && formData.phone && formData.email) {
      updateAppState({ userName: formData.name, userPhone: formData.phone });
      
      // Check if Chef or Delivery Partner - send to waiting list
      if (appState.userRole === 'chef' || appState.userRole === 'delivery') {
        navigate('waiting-list');
      } else {
        navigate('subscriber-home');
      }
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-neutral-50 to-blue-50 p-6 flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mt-4 mb-6">
        <button onClick={() => navigate('login')} className="text-neutral-700">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-neutral-900">Sign Up</h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card variant="elevated" padding="lg">
          <div className="space-y-5">
            <div className="text-center mb-4">
              <h3 className="text-neutral-900 mb-1">Create Account</h3>
              <p className="text-neutral-600 text-sm">
                {appState.userRole === 'subscriber' && 'Start ordering delicious meals'}
                {appState.userRole === 'chef' && 'Start serving meals to students'}
                {appState.userRole === 'delivery' && 'Start delivering across campus'}
              </p>
            </div>

            <div>
              <label className="block text-sm text-neutral-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                  className="w-full pl-11 pr-4 py-3 bg-neutral-100 rounded-xl outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-neutral-700 mb-2">Phone Number</label>
              <div className="flex gap-2">
                <div className="px-4 py-3 bg-neutral-100 rounded-xl">
                  <span className="text-neutral-700">+91</span>
                </div>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                  placeholder="10-digit number"
                  className="flex-1 px-4 py-3 bg-neutral-100 rounded-xl outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-neutral-700 mb-2">Email (IITB)</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@iitb.ac.in"
                  className="w-full pl-11 pr-4 py-3 bg-neutral-100 rounded-xl outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
            </div>

            {appState.userRole === 'subscriber' && (
              <div>
                <label className="block text-sm text-neutral-700 mb-2">Hostel</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
                  <select
                    value={formData.hostel}
                    onChange={(e) => setFormData({ ...formData, hostel: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 bg-neutral-100 rounded-xl outline-none focus:ring-2 focus:ring-primary transition-all appearance-none"
                  >
                    <option value="">Select hostel</option>
                    {hostels.map(h => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <Button
              fullWidth
              onClick={handleSignup}
              disabled={!formData.name || !formData.phone || !formData.email}
            >
              Sign Up
            </Button>

            <div className="text-center">
              <button
                onClick={() => navigate('login')}
                className="text-primary text-sm hover:underline"
              >
                Already have an account? Login
              </button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}