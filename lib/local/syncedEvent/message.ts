export interface Message {

    /**
     * メッセージタイプ
     */
    MessageType: "syncedEvent";

    /**
     * イベント名
     */
    EventName: string;

    /**
     * イベントの引数
     */
    SerializedEventData: string | null;

}