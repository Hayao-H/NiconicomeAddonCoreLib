import { TabHandle } from "../../../../@types/local/tab/tab";
import { Message } from "../message";
import { SyncedEventBase } from "../syncedEventBase";

export class SyncedEventForBackground extends SyncedEventBase {

    //#region  private

    private syncedTabs: TabHandle[] = [];

    /**
     * イベントを受信
     * @param message メッセージ
     * @returns 
     */
    private receiveEVent(message: string): void {

        const m: Message = JSON.parse(message);
        if (m.MessageType !== "syncedEvent") {
            return;
        }

        if (m.SerializedEventData === null) {
            this.dispatch(m.EventName, null);
        } else {
            this.dispatch(m.EventName, JSON.parse(m.SerializedEventData));
        }
    }

    //#endregion

    //#region  Method

    /**
     * イベントを発火する
     * @param eventName イベント名
     * @param arg 引数
     */
    public fire(eventName: string, arg: unknown): void
    public fire(eventName: string): void
    public fire(eventName: string, arg: unknown | undefined = undefined): void {
        const data: null | string = arg === undefined ? null : JSON.stringify(arg);
        const message: Message = { MessageType: "syncedEvent", EventName: eventName, SerializedEventData: data };
        const messageS = JSON.stringify(message);

        this.syncedTabs.forEach(tab => tab.postMessage(messageS));

    }

    /**
     * イベントを通知・購読するタブを追加
     * @param tab タブハンドル
     */
    public addSyncedTab(tab: TabHandle): void {

        tab.addMessageHandler(message => this.receiveEVent(message));

        this.syncedTabs.push(tab);
    }

    //#endregion
}