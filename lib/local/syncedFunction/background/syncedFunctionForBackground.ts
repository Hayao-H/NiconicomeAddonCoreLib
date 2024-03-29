import { TabHandle } from "../../../../@types/local/tab/tab.d.ts";
import { Message } from "../message.ts";
import { SyncedFunctionParameter } from "../parameter.ts";
import { SyncedFunctionBase } from "../syncedFunctionBase.ts";

export class SyncedFunctionForBackground extends SyncedFunctionBase {

    //#region  field

    private readonly tabs: TabHandle[] = [];

    //#endregion

    //#region  Methods

    /**
     * このクラスに登録した関数を呼び出し可能なタブを追加します。
     * @param tab タブ情報
     */
    public addSyncedTab(tab: TabHandle): void {
        this.tabs.push(tab);
        tab.addMessageHandler((message: string) => this.onMessage(message));
    }

    /**
     * タブ側の関数を呼び出します。
     * @param name 関数名
     * @param parameter 引数
     */
    public call(name: string, parameter: SyncedFunctionParameter): void {

        const message: Message = this.serialize(name, parameter);
        this.tabs.forEach(p => p.postMessage(JSON.stringify(message)));
    }


    //#endregion

    //#region  private

    private onMessage(message: string): void {

        const [name, param] = this.parse(message);

        if (name === null || param === null) return;

        if (!this.exists(name)) return;

        this.functions[name](param);

    }

    //#endregion
}