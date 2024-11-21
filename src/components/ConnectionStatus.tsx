import React from 'react';
import { FaCircle } from 'react-icons/fa';

interface ConnectionStatusProps {
  isConnected: boolean;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ isConnected }) => {
  return (
    <div className="flex items-center gap-2">
      <FaCircle className={`h-3 w-3 ${isConnected ? 'text-green-500' : 'text-red-500'}`} />
      <span className="text-sm font-medium">
        {isConnected ? 'Connected' : 'Disconnected'}
      </span>
    </div>
  );
};