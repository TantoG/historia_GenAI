import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ImageSize, SearchResult } from "../types";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });

/**
 * Chat with the AI Tutor
 */
export const sendChatMessage = async (history: { role: string; parts: { text: string }[] }[], newMessage: string): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: "Eres un profesor experto y amable de Historia de la Inteligencia Artificial. Tu objetivo es explicar conceptos complejos de visión por computadora (CNN, Transformers, Difusión) de manera sencilla y didáctica a estudiantes. Usa analogías. Sé conciso.",
      },
      history: history
    });

    const response: GenerateContentResponse = await chat.sendMessage({ message: newMessage });
    return response.text || "Lo siento, no pude generar una respuesta.";
  } catch (error) {
    console.error("Chat error:", error);
    throw new Error("Error al comunicarse con el tutor IA.");
  }
};

/**
 * Generate Image using Gemini 2.5 Flash Image (More reliable/accessible)
 */
export const generateImage = async (prompt: string): Promise<string> => {
  try {
    // Using gemini-2.5-flash-image as it is generally more accessible and fast for demos
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
          // imageSize is not supported in flash-image, removed to prevent errors
        },
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No se generó ninguna imagen. Intenta simplificar el prompt.");
  } catch (error) {
    console.error("Image gen error:", error);
    throw error;
  }
};

/**
 * Search for latest info using Gemini 3 Flash with Google Search Tool
 * Enforces Spanish response
 */
export const searchLatestAIInfo = async (query: string): Promise<{ text: string; links: SearchResult[] }> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `${query}. Responde estrictamente en español. Resume los puntos clave.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "No se encontró información.";
    
    // Extract grounding chunks for links
    const links: SearchResult[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    chunks.forEach((chunk: any) => {
      if (chunk.web?.uri && chunk.web?.title) {
        links.push({
          title: chunk.web.title,
          uri: chunk.web.uri
        });
      }
    });

    return { text, links };
  } catch (error) {
    console.error("Search error:", error);
    return { text: "Hubo un error al buscar información actualizada.", links: [] };
  }
};