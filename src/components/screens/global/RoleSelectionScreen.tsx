import { motion } from 'motion/react';
import { User, ChefHat, Truck } from 'lucide-react';
import Card from '../../ui-system/Card';

interface Props {
  navigate: (screen: string, data?: any) => void;
  updateAppState: (updates: any) => void;
}

export default function RoleSelectionScreen({ navigate, updateAppState }: Props) {
  const roles = [
    {
      id: 'subscriber',
      title: 'Subscriber',
      description: 'Order delicious meals from campus chefs',
      icon: User,
      gradient: 'from-[#C4502F] to-[#A63D20]'
    },
    {
      id: 'chef',
      title: 'Chef',
      description: 'Prepare and serve meals to students',
      icon: ChefHat,
      gradient: 'from-[#D64545] to-[#B83232]'
    },
    {
      id: 'delivery',
      title: 'Delivery Partner',
      description: 'Deliver meals across IIT Bombay campus',
      icon: Truck,
      gradient: 'from-[#9C3D3D] to-[#7D2828]'
    }
  ];

  const handleRoleSelect = (roleId: string) => {
    updateAppState({ userRole: roleId });
    navigate('login');
  };

  return (
    <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
      <div className="w-full h-full max-w-[480px] max-h-[1067px] mx-auto bg-gradient-to-br from-neutral-50 to-[#FFE8DC] p-6 flex flex-col" style={{ aspectRatio: '9/20' }}>
        {/* Header */}
        <div className="text-center mt-12 mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-neutral-900 mb-3"
          >
            Welcome to DabbaX
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-600"
          >
            Select your role to continue
          </motion.p>
        </div>

        {/* Role Cards */}
        <div className="flex-1 flex flex-col gap-4 justify-center">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card 
                  variant="elevated" 
                  padding="lg"
                  onClick={() => handleRoleSelect(role.id)}
                  hoverable
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${role.gradient} flex items-center justify-center shadow-lg`}>
                      <Icon className="text-white" size={32} strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-neutral-900 mb-1">{role.title}</h3>
                      <p className="text-neutral-600 text-sm">{role.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center pb-4"
        >
          <p className="text-neutral-500 text-sm">IIT Bombay Campus Only</p>
        </motion.div>
      </div>
    </div>
  );
}