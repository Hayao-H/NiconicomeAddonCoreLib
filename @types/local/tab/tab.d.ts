/**
 * タブを操作できるハンドラ。
 * 必ずコード内で、タブを閉じるまで保持してください。
 */
export interface TabHandle {

    /**
     * タブを閉じます。
     * @returns 操作の成功を表す真偽値
     */
    close(): Promise<boolean>;

    /**
     * 引数で指定したhtmlをタブで表示します。
     * @param htmlContent タブに表示したいHtml形式のテキスト
     */
    navigateToString(htmlContent: string): Promise<void>;
}

export interface Tab {

    /**
     * タイトルを指定してタブを追加
     * @param title タブのタイトル
     */
    add(title: string): Promise<TabHandle>;
}