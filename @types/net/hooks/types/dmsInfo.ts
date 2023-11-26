export interface DMSInfo {
  accessRightKey: string;
  videos: VideoStream[];
  audios: AudioStream[];
}

export interface VideoStream {
  id: string;
  height: number;
}

export interface AudioStream {
  id: string;
}
