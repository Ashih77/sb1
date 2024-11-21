import React from 'react';
import { Device } from '../types';

interface DeviceListProps {
  devices: Device[];
  onConnect: (device: Device) => void;
}

export const DeviceList: React.FC<DeviceListProps> = ({ devices, onConnect }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Available Devices</h2>
      <div className="grid gap-4">
        {devices.map((device) => (
          <div
            key={device.id}
            className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center"
          >
            <div>
              <h3 className="font-medium">{device.name}</h3>
              <p className="text-sm text-gray-500">{device.type}</p>
            </div>
            <button
              onClick={() => onConnect(device)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Connect
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};