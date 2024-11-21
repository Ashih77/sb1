export interface Device {
  id: string;
  name: string;
  type: 'MacBook' | 'iPad' | 'Other';
  status: 'online' | 'offline';
}

export interface ConnectionState {
  isConnected: boolean;
  currentDevice: Device | null;
  stream: MediaStream | null;
}