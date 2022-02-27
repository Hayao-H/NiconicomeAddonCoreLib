export class SyncedEventArgs {
    constructor(data: unknown) {
        this._data = data;
    }

    /**
     * イベントデータ
     */
    private readonly _data: unknown;
}