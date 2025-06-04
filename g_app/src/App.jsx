// src/App.jsx
import { useState } from "react";
import { generateImages } from "./services/openai";
import ImageGallery from "./components/ImageGallery";

function App() {
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const imageUrls = await generateImages(prompt);
      setImages(imageUrls);
    } catch (error) {
      console.error("画像生成に失敗しました:", error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">デザイン画像生成AI</h1>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="例: ハワイっぽい雰囲気、ポップな感じ"
        className="w-full p-2 border rounded"
      />
      <button
        onClick={handleGenerate}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {loading ? "生成中..." : "画像を生成"}
      </button>

      <ImageGallery images={images} />
    </div>
  );
}

export default App;
