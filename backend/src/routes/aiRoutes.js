// Import necessary modules from the Node.js ecosystem.
// express: lightweight web framework to define routes and middleware.
// generateFromGemini: a custom module that handles interaction with Google's Gemini API.
// Dataset: Mongoose schema representing the datasets stored in MongoDB.
import express from 'express';
import { generateFromGemini } from '../AI/gemini_api_integration.js';
import { Dataset } from '../models/dataset.model.js';

// Create a new router object that can be mounted into the main application
const router = express.Router();

/**
 * POST /generate-text
 *
 * This route is responsible for receiving a natural language prompt from the user,
 * augmenting it with the dataset collection's basic metadata (IDs and descriptions),
 * and passing that combined context to the Gemini AI model for intelligent matching.
 *
 * The expected output is an ordered array of dataset IDs that are most relevant to the
 * user’s input based on the similarity between the user’s prompt and the dataset descriptions.
 */
router.post('/generate-text', async (req, res) => {
  const { prompt } = req.body;

  // Validate user input: reject the request if 'prompt' is not provided
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    /**
     * Query the database to retrieve only the fields relevant to similarity evaluation.
     * We're limiting the projection to `_id` and `description` fields to reduce overhead,
     * and because these two fields are sufficient for Gemini to perform semantic analysis.
     */
    const datasets = await Dataset.find({}, { _id: 1, description: 1 });

    /**
     * Convert the dataset documents into a formatted string.
     * This representation helps Gemini understand the structure and meaning of the datasets.
     * Each entry is structured as:
     *    ID: <dataset_id>, Description: <summary_text>
     * All entries are joined using newline characters for clear visual separation in the prompt.
     */
    const datasetText = datasets
      .map(ds => `ID: ${ds._id}, Description: ${ds.description}`)
      .join('\n');

    /**
     * Construct a detailed prompt for Gemini by combining the user’s original query
     * with the list of available datasets. This gives the model the full context needed
     * to understand both the user's intent and the nature of the datasets.
     *
     * The instructions direct Gemini to return only the dataset IDs that most closely match
     * the user's query, sorted by relevance, and formatted as a simple array.
     */
    const combinedPrompt = `Here is the user text what users want along with the dataset id and its summary. Give me those datasets id in array format only that nearly matches with the users text and datasets summary. The sorting will be most matches first. \n User text: ${prompt}\n\nHere are the available datasets:\n${datasetText} \n \n \n The reply will be in only array with fields id lists`;

    // Log the full enriched prompt for debugging purposes or AI prompt audits
    console.log('Combined Prompt:', combinedPrompt);

    /**
     * Pass the combined prompt to the Gemini API via the custom wrapper function.
     * The function handles request formatting, authorization, and response parsing internally.
     */
    const result = await generateFromGemini(combinedPrompt);

    /**
     * Return the AI-generated output to the client.
     * The structure includes both the generated response and the actual prompt used,
     * which is helpful for frontend review, logging, or iterative prompt refinement.
     */
    res.json({
      generatedText: result,
      usedPrompt: combinedPrompt,
    });

  } catch (error) {
    /**
     * Catch and handle any exceptions that may arise from:
     * - MongoDB queries (e.g., connectivity issues, schema errors)
     * - Gemini API errors (e.g., rate limits, malformed requests)
     * - Server-side bugs (e.g., logic faults, uncaught async errors)
     */
    console.error('Error in POST /generate-text:', error);

    // Send a detailed 500-level error response for diagnostic support during development
    res.status(500).json({
      error: 'Failed to generate text',
      details: error.message,
    });
  }
});

// Export the router module so it can be integrated into the main Express application
export default router;
