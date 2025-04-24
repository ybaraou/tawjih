import { 
  User, 
  InsertUser, 
  Quiz, 
  InsertQuiz, 
  Question, 
  InsertQuestion,
  UserQuiz,
  InsertUserQuiz,
  Career,
  InsertCareer,
  UserCareer,
  InsertUserCareer,
  AiConversation,
  InsertAiConversation,
  AiMessage
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  authenticateUser(username: string, password: string): Promise<User | null>;
  updateUserLanguage(userId: number, language: string): Promise<User | null>;
  
  // Quiz methods
  getQuizzes(language: string): Promise<Quiz[]>;
  getQuiz(id: number): Promise<Quiz | null>;
  createQuiz(quiz: InsertQuiz): Promise<Quiz>;
  
  // Question methods
  getQuizQuestions(quizId: number, language: string): Promise<Question[]>;
  createQuestion(question: InsertQuestion): Promise<Question>;
  
  // UserQuiz methods
  getUserQuizzes(userId: number): Promise<UserQuiz[]>;
  getUserQuiz(userId: number, quizId: number): Promise<UserQuiz | null>;
  createUserQuiz(userQuiz: InsertUserQuiz): Promise<UserQuiz>;
  saveQuizAnswer(userQuizId: number, questionId: number, answer: string): Promise<UserQuiz>;
  completeUserQuiz(userQuizId: number): Promise<UserQuiz>;
  
  // Career methods
  getCareers(language: string): Promise<Career[]>;
  getCareer(id: number): Promise<Career | null>;
  createCareer(career: InsertCareer): Promise<Career>;
  getRecommendedCareers(userId: number, language: string): Promise<Career[]>;
  
  // UserCareer methods
  getUserCareers(userId: number): Promise<UserCareer[]>;
  getUserCareer(userId: number, careerId: number): Promise<UserCareer | null>;
  toggleCareerFavorite(userId: number, careerId: number, isFavorite: boolean): Promise<UserCareer>;
  recordCareerView(userId: number, careerId: number): Promise<void>;
  updateCareerMatches(userId: number): Promise<void>;
  getUserCareerMatches(userId: number): Promise<Record<number, number>>;
  
  // AI Conversation methods
  getAiConversations(userId: number): Promise<AiConversation[]>;
  getAiConversation(id: number): Promise<AiConversation | null>;
  createAiConversation(conversation: InsertAiConversation): Promise<AiConversation>;
  addMessageToConversation(conversationId: number, message: AiMessage): Promise<AiConversation>;
  
  // Teacher Dashboard methods
  getTeacherDashboard(teacherId: number, classId: string): Promise<any>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private quizzes: Map<number, Quiz>;
  private questions: Map<number, Question>;
  private userQuizzes: Map<number, UserQuiz>;
  private careers: Map<number, Career>;
  private userCareers: Map<number, UserCareer>;
  private aiConversations: Map<number, AiConversation>;
  
  private userIdCounter: number;
  private quizIdCounter: number;
  private questionIdCounter: number;
  private userQuizIdCounter: number;
  private careerIdCounter: number;
  private userCareerIdCounter: number;
  private conversationIdCounter: number;

  constructor() {
    this.users = new Map();
    this.quizzes = new Map();
    this.questions = new Map();
    this.userQuizzes = new Map();
    this.careers = new Map();
    this.userCareers = new Map();
    this.aiConversations = new Map();
    
    this.userIdCounter = 1;
    this.quizIdCounter = 1;
    this.questionIdCounter = 1;
    this.userQuizIdCounter = 1;
    this.careerIdCounter = 1;
    this.userCareerIdCounter = 1;
    this.conversationIdCounter = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Create sample quizzes
    const personalityQuiz = this.createQuiz({
      title: "Personality Assessment",
      description: "Discover your personality traits and how they align with different career paths.",
      type: "personality",
      totalQuestions: 15,
      language: "en"
    });
    
    const skillsQuiz = this.createQuiz({
      title: "Skills & Interests",
      description: "Identify your strengths and interests to find careers that you'll love.",
      type: "skills",
      totalQuestions: 15,
      language: "en"
    });
    
    // Create sample questions for personality quiz
    const personalityQuestions = [
      {
        quizId: personalityQuiz.id,
        text: "I enjoy solving complex problems.",
        order: 1,
        options: JSON.stringify([
          { id: "p1o1", text: "Strongly Disagree", value: 1 },
          { id: "p1o2", text: "Disagree", value: 2 },
          { id: "p1o3", text: "Neutral", value: 3 },
          { id: "p1o4", text: "Agree", value: 4 },
          { id: "p1o5", text: "Strongly Agree", value: 5 }
        ]),
        language: "en"
      },
      {
        quizId: personalityQuiz.id,
        text: "I prefer working in teams rather than alone.",
        order: 2,
        options: JSON.stringify([
          { id: "p2o1", text: "Strongly Disagree", value: 1 },
          { id: "p2o2", text: "Disagree", value: 2 },
          { id: "p2o3", text: "Neutral", value: 3 },
          { id: "p2o4", text: "Agree", value: 4 },
          { id: "p2o5", text: "Strongly Agree", value: 5 }
        ]),
        language: "en"
      },
      {
        quizId: personalityQuiz.id,
        text: "I am good at explaining complex ideas to others.",
        order: 3,
        options: JSON.stringify([
          { id: "p3o1", text: "Strongly Disagree", value: 1 },
          { id: "p3o2", text: "Disagree", value: 2 },
          { id: "p3o3", text: "Neutral", value: 3 },
          { id: "p3o4", text: "Agree", value: 4 },
          { id: "p3o5", text: "Strongly Agree", value: 5 }
        ]),
        language: "en"
      }
    ];
    
    personalityQuestions.forEach(q => this.createQuestion(q));
    
    // Create sample questions for skills quiz
    const skillsQuestions = [
      {
        quizId: skillsQuiz.id,
        text: "I am skilled at using computers and technology.",
        order: 1,
        options: JSON.stringify([
          { id: "s1o1", text: "Not at all", value: 1 },
          { id: "s1o2", text: "A little bit", value: 2 },
          { id: "s1o3", text: "Somewhat", value: 3 },
          { id: "s1o4", text: "Quite a bit", value: 4 },
          { id: "s1o5", text: "Very much", value: 5 }
        ]),
        language: "en"
      },
      {
        quizId: skillsQuiz.id,
        text: "I enjoy creative activities like art, music, or writing.",
        order: 2,
        options: JSON.stringify([
          { id: "s2o1", text: "Not at all", value: 1 },
          { id: "s2o2", text: "A little bit", value: 2 },
          { id: "s2o3", text: "Somewhat", value: 3 },
          { id: "s2o4", text: "Quite a bit", value: 4 },
          { id: "s2o5", text: "Very much", value: 5 }
        ]),
        language: "en"
      },
      {
        quizId: skillsQuiz.id,
        text: "I am good at analyzing data and numbers.",
        order: 3,
        options: JSON.stringify([
          { id: "s3o1", text: "Not at all", value: 1 },
          { id: "s3o2", text: "A little bit", value: 2 },
          { id: "s3o3", text: "Somewhat", value: 3 },
          { id: "s3o4", text: "Quite a bit", value: 4 },
          { id: "s3o5", text: "Very much", value: 5 }
        ]),
        language: "en"
      }
    ];
    
    skillsQuestions.forEach(q => this.createQuestion(q));
    
    // Create sample careers
    const softwareEngineer = this.createCareer({
      title: "Software Engineer",
      description: "Create and develop applications and systems that solve problems.",
      skillsRequired: JSON.stringify(["problem_solving", "creativity", "logic"]),
      educationPathway: JSON.stringify({
        steps: [
          {
            title: "High School",
            description: "Basic education providing foundation for future studies.",
            duration: "3 years",
            keySkills: ["Mathematics", "Science"],
            estimatedCost: "Free (Public)"
          },
          {
            title: "Computer Science Degree",
            description: "A bachelor's degree in Computer Science provides the fundamental knowledge needed for software development careers.",
            duration: "4 years",
            keySkills: ["Programming", "Algorithms"],
            estimatedCost: "20,000 - 40,000 MAD",
            current: true
          },
          {
            title: "Junior Developer",
            description: "Entry-level position to gain practical experience.",
            duration: "1-3 years",
            keySkills: ["Coding", "Teamwork"],
            estimatedCost: "N/A"
          },
          {
            title: "Senior Engineer",
            description: "Advanced position leading projects and mentoring juniors.",
            duration: "Ongoing",
            keySkills: ["Architecture", "Leadership"],
            estimatedCost: "N/A"
          }
        ]
      }),
      jobProspects: "Excellent in Morocco with growing tech sector.",
      language: "en"
    });
    
    const dataScientist = this.createCareer({
      title: "Data Scientist",
      description: "Analyze complex data to help businesses make better decisions.",
      skillsRequired: JSON.stringify(["analytics", "mathematics", "research"]),
      educationPathway: JSON.stringify({
        steps: [
          {
            title: "High School",
            description: "Basic education providing foundation for future studies.",
            duration: "3 years",
            keySkills: ["Mathematics", "Science"],
            estimatedCost: "Free (Public)"
          },
          {
            title: "Mathematics or Statistics Degree",
            description: "A bachelor's degree provides the foundational knowledge of statistics and mathematics.",
            duration: "4 years",
            keySkills: ["Statistics", "Mathematics"],
            estimatedCost: "20,000 - 40,000 MAD",
            current: true
          },
          {
            title: "Data Analyst",
            description: "Entry-level position to gain practical experience with data.",
            duration: "1-2 years",
            keySkills: ["Data Analysis", "SQL"],
            estimatedCost: "N/A"
          },
          {
            title: "Data Scientist",
            description: "Advanced position developing predictive models and algorithms.",
            duration: "Ongoing",
            keySkills: ["Machine Learning", "Big Data"],
            estimatedCost: "N/A"
          }
        ]
      }),
      jobProspects: "Growing demand in financial and tech sectors.",
      language: "en"
    });
    
    const businessManager = this.createCareer({
      title: "Business Manager",
      description: "Lead teams and oversee operations to achieve business goals.",
      skillsRequired: JSON.stringify(["leadership", "communication", "strategy"]),
      educationPathway: JSON.stringify({
        steps: [
          {
            title: "High School",
            description: "Basic education providing foundation for future studies.",
            duration: "3 years",
            keySkills: ["Mathematics", "Language"],
            estimatedCost: "Free (Public)"
          },
          {
            title: "Business Administration Degree",
            description: "A bachelor's degree in Business provides the core knowledge of business operations.",
            duration: "4 years",
            keySkills: ["Economics", "Management"],
            estimatedCost: "25,000 - 45,000 MAD",
            current: true
          },
          {
            title: "Management Trainee",
            description: "Entry-level position to learn business operations.",
            duration: "1-2 years",
            keySkills: ["Project Management", "Communication"],
            estimatedCost: "N/A"
          },
          {
            title: "Business Manager",
            description: "Senior position overseeing business units or departments.",
            duration: "Ongoing",
            keySkills: ["Strategic Planning", "Leadership"],
            estimatedCost: "N/A"
          }
        ]
      }),
      jobProspects: "Steady demand across multiple industries.",
      language: "en"
    });
    
    // Create a demo user
    const demoUser = this.createUser({
      username: "demo",
      password: "demo123",
      fullName: "Amal Benkada",
      role: "student",
      language: "en"
    });
    
    // Create demo teacher
    const demoTeacher = this.createUser({
      username: "teacher",
      password: "teacher123",
      fullName: "Mehdi Ouazzani",
      role: "teacher",
      language: "en"
    });
    
    // Create sample user quizzes
    const userQuiz1 = this.createUserQuiz({
      userId: demoUser.id,
      quizId: personalityQuiz.id,
      completed: true,
      progress: 100,
      results: {
        answers: [
          { questionId: 1, answer: "5" },
          { questionId: 2, answer: "3" },
          { questionId: 3, answer: "4" }
        ],
        traits: {
          analytical: 80,
          social: 60,
          creative: 75
        }
      }
    });
    
    const userQuiz2 = this.createUserQuiz({
      userId: demoUser.id,
      quizId: skillsQuiz.id,
      completed: false,
      progress: 45,
      results: {
        answers: [
          { questionId: 4, answer: "5" },
          { questionId: 5, answer: "2" }
        ]
      }
    });
    
    // Create user career relationships
    this.createUserCareer({
      userId: demoUser.id,
      careerId: softwareEngineer.id,
      matchPercentage: 95,
      isFavorite: true
    });
    
    this.createUserCareer({
      userId: demoUser.id,
      careerId: dataScientist.id,
      matchPercentage: 87,
      isFavorite: false
    });
    
    this.createUserCareer({
      userId: demoUser.id,
      careerId: businessManager.id,
      matchPercentage: 82,
      isFavorite: false
    });
    
    // Create sample AI conversation
    this.createAiConversation({
      userId: demoUser.id,
      messages: [
        {
          role: "assistant",
          content: "Hi! I'm Maryam, your AI counselor. I'm here to help you explore careers and education paths. What would you like to know about today?",
          timestamp: Date.now() - 3600000 // 1 hour ago
        },
        {
          role: "user",
          content: "I'm interested in computer science, but I'm not sure which specific career path to choose. Can you help me understand my options?",
          timestamp: Date.now() - 3500000 // 58 minutes ago
        },
        {
          role: "assistant",
          content: "Absolutely! Based on your quiz results, you have strengths in problem-solving and creativity, which are excellent for computer science. In this field, you could consider:\n\n- Software Development - Building applications and websites\n- Data Science - Analyzing data to extract insights\n- Cybersecurity - Protecting systems from threats\n- AI/Machine Learning - Creating intelligent systems\n\nWould you like me to explain any of these in more detail?",
          timestamp: Date.now() - 3400000 // 56 minutes ago
        }
      ]
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    for (const user of this.users.values()) {
      if (user.username === username) {
        return user;
      }
    }
    return undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const now = new Date();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: now
    };
    this.users.set(id, user);
    return user;
  }

  async authenticateUser(username: string, password: string): Promise<User | null> {
    const user = await this.getUserByUsername(username);
    
    if (user && user.password === password) {
      return user;
    }
    
    return null;
  }

  async updateUserLanguage(userId: number, language: string): Promise<User | null> {
    const user = await this.getUser(userId);
    
    if (!user) {
      return null;
    }
    
    const updatedUser = { ...user, language };
    this.users.set(userId, updatedUser);
    
    return updatedUser;
  }

  // Quiz methods
  async getQuizzes(language: string): Promise<Quiz[]> {
    return Array.from(this.quizzes.values())
      .filter(quiz => quiz.language === language);
  }

  async getQuiz(id: number): Promise<Quiz | null> {
    return this.quizzes.get(id) || null;
  }

  async createQuiz(insertQuiz: InsertQuiz): Promise<Quiz> {
    const id = this.quizIdCounter++;
    const quiz: Quiz = { ...insertQuiz, id };
    this.quizzes.set(id, quiz);
    return quiz;
  }

  // Question methods
  async getQuizQuestions(quizId: number, language: string): Promise<Question[]> {
    return Array.from(this.questions.values())
      .filter(question => question.quizId === quizId && question.language === language)
      .sort((a, b) => a.order - b.order);
  }

  async createQuestion(insertQuestion: InsertQuestion): Promise<Question> {
    const id = this.questionIdCounter++;
    const question: Question = { ...insertQuestion, id };
    this.questions.set(id, question);
    return question;
  }

  // UserQuiz methods
  async getUserQuizzes(userId: number): Promise<UserQuiz[]> {
    return Array.from(this.userQuizzes.values())
      .filter(userQuiz => userQuiz.userId === userId);
  }

  async getUserQuiz(userId: number, quizId: number): Promise<UserQuiz | null> {
    for (const userQuiz of this.userQuizzes.values()) {
      if (userQuiz.userId === userId && userQuiz.quizId === quizId) {
        return userQuiz;
      }
    }
    return null;
  }

  async createUserQuiz(insertUserQuiz: InsertUserQuiz): Promise<UserQuiz> {
    const id = this.userQuizIdCounter++;
    const now = new Date();
    const userQuiz: UserQuiz = { 
      ...insertUserQuiz, 
      id,
      startedAt: now,
      completedAt: undefined
    };
    this.userQuizzes.set(id, userQuiz);
    return userQuiz;
  }

  async saveQuizAnswer(userQuizId: number, questionId: number, answer: string): Promise<UserQuiz> {
    const userQuiz = this.userQuizzes.get(userQuizId);
    
    if (!userQuiz) {
      throw new Error('User quiz not found');
    }
    
    // Get the quiz to calculate progress
    const quiz = await this.getQuiz(userQuiz.quizId);
    
    if (!quiz) {
      throw new Error('Quiz not found');
    }
    
    // Get all questions for this quiz
    const questions = await this.getQuizQuestions(userQuiz.quizId, 'en');
    
    // Update or add the answer
    let results = userQuiz.results || { answers: [] };
    let answers = Array.isArray(results.answers) ? results.answers : [];
    
    // Check if this question is already answered
    const existingAnswerIndex = answers.findIndex(
      (a: any) => a.questionId === questionId
    );
    
    if (existingAnswerIndex >= 0) {
      // Update existing answer
      answers[existingAnswerIndex] = { questionId, answer };
    } else {
      // Add new answer
      answers.push({ questionId, answer });
    }
    
    // Calculate progress
    const progress = Math.round((answers.length / quiz.totalQuestions) * 100);
    
    // Update user quiz
    const updatedUserQuiz: UserQuiz = {
      ...userQuiz,
      progress,
      results: { ...results, answers }
    };
    
    this.userQuizzes.set(userQuizId, updatedUserQuiz);
    
    return updatedUserQuiz;
  }

  async completeUserQuiz(userQuizId: number): Promise<UserQuiz> {
    const userQuiz = this.userQuizzes.get(userQuizId);
    
    if (!userQuiz) {
      throw new Error('User quiz not found');
    }
    
    // Mark as complete
    const now = new Date();
    const completedUserQuiz: UserQuiz = {
      ...userQuiz,
      completed: true,
      progress: 100,
      completedAt: now
    };
    
    // For this demo, let's generate some simple traits based on the quiz type
    if (userQuiz.quizId === 1) { // Personality quiz
      const traits = {
        analytical: Math.floor(Math.random() * 30) + 70, // High analytical for software engineering
        social: Math.floor(Math.random() * 40) + 40,     // Medium social
        creative: Math.floor(Math.random() * 30) + 60    // Medium-high creative
      };
      
      completedUserQuiz.results = {
        ...completedUserQuiz.results,
        traits
      };
    } else if (userQuiz.quizId === 2) { // Skills quiz
      const skills = {
        technical: Math.floor(Math.random() * 30) + 70,  // High technical for software engineering
        communication: Math.floor(Math.random() * 40) + 40, // Medium communication
        problemSolving: Math.floor(Math.random() * 20) + 70 // High problem-solving
      };
      
      completedUserQuiz.results = {
        ...completedUserQuiz.results,
        skills
      };
    }
    
    this.userQuizzes.set(userQuizId, completedUserQuiz);
    
    return completedUserQuiz;
  }

  // Career methods
  async getCareers(language: string): Promise<Career[]> {
    return Array.from(this.careers.values())
      .filter(career => career.language === language);
  }

  async getCareer(id: number): Promise<Career | null> {
    return this.careers.get(id) || null;
  }

  async createCareer(insertCareer: InsertCareer): Promise<Career> {
    const id = this.careerIdCounter++;
    const career: Career = { ...insertCareer, id };
    this.careers.set(id, career);
    return career;
  }

  async getRecommendedCareers(userId: number, language: string): Promise<Career[]> {
    // Get all careers for the specified language
    const allCareers = await this.getCareers(language);
    
    // Get user's career matches
    const userCareerMatches = await this.getUserCareerMatches(userId);
    
    // Sort careers by match percentage
    return allCareers.sort((a, b) => {
      const matchA = userCareerMatches[a.id] || 0;
      const matchB = userCareerMatches[b.id] || 0;
      return matchB - matchA;
    });
  }

  // UserCareer methods
  async getUserCareers(userId: number): Promise<UserCareer[]> {
    return Array.from(this.userCareers.values())
      .filter(userCareer => userCareer.userId === userId);
  }

  async getUserCareer(userId: number, careerId: number): Promise<UserCareer | null> {
    for (const userCareer of this.userCareers.values()) {
      if (userCareer.userId === userId && userCareer.careerId === careerId) {
        return userCareer;
      }
    }
    return null;
  }

  async toggleCareerFavorite(userId: number, careerId: number, isFavorite: boolean): Promise<UserCareer> {
    let userCareer = await this.getUserCareer(userId, careerId);
    
    if (!userCareer) {
      // Create new relationship if it doesn't exist
      userCareer = await this.createUserCareer({
        userId,
        careerId,
        matchPercentage: Math.floor(Math.random() * 30) + 70, // Random match for demo
        isFavorite
      });
    } else {
      // Update existing relationship
      userCareer = {
        ...userCareer,
        isFavorite
      };
      this.userCareers.set(userCareer.id, userCareer);
    }
    
    return userCareer;
  }

  async recordCareerView(userId: number, careerId: number): Promise<void> {
    let userCareer = await this.getUserCareer(userId, careerId);
    
    if (userCareer) {
      // Update viewed at timestamp
      userCareer = {
        ...userCareer,
        viewedAt: new Date()
      };
      this.userCareers.set(userCareer.id, userCareer);
    } else {
      // Create new relationship if it doesn't exist
      await this.createUserCareer({
        userId,
        careerId,
        matchPercentage: Math.floor(Math.random() * 30) + 70, // Random match for demo
        isFavorite: false
      });
    }
  }

  async updateCareerMatches(userId: number): Promise<void> {
    // In a real implementation, this would analyze quiz results and update career matches
    // For this demo, we'll just generate some random matches
    const careers = await this.getCareers('en');
    
    for (const career of careers) {
      const existingUserCareer = await this.getUserCareer(userId, career.id);
      
      if (existingUserCareer) {
        // Update match percentage
        const updatedUserCareer = {
          ...existingUserCareer,
          matchPercentage: Math.floor(Math.random() * 30) + 70 // Random match for demo
        };
        
        this.userCareers.set(existingUserCareer.id, updatedUserCareer);
      } else {
        // Create new relationship
        await this.createUserCareer({
          userId,
          careerId: career.id,
          matchPercentage: Math.floor(Math.random() * 30) + 70, // Random match for demo
          isFavorite: false
        });
      }
    }
  }

  async getUserCareerMatches(userId: number): Promise<Record<number, number>> {
    const userCareers = await this.getUserCareers(userId);
    const matches: Record<number, number> = {};
    
    userCareers.forEach(userCareer => {
      matches[userCareer.careerId] = userCareer.matchPercentage;
    });
    
    return matches;
  }

  private createUserCareer(insertUserCareer: InsertUserCareer): Promise<UserCareer> {
    const id = this.userCareerIdCounter++;
    const now = new Date();
    const userCareer: UserCareer = {
      ...insertUserCareer,
      id,
      viewedAt: now
    };
    
    this.userCareers.set(id, userCareer);
    return Promise.resolve(userCareer);
  }

  // AI Conversation methods
  async getAiConversations(userId: number): Promise<AiConversation[]> {
    return Array.from(this.aiConversations.values())
      .filter(conversation => conversation.userId === userId)
      .sort((a, b) => (b.updatedAt?.getTime() || 0) - (a.updatedAt?.getTime() || 0));
  }

  async getAiConversation(id: number): Promise<AiConversation | null> {
    return this.aiConversations.get(id) || null;
  }

  async createAiConversation(insertConversation: InsertAiConversation): Promise<AiConversation> {
    const id = this.conversationIdCounter++;
    const now = new Date();
    const conversation: AiConversation = {
      ...insertConversation,
      id,
      createdAt: now,
      updatedAt: now
    };
    
    this.aiConversations.set(id, conversation);
    return conversation;
  }

  async addMessageToConversation(conversationId: number, message: AiMessage): Promise<AiConversation> {
    const conversation = await this.getAiConversation(conversationId);
    
    if (!conversation) {
      throw new Error('Conversation not found');
    }
    
    const now = new Date();
    const updatedMessages = [...conversation.messages, {
      ...message,
      timestamp: message.timestamp || Date.now()
    }];
    
    const updatedConversation: AiConversation = {
      ...conversation,
      messages: updatedMessages,
      updatedAt: now
    };
    
    this.aiConversations.set(conversationId, updatedConversation);
    
    return updatedConversation;
  }

  // Teacher Dashboard methods
  async getTeacherDashboard(teacherId: number, classId: string): Promise<any> {
    // In a real implementation, this would fetch real data for the teacher's class
    // For this demo, we'll return mock data
    
    // Get student users (filtering by role)
    const students = Array.from(this.users.values())
      .filter(user => user.role === 'student')
      .slice(0, 28); // Limit to 28 students for demo
    
    // Count completed profiles (users who have completed at least one quiz)
    let completedProfiles = 0;
    let totalCareerInterests = new Set();
    let needGuidance = 0;
    
    // Get career interests data for chart
    const careerInterestCounts: Record<string, number> = {};
    
    const studentSummaries = [];
    
    // Process each student
    for (let student of students) {
      const userQuizzes = await this.getUserQuizzes(student.id);
      const completedQuizzes = userQuizzes.filter(quiz => quiz.completed);
      
      // Student has a completed profile if they've completed at least one quiz
      if (completedQuizzes.length > 0) {
        completedProfiles++;
      }
      
      // Get student's career interests
      const userCareers = await this.getUserCareers(student.id);
      const careerInterests: string[] = [];
      const secondaryInterests: string[] = [];
      
      // Determine career interests based on matches
      for (const userCareer of userCareers) {
        const career = await this.getCareer(userCareer.careerId);
        
        if (career) {
          if (userCareer.matchPercentage >= 85) {
            careerInterests.push(career.title);
            totalCareerInterests.add(career.title);
            
            // Count for chart
            careerInterestCounts[career.title] = (careerInterestCounts[career.title] || 0) + 1;
          } else if (userCareer.matchPercentage >= 70) {
            secondaryInterests.push(career.title);
          }
        }
      }
      
      // Need guidance if they have no high matches or incomplete quizzes
      if (careerInterests.length === 0 || completedQuizzes.length < 2) {
        needGuidance++;
      }
      
      // Create student summary
      studentSummaries.push({
        id: student.id,
        fullName: student.fullName,
        studentId: `STU-2023-${String(student.id).padStart(3, '0')}`,
        progress: Math.round((completedQuizzes.length / 3) * 100), // Assuming 3 total assessments
        assessmentsCompleted: completedQuizzes.length,
        totalAssessments: 3,
        careerInterests,
        secondaryInterests,
        lastActivity: new Date(Date.now() - Math.floor(Math.random() * 5) * 24 * 60 * 60 * 1000)
      });
    }
    
    // Calculate completion rate
    const completionRate = Math.round((completedProfiles / students.length) * 100);
    
    // Format top career interests
    const topCareerInterests = Object.entries(careerInterestCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({
        name,
        count,
        percentage: Math.round((count / students.length) * 100)
      }));
    
    return {
      classStats: {
        totalStudents: students.length,
        completedProfiles,
        completionRate,
        careerInterests: totalCareerInterests.size,
        needGuidance
      },
      topCareerInterests,
      students: studentSummaries
    };
  }
}

export const storage = new MemStorage();
