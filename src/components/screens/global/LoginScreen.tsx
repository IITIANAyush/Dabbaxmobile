import { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, ArrowLeft } from 'lucide-react';
import Button from '../../ui-system/Button';
import Card from '../../ui-system/Card';

interface Props {
  navigate: (screen: string, data?: any) => void;
  appState: any;
  updateAppState: (updates: any) => void;
}

export default function LoginScreen({ navigate, appState, updateAppState }: Props) {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOTP = () => {
    if (phone.length === 10) {
      setOtpSent(true);
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      updateAppState({ userPhone: phone, userName: 'User' });
      
      // Navigate based on role
      if (appState.userRole === 'subscriber') {
        navigate('subscriber-home');
      } else if (appState.userRole === 'chef') {
        navigate('chef-dashboard');
      } else if (appState.userRole === 'delivery') {
        navigate('delivery-dashboard');
      }
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-neutral-50 to-blue-50 p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 mt-4 mb-8">
        <button onClick={() => navigate('role-selection')} className="text-neutral-700">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-neutral-900">Login</h2>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card variant="elevated" padding="lg">
            {!otpSent ? (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Phone className="text-primary" size={32} />
                  </div>
                  <h3 className="text-neutral-900 mb-2">Enter Phone Number</h3>
                  <p className="text-neutral-600 text-sm">We'll send you an OTP to verify</p>
                </div>

                <div>
                  <label className="block text-sm text-neutral-700 mb-2">Phone Number</label>
                  <div className="flex gap-2">
                    <div className="px-4 py-3 bg-neutral-100 rounded-xl">
                      <span className="text-neutral-700">+91</span>
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="Enter 10-digit number"
                      className="flex-1 px-4 py-3 bg-neutral-100 rounded-xl outline-none focus:ring-2 focus:ring-primary transition-all"
                    />
                  </div>
                </div>

                <Button
                  fullWidth
                  onClick={handleSendOTP}
                  disabled={phone.length !== 10}
                >
                  Send OTP
                </Button>

                <div className="text-center">
                  <button
                    onClick={() => navigate('signup')}
                    className="text-primary text-sm hover:underline"
                  >
                    New user? Sign up
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-neutral-900 mb-2">Enter OTP</h3>
                  <p className="text-neutral-600 text-sm">
                    Sent to +91 {phone}
                  </p>
                </div>

                <div>
                  <label className="block text-sm text-neutral-700 mb-2">OTP</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Enter 6-digit OTP"
                    className="w-full px-4 py-3 bg-neutral-100 rounded-xl text-center tracking-widest outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>

                <Button
                  fullWidth
                  onClick={handleVerifyOTP}
                  disabled={otp.length !== 6}
                >
                  Verify & Login
                </Button>

                <div className="text-center">
                  <button
                    onClick={() => setOtpSent(false)}
                    className="text-primary text-sm hover:underline"
                  >
                    Change number
                  </button>
                </div>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}