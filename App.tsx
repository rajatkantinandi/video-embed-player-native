import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Pressable, SafeAreaView } from 'react-native';
import { Stack, TamaguiProvider, Theme, YStack } from 'tamagui';
import config from './tamagui.config';
import SplashScreen from './SplashScreen';
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import VideoList from './components/VideoList';
import { Text } from 'tamagui';

preventAutoHideAsync();

export default function App() {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('dark');
  const [loaded] = useFonts({
    'comfortaa-medium': require('./assets/fonts/Comfortaa-Medium.ttf'),
    'comfortaa-regular': require('./assets/fonts/Comfortaa-Regular.ttf'),
    'comfortaa-bold': require('./assets/fonts/Comfortaa-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return <SplashScreen />;
  }

  return (
    <TamaguiProvider config={config}>
      <Theme name={colorScheme}>
        <StatusBar style="auto" />
        <YStack width="100%" flex={1}>
          <SafeAreaView style={{ backgroundColor: config.themes[colorScheme!].accent.val }}>
            <Stack
              flex={0}
              backgroundColor="$accent"
              px="$4"
              py="$3"
              flexDirection="row"
              ai="center"
              jc="space-between"
            >
              <Text color="$color" fontSize={30}>
                Latest trailers
              </Text>
              <Pressable
                style={{ backgroundColor: '#222', borderRadius: 50, padding: 10, marginTop: 10 }}
                onPress={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}
              >
                <Text color="$light" fontSize={16}>
                  {colorScheme === 'dark' ? '🌙 Dark' : '☀️ Light'}
                </Text>
              </Pressable>
            </Stack>
          </SafeAreaView>
          <YStack flex={1} jc="center" ai="center" backgroundColor="$background">
            <VideoList />
          </YStack>
        </YStack>
      </Theme>
    </TamaguiProvider>
  );
}
