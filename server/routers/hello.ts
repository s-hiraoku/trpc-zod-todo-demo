import { z } from "zod";
import { procedure, router } from "../trpc";

// APIのルートを定義
export const helloRouter = router({
  // 'hello'という名前のルートを定義
  getHello: procedure
    // 入力となるオブジェクトの型をzodで定義
    .input(
      z.object({
        text: z.string(), // 'text'という名前のプロパティが文字列であることを定義
      })
    )
    // 入力データを元に返却するデータを定義
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`, // 入力の'text'プロパティを使って挨拶文を作成
      };
    }),
});
