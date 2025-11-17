import { motion } from 'motion/react';
import { Clock, CheckCircle } from 'lucide-react';
import Button from '../../ui-system/Button';
import Card from '../../ui-system/Card';

interface Props {
  navigate: (screen: string, data?: any) => void;
  appState: any;
}

export default function WaitingListScreen({ navigate, appState }: Props) {
  const isChef = appState.userRole === 'chef';

  return (
    <div className="w-full h-full bg-gradient-to-br from-neutral-50 to-blue-50 p-6 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full"
      >
        <Card variant="elevated" padding="lg">
          <div className="text-center space-y-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center"
            >
              <Clock className="text-primary" size={40} />
            </motion.div>

            <div>
              <h2 className="text-neutral-900 mb-3">You're on the Waiting List</h2>
              <p className="text-neutral-600">
                {isChef 
                  ? "Thank you for applying to be a Chef on DabbaX! We're reviewing your application and will notify you soon."
                  : "Thank you for applying to be a Delivery Partner! We're reviewing your application and will notify you soon."}
              </p>
            </div>

            <div className="bg-neutral-50 rounded-xl p-4 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                <div className="text-left">
                  <p className="text-sm text-neutral-900">Application Submitted</p>
                  <p className="text-xs text-neutral-500 mt-0.5">We received your details</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 border-2 border-neutral-300 rounded-full flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <p className="text-sm text-neutral-700">Verification in Progress</p>
                  <p className="text-xs text-neutral-500 mt-0.5">We're verifying your details</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 border-2 border-neutral-300 rounded-full flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <p className="text-sm text-neutral-700">Approval</p>
                  <p className="text-xs text-neutral-500 mt-0.5">You'll be notified via SMS & Email</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-900">
                <span className="font-semibold">Estimated Wait Time:</span> 2-3 business days
              </p>
            </div>

            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate('role-selection')}
            >
              Back to Home
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}