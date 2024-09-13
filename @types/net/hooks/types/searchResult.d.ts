export interface SearchResult {
    total: number;
    items: SeatchItem[];
}

export interface SeatchItem {
    ContentId: string;

    Title: string;

    PostAt: Date;

    ViewCounter: number;

    MylistCounter: number;

    CommentCounter: number;

    LikeCounter: number;

    ThumbnailUrl: string;

    LengthSeconds: number;
}
