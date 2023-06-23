import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "../../../server/routers/_app";

// APIハンドラをエクスポート
// 詳細は https://trpc.io/docs/server/adapters を参照
export default trpcNext.createNextApiHandler({
  router: appRouter, // 使用するルーターとしてappRouterを指定
  createContext: () => ({}), // APIのコンテキストを作成する関数。ここでは空のオブジェクトを返す
});
