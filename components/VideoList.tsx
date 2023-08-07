import React, { useRef, useState } from 'react';
import { Button, Image, Text, YStack } from 'tamagui';
import videoData from '../constants/videoData';
import { Linking, TouchableWithoutFeedback, ScrollView, type ScrollView as IScrollView } from 'react-native';
import VideoPlayer from './VideoPlayer';

export default function VideoList() {
  const [selectedVideo, setSelectedVideo] = useState<null | (typeof videoData)[number]>(null);
  const scrollRef = useRef<IScrollView>(null);

  return (
    <>
      {!!selectedVideo && <VideoPlayer thumbnailUrl={selectedVideo.thumbnail} videoUrl={selectedVideo.url} />}
      <ScrollView scrollEnabled ref={scrollRef}>
        {videoData.map((video) => (
          <TouchableWithoutFeedback
            key={video.url}
            onPress={() => {
              setSelectedVideo(video);
              scrollRef.current?.scrollTo({ y: 0, animated: true });
            }}
          >
            <YStack my="$3" mx={20} ai="center">
              <Image source={{ uri: video.thumbnail }} mb="$3" height={130} width={320} br="$true" />
              <YStack width={320}>
                <Text color="$color" fontSize={20} fontFamily="$comfortaaReg">
                  {video.title}
                </Text>
                <Button mt="$2" unstyled onPress={() => Linking.openURL(video.channel.url)}>
                  <Text fontSize={18} color="$link" fontFamily="$comfortaaBold" fontWeight="600">
                    {video.channel.title}
                  </Text>
                </Button>
              </YStack>
            </YStack>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </>
  );
}
