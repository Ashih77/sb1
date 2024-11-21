import Peer from 'simple-peer';
import { useStore } from '../store/useStore';

export class WebRTCService {
  private peer: Peer.Instance | null = null;

  async initializeConnection(isInitiator: boolean): Promise<void> {
    try {
      // Show a user-friendly message before requesting permissions
      alert('Please allow screen sharing when prompted to establish the connection.');
      
      const stream = await this.getDisplayMedia();
      useStore.getState().setStream(stream);

      this.peer = new Peer({
        initiator: isInitiator,
        stream,
        trickle: false,
        config: {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:global.stun.twilio.com:3478' }
          ]
        }
      });

      this.setupPeerEvents();
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          alert('Screen sharing permission was denied. Please allow access to share your screen.');
        } else {
          alert(`Connection failed: ${error.message}`);
        }
      }
      this.handleDisconnect();
      throw error;
    }
  }

  private async getDisplayMedia(): Promise<MediaStream> {
    try {
      return await navigator.mediaDevices.getDisplayMedia({
        video: {
          cursor: 'always',
          displaySurface: 'monitor',
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          throw new Error('Screen sharing permission denied');
        }
      }
      throw error;
    }
  }

  private setupPeerEvents(): void {
    if (!this.peer) return;

    this.peer.on('signal', (data) => {
      // In a real app, send this data to the remote peer via your signaling server
      console.log('Signal data:', data);
    });

    this.peer.on('connect', () => {
      useStore.getState().setIsConnected(true);
      console.log('Peer connection established');
    });

    this.peer.on('stream', (stream) => {
      useStore.getState().setStream(stream);
    });

    this.peer.on('error', (err) => {
      console.error('Peer error:', err);
      this.handleDisconnect();
    });

    this.peer.on('close', () => {
      this.handleDisconnect();
    });
  }

  private handleDisconnect(): void {
    const store = useStore.getState();
    store.setIsConnected(false);
    store.setStream(null);
    store.setCurrentDevice(null);
    
    if (this.peer) {
      this.peer.destroy();
      this.peer = null;
    }
  }

  disconnect(): void {
    this.handleDisconnect();
  }
}