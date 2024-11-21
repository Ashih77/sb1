import React from 'react';
import { ConnectionStatus } from './components/ConnectionStatus';
import { DeviceList } from './components/DeviceList';
import { RemoteScreen } from './components/RemoteScreen';
import { useStore } from './store/useStore';
import { Device } from './types';
import { WebRTCService } from './services/webrtc';

const mockDevices: Device[] = [
  { id: '1', name: 'MacBook Pro', type: 'MacBook', status: 'online' },
  { id: '2', name: 'iPad Pro', type: 'iPad', status: 'online' },
];

const webRTCService = new WebRTCService();

function App() {
  const { isConnected, currentDevice, stream, setCurrentDevice } = useStore();

  const handleConnect = async (device: Device) => {
    try {
      setCurrentDevice(device);
      await webRTCService.initializeConnection(true);
    } catch (error) {
      console.error('Failed to connect:', error);
      setCurrentDevice(null);
    }
  };

  const handleDisconnect = () => {
    webRTCService.disconnect();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Remote Desktop Control</h1>
          <ConnectionStatus isConnected={isConnected} />
        </header>

        {!currentDevice ? (
          <DeviceList devices={mockDevices} onConnect={handleConnect} />
        ) : (
          <div className="aspect-video">
            <RemoteScreen stream={stream} onDisconnect={handleDisconnect} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;