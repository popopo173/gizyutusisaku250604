import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "",
  dangerouslyAllowBrowser: true,
});

export const getDesignBackgrounds = async (userPrompt) => {
  const prompt = `
以下の説明に合うCSSの背景スタイル（背景色）を3つ提案してください。
単色ではなく、グラデーション、模様、カラフルな表現などを含めた creative なスタイルにしてください。
出力は以下の形式のJSON配列です：
[
  {"backgroundColor": "linear-gradient(...)"},
  {"backgroundColor": "radial-gradient(...)"},
  {"backgroundColor": "..."}
]

説明: ${userPrompt}
`;

  const response = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4",
    temperature: 0.8,
  });

  const raw = response.choices[0].message.content;

  try {
    const parsed = JSON.parse(raw);
    return parsed;
  } catch (e) {
    console.error("AIレスポンスのJSON解析エラー", e, raw);
    return null;
  }
};
