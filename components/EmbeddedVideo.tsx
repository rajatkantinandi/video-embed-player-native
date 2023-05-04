import React, { useMemo } from 'react';
import { Platform, TouchableWithoutFeedback } from 'react-native';
import WebView from 'react-native-webview';
import { Spinner } from 'tamagui';
import { VideoPlayerProps } from './types';

export default function EmbeddedVideo({
  videoUrl,
  style,
  backgroundColor,
  onError,
  onReady,
  onClick,
}: VideoPlayerProps) {
  const webviewRef = React.useRef<WebView>(null);
  const injectedScript = useMemo(
    () => `
    const meta = document.createElement('meta');
    meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=1');
    meta.setAttribute('name', 'viewport');
    document.getElementsByTagName('head')[0].appendChild(meta);
    document.body.style.backgroundColor = '${backgroundColor}';
  `,
    [backgroundColor],
  );

  const handleLoad = () => {
    if (onReady) {
      onReady();
    }

    webviewRef.current?.injectJavaScript(injectedScript);
  };

  const handleError = (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    // eslint-disable-next-line no-console
    console.warn('Unable to load video player: ', nativeEvent);

    if (onError) {
      onError();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <WebView
        source={{
          html: `<iframe 
            width="100%" 
            height="100%" 
            src="${videoUrl}" 
            frameborder="0" 
            allow="autoplay;"
            allowfullscreen />`,
        }}
        style={style}
        ref={webviewRef}
        allowsFullscreenVideo
        allowsInlineMediaPlayback
        allowsBackForwardNavigationGestures
        startInLoadingState
        injectedJavaScriptForMainFrameOnly={false}
        contentInsetAdjustmentBehavior="automatic"
        setSupportMultipleWindows={false}
        mediaPlaybackRequiresUserAction={Platform.OS !== 'android' || Platform.Version >= 17 ? false : undefined}
        // This is required for autoplay as youtube blocks some user agents.
        // https://github.com/react-native-webview/react-native-webview/issues/859
        // eslint-disable-next-line max-len
        userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
        renderLoading={() => (
          <Spinner  style={{ backgroundColor }} />
        )}
        onLoadEnd={handleLoad}
        onError={handleError}
      />
    </TouchableWithoutFeedback>
  );
}
