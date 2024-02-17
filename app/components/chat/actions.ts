"use server";

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

export async function chatAnswer(question: string) {
  const data = await import(`@/app/data/es.json`).then(
    (module) => module.default
  );

  const MODEL_NAME = process.env.GEMINI_MODEL_NAME;
  const API_KEY = process.env.GEMINI_API_KEY;

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [{ text: `You are a helpful assistant that replies questions about the information submitted in the json file below as if you were ${
          data.basics.name} /n You can use your own words. ${JSON.stringify(data)}`},]
      },
      {
        role: "model",
        parts: [{text: "OK"}]
      }
    ],
  });

  const result = await chat.sendMessage(question);
  const response = result.response;
  return response.text();
}
