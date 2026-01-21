
import { GoogleGenAI } from "@google/genai";

export async function getSustainabilityInsight(query: string) {
  try {
    // Initializing GoogleGenAI inside the function as per guidelines to ensure the latest API key is used.
    // Use the API_KEY from environment variables directly.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Upgraded to gemini-3-pro-preview for complex reasoning tasks involving architectural expertise and urban planning.
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: query,
      config: {
        systemInstruction: `You are an expert in sustainable urban planning and architecture for the EcoSphere project. 
        Keep your answers concise, professional, and focused on green building systems, carbon neutrality, and innovative urban designs.
        Format your response as a short paragraph or bullet points.`,
        temperature: 0.7,
      },
    });
    
    // Using the .text property directly to extract generated content.
    return response.text || "I'm sorry, I couldn't process that insight right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The EcoSphere AI is currently recalibrating. Please try again in a moment.";
  }
}
