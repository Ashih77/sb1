import { useState, useCallback } from 'react';

export const useFullScreen = (elementRef: React.RefObject<HTMLElement>) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = useCallback(async () => {
    if (!elementRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await elementRef.current.requestFullscreen();
        setIsFullScreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullScreen(false);
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error);
    }
  }, [elementRef]);

  return { isFullScreen, toggleFullScreen };
};