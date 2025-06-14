import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

if (!GEMINI_API_KEY) {
  throw new Error('Missing Gemini API key in environment variables.');
}

export async function generateFromGemini(prompt) {
  try {
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Extract generated text from the response
    // (Adjust this depending on the actual API response structure)
    const generatedText = data?.candidates?.[0]?.content || '';

    return generatedText;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
}
