import { httpBatchLink } from "@trpc/client"; // tRPCクライアントのhttpBatchLinkをインポート
import { createTRPCNext } from "@trpc/next"; // tRPCのNext.jsアダプタからcreateTRPCNextをインポート
import type { AppRouter } from "../server/routers/_app"; // AppRouter型をインポート

// ベースURLを取得する関数
function getBaseUrl() {
  if (typeof window !== "undefined")
    // ブラウザの場合は相対パスを使用
    return "";
  if (process.env.VERCEL_URL)
    // Vercelの場合
    return `https://${process.env.VERCEL_URL}`;
  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // Renderの場合
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  // 上記のいずれにも該当しない場合はlocalhostを仮定
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

// tRPCのクライアントを作成
export const trpc = createTRPCNext<AppRouter>({
  config(opts) {
    return {
      links: [
        httpBatchLink({
          // SSRを使用する場合は、サーバの完全なURLが必要
          // 詳細は https://trpc.io/docs/ssr を参照
          url: `${getBaseUrl()}/api/trpc`,
          // 必要なHTTPヘッダーをここに設定可能
          async headers() {
            return {
              // authorization: getAuthCookie(),
            };
          },
        }),
      ],
    };
  },
  // SSRの使用有無を設定
  // 詳細は https://trpc.io/docs/ssr を参照
  ssr: false,
});
