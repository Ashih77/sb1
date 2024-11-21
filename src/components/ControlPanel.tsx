import React from 'react';
import { FaExpand, FaCompress, FaDesktop, FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

interface ControlPanelProps {
  isFullScreen: boolean;
  isAudioEnabled: boolean;
  onToggleFullScreen: () => void;
  onToggleAudio: () => void;
  onDisconnect: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  isFullScreen,
  isAudioEnabled,
  onToggleFullScreen,
  onToggleAudio,
  onDisconnect,
}) => {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900/75 rounded-full px-6 py-3 flex items-center gap-4">
      <button
        onClick={onToggleFullScreen}
        className="text-white hover:text-blue-400 transition-colors"
        title={isFullScreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
      >
        {isFullScreen ? <FaCompress size={20} /> : <FaExpand size={20} />}
      </button>
      <button
        onClick={onToggleAudio}
        className="text-white hover:text-blue-400 transition-colors"
        title={isAudioEnabled ? 'Mute Audio' : 'Unmute Audio'}
      >
        {isAudioEnabled ? <FaMicrophone size={20} /> : <FaMicrophoneSlash size={20} />}
      </button>
      <button
        onClick={onDisconnect}
        className="text-white hover:text-red-400 transition-colors"
        title="Disconnect"
      >
        <FaDesktop size={20} />
      </button>
    </div>
  );
};