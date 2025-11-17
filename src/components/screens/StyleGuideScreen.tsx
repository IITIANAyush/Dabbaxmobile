import { ArrowLeft } from 'lucide-react';
import Button from '../ui-system/Button';

interface Props {
  navigate: (screen: string, data?: any) => void;
  appState: any;
}

export default function StyleGuideScreen({ navigate }: Props) {
  return (
    <div className="w-full h-full bg-neutral-50 flex flex-col">
      <div className="bg-white px-6 pt-6 pb-4 border-b border-neutral-100">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('role-selection')}
            className="w-10 h-10 bg-neutral-100 rounded-xl flex items-center justify-center cursor-pointer hover:bg-neutral-200 transition-colors"
          >
            <ArrowLeft className="text-neutral-900" size={20} />
          </button>
          <div>
            <h2 className="text-neutral-900">Style Guide</h2>
            <p className="text-neutral-600 text-sm">DabbaX Design System</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-neutral-900 mb-3">Quick Navigation</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button onClick={() => navigate('subscriber-home')}>Subscriber</Button>
              <Button onClick={() => navigate('chef-dashboard')}>Chef</Button>
              <Button onClick={() => navigate('delivery-dashboard')}>Delivery</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
