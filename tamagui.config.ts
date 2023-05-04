import { createAnimations } from '@tamagui/animations-react-native';
import { createMedia } from '@tamagui/react-native-media-driver';
import { shorthands } from '@tamagui/shorthands';
import { tokens } from '@tamagui/themes';
import { createFont, createTamagui, createTokens } from 'tamagui';

const animations = createAnimations({
  bouncy: {
    type: 'spring',
    damping: 10,
    mass: 0.9,
    stiffness: 100,
  },
  appear: {
    type: 'timing',
    delay: 100,
    duration: 250,
    useNativeDriver: true,
  },
});

const fontSizesAndSpacing = {
  size: tokens.size,
  lineHeight: {
    1: 17,
    2: 22,
    3: 25,
  },
  weight: {
    4: '300',
    6: '600',
  },
  letterSpacing: {
    4: 0,
    8: -1,
  },
};

const comfortaaMed = createFont({
  family: 'comfortaa-medium',
  ...fontSizesAndSpacing,
});
const comfortaaReg = createFont({
  family: 'comfortaa-regular',
  ...fontSizesAndSpacing,
});
const comfortaaBold = createFont({
  family: 'comfortaa-bold',
  ...fontSizesAndSpacing,
});

const updatedTokens = createTokens({
  color: {
    dark: '#28282c',
    light: '#f3eded',
    linkDarkMode: '#97ebf5',
    linkLightMode: 'rgb(9, 17, 123)',
    accentLight: '#95f1ae',
    accentDark: '#3c9c6b',
  },
  radius: tokens.radius,
  size: tokens.size,
  space: tokens.space,
  zIndex: tokens.zIndex,
});

const config = createTamagui({
  animations,
  defaultTheme: 'dark',
  shouldAddPrefersColorThemes: false,
  themeClassNameOnRoot: false,
  shorthands,
  fonts: {
    comfortaaMed,
    comfortaaReg,
    comfortaaBold,
    body: comfortaaReg,
    heading: comfortaaBold,
  },
  tokens: updatedTokens,
  themes: {
    dark: {
      background: updatedTokens.color.dark,
      color: updatedTokens.color.light,
      link: updatedTokens.color.linkDarkMode,
      accent: updatedTokens.color.accentDark,
    },
    light: {
      background: updatedTokens.color.light,
      color: updatedTokens.color.dark,
      link: updatedTokens.color.linkLightMode,
      accent: updatedTokens.color.accentLight,
    },
  },
  media: createMedia({
    sm: { maxWidth: 480 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
  }),
  defaultProps: {
    Text: {
      color: '$color',
    },
    Stack: {
      backgroundColor: '$background',
    },
  } as any,
});

export type AppConfig = typeof config
declare module 'tamagui' {
  // overrides TamaguiCustomConfig so your custom types
  // work everywhere you import `tamagui`
  interface TamaguiCustomConfig extends AppConfig { }
}
export default config
