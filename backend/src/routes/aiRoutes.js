// Import required modules
import express from 'express'; // Express framework to handle routing and middleware
import { generateFromGemini } from '../AI/gemini_api_integration.js'; // Custom Gemini API integration logic
import { Dataset } from '../models/dataset.model.js'; // Mongoose model for the Dataset collection

// Create a new Express router instance
const router = express.Router();

/**
 * POST /generate-text
 * This route handles the generation of AI-based text using a user-provided prompt,
 * and it enriches the prompt with dataset information from the database before sending to the Gemini API.
 */
router.post('/generate-text', async (req, res) => {
  // Destructure 'prompt' from request body
  const { prompt } = req.body;

  // Step 1: Validate input
  // If the prompt is not provided in the request body, return an error response
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' }); // Client-side error: missing required field
  }

  try {
    // Step 2: Query the MongoDB database using the Dataset model
    // Fetch only the '_id' and 'description' fields from all datasets
    const datasets = await Dataset.find({}, { _id: 1, description: 1 });

    /**
     * Step 3: Format datasets into a readable string
     * Each dataset is displayed in the format: ID: <_id>, Description: <description>
     * The datasets are separated by newlines to make them readable in the final prompt
     */
    const datasetText = datasets
      .map(ds => `ID: ${ds._id}, Description: ${ds.description}`)
      .join('\n'); // Join all formatted dataset strings with a newline

    /**
     * Step 4: Combine the original user prompt with the dataset information
     * The datasetText is appended to the prompt to provide context to the Gemini model
     */
    const combinedPrompt = `Here is the user text what users want along with the dataset id and its summary. Give me those datasets id in array format only that nearly matches with the users text and datasets summary. The sorting will be most matches first. \n User text: ${prompt}\n\nHere are the available datasets:\n${datasetText} \n \n \n The reply will be in only array with fields id lists`;

    /**
     * Step 5: Call the Gemini text generation API with the enriched prompt
     * The generateFromGemini function handles the actual API call and returns the result
     */
    console.log('Combined Prompt:', combinedPrompt); // Log the combined prompt for debugging
    const result = await generateFromGemini(combinedPrompt);

    /**
     * Step 6: Return the generated text to the client
     * The response contains the AI-generated text, based on the combined prompt
     */
    res.json({
      generatedText: result, // AI-generated content
      usedPrompt: combinedPrompt, // (optional) useful for debugging or frontend preview
    });

  } catch (error) {
    /**
     * Step 7: Handle any unexpected errors that occur during DB fetch or Gemini API call
     * Log the full error for debugging and return a generic error message to the client
     */
    console.error('Error in POST /generate-text:', error);

    res.status(500).json({
      error: 'Failed to generate text', // Internal server error
      details: error.message, // (optional) send error details for development phase
    });
  }
});

// Export the router so it can be used in the main server file (e.g., server.js)
export default router;
