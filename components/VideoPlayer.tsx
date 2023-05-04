import React, { useEffect, useState } from 'react';
import EmbeddedVideo from './EmbeddedVideo';
import { Image, Spinner, Stack } from 'tamagui';
import { VideoPlayerProps } from './types';

/**
 * Video player.
 * @param videoUrl - The video URL.
 * @param backgroundColor - The component's background color.
 * @param style - The player's custom style.
 * @param onReady - A function what will be called when the player is ready.
 * @param onError - A function what will be called when the player has an error.
 * @param onClick - A function what will be called when the video is played.
 */
export default function VideoPlayer({
  videoUrl,
  thumbnailUrl,
  backgroundColor,
  style,
  onReady,
  onError,
  onClick,
}: VideoPlayerProps) {
  const containerStyle = { backgroundColor };
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(false);
  }, [thumbnailUrl]);

  const handleLoad = () => {
    setIsReady(true);

    if (onReady) {
      onReady();
    }
  };

  const handleError = () => {
    if (onError) {
      onError();
    }
  };

  const handleVideoClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Stack
      key={videoUrl}
      enterStyle={{
        scale: 0.5,
        y: -200,
        opacity: 0,
      }}
      exitStyle={{
        scale: 0.5,
        y: 200,
        opacity: 0,
      }}
      animation="appear"
      opacity={1}
      scale={1}
      y={0}
      style={{ marginVertical: 20, marginBottom: 40, minWidth: 300, width: '100%', aspectRatio: 16 / 9 }}
    >
      {!!thumbnailUrl && (
        <>
          <Image
            source={{ uri: thumbnailUrl }}
            style={{ aspectRatio: 16 / 9 }}
            mb="$3"
            opacity={isReady ? 0 : 1}
            position={isReady ? 'absolute' : 'relative'}
          />
          {!isReady && (
            <Spinner style={{ backgroundColor }} position="absolute" size="large" zIndex={2} alignSelf="center" top="40%" />
          )}
        </>
      )}
      <EmbeddedVideo
        videoUrl={videoUrl}
        style={{ ...containerStyle, ...style }}
        onReady={handleLoad}
        onError={handleError}
        backgroundColor={backgroundColor}
        onClick={handleVideoClick}
      />
    </Stack>
  );
}
