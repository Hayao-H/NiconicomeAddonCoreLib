import { SyncedProperty } from "../syncedProperty";
import { TabHandle } from "../../../../@types/local/tab/tab";
import { Message, notifyChange, requestData } from "../message";
import { SyncedPropertyHandlerBase } from "../syncedPropertyHandlerBase";

export class SyncedPropertyHanderForBackground<T> extends SyncedPropertyHandlerBase<T> {

    //#region  field

    private readonly tabs: Array<TabHandle> = [];

    //#endregion

    //#region  Methods

    /**
     * 同期プロパティーを同期するタブを追加
     * @param tab タブ情報
     */
    public addSyncedTab(tab: TabHandle): void {
        this.tabs.push(tab);
        this.subscribeMessage(tab);
    }

    /**
     * 同期プロパティーを同期するタブを削除
     * @param tab タブ情報
     * @returns 操作の成功・不成功を表す真偽値
     */
    public removeSyncedTab(tab: TabHandle): boolean {
        const index = this.tabs.indexOf(tab);
        if (index < 0) {
            return false;
        }

        this.tabs.splice(index, 1);

        return true;
    }

    //#endregion

    //#region override

    private subscribeMessage(tab: TabHandle) {
        tab.addMessageHandler((message: string) => {

            const data: Message = JSON.parse(message) as Message;

            if (data.syncedProperty !== true) {
                return;
            }

            if (data.messageType === notifyChange) {
                const p: SyncedProperty<T> = this.getProperty(data.name);

                const value: T | null = this.parse(data.data);

                if (value === null) {
                    return;
                }

                p.cancelSubscriptionOnce();
                p.value = value;
            } else if (data.messageType === requestData) {
                for (const key in this.props) {
                    this.postMessage(this.getProperty(key));
                }
            }


        });
    }

    protected postMessage(property: SyncedProperty<T>): void {

        const message = this.serialize(property);
        const messageS = JSON.stringify(message);

        this.tabs.forEach(t => {
            t.postMessage(messageS);
        });

    }

    //#endregion    

}