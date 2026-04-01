import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function processImage(base64Image: string, prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: [
        {
          inlineData: {
            data: base64Image,
            mimeType: "image/png",
          },
        },
        {
          text: prompt || "Transform this product photo into a professional, high-end commercial image with the 'UAU' effect. Enhance lighting, colors, and background to make it look premium for an e-commerce store.",
        },
      ],
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image generated");
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}
