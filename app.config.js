import packageJSON from './package.json';

const bundleIdentifier = 'com.videoembedplayer.app';

export default {
  expo: {
    name: 'Latest Movie Trailers',
    owner: 'rajatkn',
    slug: 'video-embed-player',
    version: packageJSON.version,
    orientation: 'portrait',
    icon: './assets/icon.png',
    scheme: 'app',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'cover',
      backgroundColor: '#F4EDE3',
    },
    assetBundlePatterns: [
      '**/*',
    ],
    ios: {
      bundleIdentifier,
      buildNumber: packageJSON.version,
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFCF8',
      },
      package: bundleIdentifier,
      versionCode: 1,
      jsEngine: 'hermes',
    },
    web: {
      favicon: './assets/favicon.png',
      backgroundColor: '#FFFCF8',
      description: "A video player that plays embedded videos.",
      themeColor: '#FFFCF8',
      bundler: 'metro',
    },
    extra: {
      ENV: process.env.ENV,
      eas: {
        projectId: 'a5ad23de-b01f-4d46-b805-efb24ca6fc72',
      },
    },
  },
  name: 'app',
};
