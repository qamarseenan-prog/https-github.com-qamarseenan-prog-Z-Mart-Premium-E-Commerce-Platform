
import { GoogleGenAI } from "@google/genai";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDescription = async (productName: string, category: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a compelling and professional e-commerce product description for a product named "${productName}" in the "${category}" category. Keep it under 60 words.`,
    });
    return response.text || 'No description generated.';
  } catch (error) {
    console.error('Error generating description:', error);
    return 'Could not generate description at this time.';
  }
};
