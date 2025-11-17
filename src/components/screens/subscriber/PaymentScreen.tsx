import { useState } from 'react';
import { ArrowLeft, CreditCard, Smartphone, Building, Wallet, Banknote, Check } from 'lucide-react';
import Card from '../../ui-system/Card';
import Button from '../../ui-system/Button';

interface Props {
  navigate: (screen: string, data?: any) => void;
  appState: any;
  updateAppState: (updates: any) => void;
}

const paymentMethods = [
  {
    id: 'upi',
    name: 'UPI',
    icon: Smartphone,
    options: ['Google Pay', 'PhonePe', 'Paytm', 'Amazon Pay']
  },
  {
    id: 'card',
    name: 'Debit/Credit Card',
    icon: CreditCard,
    options: []
  },
  {
    id: 'netbanking',
    name: 'Net Banking',
    icon: Building,
    options: ['SBI', 'HDFC', 'ICICI', 'Axis Bank']
  },
  {
    id: 'wallet',
    name: 'Wallets',
    icon: Wallet,
    options: ['Paytm Wallet', 'PhonePe Wallet', 'Mobikwik']
  },
  {
    id: 'cod',
    name: 'Cash on Delivery',
    icon: Banknote,
    options: []
  }
];

export default function PaymentScreen({ navigate, appState, updateAppState }: Props) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const cart = appState.cart || [];
  const total = cart.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0) + 50; // Including charges

  const handlePayment = () => {
    // Create order
    const order = {
      id: `ORD${Date.now()}`,
      items: cart,
      total,
      status: 'confirmed',
      timestamp: new Date().toISOString(),
      slot: cart[0]?.slot,
      chefName: cart[0]?.chefName,
      location: appState.selectedLocation,
      paymentMethod: selectedMethod
    };

    updateAppState({
      currentOrder: order,
      orderHistory: [...(appState.orderHistory || []), order],
      cart: []
    });

    navigate('order-tracking');
  };

  return (
    <div className="w-full h-full bg-neutral-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center gap-4 border-b border-neutral-100">
        <button onClick={() => navigate('cart')} className="text-neutral-700">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-neutral-900">Payment</h2>
      </div>

      <div className="flex-1 overflow-y-auto pb-32">
        {/* Amount Card */}
        <div className="px-6 py-4">
          <Card variant="gradient" padding="lg" className="gradient-primary">
            <div className="text-center text-white">
              <p className="text-white/90 mb-2">Amount to Pay</p>
              <h1 className="text-white">₹{total}</h1>
            </div>
          </Card>
        </div>

        {/* Payment Methods */}
        <div className="px-6 py-4">
          <p className="text-neutral-700 mb-3">Select Payment Method</p>
          
          <div className="space-y-3">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              const isSelected = selectedMethod === method.id;

              return (
                <div key={method.id}>
                  <Card
                    variant="default"
                    padding="md"
                    onClick={() => {
                      setSelectedMethod(method.id);
                      if (method.options.length === 0) {
                        setSelectedOption(method.id);
                      } else {
                        setSelectedOption(null);
                      }
                    }}
                    hoverable
                    className={`border-2 ${isSelected ? 'border-primary' : 'border-transparent'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isSelected ? 'bg-primary text-white' : 'bg-neutral-100 text-neutral-700'}`}>
                        <Icon size={20} />
                      </div>
                      <span className="flex-1 text-neutral-900">{method.name}</span>
                      {isSelected && (
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <Check className="text-white" size={16} />
                        </div>
                      )}
                    </div>
                  </Card>

                  {/* Sub-options */}
                  {isSelected && method.options.length > 0 && (
                    <div className="mt-2 ml-4 space-y-2">
                      {method.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => setSelectedOption(option)}
                          className={`w-full px-4 py-3 rounded-xl text-left transition-all ${
                            selectedOption === option
                              ? 'bg-primary/10 border-2 border-primary text-primary'
                              : 'bg-white border-2 border-neutral-100 text-neutral-700'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Security Info */}
        <div className="px-6 py-4">
          <Card variant="default" padding="md" className="bg-green-50 border border-green-200">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Check className="text-green-600" size={16} />
              </div>
              <div>
                <h4 className="text-green-900 mb-1">Secure Payment</h4>
                <p className="text-green-700 text-sm">Your payment information is encrypted and secure</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Pay Button */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-neutral-100">
        <Button
          fullWidth
          onClick={handlePayment}
          disabled={!selectedOption}
        >
          Pay ₹{total}
        </Button>
      </div>
    </div>
  );
}
