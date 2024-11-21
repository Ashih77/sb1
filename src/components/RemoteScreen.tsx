import React, { useRef, useEffect } from 'react';
import { ControlPanel } from './ControlPanel';
import { useFullScreen } from '../hooks/useFullScreen';

interface RemoteScreenProps {
  stream: MediaStream | null;
  onDisconnect: () => void;
}

export const RemoteScreen: React.FC<RemoteScreenProps> = ({ stream, onDisconnect }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isAudioEnabled, setIsAudioEnabled] = React.useState(false);
  const { isFullScreen, toggleFullScreen } = useFullScreen(containerRef);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const handleToggleAudio = () => {
    if (stream) {
      const audioTracks = stream.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !isAudioEnabled;
      });
      setIsAudioEnabled(!isAudioEnabled);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-full bg-black rounded-lg overflow-hidden">
      {stream ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-contain"
          />
          <ControlPanel
            isFullScreen={isFullScreen}
            isAudioEnabled={isAudioEnabled}
            onToggleFullScreen={toggleFullScreen}
            onToggleAudio={handleToggleAudio}
            onDisconnect={onDisconnect}
          />
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <p className="text-lg">Waiting for connection...</p>
        </div>
      )}
    </div>
  );
};