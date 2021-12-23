import { SyncedProperty } from "../syncedProperty";
import { Message, requestData } from "../message";
import { SyncedPropertyHandlerBase } from "../syncedPropertyHandlerBase";

export class SyncedPropertyHandlerForTab<T extends string | number | boolean> extends SyncedPropertyHandlerBase<T>{

    /**
     * コンストラクタ
     * @param defaultValue getPropertyメソッドで、プロパティーが存在しない場合に返す初期値
     */
    constructor(defaultValue: T) {
        super(defaultValue);
        this.subscribeMessage();
    }

    //#region  override
    protected subscribeMessage() {

        window.chrome.webview.addEventListener('message', (message: MessageEvent) => {

            const data: Message = JSON.parse(message.data) as Message;

            if (data.syncedProperty !== true) {
                return;
            }

            const p: SyncedProperty<T> = this.getProperty(data.name);

            if (data.dataType !== p.valueType) {
                return;
            }

            const value: T = this.parse(data.data, data.dataType);
            p.cancelSubscriptionOnce();
            p.value = value;
        });

        const message: Message = {
            syncedProperty: true,
            messageType: requestData,
            dataType: "",
            data: "",
            name: ""
        }

        window.chrome.webview.postMessage(JSON.stringify(message));
    }

    protected postMessage(property: SyncedProperty<T>): void {

        const messageS = this.stringify(property);

        window.chrome.webview.postMessage(messageS);

    }

    //#endregion
}