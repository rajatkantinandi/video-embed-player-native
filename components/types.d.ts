export type VideoPlayerProps = {
  videoUrl: string;
  thumbnailUrl?: string;
  backgroundColor?: string;
  style?: any;
  onReady?: (event?: any) => void;
  onError?: (event?: any) => void;
  onClick?: (event?: any) => void;
};
