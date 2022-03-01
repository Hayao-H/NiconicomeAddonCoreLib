export class JsonUtils {

    /**
     * JSON文字列をデシリアライズ
     * @param source JSON
     * @returns JSONからデシリアライズされたオブジェクト
     */
    public static deserialize<T>(source: string): T {
        return JSON.parse(source, str => {
            if (typeof (str) == "string" &&
                str.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)) {
                return new Date(Date.parse(str));
            }
            return str;
        });
    }

    /**
     * オブジェクトをJSON文字列にシリアライズする
     * @param data オブジェクト
     * @returns JSON形式にシリアライズされた文字列
     */
    public static serialize<T>(data:T):string{
        return JSON.stringify(data);
    }
}