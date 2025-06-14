import express from 'express';
import { generateFromGemini } from '../AI/gemini_api_integration.js';

const router = express.Router();

router.post('/generate-text', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }
  try {
    const result = await generateFromGemini(prompt);
    res.json({ result });
  } catch (error) {
    console.error('Gemini API error:', error);
    res.status(500).json({ error: 'Failed to generate text' });
  }
});

export default router;
