import { initTRPC } from "@trpc/server";

const trpc = initTRPC.create(); // tRPCを初期化してインスタンスを作成。
export const router = trpc.router; // tオブジェクトからルーターを取得しエクスポート
export const procedure = trpc.procedure; // tオブジェクトからプロシージャヘルパーを取得しエクスポート
