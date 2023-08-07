import React, { useRef, useState } from 'react';
import { Button, Text, YStack } from 'tamagui';
import videoData from '../constants/videoData';
import { Linking, ScrollView, type ScrollView as IScrollView, Image, Pressable } from 'react-native';
import VideoPlayer from './VideoPlayer';

export default function VideoList() {
  const [selectedVideo, setSelectedVideo] = useState<null | (typeof videoData)[number]>(null);
  const scrollRef = useRef<IScrollView>(null);

  return (
    <>
      {!!selectedVideo && <VideoPlayer thumbnailUrl={selectedVideo.thumbnail} videoUrl={selectedVideo.url} />}
      <ScrollView scrollEnabled ref={scrollRef}>
        {videoData.map((video) => (
          <Pressable
            key={video.url}
            onPress={() => {
              setSelectedVideo(video);
              scrollRef.current?.scrollTo({ y: 0, animated: true });
            }}
          >
            <YStack my="$3" mx={20} ai="center">
              <Image source={{ uri: video.thumbnail, height: 130, width: 320 }} />
              <YStack width={320} mt="$3">
                <Text color="$color" mb="$2" fontSize={20} fontFamily="$comfortaaReg">
                  {video.title}
                </Text>
                <Pressable onPress={() => Linking.openURL(video.channel.url)}>
                  <Text fontSize={18} color="$link" fontFamily="$comfortaaBold" fontWeight="600">
                    {video.channel.title}
                  </Text>
                </Pressable>
              </YStack>
            </YStack>
          </Pressable>
        ))}
      </ScrollView>
    </>
  );
}
