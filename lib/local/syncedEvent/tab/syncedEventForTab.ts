import { SyncedEventBase } from "../syncedEventBase";
import { Message } from "../message";

export class SyncedEventForTab extends SyncedEventBase {

    constructor() {
        super();
        window.chrome.webview.addEventListener("message", message => this.receiveEVent(message.data));
    }

    //#region  private


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

        window.chrome.webview.postMessage(messageS);

    }

    //#endregion
}