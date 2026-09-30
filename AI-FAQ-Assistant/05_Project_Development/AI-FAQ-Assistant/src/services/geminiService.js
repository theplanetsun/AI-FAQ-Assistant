const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const MODEL = 'gemini-3.6-flash';

// Generates a direct answer for a given question using Gemini
const generateAnswer = async (question) => {
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: `Answer the following FAQ-style question clearly and concisely:\n\n${question}`,
  });

  return response.text.trim();
};

// Generates a full FAQ pair (question, answer, category) for a given topic
const generateFAQPair = async (topic) => {
  const prompt = `You are generating a single FAQ entry for a support knowledge base.
Topic: "${topic}"

Respond ONLY with strict JSON (no markdown fences, no preamble) in this exact shape:
{
  "generatedQuestion": "...",
  "generatedAnswer": "...",
  "generatedCategory": "Technology | Education | Health | Banking | General"
}`;

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
  });

  const raw = response.text.trim().replace(/```json|```/g, '').trim();

  let parsed;

  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    const error = new Error('AI service returned an unparseable response');
    error.status = 502;
    throw error;
  }

  return {
    topic,
    generatedQuestion: parsed.generatedQuestion,
    generatedAnswer: parsed.generatedAnswer,
    generatedCategory: parsed.generatedCategory || 'General',
    generatedAt: new Date(),
  };
};

module.exports = { generateAnswer, generateFAQPair };