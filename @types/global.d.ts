import { Log } from "./local/io/log";
import { Output } from "./local/io/output";
import { Hooks } from "./net/hooks/hooks";
import { Response } from "./net/http/fetch/Response";
import { Storage } from "./local/storage/storage";

declare global {

    /**
     * Niconicomeが提供するAPIのルートオブジェクトです
     */
    const application: Application;

    /**
     * fetch API
     * @param url 取得したいページのURL
     * @param options オプション。
     */
    function fetch(url: string, options: FetchOption | null): Promise<Response>;

    function parseHtml(source: string): ParentNode;
}

/**
 * Niconicomeが提供するAPIのルートオブジェクトです
 */
export const application: Application;

/**
 * fetch API
 * @param url 取得したいページのURL
 * @param options オプション。
 */
export function fetch(url: string, options: FetchOption | null): Promise<Response>;

/**
 * グローバルスコープに公開されている{@link application}変数のインターフェースです
 */
export interface Application {

    /**
     * Output APIです</br>
     * 使用するためにはoutput権限を取得する必要があります。
     */
    output: Output | null;

    /**
     * Hooks APIです</br>
     * 使用するためにはhooks権限を取得する必要があります。
     */
    hooks: Hooks | null;

    /**
     * Log APIです</br>
     * 使用するためにはlog権限を取得する必要があります。
     */
    log: Log | null;

    /**
     * Storage APIです</br>
     * 使用するためにはstorage権限を取得する必要があります。
     */
    storage: Storage | null;
}

export interface FetchOption {
    /**
     * メソッド。デフォルトはGETです。
     */
    method?: 'POST' | 'GET',

    /**
     * 認証情報を含める。 
     * `include'を指定する場合、session権限が必要です。
     * デフォルトは'omit'です。
     */
    credentials?: 'include' | 'omit',

    /**
     * body。
     * POSTメソッドの場合必須です。
     */
    body?: string,
}

export interface ParentNode {
    QuerySelector(selectors: string): Element | null;
}


export interface Element {
    GetAttribute(name: string): string;
}