/**
 * Sends user input to our backend proxy and returns the AI's response.
 * @param {string} userInput The user's question.
 * @returns {Promise<string>} The text response from Gemini.
 */
export const getGeminiResponse = async (userInput) => {
  try {
    // The fetch call now points to our own backend server at the new endpoint
    const response = await fetch('http://localhost:5001/api/gemini-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userInput }) // Send the user's message in the request body
    });

    if (!response.ok) {
      // If our backend returns an error (e.g., 500), this will throw
      throw new Error(`Backend API error: ${response.statusText}`);
    }

    const data = await response.json();

    // The backend forwards the full Gemini response, so we still parse it here
    // Added optional chaining for safety in case the response is malformed
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I received an unexpected response.";
  } catch (error) {
    console.error("AI Assistant Error:", error);
    // This user-facing error is more informative now
    return "I'm having trouble connecting. Please check the backend server terminal for detailed error logs and try again.";
  }
};

/**
 * Parses the AI's response to find a navigation action keyword.
 * This function remains unchanged as it operates on the final text response.
 * @param {string} aiResponse The text response from Gemini.
 * @returns {object|null} An action object {text, path} or null.
 */
export const parseResponseForAction = (aiResponse) => {
  const actions = {
    '[APPLY]': { text: 'Go to Application Page', path: '/apply' },
    '[SERVICES]': { text: 'View Our Services', path: '/services' },
    '[PROJECTS]': { text: 'Explore Our Projects', path: '/projects' },
    '[CONTACT]': { text: 'Contact Us', path: '/contact' },
    '[ABOUT]': { text: 'Learn More About Us', path: '/about' },
  };

  for (const keyword in actions) {
    if (aiResponse.includes(keyword)) {
      return actions[keyword];
    }
  }

  return null;
};