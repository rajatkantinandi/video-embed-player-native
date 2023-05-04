/* eslint-disable no-undef */
import React, { useEffect, useRef } from 'react';
import { VideoPlayerProps } from './types';

export default function EmbeddedVideo({ videoUrl, style, onReady, onError, onClick }: VideoPlayerProps) {
  const iframeRef = useRef<any>(null);

  useEffect(() => {
    // When iframe is clicked & is in focus, current window will be blurred
    window.addEventListener('blur', onWindowBlur);

    return () => {
      window.removeEventListener('blur', onWindowBlur);
    };
  }, []);

  const onWindowBlur = () => {
    // Need some delay for activeElement to change
    setTimeout(() => {
      const { activeElement } = document;

      if (activeElement === iframeRef?.current && onClick) {
        onClick();
      }
    }, 500);
  };

  return (
    <iframe
      style={style}
      title="embedded player"
      src={videoUrl}
      ref={iframeRef}
      width="100%"
      height="100%"
      frameBorder="0"
      allowFullScreen
      allow="autoplay;"
      onLoad={onReady}
      onError={onError}
    />
  );
}
