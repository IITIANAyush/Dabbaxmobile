import { useState } from 'react';
import { ArrowLeft, User, Phone, Mail, MapPin, Bell, LogOut, ChevronRight } from 'lucide-react';
import Card from '../../ui-system/Card';
import Button from '../../ui-system/Button';
import BottomNav from '../../ui-system/BottomNav';

interface Props {
  navigate: (screen: string, data?: any) => void;
  appState: any;
}

export default function ProfileScreen({ navigate, appState }: Props) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const menuItems = [
    { icon: User, label: 'Edit Profile', onClick: () => {} },
    { icon: MapPin, label: 'Saved Addresses', onClick: () => navigate('drop-location') },
    { icon: Bell, label: 'Notifications', onClick: () => {}, toggle: true },
  ];

  return (
    <div className="w-full h-full bg-neutral-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center gap-4 border-b border-neutral-100">
        <button 
          onClick={() => {
            if (appState.userRole === 'subscriber') navigate('subscriber-home');
            else if (appState.userRole === 'chef') navigate('chef-dashboard');
            else navigate('delivery-dashboard');
          }} 
          className="text-neutral-700"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-neutral-900">Profile</h2>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 px-6">
        {/* Profile Card */}
        <div className="mt-6">
          <Card variant="elevated" padding="lg">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center">
                <User className="text-white" size={32} />
              </div>
              <div className="flex-1">
                <h3 className="text-neutral-900">{appState.userName || 'Guest User'}</h3>
                <p className="text-neutral-500 text-sm">{appState.userPhone || '+91 XXXXXXXXXX'}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Account Details */}
        <div className="mt-6">
          <p className="text-neutral-700 mb-3 px-1">Account Details</p>
          <Card variant="default" padding="none">
            <div className="divide-y divide-neutral-100">
              <div className="px-4 py-4 flex items-center gap-3">
                <Phone className="text-neutral-500" size={20} />
                <div className="flex-1">
                  <p className="text-sm text-neutral-500">Phone</p>
                  <p className="text-neutral-900">{appState.userPhone || '+91 XXXXXXXXXX'}</p>
                </div>
              </div>
              <div className="px-4 py-4 flex items-center gap-3">
                <Mail className="text-neutral-500" size={20} />
                <div className="flex-1">
                  <p className="text-sm text-neutral-500">Email</p>
                  <p className="text-neutral-900">user@iitb.ac.in</p>
                </div>
              </div>
              <div className="px-4 py-4 flex items-center gap-3">
                <MapPin className="text-neutral-500" size={20} />
                <div className="flex-1">
                  <p className="text-sm text-neutral-500">Location</p>
                  <p className="text-neutral-900">IIT Bombay Campus</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Settings */}
        <div className="mt-6">
          <p className="text-neutral-700 mb-3 px-1">Settings</p>
          <Card variant="default" padding="none">
            <div className="divide-y divide-neutral-100">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={index}
                    onClick={item.onClick}
                    className="w-full px-4 py-4 flex items-center gap-3 hover:bg-neutral-50 transition-colors"
                  >
                    <Icon className="text-neutral-500" size={20} />
                    <span className="flex-1 text-left text-neutral-900">{item.label}</span>
                    {item.toggle ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setNotificationsEnabled(!notificationsEnabled);
                        }}
                        className={`w-12 h-6 rounded-full transition-colors ${notificationsEnabled ? 'bg-primary' : 'bg-neutral-300'}`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${notificationsEnabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
                      </button>
                    ) : (
                      <ChevronRight className="text-neutral-400" size={20} />
                    )}
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Logout */}
        <div className="mt-6">
          <Button
            fullWidth
            variant="outlined"
            icon={<LogOut size={20} />}
            onClick={() => navigate('role-selection')}
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav 
        activeScreen={appState.currentScreen} 
        onNavigate={navigate} 
        role={appState.userRole || 'subscriber'}
      />
    </div>
  );
}
