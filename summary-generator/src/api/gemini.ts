import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

async function gemini(input: string) {
    const content = input;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: content || "Explain how AI works in a few words",
    });
    console.log(response.text);
}

export default gemini
