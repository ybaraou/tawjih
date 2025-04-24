import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { openaiService } from "./openai-service";
import { z } from "zod";
import { 
  insertUserSchema, 
  insertQuizSchema, 
  insertQuestionSchema, 
  insertUserQuizSchema,
  insertCareerSchema,
  insertUserCareerSchema,
  insertAiConversationSchema,
  aiMessage
} from "../shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create HTTP server
  const httpServer = createServer(app);

  // Set up WebSocket for AI chat
  // Temporarily commented out WebSocket setup to fix module compatibility
  // We'll use REST API endpoints instead for AI chat functionality
  
  // Mock WebSocket setup to avoid errors
  const mockWss = {
    // Empty mock implementation
  };

  // User routes
  app.post('/api/auth/register', async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      // Remove password from the response
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.errors });
      } else {
        res.status(500).json({ message: 'An error occurred during registration' });
      }
    }
  });

  app.post('/api/auth/login', async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }
      
      const user = await storage.authenticateUser(username, password);
      
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      
      // Set user in the session
      if (req.session) {
        req.session.userId = user.id;
      }
      
      // Remove password from the response
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred during login' });
    }
  });

  app.post('/api/auth/logout', (req: Request, res: Response) => {
    req.session?.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to logout' });
      }
      res.json({ message: 'Logged out successfully' });
    });
  });

  app.get('/api/user/current', async (req: Request, res: Response) => {
    if (!req.session?.userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    
    try {
      const user = await storage.getUser(req.session.userId);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Remove password from the response
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get current user' });
    }
  });

  app.post('/api/user/preferences', async (req: Request, res: Response) => {
    if (!req.session?.userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    
    try {
      const { language } = req.body;
      
      // Update user language preference
      const updatedUser = await storage.updateUserLanguage(req.session.userId, language);
      
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Remove password from the response
      const { password, ...userWithoutPassword } = updatedUser;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update user preferences' });
    }
  });

  // Quiz routes
  app.get('/api/quizzes', async (req: Request, res: Response) => {
    try {
      const language = req.query.language || 'en';
      const quizzes = await storage.getQuizzes(language as string);
      res.json(quizzes);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get quizzes' });
    }
  });

  app.get('/api/quizzes/:id', async (req: Request, res: Response) => {
    try {
      const quizId = parseInt(req.params.id);
      const quiz = await storage.getQuiz(quizId);
      
      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
      
      res.json(quiz);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get quiz' });
    }
  });

  app.get('/api/quizzes/:id/questions', async (req: Request, res: Response) => {
    try {
      const quizId = parseInt(req.params.id);
      const language = req.query.language || 'en';
      const questions = await storage.getQuizQuestions(quizId, language as string);
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get quiz questions' });
    }
  });

  // User Quiz routes
  app.get('/api/user/quizzes', async (req: Request, res: Response) => {
    if (!req.session?.userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    
    try {
      const userQuizzes = await storage.getUserQuizzes(req.session.userId);
      res.json(userQuizzes);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get user quizzes' });
    }
  });

  app.get('/api/user/quizzes/:quizId', async (req: Request, res: Response) => {
    if (!req.session?.userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    
    try {
      const quizId = parseInt(req.params.quizId);
      const userQuiz = await storage.getUserQuiz(req.session.userId, quizId);
      
      if (!userQuiz) {
        return res.status(404).json({ message: 'User quiz not found' });
      }
      
      res.json(userQuiz);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get user quiz' });
    }
  });

  app.post('/api/user/quizzes/:quizId/answers', async (req: Request, res: Response) => {
    if (!req.session?.userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    
    try {
      const quizId = parseInt(req.params.quizId);
      const { questionId, answer } = req.body;
      
      // Get or create user quiz
      let userQuiz = await storage.getUserQuiz(req.session.userId, quizId);
      
      if (!userQuiz) {
        // Create new user quiz if it doesn't exist
        userQuiz = await storage.createUserQuiz({
          userId: req.session.userId,
          quizId,
          completed: false,
          progress: 0,
          results: { answers: [] }
        });
      }
      
      // Save the answer
      const updatedUserQuiz = await storage.saveQuizAnswer(
        userQuiz.id,
        questionId,
        answer
      );
      
      res.json(updatedUserQuiz);
    } catch (error) {
      res.status(500).json({ message: 'Failed to save answer' });
    }
  });

  app.post('/api/user/quizzes/:quizId/complete', async (req: Request, res: Response) => {
    if (!req.session?.userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    
    try {
      const quizId = parseInt(req.params.quizId);
      
      // Get user quiz
      const userQuiz = await storage.getUserQuiz(req.session.userId, quizId);
      
      if (!userQuiz) {
        return res.status(404).json({ message: 'User quiz not found' });
      }
      
      // Mark as complete and calculate results
      const completedUserQuiz = await storage.completeUserQuiz(userQuiz.id);
      
      // Update career matches based on new quiz results
      await storage.updateCareerMatches(req.session.userId);
      
      res.json(completedUserQuiz);
    } catch (error) {
      res.status(500).json({ message: 'Failed to complete quiz' });
    }
  });

  // Career routes
  app.get('/api/careers', async (req: Request, res: Response) => {
    try {
      const language = req.query.language || 'en';
      const careers = await storage.getCareers(language as string);
      res.json(careers);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get careers' });
    }
  });

  app.get('/api/careers/recommended', async (req: Request, res: Response) => {
    try {
      const language = req.query.language || 'en';
      let careers;
      
      if (req.session?.userId) {
        // Get personalized recommendations for logged in user
        careers = await storage.getRecommendedCareers(req.session.userId, language as string);
      } else {
        // Get generic career list for non-logged in users
        careers = await storage.getCareers(language as string);
      }
      
      res.json(careers);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get recommended careers' });
    }
  });

  app.get('/api/careers/:id', async (req: Request, res: Response) => {
    try {
      const careerId = parseInt(req.params.id);
      const career = await storage.getCareer(careerId);
      
      if (!career) {
        return res.status(404).json({ message: 'Career not found' });
      }
      
      res.json(career);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get career' });
    }
  });

  // User Career routes
  app.get('/api/user/careers', async (req: Request, res: Response) => {
    if (!req.session?.userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    
    try {
      const userCareers = await storage.getUserCareers(req.session.userId);
      res.json(userCareers);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get user careers' });
    }
  });

  app.get('/api/user/career-matches', async (req: Request, res: Response) => {
    if (!req.session?.userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    
    try {
      const matches = await storage.getUserCareerMatches(req.session.userId);
      res.json(matches);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get career matches' });
    }
  });

  app.get('/api/user/careers/:careerId', async (req: Request, res: Response) => {
    if (!req.session?.userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    
    try {
      const careerId = parseInt(req.params.careerId);
      const userCareer = await storage.getUserCareer(req.session.userId, careerId);
      
      if (!userCareer) {
        return res.status(404).json({ message: 'User career not found' });
      }
      
      res.json(userCareer);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get user career' });
    }
  });

  app.post('/api/user/careers/:careerId/favorite', async (req: Request, res: Response) => {
    if (!req.session?.userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    
    try {
      const careerId = parseInt(req.params.careerId);
      const { isFavorite } = req.body;
      
      const updatedUserCareer = await storage.toggleCareerFavorite(
        req.session.userId,
        careerId,
        isFavorite
      );
      
      res.json(updatedUserCareer);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update favorite status' });
    }
  });

  app.post('/api/user/careers/:careerId/view', async (req: Request, res: Response) => {
    if (!req.session?.userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    
    try {
      const careerId = parseInt(req.params.careerId);
      
      await storage.recordCareerView(req.session.userId, careerId);
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: 'Failed to record career view' });
    }
  });

  // AI Counselor routes
  app.post('/api/ai/message', async (req: Request, res: Response) => {
    try {
      const userId = req.session?.userId || 0; // Anonymous user if not logged in
      const { content } = req.body;
      
      if (!content) {
        return res.status(400).json({ message: 'Message content is required' });
      }
      
      // Use mock response instead of OpenAI
      const mockResponses = [
        "That's a great question about careers! Based on your interests, you might want to consider fields like technology, healthcare, or education.",
        "I understand your concern about choosing the right university. In Morocco, there are several excellent institutions to consider depending on your chosen field.",
        "It's normal to feel uncertain about your career path. Many successful professionals changed directions multiple times before finding their passion.",
        "For the software engineering path in Morocco, I recommend focusing on mathematics, programming languages like Python or JavaScript, and building project experience.",
        "Your quiz results suggest you have strong analytical skills, which are valuable in fields like data science, engineering, and finance."
      ];
      
      // Select a random response
      const randomIndex = Math.floor(Math.random() * mockResponses.length);
      const mockResponse = mockResponses[randomIndex];
      
      res.json({ message: mockResponse });
    } catch (error) {
      res.status(500).json({ message: 'Failed to get AI response' });
    }
  });

  app.get('/api/ai/conversations', async (req: Request, res: Response) => {
    if (!req.session?.userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    
    try {
      const conversations = await storage.getAiConversations(req.session.userId);
      res.json(conversations);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get AI conversations' });
    }
  });

  // Teacher Dashboard routes
  app.get('/api/teacher/dashboard', async (req: Request, res: Response) => {
    if (!req.session?.userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    
    try {
      // First check if user is a teacher
      const user = await storage.getUser(req.session.userId);
      
      if (!user || user.role !== 'teacher') {
        return res.status(403).json({ message: 'Access denied' });
      }
      
      const classId = req.query.class as string;
      
      const dashboardData = await storage.getTeacherDashboard(req.session.userId, classId);
      res.json(dashboardData);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get teacher dashboard data' });
    }
  });

  return httpServer;
}
