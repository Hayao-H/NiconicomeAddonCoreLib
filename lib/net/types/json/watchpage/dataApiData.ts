export interface DataApiData {
  channel: Channel | null
  client: Client
  comment: Comment | null
  external: External
  genre: Genre
  media: Media | null
  okReason: string
  owner: Owner | null
  system: System | null
  tag: Tag
  video: Video | null
  viewer: Viewer | null
}

export interface Owner {
  id: number;
  nickname: string;
  iconUtl: string;
}

export interface Channel {
  id: string
  name: string
  isOfficialAnime: boolean
}


export interface Client {
  nicosid: string
  watchId: string
  watchTrackId: string
}

export interface Comment {
  server: Server
  keys: Keys
  layers: Layer[]
  threads: Thread[]
  isAttentionRequired: boolean
  nvComment: NvComment
}

export interface Server {
  url: string
}

export interface Keys {
  userKey: string
}

export interface Layer {
  index: number
  isTranslucent: boolean
  threadIds: ThreadId[]
}

export interface ThreadId {
  id: number
  fork: number
}

export interface Thread {
  id: number
  fork: number
  isActive: boolean
  isDefaultPostTarget: boolean
  isEasyCommentPostTarget: boolean
  isLeafRequired: boolean
  isOwnerThread: boolean
  isThreadkeyRequired: boolean
  threadkey: string | null
  is184Forced: boolean
  hasNicoscript: boolean
  label: string
  postkeyStatus: number
  server: string
  videoId: string
  forkLabel: string
}

export interface NvComment {
  threadKey: string
  server: string
  params: Params
}

export interface Params {
  targets: Target[]
  language: string
}

export interface Target {
  id: string
  fork: string
}

export interface NgScore {
  isDisabled: boolean
}

export interface NgViewer {
  revision: number
  count: number
  items: NgViewerItem[]
}

export interface NgViewerItem {
  type: string
  source: string
  registeredAt: string
}

export interface External {
  commons: Commons
  ichiba: Ichiba
}

export interface Commons {
  hasContentTree: boolean
}

export interface Ichiba {
  isEnabled: boolean
}

export interface Genre {
  key: string
  label: string
  isImmoral: boolean
  isDisabled: boolean
  isNotSet: boolean
}

export interface Media {
  delivery: Delivery | null
}

export interface Delivery {
  recipeId: string
  encryption: Encryption
  movie: Movie
  trackingId: string
}

export interface Encryption {
  encryptedKey: string
  keyUri: string
}

export interface Movie {
  contentId: string
  audios: Audio[]
  videos: Video[]
  session: Session
}

export interface Audio {
  id: string
  isAvailable: boolean
  metadata: Metadata
}

export interface Metadata {
  bitrate: number
  samplingRate: number
  loudness: Loudness
  levelIndex: number
  loudnessCollection: LoudnessCollection[]
}

export interface Loudness {
  integratedLoudness: number
  truePeak: number
}

export interface LoudnessCollection {
  type: string
  value: number
}

export interface Video {
  id: string
  isAvailable: boolean
  metadata: VideoMetaData
}

export interface VideoMetaData {
  label: string
  bitrate: number
  resolution: Resolution
  levelIndex: number
  recommendedHighestAudioLevelIndex: number
}

export interface Resolution {
  width: number
  height: number
}

export interface Session {
  recipeId: string
  playerId: string
  videos: string[]
  audios: string[]
  protocols: string[]
  authTypes: AuthTypes
  serviceUserId: string
  token: string
  signature: string
  contentId: string
  heartbeatLifetime: number
  contentKeyTimeout: number
  priority: number
  transferPresets: string[]
  urls: Url[]
}

export interface AuthTypes {
  http: string
  hls: string
}

export interface Url {
  url: string
  isWellKnownPort: boolean
  isSsl: boolean
}


export interface System {
  serverTime: Date
  isPeakTime: boolean
}

export interface Tag {
  items: Tag[] | null
}

export interface Tag {
  name: string
  isCategory: boolean
  isCategoryCandidate: boolean
  isNicodicArticleExists: boolean
  isLocked: boolean
}


export interface Video {
  id: string
  title: string
  description: string
  count: Count
  duration: number
  thumbnail: Thumbnail
  registeredAt: Date
  isPrivate: boolean
  isDeleted: boolean
  isNoBanner: boolean
  isAuthenticationRequired: boolean
  isEmbedPlayerAllowed: boolean
  watchableUserTypeForPayment: string
  commentableUserTypeForPayment: string
}

export interface Count {
  view: number
  comment: number
  mylist: number
  like: number
}

export interface Thumbnail {
  url: string
  middleUrl: string
  largeUrl: string
  player: string
  ogp: string
}



export interface Like {
  isLiked: boolean
  count: number
}

export interface AdditionalParams {
  videoId: string
  videoDuration: number
  isAdultRatingNG: boolean
  isAuthenticationRequired: boolean
  isR18: boolean
  nicosid: string
  lang: string
  watchTrackId: string
  channelId: string
  genre: string
  gender: string
  age: number
}

export interface Viewer {
  id: number
  nickname: string
  isPremium: boolean
}