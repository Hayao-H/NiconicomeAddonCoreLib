import { SyncedProperty } from "./syncedProperty.ts";
import { Message, notifyChange } from "./message.ts";
import { JsonUtils } from "../../utils/jsonUtils.ts";


export class SyncedPropertyHandlerBase<T>{

    /**
     * コンストラクタ
     * @param defaultValue getPropertyメソッドで、プロパティーが存在しない場合に返す初期値
     */
    public constructor(defaultValue: T) {
        this.defaultValue = defaultValue;
    }

    //#region  field

    protected readonly props: { [key: string]: SyncedProperty<T> } = {};

    private readonly defaultValue: T;

    //#endregion

    //#region  Methods

    /**
     * 指定した同期プロパティーを取得する
     * @param propertyName 同期プロパティー名
     * @returns 同期プロパティー
     */
    public getProperty(propertyName: string): SyncedProperty<T> {

        if (!this.exists(propertyName)) {
            this.add(propertyName, this.defaultValue);
        }

        return this.props[propertyName];
    }

    /**
     * 指定した同期プロパティーが存在することを確認する
     * @param propertyName 同期プロパティー名
     * @returns 存在するかどうかを表す真偽値
     */
    public exists(propertyName: string): boolean {
        return propertyName in this.props;
    }

    /**
     * 同期プロパティーを追加する
     * @param propertyName 同期プロパティー名
     * @param initiqalValue 既定値
     * @returns 操作の成功・不成功を表す真偽値
     */
    public add(propertyName: string, initiqalValue: T): boolean {
        if (this.exists(propertyName)) {
            return false;
        }

        const p = new SyncedProperty<T>(initiqalValue, propertyName);
        this.props[propertyName] = p;
        p.subscribe(prop => this.postMessage(prop), true);

        return true;
    }

    /**
     * 同期プロパティーを削除する
     * @param propertyName 同期プロパティー名
     * @returns 操作の成功・不成功を表す真偽値
     */
    public remove(propertyName: string): boolean {
        if (!this.exists(propertyName)) {
            return false;
        }

        delete this.props[propertyName];

        return true;
    }

    //#endregion

    //#region  private
    protected postMessage(property: SyncedProperty<T>): void {
        property.name.toString();
    }

    protected parse(data: string): T | null {
        let parsed: T;

        try {
            parsed = JsonUtils.deserialize<T>(data);
        } catch {
            return null;
        }

        return parsed;
    }

    protected serialize(property: SyncedProperty<T>): Message {
        const message: Message = {
            syncedProperty: true,
            data:JsonUtils.serialize(property.value),
            name: property.name,
            messageType: notifyChange
        };

        return message;
    }

    //#endregion    
}