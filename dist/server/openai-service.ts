// Import storage for conversation history
import { storage } from "./storage";

// Mock implementation for OpenAI service
// Note: This is a stub implementation that returns predefined responses
// and doesn't require an API key

class OpenAIService {
  private readonly contextLength = 10; // Number of previous messages to include for context
  
  /**
   * Get a response from the OpenAI chat model
   * @param userId The user ID (0 for anonymous)
   * @param userMessage The user's message
   * @returns The AI assistant's response
   */
  async getChatResponse(userId: number, userMessage: string): Promise<string> {
    try {
      // Get conversation history for context
      let conversationHistory: { role: string; content: string }[] = [];
      
      if (userId > 0) {
        // For logged-in users, retrieve conversation history
        const conversations = await storage.getAiConversations(userId);
        
        if (conversations.length > 0) {
          // Use the most recent conversation
          const recentConversation = conversations[0];
          
          // Get the most recent messages (limited by contextLength)
          // Parse messages from the conversation
          // Handle potential format issues with recentConversation.messages
          const messages = Array.isArray(recentConversation.messages) 
            ? recentConversation.messages 
            : [];
          
          // Get only the recent messages for context
          const recentMessages = messages.slice(-this.contextLength);
          
          conversationHistory = recentMessages.map((msg: any) => ({
            role: msg.role,
            content: msg.content
          }));
          
          // Add the new user message to the history
          const userMsg = {
            role: "user" as const,
            content: userMessage,
            timestamp: Date.now()
          };
          
          await storage.addMessageToConversation(recentConversation.id, userMsg);
        } else {
          // Create a new conversation
          const newConversation = await storage.createAiConversation({
            userId,
            messages: [{
              role: "user" as const,
              content: userMessage,
              timestamp: Date.now()
            }]
          });
          
          conversationHistory = [{
            role: "user",
            content: userMessage
          }];
        }
      } else {
        // For anonymous users, just use the current message
        conversationHistory = [{
          role: "user",
          content: userMessage
        }];
      }
      
      // Prepare the system message with context about the app
      const systemMessage = {
        role: "system",
        content: `You are Maryam, an AI career counselor for TawjihAI, a career guidance platform for Moroccan students.
        
        Your role is to:
        1. Help students explore careers based on their interests, skills, and personality
        2. Provide information about education pathways for different careers in Morocco
        3. Answer questions about job prospects, required skills, and educational requirements
        4. Be encouraging, supportive, and culturally sensitive
        5. Focus on careers and education options available in Morocco
        
        When discussing careers, emphasize both traditional paths and emerging opportunities in Morocco's job market.
        For education recommendations, consider both public and private institutions in Morocco.
        Your tone should be friendly, professional, and appropriate for students aged 13-20.
        
        Important: Keep responses concise (2-3 paragraphs maximum) and always in the same language the student uses to ask the question.`
      };
      
      // Create the complete message array for the API call
      const messages = [
        systemMessage,
        ...conversationHistory
      ];
      
      // Generate a mock response based on the user message
      const mockResponses = [
        "That's a great question about careers! Based on your interests, you might want to consider fields like technology, healthcare, or education.",
        "I understand your concern about choosing the right university. In Morocco, there are several excellent institutions to consider depending on your chosen field.",
        "It's normal to feel uncertain about your career path. Many successful professionals changed directions multiple times before finding their passion.",
        "For the software engineering path in Morocco, I recommend focusing on mathematics, programming languages like Python or JavaScript, and building project experience.",
        "Your quiz results suggest you have strong analytical skills, which are valuable in fields like data science, engineering, and finance."
      ];
      
      // Select a response based on keywords in the user message
      let assistantMessage = mockResponses[0]; // Default response
      
      if (userMessage.toLowerCase().includes('university') || userMessage.toLowerCase().includes('school')) {
        assistantMessage = mockResponses[1];
      } else if (userMessage.toLowerCase().includes('uncertain') || userMessage.toLowerCase().includes('confused')) {
        assistantMessage = mockResponses[2];
      } else if (userMessage.toLowerCase().includes('software') || userMessage.toLowerCase().includes('programming')) {
        assistantMessage = mockResponses[3];
      } else if (userMessage.toLowerCase().includes('skills') || userMessage.toLowerCase().includes('analytics')) {
        assistantMessage = mockResponses[4];
      }
      
      if (userId > 0) {
        // Store the assistant's response for logged-in users
        const conversations = await storage.getAiConversations(userId);
        
        if (conversations.length > 0) {
          const recentConversation = conversations[0];
          
          await storage.addMessageToConversation(recentConversation.id, {
            role: "assistant" as const,
            content: assistantMessage,
            timestamp: Date.now()
          });
        }
      }
      
      return assistantMessage;
    } catch (error) {
      console.error('Error getting chat response:', error);
      
      // Provide a graceful fallback response
      return "I apologize, but I'm having trouble connecting right now. Please try again in a moment.";
    }
  }

  /**
   * Analyze quiz results to generate career recommendations
   * @param userId User ID
   * @param quizResults Quiz results data
   * @returns Career recommendations with match percentages
   */
  async analyzeQuizResults(userId: number, quizResults: any): Promise<any> {
    try {
      // Generate mock career recommendations based on user ID
      // In a real implementation, this would analyze the quiz results data
      
      // Mock career IDs and match percentages
      const mockRecommendations = [
        {
          careerId: 1, // Software Engineer
          matchPercentage: 95,
          strengths: ["Problem-solving", "Logical thinking", "Technical aptitude"],
          growthAreas: ["Teamwork", "Communication"]
        },
        {
          careerId: 2, // Data Scientist
          matchPercentage: 87,
          strengths: ["Analytical thinking", "Mathematics", "Pattern recognition"],
          growthAreas: ["Programming", "Visualization"]
        },
        {
          careerId: 3, // Business Manager
          matchPercentage: 82,
          strengths: ["Communication", "Organization", "Strategic thinking"],
          growthAreas: ["Technical skills", "Data analysis"]
        }
      ];
      
      // Return mock recommendations
      return { recommendations: mockRecommendations };
    } catch (error) {
      console.error('Error analyzing quiz results:', error);
      
      // Return empty recommendations on error
      return { recommendations: [] };
    }
  }
}

export const openaiService = new OpenAIService();
