// src/services/openai.js
import OpenAI from "openai";

console.log("a", process.env.API_KEY);

const openai = new OpenAI({
  apiKey: "",
  dangerouslyAllowBrowser: true, // フロントから使う場合に必要
});

export const generateImages = async (prompt) => {
  const response = await openai.images.generate({
    prompt,
    n: 3,
    size: "512x512",
  });
  return response.data.map((item) => item.url);
};
