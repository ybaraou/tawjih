import { Language } from "../types";

type TranslationResource = {
  [key in Language]: {
    translation: Record<string, string>;
  };
};

export const translations: TranslationResource = {
  en: {
    translation: {
      // General
      "app_name": "TawjihAI",
      "welcome": "Welcome to TawjihAI",
      "welcome_description": "Your AI-powered guide to discovering the perfect career path based on your unique personality and interests.",
      "get_started": "Get Started",
      "sign_in": "I Already Have an Account",
      "hello": "Hello",
      "continue_journey": "Continue your career exploration journey",
      
      // Navigation
      "dashboard": "Dashboard",
      "explore": "Explore",
      "plan": "Plan",
      "profile": "Profile",
      
      // Dashboard
      "your_progress": "Your Progress",
      "completed": "Completed",
      "explored": "Explored",
      "ai_chats": "AI Chats",
      "assessments": "Assessments",
      "careers": "Careers",
      "conversations": "Conversations",
      
      // Quiz Section
      "career_assessment_quiz": "Career Assessment Quiz",
      "view_all": "View All",
      "personality_assessment": "Personality Assessment",
      "personality_description": "Discover your personality traits and how they align with different career paths.",
      "skills_interests": "Skills & Interests",
      "skills_description": "Identify your strengths and interests to find careers that you'll love.",
      "in_progress": "In Progress",
      "questions_completed": "questions completed",
      "continue": "Continue",
      "view_results": "View Results",
      
      // Career Recommendations
      "recommended_careers": "Recommended Careers",
      "explore_all": "Explore All",
      "match": "Match",
      "explore_path": "Explore Path",
      
      // Career Details
      "software_engineer": "Software Engineer",
      "software_description": "Create and develop applications and systems that solve problems.",
      "data_scientist": "Data Scientist",
      "data_description": "Analyze complex data to help businesses make better decisions.",
      "business_manager": "Business Manager",
      "business_description": "Lead teams and oversee operations to achieve business goals.",
      
      // Skills
      "problem_solving": "Problem Solving",
      "creativity": "Creativity",
      "logic": "Logic",
      "analytics": "Analytics",
      "mathematics": "Mathematics",
      "research": "Research",
      "leadership": "Leadership",
      "communication": "Communication",
      "strategy": "Strategy",
      
      // Pathway Explorer
      "career_pathway": "Career Pathway",
      "share": "Share",
      "starting_point": "Starting Point",
      "high_school": "High School",
      "undergraduate": "Undergraduate",
      "computer_science": "Computer Science",
      "entry_level": "Entry Level",
      "junior_developer": "Junior Developer",
      "advanced": "Advanced",
      "senior_engineer": "Senior Engineer",
      "current_step": "Current Step",
      "cs_degree": "Computer Science Degree",
      "cs_description": "A bachelor's degree in Computer Science provides the fundamental knowledge needed for software development careers.",
      "duration": "Duration",
      "key_skills": "Key Skills",
      "estimated_cost": "Estimated Cost",
      "explore_education": "Explore Education Options",
      
      // AI Counselor
      "ai_counselor_name": "Maryam - TawjihAI Counselor",
      "ai_status": "Online - Responds instantly",
      "ai_greeting": "Hi! I'm Maryam, your AI counselor. I'm here to help you explore careers and education paths. What would you like to know about today?",
      "type_question": "Type your question here...",
      "education_required": "What education is required for data science?",
      "job_prospects": "Job prospects in Morocco?",
      
      // Teacher Dashboard
      "teacher_dashboard": "Teacher Dashboard",
      "track_support": "Track and support your students' career exploration",
      "class_overview": "Class Overview",
      "export_report": "Export Report",
      "total_students": "Total Students",
      "in_current_class": "in current class",
      "completed_profiles": "Completed Profiles",
      "completion_rate": "completion rate",
      "career_interests": "Career Interests",
      "unique_career_paths": "unique career paths",
      "need_guidance": "Need Guidance",
      "students_require_attention": "students require attention",
      "top_career_interests": "Top 5 Career Interests",
      "student_progress": "Student Progress",
      "search_students": "Search students...",
      "student": "Student",
      "progress": "Progress",
      "last_activity": "Last Activity",
      "action": "Action",
      "view_profile": "View Profile",
      "message": "Message",
      "showing": "Showing",
      "to": "to",
      "of": "of",
      "students": "students",
      "previous": "Previous",
      "next": "Next"
    }
  },
  fr: {
    translation: {
      // General
      "app_name": "TawjihAI",
      "welcome": "Bienvenue à TawjihAI",
      "welcome_description": "Votre guide alimenté par l'IA pour découvrir le parcours professionnel idéal en fonction de votre personnalité et de vos intérêts.",
      "get_started": "Commencer",
      "sign_in": "J'ai déjà un compte",
      "hello": "Bonjour",
      "continue_journey": "Continuez votre parcours d'exploration de carrière",
      
      // Navigation
      "dashboard": "Tableau de bord",
      "explore": "Explorer",
      "plan": "Planifier",
      "profile": "Profil",
      
      // Dashboard
      "your_progress": "Votre Progression",
      "completed": "Terminé",
      "explored": "Exploré",
      "ai_chats": "Chats IA",
      "assessments": "Évaluations",
      "careers": "Carrières",
      "conversations": "Conversations",
      
      // Quiz Section
      "career_assessment_quiz": "Quiz d'évaluation de carrière",
      "view_all": "Voir tout",
      "personality_assessment": "Évaluation de personnalité",
      "personality_description": "Découvrez vos traits de personnalité et comment ils s'alignent avec différents parcours professionnels.",
      "skills_interests": "Compétences et intérêts",
      "skills_description": "Identifiez vos forces et intérêts pour trouver des carrières que vous aimerez.",
      "in_progress": "En cours",
      "questions_completed": "questions complétées",
      "continue": "Continuer",
      "view_results": "Voir les résultats",
      
      // Career Recommendations
      "recommended_careers": "Carrières recommandées",
      "explore_all": "Explorer tout",
      "match": "Correspondance",
      "explore_path": "Explorer le parcours",
      
      // Career Details
      "software_engineer": "Ingénieur logiciel",
      "software_description": "Créer et développer des applications et des systèmes qui résolvent des problèmes.",
      "data_scientist": "Data Scientist",
      "data_description": "Analyser des données complexes pour aider les entreprises à prendre de meilleures décisions.",
      "business_manager": "Gestionnaire d'entreprise",
      "business_description": "Diriger des équipes et superviser les opérations pour atteindre les objectifs commerciaux.",
      
      // Skills
      "problem_solving": "Résolution de problèmes",
      "creativity": "Créativité",
      "logic": "Logique",
      "analytics": "Analytique",
      "mathematics": "Mathématiques",
      "research": "Recherche",
      "leadership": "Leadership",
      "communication": "Communication",
      "strategy": "Stratégie",
      
      // Pathway Explorer
      "career_pathway": "Parcours professionnel",
      "share": "Partager",
      "starting_point": "Point de départ",
      "high_school": "Lycée",
      "undergraduate": "Premier cycle",
      "computer_science": "Informatique",
      "entry_level": "Niveau débutant",
      "junior_developer": "Développeur Junior",
      "advanced": "Avancé",
      "senior_engineer": "Ingénieur Senior",
      "current_step": "Étape actuelle",
      "cs_degree": "Diplôme en informatique",
      "cs_description": "Un diplôme de premier cycle en informatique fournit les connaissances fondamentales nécessaires pour les carrières en développement logiciel.",
      "duration": "Durée",
      "key_skills": "Compétences clés",
      "estimated_cost": "Coût estimé",
      "explore_education": "Explorer les options d'éducation",
      
      // AI Counselor
      "ai_counselor_name": "Maryam - Conseillère TawjihAI",
      "ai_status": "En ligne - Répond instantanément",
      "ai_greeting": "Bonjour! Je suis Maryam, votre conseillère IA. Je suis ici pour vous aider à explorer les carrières et les parcours éducatifs. Que voulez-vous savoir aujourd'hui?",
      "type_question": "Tapez votre question ici...",
      "education_required": "Quelle formation est requise pour la data science?",
      "job_prospects": "Perspectives d'emploi au Maroc?",
      
      // Teacher Dashboard
      "teacher_dashboard": "Tableau de bord de l'enseignant",
      "track_support": "Suivez et soutenez l'exploration de carrière de vos étudiants",
      "class_overview": "Aperçu de la classe",
      "export_report": "Exporter le rapport",
      "total_students": "Total des étudiants",
      "in_current_class": "dans la classe actuelle",
      "completed_profiles": "Profils complétés",
      "completion_rate": "taux d'achèvement",
      "career_interests": "Intérêts de carrière",
      "unique_career_paths": "parcours professionnels uniques",
      "need_guidance": "Besoin d'orientation",
      "students_require_attention": "étudiants nécessitant de l'attention",
      "top_career_interests": "Top 5 des intérêts de carrière",
      "student_progress": "Progrès des étudiants",
      "search_students": "Rechercher des étudiants...",
      "student": "Étudiant",
      "progress": "Progrès",
      "last_activity": "Dernière activité",
      "action": "Action",
      "view_profile": "Voir le profil",
      "message": "Message",
      "showing": "Affichage de",
      "to": "à",
      "of": "sur",
      "students": "étudiants",
      "previous": "Précédent",
      "next": "Suivant"
    }
  },
  ar: {
    translation: {
      // General
      "app_name": "توجيه AI",
      "welcome": "مرحبًا بك في توجيه AI",
      "welcome_description": "دليلك المدعوم بالذكاء الاصطناعي لاكتشاف المسار المهني المثالي بناءً على شخصيتك واهتماماتك الفريدة.",
      "get_started": "ابدأ الآن",
      "sign_in": "لدي حساب بالفعل",
      "hello": "مرحبا",
      "continue_journey": "واصل رحلة استكشاف حياتك المهنية",
      
      // Navigation
      "dashboard": "لوحة القيادة",
      "explore": "استكشف",
      "plan": "خطة",
      "profile": "الملف الشخصي",
      
      // Dashboard
      "your_progress": "تقدمك",
      "completed": "مكتمل",
      "explored": "تم استكشافه",
      "ai_chats": "محادثات الذكاء الاصطناعي",
      "assessments": "التقييمات",
      "careers": "المهن",
      "conversations": "المحادثات",
      
      // Quiz Section
      "career_assessment_quiz": "اختبار تقييم المهنة",
      "view_all": "عرض الكل",
      "personality_assessment": "تقييم الشخصية",
      "personality_description": "اكتشف سمات شخصيتك وكيف تتوافق مع مسارات مهنية مختلفة.",
      "skills_interests": "المهارات والاهتمامات",
      "skills_description": "حدد نقاط قوتك واهتماماتك للعثور على وظائف ستحبها.",
      "in_progress": "قيد التقدم",
      "questions_completed": "الأسئلة المكتملة",
      "continue": "متابعة",
      "view_results": "عرض النتائج",
      
      // Career Recommendations
      "recommended_careers": "الوظائف الموصى بها",
      "explore_all": "استكشاف الكل",
      "match": "تطابق",
      "explore_path": "استكشاف المسار",
      
      // Career Details
      "software_engineer": "مهندس برمجيات",
      "software_description": "إنشاء وتطوير التطبيقات والأنظمة التي تحل المشكلات.",
      "data_scientist": "عالم بيانات",
      "data_description": "تحليل البيانات المعقدة لمساعدة الشركات على اتخاذ قرارات أفضل.",
      "business_manager": "مدير أعمال",
      "business_description": "قيادة الفرق والإشراف على العمليات لتحقيق أهداف العمل.",
      
      // Skills
      "problem_solving": "حل المشكلات",
      "creativity": "الإبداع",
      "logic": "المنطق",
      "analytics": "التحليلات",
      "mathematics": "الرياضيات",
      "research": "البحث",
      "leadership": "القيادة",
      "communication": "التواصل",
      "strategy": "الاستراتيجية",
      
      // Pathway Explorer
      "career_pathway": "مسار المهنة",
      "share": "مشاركة",
      "starting_point": "نقطة البداية",
      "high_school": "المدرسة الثانوية",
      "undergraduate": "المرحلة الجامعية",
      "computer_science": "علوم الكمبيوتر",
      "entry_level": "مستوى المبتدئين",
      "junior_developer": "مطور مبتدئ",
      "advanced": "متقدم",
      "senior_engineer": "مهندس كبير",
      "current_step": "الخطوة الحالية",
      "cs_degree": "درجة علوم الكمبيوتر",
      "cs_description": "توفر درجة البكالوريوس في علوم الكمبيوتر المعرفة الأساسية اللازمة لوظائف تطوير البرمجيات.",
      "duration": "المدة",
      "key_skills": "المهارات الرئيسية",
      "estimated_cost": "التكلفة التقديرية",
      "explore_education": "استكشاف خيارات التعليم",
      
      // AI Counselor
      "ai_counselor_name": "مريم - مستشارة توجيه AI",
      "ai_status": "متصلة - ترد فوريًا",
      "ai_greeting": "مرحبًا! أنا مريم، مستشارتك الذكية. أنا هنا لمساعدتك في استكشاف المهن ومسارات التعليم. ما الذي ترغب في معرفته اليوم؟",
      "type_question": "اكتب سؤالك هنا...",
      "education_required": "ما هو التعليم المطلوب لعلوم البيانات؟",
      "job_prospects": "آفاق العمل في المغرب؟",
      
      // Teacher Dashboard
      "teacher_dashboard": "لوحة تحكم المعلم",
      "track_support": "تتبع ودعم استكشاف المهن لطلابك",
      "class_overview": "نظرة عامة على الفصل",
      "export_report": "تصدير التقرير",
      "total_students": "إجمالي الطلاب",
      "in_current_class": "في الفصل الحالي",
      "completed_profiles": "الملفات المكتملة",
      "completion_rate": "معدل الإكمال",
      "career_interests": "الاهتمامات المهنية",
      "unique_career_paths": "مسارات مهنية فريدة",
      "need_guidance": "بحاجة إلى إرشاد",
      "students_require_attention": "الطلاب الذين يحتاجون إلى اهتمام",
      "top_career_interests": "أفضل 5 اهتمامات مهنية",
      "student_progress": "تقدم الطالب",
      "search_students": "البحث عن الطلاب...",
      "student": "طالب",
      "progress": "التقدم",
      "last_activity": "آخر نشاط",
      "action": "الإجراء",
      "view_profile": "عرض الملف الشخصي",
      "message": "رسالة",
      "showing": "عرض",
      "to": "إلى",
      "of": "من",
      "students": "الطلاب",
      "previous": "السابق",
      "next": "التالي"
    }
  },
  am: {
    translation: {
      // General
      "app_name": "ⵜⴰⵡⵊⵉⵀⴰⵉ",
      "welcome": "ⴰⵏⵙⵓⴼ ⵖⵔ ⵜⴰⵡⵊⵉⵀⴰⵉ",
      "welcome_description": "ⴰⵎⵙⴰⵡⴰⴹ ⵏⵏⴽ ⵢⵜⵜⵡⴰⵙⵉⵔⵏ ⵙ ⵜⵣⵎⵔⵜ ⵏ ⵓⵙⵏⴼⴰⵔ ⴰⵎⵙⵏⴼⴰⵔ ⴰⵎⵓⵟⵟⵓⵏ ⵉⵜⵜⵓⵙⵉⵏⵏ ⵅⴼ ⵓⵙⵜⵉⵍ ⵏⵏⴽ ⴷ ⵉⵏⵔⵣⴰⴼⵏ ⵏⵏⴽ.",
      "get_started": "ⴱⴷⵓ",
      "sign_in": "ⵖⵓⵔⵉ ⴰⵎⵉⴹⴰⵏ ⵢⴰⴽⴽⴰ",
      "hello": "ⴰⵣⵓⵍ",
      "continue_journey": "ⵙⵎⴷ ⴰⵙⴰⴽⵓⴷ ⵏⵏⴽ ⵏ ⵓⵔⵣⵣⵓ ⵅⴼ ⵜⵡⵓⵔⵉ",
      
      // Navigation
      "dashboard": "ⵜⴰⴱⴷⴰⵔⵜ ⵏ ⵓⵙⵏⵓⴱⴳ",
      "explore": "ⵔⵣⵓ",
      "plan": "ⵅⵟⵟⴻⵟ",
      "profile": "ⴰⵙⵜⴰⵏ",
      
      // Dashboard
      "your_progress": "ⴰⵎⵛⵉⵡⵔ ⵏⵏⴽ",
      "completed": "ⵉⴽⵎⵍⵏ",
      "explored": "ⵢⵜⵜⵓⵔⵣⵏ",
      "ai_chats": "ⵉⵎⵙⴰⵡⴰⵍⵏ ⵏ ⵜⵣⵎⵔⵜ ⵜⴰⵎⵙⵏⴼⴰⵔⵜ",
      "assessments": "ⵜⵉⵏⴰⴽⵉⵙⵉⵏ",
      "careers": "ⵜⵉⵡⵓⵔⵉⵡⵉⵏ",
      "conversations": "ⵉⵎⵙⴰⵡⴰⵍⵏ",
      
      // Quiz Section
      "career_assessment_quiz": "ⵜⴰⵏⴰⴽⵉⵙⵜ ⵏ ⵜⵡⵓⵔⵉ",
      "view_all": "ⵥⵔ ⵎⴰⵕⵕⴰ",
      "personality_assessment": "ⵜⴰⵏⴰⴽⵉⵙⵜ ⵏ ⵜⵎⴰⴹⵓⵏⵜ",
      "personality_description": "ⴰⴼ ⵉⵙⵡⵉⵔⵏ ⵏ ⵜⵎⴰⴹⵓⵏⵜ ⵏⵏⴽ ⴷ ⵎⴰⵎⵛ ⵉ ⵜⵎⵙⴰⵙⴰⵏ ⴰⴽⴷ ⵉⴱⵔⵉⴷⵏ ⵏ ⵜⵡⵓⵔⵉ ⵉⵎⵅⴰⵍⴰⴼⵏ.",
      "skills_interests": "ⵜⵉⵣⵎⵎⴰⵔ ⴷ ⵉⵏⵔⵣⴰⴼⵏ",
      "skills_description": "ⵉⵍⵉ ⵉⵏⵔⵣⴰⴼⵏ ⵏⵏⴽ ⴰⴼⴰⴷ ⴰⴷ ⵜⴰⴼⴷ ⵜⵉⵡⵓⵔⵉⵡⵉⵏ ⵉ ⵔⴰⴷ ⵜⵅⵙⴷ.",
      "in_progress": "ⴷⴳ ⵓⵎⵛⵉⵡⵔ",
      "questions_completed": "ⵉⵙⵙⵜⴰⵏⵏ ⵉⴽⵎⵍⵏ",
      "continue": "ⵙⵎⴷ",
      "view_results": "ⵥⵔ ⵉⵎⵓⵜⵜⴰ",
      
      // Career Recommendations
      "recommended_careers": "ⵜⵉⵡⵓⵔⵉⵡⵉⵏ ⵢⵜⵜⵡⴰⵡⵚⵚⴰⵏ",
      "explore_all": "ⵔⵣⵓ ⵎⴰⵕⵕⴰ",
      "match": "ⵜⴰⵎⵙⴰⵙⴰⵜ",
      "explore_path": "ⵔⵣⵓ ⴰⴱⵔⵉⴷ",
      
      // Career Details
      "software_engineer": "ⴰⵊⵉⵏⵢⵓⵔ ⵏ ⵉⵙⵏⴼⴰⵔⵏ",
      "software_description": "ⵙⵏⴼⵍⵓⵍ ⵉⵙⵏⴼⴰⵔⵏ ⴷ ⵉⵎⴰⵎⴽⵏ ⵏⵏⵉ ⵉⴼⴽⴰⵏ ⵜⵉⴼⵔⴰⵜ ⵉ ⵜⵓⴳⴰⵡⵉⵏ.",
      "data_scientist": "ⴰⵎⵓⵙⵏⴰⵡ ⵏ ⵉⵙⴼⴽⴰ",
      "data_description": "ⵙⵍⵍⵍ ⵉⵙⴼⴽⴰ ⵉⵎⵇⵇⵓⵔⵏ ⵉ ⵓⵜⴰⵍⵍⵙ ⵏ ⵜⵎⵔⵙⴰⵍ ⴰⴷ ⵜⵜⴰⵡⵉⵏⵜ ⵜⵉⴼⵔⴰⵜ ⵉⵃⵍⴰⵏ.",
      "business_manager": "ⴰⵎⵙⵉⵔⵉ ⵏ ⵜⵣⵣⵏⵣⴰ",
      "business_description": "ⵙⵉⵔⵉ ⵉⵎⵏⵓⴽⴰⵍ ⴰⴼⴰⴷ ⴰⴷ ⴰⵡⴹⵏ ⵉⵙⵡⵉⵔⵏ ⵏ ⵜⵎⵔⵙⴰⵍⵜ.",
      
      // Skills
      "problem_solving": "ⴰⴼⵔⴰⵢ ⵏ ⵜⵓⴳⴰⵡⵉⵏ",
      "creativity": "ⵜⴰⵙⵏⴼⵍⵓⵍⵜ",
      "logic": "ⴰⵎⵏⵟⵉⵇ",
      "analytics": "ⴰⵙⵍⵍⵍ",
      "mathematics": "ⵜⵓⵙⵏⴰⴽⵜ",
      "research": "ⴰⵔⵣⵣⵓ",
      "leadership": "ⵜⴰⵎⵏⵓⴽⴰⵍⵜ",
      "communication": "ⴰⵎⵢⴰⵡⴰⴹ",
      "strategy": "ⵜⴰⵙⵜⵔⴰⵜⵉⵊⵉⵜ",
      
      // Pathway Explorer
      "career_pathway": "ⴰⴱⵔⵉⴷ ⵏ ⵜⵡⵓⵔⵉ",
      "share": "ⴱⴹⵓ",
      "starting_point": "ⴰⵎⴽⴰⵏ ⵏ ⵓⴱⴷⵓ",
      "high_school": "ⵜⴰⵏⵡⵊⵉⵜ",
      "undergraduate": "ⴰⵙⵍⵎⴷ ⴰⵎⵣⵡⴰⵔⵓ",
      "computer_science": "ⵜⴰⵎⵓⵙⵏⵜ ⵏ ⵓⵙⵉⵏⴰⴳ",
      "entry_level": "ⴰⵙⵡⵉⵔ ⵏ ⵡⴰⴷⴷⴰⴷ",
      "junior_developer": "ⴰⵎⵙⵏⴼⵍⵓⵍ ⴰⵎⵣⵡⴰⵔⵓ",
      "advanced": "ⴰⵏⴰⵎⵓⵔ",
      "senior_engineer": "ⴰⵊⵉⵏⵢⵓⵔ ⴰⵎⵇⵇⵔⴰⵏ",
      "current_step": "ⴰⵙⵓⵔⵉⴼ ⴰⵎⵉⵔⴰⵏ",
      "cs_degree": "ⵜⴰⵙⵉⵏⴰⵜ ⵏ ⵜⵎⵓⵙⵏⵜ ⵏ ⵓⵙⵉⵏⴰⴳ",
      "cs_description": "ⵜⴰⵙⵉⵏⴰⵜ ⵏ ⵓⴱⴰⴽⴰⵍⵓⵔⵢⵓⵙ ⴷⴳ ⵜⵎⵓⵙⵏⵜ ⵏ ⵓⵙⵉⵏⴰⴳ ⵜⵜⵉⵛ ⵜⴰⵎⵓⵙⵏⵉ ⵜⴰⵎⵣⵡⴰⵔⵓⵜ ⵉ ⵓⵙⵏⴼⵍⵓⵍ ⵏ ⵉⵙⵏⴼⴰⵔⵏ.",
      "duration": "ⵜⴰⵍⵍⵙⵜ",
      "key_skills": "ⵜⵉⵣⵎⵎⴰⵔ ⵜⵉⵎⵣⵡⵓⵔⴰ",
      "estimated_cost": "ⵜⴰⵢⵢⵉⵜ ⵢⵜⵜⵡⴰⵙⵉⵙⵏⵏ",
      "explore_education": "ⵔⵣⵓ ⵅⴼ ⵉⵏⵔⵣⴰⴼⵏ ⵏ ⵓⵙⵍⵎⴷ",
      
      // AI Counselor
      "ai_counselor_name": "ⵎⴰⵔⵢⴰⵎ - ⵜⴰⵏⵙⵉⵅⵜ ⵏ ⵜⴰⵡⵊⵉⵀⴰⵉ",
      "ai_status": "ⵜⵇⵇⵏ - ⵜⵜⴰⵔⵔⴰ ⴷⵖⵢⴰ",
      "ai_greeting": "ⴰⵣⵓⵍ! ⵏⵛ ⴷ ⵎⴰⵔⵢⴰⵎ, ⵜⴰⵏⵙⵉⵅⵜ ⵏⵏⴽ ⵜⴰⵎⵙⵏⴼⴰⵔⵜ. ⴰⵇⵇⴰⵖ ⴷⴰ ⵃⵎⴰ ⴰⴷ ⴽ ⵜⴰⵍⵍⵙⵖ ⴷⴳ ⵓⵔⵣⵣⵓ ⵅⴼ ⵜⵡⵓⵔⵉⵡⵉⵏ ⴷ ⵉⴱⵔⵉⴷⵏ ⵏ ⵓⵙⵖⵎⵔ. ⵎⴰ ⵅⴼ ⵜⵅⵙⴷ ⴰⴷ ⵜⵙⵙⵏⴷ ⴰⵙⵙ-ⴰ?",
      "type_question": "ⴰⵔⵉ ⵜⴰⵙⵙⵜⴰⵏⵜ ⵏⵏⴽ ⴷⴰ...",
      "education_required": "ⵎⴰⵏ ⴰⵙⵖⵎⵔ ⵉⵜⵜⵡⴰⵙⵔⴰⵏ ⵉ ⵜⵎⵓⵙⵏⵜ ⵏ ⵉⵙⴼⴽⴰ?",
      "job_prospects": "ⵜⵉⵖⵔⵎⵉⵏ ⵏ ⵜⵡⵓⵔⵉ ⴷⴳ ⵍⵎⵖⵔⵉⴱ?",
      
      // Teacher Dashboard
      "teacher_dashboard": "ⵜⴰⴱⴷⴰⵔⵜ ⵏ ⵓⵙⵍⵎⴰⴷ",
      "track_support": "ⴹⴼⴰⵕ ⵓⵔⵣⵣⵓ ⵏ ⵉⵎⵃⴹⴰⵔⵏ ⵏⵏⴽ ⵅⴼ ⵜⵡⵓⵔⵉ",
      "class_overview": "ⵜⴰⵏⵏⴰⵢⵜ ⵏ ⵜⵏⴰⵔⵉⵜ",
      "export_report": "ⵙⵓⴼⵖ ⴰⵏⴰⵔⵓⵣ",
      "total_students": "ⵎⴰⵕⵕⴰ ⵉⵎⵃⴹⴰⵔⵏ",
      "in_current_class": "ⴷⴳ ⵜⵏⴰⵔⵉⵜ ⵜⴰⵎⵉⵔⴰⵏⵜ",
      "completed_profiles": "ⵉⵙⵜⴰⵏⵏ ⵉⴽⵎⵍⵏ",
      "completion_rate": "ⴰⵙⵡⵉⵔ ⵏ ⵓⴽⵎⴰⵍ",
      "career_interests": "ⵉⵏⵔⵣⴰⴼⵏ ⵏ ⵜⵡⵓⵔⵉ",
      "unique_career_paths": "ⵉⴱⵔⵉⴷⵏ ⵏ ⵜⵡⵓⵔⵉ ⵉⵎⴰⵢⵏⵓⵜⵏ",
      "need_guidance": "ⵉⵅⵙⵙⵏ ⴰⵙⵎⵏⵉⴷ",
      "students_require_attention": "ⵉⵎⵃⴹⴰⵔⵏ ⵉⵅⵙⵙⵏ ⴰⵙⵓⴷⴷⵙ",
      "top_career_interests": "5 ⵉⵏⵔⵣⴰⴼⵏ ⵏ ⵜⵡⵓⵔⵉ ⵉⵎⵣⵡⵓⵔⴰ",
      "student_progress": "ⴰⵙⵏⵓⴱⴳ ⵏ ⵓⵎⵃⴹⴰⵔ",
      "search_students": "ⵔⵣⵓ ⵉⵎⵃⴹⴰⵔⵏ...",
      "student": "ⴰⵎⵃⴹⴰⵔ",
      "progress": "ⴰⵙⵏⵓⴱⴳ",
      "last_activity": "ⴰⵎⵓⵙⵙⵓ ⴰⵏⴳⴳⴰⵔⵓ",
      "action": "ⵜⴰⵎⵙⵙⵓⵖⵜ",
      "view_profile": "ⵥⵔ ⴰⵙⵜⴰⵏ",
      "message": "ⵜⵓⵣⵉⵏⵜ",
      "showing": "ⵉⵙⴽⴰⵏ",
      "to": "ⵉ",
      "of": "ⵙⴳ",
      "students": "ⵉⵎⵃⴹⴰⵔⵏ",
      "previous": "ⵓⵣⵡⴰⵔ",
      "next": "ⵡⵉⵏ ⴷ ⵉⴹⴼⴰⵕⵏ"
    }
  }
};
