/* eslint-disable no-undef */
import React from 'react';
import { VideoPlayerProps } from './types';

export default function EmbeddedVideo({ videoUrl, style, onReady, onError }: VideoPlayerProps) {
  return (
    <iframe
      style={style}
      title="embedded player"
      src={videoUrl}
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
