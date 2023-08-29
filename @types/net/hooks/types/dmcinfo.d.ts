import { SessionInfo } from "./sessioninfo";
import { Tag } from "./tag";
import { Target } from "./target";
import { Thumbinfo } from "./thumbinfo";

export interface DmcInfo {
    Title: string;
    Id: string;
    Owner: string;
    OwnerID: number;
    UserId: string;
    ChannelID: string;
    ChannelName: string;
    Description: string;
    CommentServer: string;
    Threadkey: string;
    CommentLanguage: string;
    ViewCount: number;
    CommentCount: number;
    MylistCount: number;
    LikeCount: number;
    Duration: number;
    Tags: Tag[];
    IsDownloadable: boolean;
    IsEncrypted: boolean;
    IsOfficial: boolean;
    UploadedOn: Date;
    DownloadStartedOn: Date;
    SessionInfo: SessionInfo;
    CommentTargets: Target[];
    ThumbInfo: Thumbinfo;
    IsPremium: boolean;
    IsPeakTime: boolean;
    TrackingID: string;
}