import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  role: text("role").notNull().default("student"), // student or teacher
  language: text("language").notNull().default("en"), // en, fr, ar, am
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  fullName: true,
  role: true,
  language: true,
});

export const quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // personality, skills, interests
  totalQuestions: integer("total_questions").notNull(),
  language: text("language").notNull().default("en"),
});

export const insertQuizSchema = createInsertSchema(quizzes).omit({
  id: true,
});

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  quizId: integer("quiz_id").notNull(),
  text: text("text").notNull(),
  order: integer("order").notNull(),
  options: jsonb("options").notNull(), // array of possible answers
  language: text("language").notNull().default("en"),
});

export const insertQuestionSchema = createInsertSchema(questions).omit({
  id: true,
});

export const userQuizzes = pgTable("user_quizzes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  quizId: integer("quiz_id").notNull(),
  completed: boolean("completed").notNull().default(false),
  progress: integer("progress").notNull().default(0), // percentage completed
  results: jsonb("results"), // quiz results and user responses
  startedAt: timestamp("started_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const insertUserQuizSchema = createInsertSchema(userQuizzes).omit({
  id: true,
  startedAt: true,
  completedAt: true,
});

export const careers = pgTable("careers", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  skillsRequired: jsonb("skills_required").notNull(), // array of required skills
  educationPathway: jsonb("education_pathway").notNull(), // pathway steps
  jobProspects: text("job_prospects").notNull(),
  imageUrl: text("image_url"),
  language: text("language").notNull().default("en"),
});

export const insertCareerSchema = createInsertSchema(careers).omit({
  id: true,
});

export const userCareers = pgTable("user_careers", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  careerId: integer("career_id").notNull(),
  matchPercentage: integer("match_percentage").notNull(),
  isFavorite: boolean("is_favorite").notNull().default(false),
  viewedAt: timestamp("viewed_at").defaultNow(),
});

export const insertUserCareerSchema = createInsertSchema(userCareers).omit({
  id: true,
  viewedAt: true,
});

export const aiConversations = pgTable("ai_conversations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  messages: jsonb("messages").notNull().default([]), // array of messages
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertAiConversationSchema = createInsertSchema(aiConversations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const aiMessage = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string(),
  timestamp: z.number().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertQuiz = z.infer<typeof insertQuizSchema>;
export type Quiz = typeof quizzes.$inferSelect;

export type InsertQuestion = z.infer<typeof insertQuestionSchema>;
export type Question = typeof questions.$inferSelect;

export type InsertUserQuiz = z.infer<typeof insertUserQuizSchema>;
export type UserQuiz = typeof userQuizzes.$inferSelect;

export type InsertCareer = z.infer<typeof insertCareerSchema>;
export type Career = typeof careers.$inferSelect;

export type InsertUserCareer = z.infer<typeof insertUserCareerSchema>;
export type UserCareer = typeof userCareers.$inferSelect;

export type InsertAiConversation = z.infer<typeof insertAiConversationSchema>;
export type AiConversation = typeof aiConversations.$inferSelect;

export type AiMessage = z.infer<typeof aiMessage>;
