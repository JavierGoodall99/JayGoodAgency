import { GoogleGenAI, Type } from "@google/genai";
import { BrandConcept } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBrandConcept = async (
  industry: string,
  vibe: string
): Promise<BrandConcept> => {
  try {
    const prompt = `
      You are a world-class creative director at an award-winning agency.
      Create a high-end brand concept for a client in the "${industry}" industry.
      The desired vibe is: "${vibe}".
      
      Return a JSON object with:
      1. tagline: A short, punchy, award-winning slogan (max 6 words).
      2. manifesto: A 2-sentence poetic brand statement.
      3. visualDirection: A description of the visual aesthetic (e.g., "Brutalist typography with neon accents").
      4. colorPalette: An array of 3 hex color codes that match the vibe.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tagline: { type: Type.STRING },
            manifesto: { type: Type.STRING },
            visualDirection: { type: Type.STRING },
            colorPalette: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["tagline", "manifesto", "visualDirection", "colorPalette"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as BrandConcept;
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback for demo purposes if API fails or key is missing
    return {
      tagline: "Redefining the digital frontier.",
      manifesto: "We exist in the space between logic and magic. Where code becomes art.",
      visualDirection: "Dark mode minimalist with kinetic typography.",
      colorPalette: ["#FFFFFF", "#000000", "#CCFF00"]
    };
  }
};