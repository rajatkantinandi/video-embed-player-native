import React from 'react';
import { Animated, Image, Platform, StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';

export default function SplashScreen() {
  return (
    <View style={{ flex: 1 }}>
      <View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: Constants.expoConfig?.splash?.backgroundColor,
          },
        ]}
      >
        <Image
          style={{
            width: '100%',
            height: '100%',
            resizeMode: Constants.expoConfig?.splash?.resizeMode,
          }}
          source={require('./assets/splash.png')}
        />
      </View>
    </View>
  );
}
