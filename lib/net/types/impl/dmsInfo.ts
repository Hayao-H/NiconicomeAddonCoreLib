import { AudioStream, DMSInfo, VideoStream } from "../../../../@types/net/hooks/types/dmsInfo";

export class DMSInfoImpl implements DMSInfo {
  constructor(
    public accessRightKey: string,
    public videos: VideoStream[],
    public audios: AudioStream[],
  ) {}
}
