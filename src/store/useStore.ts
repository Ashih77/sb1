import create from 'zustand';
import { ConnectionState, Device } from '../types';

interface StoreState extends ConnectionState {
  setIsConnected: (isConnected: boolean) => void;
  setCurrentDevice: (device: Device | null) => void;
  setStream: (stream: MediaStream | null) => void;
}

export const useStore = create<StoreState>((set) => ({
  isConnected: false,
  currentDevice: null,
  stream: null,
  setIsConnected: (isConnected) => set({ isConnected }),
  setCurrentDevice: (device) => set({ currentDevice: device }),
  setStream: (stream) => set({ stream }),
}));