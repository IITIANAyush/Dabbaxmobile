import { useState } from 'react';
import { ArrowLeft, MapPin, Crosshair, Check } from 'lucide-react';
import Card from '../../ui-system/Card';
import Button from '../../ui-system/Button';

interface Props {
  navigate: (screen: string, data?: any) => void;
  appState: any;
  updateAppState: (updates: any) => void;
}

export default function DropLocationScreen({ navigate, appState, updateAppState }: Props) {
  const [selectedLocation, setSelectedLocation] = useState(appState.selectedLocation || '');
  const [useGPS, setUseGPS] = useState(false);

  const dropPoints = [
    { id: 'ccd', name: 'IITB CCD', address: 'Central Campus Canteen, IIT Bombay' },
    { id: 'lhc', name: 'LHC', address: 'Lecture Hall Complex, IIT Bombay' },
    { id: 'vmcc', name: 'VMCC', address: 'Visvesvaraya Main Complex, IIT Bombay' },
    { id: 'som', name: 'SOM', address: 'School of Management, IIT Bombay' }
  ];

  const handleSelectLocation = (locationId: string) => {
    setSelectedLocation(locationId);
    setUseGPS(false);
  };

  const handleAutoDetect = () => {
    setUseGPS(true);
    setSelectedLocation('auto');
  };

  const handleConfirm = () => {
    const location = useGPS ? 'Auto Detected' : dropPoints.find(p => p.id === selectedLocation)?.name || '';
    updateAppState({ selectedLocation: location });
    navigate('cart');
  };

  return (
    <div className="w-full h-full bg-neutral-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center gap-4 border-b border-neutral-100">
        <button onClick={() => navigate('cart')} className="text-neutral-700">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-neutral-900">Drop Location</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {/* Auto Detect Card */}
        <Card 
          variant="gradient" 
          padding="lg"
          onClick={handleAutoDetect}
          hoverable
          className={`mb-4 border-2 ${useGPS ? 'border-primary' : 'border-transparent'}`}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Crosshair className="text-white" size={24} />
            </div>
            <div className="flex-1">
              <h4 className="text-neutral-900 mb-1">Auto Detect Location</h4>
              <p className="text-neutral-600 text-sm">Use GPS to find nearest drop point</p>
            </div>
            {useGPS && (
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <Check className="text-white" size={16} />
              </div>
            )}
          </div>
        </Card>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-neutral-200" />
          <span className="text-neutral-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-neutral-200" />
        </div>

        {/* Manual Selection */}
        <p className="text-neutral-700 mb-3">Select Drop Location Manually</p>
        <div className="space-y-3">
          {dropPoints.map((point) => (
            <Card
              key={point.id}
              variant="default"
              padding="md"
              onClick={() => handleSelectLocation(point.id)}
              hoverable
              className={`border-2 ${selectedLocation === point.id ? 'border-primary' : 'border-transparent'}`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-primary" size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="text-neutral-900 mb-1">{point.name}</h4>
                  <p className="text-neutral-600 text-sm">{point.address}</p>
                </div>
                {selectedLocation === point.id && (
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="text-white" size={16} />
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Confirm Button */}
      <div className="p-6 bg-white border-t border-neutral-100">
        <Button
          fullWidth
          onClick={handleConfirm}
          disabled={!selectedLocation}
        >
          Confirm Location
        </Button>
      </div>
    </div>
  );
}