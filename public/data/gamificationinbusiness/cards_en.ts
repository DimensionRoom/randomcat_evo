import { Card } from '../../../components/CanvasBoard/types/Card';

export const cardCategories = {
  gamification: {
    name: 'Gamification Elements',
    color: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
    icon: '🎮'
  },
  career: {
    name: 'Career',
    color: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    icon: '💼'
  },
  mission: {
    name: 'Mission',
    color: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
    icon: '🎯'
  }
};

export const cards: Card[] = [
  // Gamification Elements Category (20 cards)
  {
    id: 'gamification-1',
    frontTitle: 'Points',
    frontContent: '',
    backTitle: 'Point System',
    backContent: 'A numerical reward system that tracks user achievements and progress. Points create motivation through visible progress and can be exchanged for rewards or status.',
    category: 'gamification',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'gamification-2',
    frontTitle: 'Badges',
    frontContent: '',
    backTitle: 'Digital Badges',
    backContent: 'Visual symbols of accomplishment that represent specific achievements or milestones. Badges provide social recognition and encourage users to complete specific tasks.',
    category: 'gamification',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'gamification-3',
    frontTitle: 'Leaderboards',
    frontContent: '',
    backTitle: 'Ranking System',
    backContent: 'A competitive element that displays user rankings based on performance metrics. Creates healthy competition and motivates users to improve their standing.',
    category: 'gamification',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'gamification-4',
    frontTitle: 'Levels',
    frontContent: '',
    backTitle: 'Level Progression',
    backContent: 'A hierarchical system where users advance through different stages. Each level represents increased skill, experience, or commitment to the system.',
    category: 'gamification',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'gamification-5',
    frontTitle: 'Quests',
    frontContent: '',
    backTitle: 'Mission Quests',
    backContent: 'Specific tasks or challenges with clear objectives and rewards. Quests provide direction and purpose, making complex goals more manageable and engaging.',
    category: 'gamification',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'gamification-6',
    frontTitle: 'Streaks',
    frontContent: '',
    backTitle: 'Streak Counter',
    backContent: 'A system that tracks consecutive days or actions of user engagement. Streaks encourage daily habits and create fear of loss motivation to maintain progress.',
    category: 'gamification',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'gamification-7',
    frontTitle: 'Progress Bars',
    frontContent: '',
    backTitle: 'Progress Tracking',
    backContent: 'Visual indicators showing completion status toward a goal. Progress bars provide immediate feedback and motivation by showing how close users are to achieving objectives.',
    category: 'gamification',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'gamification-8',
    frontTitle: 'Achievements',
    frontContent: '',
    backTitle: 'Achievement System',
    backContent: 'Special recognitions for completing significant tasks or reaching important milestones. Achievements provide long-term goals and celebrate user dedication.',
    category: 'gamification',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'gamification-9',
    frontTitle: 'Rewards',
    frontContent: '',
    backTitle: 'Reward Mechanism',
    backContent: 'Tangible or intangible benefits given for completing tasks or achieving goals. Rewards can be virtual items, real prizes, or special privileges that motivate continued engagement.',
    category: 'gamification',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'gamification-10',
    frontTitle: 'Challenges',
    frontContent: '',
    backTitle: 'Challenge System',
    backContent: 'Time-limited or skill-based tasks that test user abilities. Challenges create excitement, urgency, and opportunities for users to prove their skills against others or themselves.',
    category: 'gamification',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'gamification-11',
    frontTitle: 'Teams',
    frontContent: '',
    backTitle: 'Team Formation',
    backContent: 'Social groups that work together toward common goals. Teams foster collaboration, peer support, and collective achievement while building community connections.',
    category: 'gamification',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'gamification-12',
    frontTitle: 'Tournaments',
    frontContent: '',
    backTitle: 'Tournament Structure',
    backContent: 'Organized competitive events with brackets, elimination rounds, and prizes. Tournaments create excitement, showcase top performers, and provide special event experiences.',
    category: 'gamification',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'gamification-13',
    frontTitle: 'Virtual Currency',
    frontContent: '',
    backTitle: 'Digital Economy',
    backContent: 'A virtual monetary system where users earn and spend currency within the platform. Creates economic engagement and provides flexible reward redemption options.',
    category: 'gamification',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'gamification-14',
    frontTitle: 'Customization',
    frontContent: '',
    backTitle: 'Avatar Customization',
    backContent: 'Options for users to personalize their profiles, avatars, or virtual spaces. Customization increases emotional investment and allows for creative self-expression.',
    category: 'gamification',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'gamification-15',
    frontTitle: 'Social Sharing',
    frontContent: '',
    backTitle: 'Social Integration',
    backContent: 'Features that allow users to share their achievements and progress on social media. Increases visibility, attracts new users, and provides social validation.',
    category: 'gamification',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'gamification-16',
    frontTitle: 'Daily Bonuses',
    frontContent: '',
    backTitle: 'Daily Rewards',
    backContent: 'Special rewards given for daily login or participation. Daily bonuses encourage regular engagement and create anticipation for returning to the platform.',
    category: 'gamification',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'gamification-17',
    frontTitle: 'Feedback Loops',
    frontContent: '',
    backTitle: 'Instant Feedback',
    backContent: 'Immediate responses to user actions through sounds, animations, or notifications. Feedback loops provide satisfaction and help users understand the impact of their actions.',
    category: 'gamification',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'gamification-18',
    frontTitle: 'Unlockables',
    frontContent: '',
    backTitle: 'Content Unlocking',
    backContent: 'Features, content, or abilities that become available as users progress. Unlockables create anticipation and provide long-term engagement goals.',
    category: 'gamification',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'gamification-19',
    frontTitle: 'Storytelling',
    frontContent: '',
    backTitle: 'Interactive Narrative',
    backContent: 'Incorporating story elements and character development into the user experience. Storytelling creates emotional connection and provides context for user actions.',
    category: 'gamification',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'gamification-20',
    frontTitle: 'Surprise Elements',
    frontContent: '',
    backTitle: 'Random Rewards',
    backContent: 'Unpredictable bonuses, easter eggs, or special events that create excitement. Surprise elements maintain user interest and create memorable positive experiences.',
    category: 'gamification',
    color: 'from-purple-500 to-pink-500'
  },

  // Career Category (40 cards)
  {
    id: 'career-1',
    frontTitle: 'Teacher',
    frontContent: '',
    backTitle: 'Educator Role',
    backContent: 'A professional who facilitates learning and development in students. Teachers design curricula, assess progress, and inspire lifelong learning across various subjects and age groups.',
    category: 'career',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'career-2',
    frontTitle: 'Software Developer',
    frontContent: '',
    backTitle: 'Programming Professional',
    backContent: 'A technical professional who designs, builds, and maintains software applications. Developers solve complex problems through code and create digital solutions for various industries.',
    category: 'career',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'career-3',
    frontTitle: 'Doctor',
    frontContent: '',
    backTitle: 'Medical Professional',
    backContent: 'A healthcare professional who diagnoses, treats, and prevents illness and injury. Doctors combine scientific knowledge with compassionate care to improve patient health and wellbeing.',
    category: 'career',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'career-4',
    frontTitle: 'Designer',
    frontContent: '',
    backTitle: 'Design Specialist',
    backContent: 'A creative professional who develops visual solutions for communication challenges. Designers combine aesthetics with functionality to create compelling user experiences and brand identities.',
    category: 'career',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'career-5',
    frontTitle: 'Engineer',
    frontContent: '',
    backTitle: 'Technical Engineer',
    backContent: 'A professional who applies scientific and mathematical principles to design and build systems, structures, and machines. Engineers innovate solutions for complex technical challenges.',
    category: 'career',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'career-6',
    frontTitle: 'Marketing Manager',
    frontContent: '',
    backTitle: 'Marketing Professional',
    backContent: 'A professional who develops and executes strategies to promote products or services. Marketing managers analyze markets, create campaigns, and drive business growth through customer engagement.',
    category: 'career',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'career-7',
    frontTitle: 'Data Scientist',
    frontContent: '',
    backTitle: 'Data Professional',
    backContent: 'A professional who extracts insights from large datasets using statistical analysis and machine learning. Data scientists help organizations make informed decisions through data-driven insights.',
    category: 'career',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'career-8',
    frontTitle: 'Entrepreneur',
    frontContent: '',
    backTitle: 'Business Founder',
    backContent: 'A professional who identifies opportunities and creates new businesses or ventures. Entrepreneurs take calculated risks to bring innovative ideas to market and create value for customers.',
    category: 'career',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'career-9',
    frontTitle: 'Lawyer',
    frontContent: '',
    backTitle: 'Legal Professional',
    backContent: 'A professional who provides legal advice and representation to clients. Lawyers navigate complex legal systems to protect rights, resolve disputes, and ensure justice is served.',
    category: 'career',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'career-10',
    frontTitle: 'Nurse',
    frontContent: '',
    backTitle: 'Nursing Professional',
    backContent: 'A healthcare professional who provides direct patient care and support. Nurses combine medical knowledge with compassionate care to help patients recover and maintain their health.',
    category: 'career',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'career-11',
    frontTitle: 'Architect',
    frontContent: '',
    backTitle: 'Design Professional',
    backContent: 'A professional who designs buildings and spaces that are both functional and aesthetically pleasing. Architects balance creativity with technical requirements to create livable environments.',
    category: 'career',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'career-12',
    frontTitle: 'Financial Advisor',
    frontContent: '',
    backTitle: 'Finance Professional',
    backContent: 'A professional who helps individuals and organizations manage their finances and investments. Financial advisors provide guidance on budgeting, saving, and building long-term wealth.',
    category: 'career',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'career-13',
    frontTitle: 'Chef',
    frontContent: '',
    backTitle: 'Culinary Professional',
    backContent: 'A professional who creates and prepares food with artistic flair and technical skill. Chefs combine creativity with culinary expertise to deliver exceptional dining experiences.',
    category: 'career',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'career-14',
    frontTitle: 'Journalist',
    frontContent: '',
    backTitle: 'Media Professional',
    backContent: 'A professional who researches, writes, and reports news and information to the public. Journalists play a crucial role in keeping society informed and holding institutions accountable.',
    category: 'career',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'career-15',
    frontTitle: 'Psychologist',
    frontContent: '',
    backTitle: 'Psychology Professional',
    backContent: 'A professional who studies human behavior and mental processes to help people overcome challenges. Psychologists provide therapy, conduct research, and promote mental wellness.',
    category: 'career',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'career-16',
    frontTitle: 'Sales Representative',
    frontContent: '',
    backTitle: 'Sales Professional',
    backContent: 'A professional who builds relationships with customers to sell products or services. Sales representatives understand customer needs and match them with appropriate solutions.',
    category: 'career',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'career-17',
    frontTitle: 'Project Manager',
    frontContent: '',
    backTitle: 'Management Professional',
    backContent: 'A professional who plans, executes, and oversees projects from start to finish. Project managers coordinate resources, manage timelines, and ensure successful project delivery.',
    category: 'career',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'career-18',
    frontTitle: 'Photographer',
    frontContent: '',
    backTitle: 'Photography Professional',
    backContent: 'A professional who captures moments and tells stories through images. Photographers combine technical skills with artistic vision to create compelling visual narratives.',
    category: 'career',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'career-19',
    frontTitle: 'HR Manager',
    frontContent: '',
    backTitle: 'Human Resources Professional',
    backContent: 'A professional who manages employee relations, recruitment, and organizational development. HR managers create positive work environments and help organizations attract and retain talent.',
    category: 'career',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'career-20',
    frontTitle: 'Consultant',
    frontContent: '',
    backTitle: 'Consulting Professional',
    backContent: 'A professional who provides specialized expertise and advice to organizations. Consultants analyze problems, recommend solutions, and help implement improvements across various industries.',
    category: 'career',
    color: 'from-indigo-500 to-purple-500'
  },
  // Additional 20 Career Cards
  {
    id: 'career-21',
    frontTitle: 'Scientist',
    frontContent: '',
    backTitle: 'Research Scientist',
    backContent: 'A professional who conducts research to advance knowledge in their field. Scientists design experiments, analyze data, and publish findings that contribute to scientific understanding and innovation.',
    category: 'career',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'career-22',
    frontTitle: 'Pilot',
    frontContent: '',
    backTitle: 'Aviation Professional',
    backContent: 'A professional who operates aircraft to transport passengers or cargo. Pilots require extensive training, excellent decision-making skills, and the ability to handle high-pressure situations.',
    category: 'career',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'career-23',
    frontTitle: 'Veterinarian',
    frontContent: '',
    backTitle: 'Animal Healthcare Professional',
    backContent: 'A professional who provides medical care to animals. Veterinarians diagnose and treat illnesses, perform surgeries, and promote animal health and welfare across various species.',
    category: 'career',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'career-24',
    frontTitle: 'Social Worker',
    frontContent: '',
    backTitle: 'Community Support Professional',
    backContent: 'A professional who helps individuals and families overcome challenges and improve their quality of life. Social workers provide counseling, connect people with resources, and advocate for social justice.',
    category: 'career',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'career-25',
    frontTitle: 'Pharmacist',
    frontContent: '',
    backTitle: 'Pharmaceutical Professional',
    backContent: 'A professional who dispenses medications and provides pharmaceutical care. Pharmacists ensure safe medication use, counsel patients, and collaborate with healthcare teams to optimize treatment outcomes.',
    category: 'career',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'career-26',
    frontTitle: 'Accountant',
    frontContent: '',
    backTitle: 'Financial Professional',
    backContent: 'A professional who manages financial records and ensures compliance with regulations. Accountants prepare tax returns, analyze financial data, and provide insights for business decision-making.',
    category: 'career',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'career-27',
    frontTitle: 'Musician',
    frontContent: '',
    backTitle: 'Musical Artist',
    backContent: 'A professional who creates, performs, or teaches music. Musicians express creativity through sound, entertain audiences, and contribute to cultural enrichment through their artistic talents.',
    category: 'career',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'career-28',
    frontTitle: 'Police Officer',
    frontContent: '',
    backTitle: 'Law Enforcement Professional',
    backContent: 'A professional who maintains public safety and enforces laws. Police officers protect communities, investigate crimes, and work to prevent criminal activity while serving the public.',
    category: 'career',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'career-29',
    frontTitle: 'Firefighter',
    frontContent: '',
    backTitle: 'Emergency Response Professional',
    backContent: 'A professional who responds to fires and other emergencies to protect lives and property. Firefighters require physical fitness, courage, and specialized training in rescue operations.',
    category: 'career',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'career-30',
    frontTitle: 'Translator',
    frontContent: '',
    backTitle: 'Language Professional',
    backContent: 'A professional who converts written or spoken content from one language to another. Translators bridge communication gaps and facilitate understanding across different cultures and languages.',
    category: 'career',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'career-31',
    frontTitle: 'Real Estate Agent',
    frontContent: '',
    backTitle: 'Property Professional',
    backContent: 'A professional who helps clients buy, sell, or rent properties. Real estate agents provide market expertise, negotiate deals, and guide clients through complex property transactions.',
    category: 'career',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'career-32',
    frontTitle: 'Physical Therapist',
    frontContent: '',
    backTitle: 'Rehabilitation Professional',
    backContent: 'A professional who helps patients recover from injuries and improve physical function. Physical therapists design treatment plans, provide hands-on care, and educate patients about injury prevention.',
    category: 'career',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'career-33',
    frontTitle: 'Librarian',
    frontContent: '',
    backTitle: 'Information Professional',
    backContent: 'A professional who manages information resources and helps people access knowledge. Librarians organize collections, assist with research, and promote literacy and learning in communities.',
    category: 'career',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'career-34',
    frontTitle: 'Event Planner',
    frontContent: '',
    backTitle: 'Event Management Professional',
    backContent: 'A professional who coordinates and manages events from conception to completion. Event planners handle logistics, vendor relationships, and ensure memorable experiences for clients and attendees.',
    category: 'career',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'career-35',
    frontTitle: 'Electrician',
    frontContent: '',
    backTitle: 'Electrical Professional',
    backContent: 'A professional who installs, maintains, and repairs electrical systems. Electricians ensure safe electrical operations in homes, businesses, and industrial facilities while following safety codes.',
    category: 'career',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'career-36',
    frontTitle: 'Dental Hygienist',
    frontContent: '',
    backTitle: 'Oral Health Professional',
    backContent: 'A professional who provides preventive dental care and educates patients about oral health. Dental hygienists clean teeth, take X-rays, and work with dentists to maintain patient oral health.',
    category: 'career',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'career-37',
    frontTitle: 'Fashion Designer',
    frontContent: '',
    backTitle: 'Fashion Creative Professional',
    backContent: 'A professional who creates clothing and accessory designs. Fashion designers combine artistic vision with market trends to create wearable art that expresses style and meets consumer needs.',
    category: 'career',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'career-38',
    frontTitle: 'Air Traffic Controller',
    frontContent: '',
    backTitle: 'Aviation Safety Professional',
    backContent: 'A professional who coordinates aircraft movements to ensure safe and efficient air traffic flow. Air traffic controllers make critical decisions under pressure to prevent collisions and manage airspace.',
    category: 'career',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'career-39',
    frontTitle: 'Nutritionist',
    frontContent: '',
    backTitle: 'Health and Wellness Professional',
    backContent: 'A professional who provides guidance on nutrition and healthy eating habits. Nutritionists assess dietary needs, create meal plans, and educate clients about the relationship between food and health.',
    category: 'career',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'career-40',
    frontTitle: 'Game Developer',
    frontContent: '',
    backTitle: 'Interactive Entertainment Professional',
    backContent: 'A professional who creates video games and interactive entertainment experiences. Game developers combine programming skills with creative design to build engaging digital worlds and gameplay mechanics.',
    category: 'career',
    color: 'from-indigo-500 to-purple-500'
  },

  // Mission Category (40 cards)
  {
    id: 'mission-1',
    frontTitle: 'Engagement',
    frontContent: '',
    backTitle: 'User Engagement',
    backContent: 'The level of involvement and interaction users have with a product, service, or community. High engagement indicates strong connection and value perception from users.',
    category: 'mission',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'mission-2',
    frontTitle: 'Innovation',
    frontContent: '',
    backTitle: 'Innovation Drive',
    backContent: 'The pursuit of new ideas, methods, or products that create value and solve problems. Innovation drives progress and competitive advantage in any field or industry.',
    category: 'mission',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'mission-3',
    frontTitle: 'Sustainability',
    frontContent: '',
    backTitle: 'Sustainable Practices',
    backContent: 'The ability to maintain or support processes over time without depleting resources or causing harm. Sustainability ensures long-term success and environmental responsibility.',
    category: 'mission',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'mission-4',
    frontTitle: 'Education',
    frontContent: '',
    backTitle: 'Educational Mission',
    backContent: 'The commitment to sharing knowledge, developing skills, and fostering learning. Education empowers individuals and communities to grow and achieve their potential.',
    category: 'mission',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'mission-5',
    frontTitle: 'Community Building',
    frontContent: '',
    backTitle: 'Community Development',
    backContent: 'The process of bringing people together to create supportive networks and shared experiences. Strong communities provide belonging, support, and collective achievement.',
    category: 'mission',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'mission-6',
    frontTitle: 'Quality Excellence',
    frontContent: '',
    backTitle: 'Quality Focus',
    backContent: 'The commitment to delivering exceptional products, services, or experiences that exceed expectations. Quality excellence builds trust, reputation, and customer loyalty.',
    category: 'mission',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'mission-7',
    frontTitle: 'Accessibility',
    frontContent: '',
    backTitle: 'Universal Access',
    backContent: 'The mission to make products, services, and experiences available to all people, regardless of their abilities or circumstances. Accessibility promotes equality and inclusion.',
    category: 'mission',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'mission-8',
    frontTitle: 'Empowerment',
    frontContent: '',
    backTitle: 'Individual Empowerment',
    backContent: 'The mission to give people the tools, knowledge, and confidence to achieve their goals. Empowerment creates self-reliance and enables personal and professional growth.',
    category: 'mission',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'mission-9',
    frontTitle: 'Transparency',
    frontContent: '',
    backTitle: 'Transparent Operations',
    backContent: 'The commitment to open, honest, and clear communication in all interactions. Transparency builds trust, accountability, and stronger relationships with stakeholders.',
    category: 'mission',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'mission-10',
    frontTitle: 'Social Impact',
    frontContent: '',
    backTitle: 'Social Responsibility',
    backContent: 'The mission to create positive change in society and address important social issues. Social impact initiatives contribute to the greater good and community welfare.',
    category: 'mission',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'mission-11',
    frontTitle: 'Customer Success',
    frontContent: '',
    backTitle: 'Customer-Centric Mission',
    backContent: 'The dedication to ensuring customers achieve their desired outcomes and find value in products or services. Customer success drives loyalty and business growth.',
    category: 'mission',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'mission-12',
    frontTitle: 'Collaboration',
    frontContent: '',
    backTitle: 'Collaborative Culture',
    backContent: 'The mission to foster cooperation and teamwork to achieve shared goals. Collaboration leverages diverse skills and perspectives for better outcomes.',
    category: 'mission',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'mission-13',
    frontTitle: 'Continuous Learning',
    frontContent: '',
    backTitle: 'Learning Culture',
    backContent: 'The commitment to ongoing education, skill development, and knowledge acquisition. Continuous learning ensures adaptability and relevance in changing environments.',
    category: 'mission',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'mission-14',
    frontTitle: 'Diversity & Inclusion',
    frontContent: '',
    backTitle: 'Inclusive Environment',
    backContent: 'The mission to create environments where all people feel valued, respected, and included regardless of their background. Diversity drives innovation and better decision-making.',
    category: 'mission',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'mission-15',
    frontTitle: 'Health & Wellness',
    frontContent: '',
    backTitle: 'Wellness Mission',
    backContent: 'The commitment to promoting physical, mental, and emotional health in individuals and communities. Health and wellness initiatives improve quality of life and productivity.',
    category: 'mission',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'mission-16',
    frontTitle: 'Efficiency',
    frontContent: '',
    backTitle: 'Operational Excellence',
    backContent: 'The mission to maximize output while minimizing waste and resource consumption. Efficiency improvements lead to cost savings and better resource utilization.',
    category: 'mission',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'mission-17',
    frontTitle: 'Security',
    frontContent: '',
    backTitle: 'Security Mission',
    backContent: 'The commitment to protecting data, systems, and people from threats and vulnerabilities. Strong security measures build trust and ensure safe operations.',
    category: 'mission',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'mission-18',
    frontTitle: 'Creativity',
    frontContent: '',
    backTitle: 'Creative Mission',
    backContent: 'The mission to foster imagination, artistic expression, and creative problem-solving. Creativity drives innovation and adds beauty and meaning to experiences.',
    category: 'mission',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'mission-19',
    frontTitle: 'Global Reach',
    frontContent: '',
    backTitle: 'Global Mission',
    backContent: 'The ambition to create positive impact and reach audiences across different countries and cultures. Global reach expands opportunities and creates broader influence.',
    category: 'mission',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'mission-20',
    frontTitle: 'Legacy Building',
    frontContent: '',
    backTitle: 'Legacy Mission',
    backContent: 'The mission to create lasting positive impact that extends beyond immediate goals. Legacy building focuses on long-term contributions that benefit future generations.',
    category: 'mission',
    color: 'from-green-500 to-teal-500'
  },
  // Additional 20 Mission Cards
  {
    id: 'mission-21',
    frontTitle: 'Environmental Protection',
    frontContent: '',
    backTitle: 'Environmental Stewardship',
    backContent: 'The mission to protect and preserve natural resources and ecosystems for future generations. Environmental protection involves sustainable practices and conservation efforts.',
    category: 'mission',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'mission-22',
    frontTitle: 'Digital Transformation',
    frontContent: '',
    backTitle: 'Technology Integration',
    backContent: 'The mission to leverage technology to improve processes, enhance experiences, and create new opportunities. Digital transformation drives modernization and competitive advantage.',
    category: 'mission',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'mission-23',
    frontTitle: 'Mental Health Awareness',
    frontContent: '',
    backTitle: 'Psychological Wellbeing',
    backContent: 'The mission to promote understanding and support for mental health issues. Mental health awareness reduces stigma and encourages people to seek help when needed.',
    category: 'mission',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'mission-24',
    frontTitle: 'Financial Literacy',
    frontContent: '',
    backTitle: 'Economic Education',
    backContent: 'The mission to educate people about financial management, investing, and economic principles. Financial literacy empowers individuals to make informed financial decisions.',
    category: 'mission',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'mission-25',
    frontTitle: 'Cultural Preservation',
    frontContent: '',
    backTitle: 'Heritage Conservation',
    backContent: 'The mission to protect and maintain cultural traditions, languages, and historical artifacts. Cultural preservation ensures diverse heritage is passed to future generations.',
    category: 'mission',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'mission-26',
    frontTitle: 'Youth Development',
    frontContent: '',
    backTitle: 'Next Generation Support',
    backContent: 'The mission to provide young people with opportunities, skills, and guidance for personal and professional growth. Youth development invests in future leaders and innovators.',
    category: 'mission',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'mission-27',
    frontTitle: 'Poverty Reduction',
    frontContent: '',
    backTitle: 'Economic Equality',
    backContent: 'The mission to address economic inequality and provide opportunities for those in need. Poverty reduction efforts focus on creating sustainable pathways to economic stability.',
    category: 'mission',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'mission-28',
    frontTitle: 'Scientific Research',
    frontContent: '',
    backTitle: 'Knowledge Advancement',
    backContent: 'The mission to expand human understanding through systematic investigation and discovery. Scientific research drives progress in medicine, technology, and our understanding of the world.',
    category: 'mission',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'mission-29',
    frontTitle: 'Disaster Relief',
    frontContent: '',
    backTitle: 'Emergency Response',
    backContent: 'The mission to provide immediate assistance and support during natural disasters and emergencies. Disaster relief efforts save lives and help communities recover and rebuild.',
    category: 'mission',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'mission-30',
    frontTitle: 'Food Security',
    frontContent: '',
    backTitle: 'Nutrition Access',
    backContent: 'The mission to ensure all people have access to safe, nutritious, and sufficient food. Food security initiatives address hunger and malnutrition at local and global levels.',
    category: 'mission',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'mission-31',
    frontTitle: 'Clean Energy',
    frontContent: '',
    backTitle: 'Renewable Power',
    backContent: 'The mission to develop and promote sustainable energy sources that reduce environmental impact. Clean energy initiatives focus on solar, wind, and other renewable technologies.',
    category: 'mission',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'mission-32',
    frontTitle: 'Digital Privacy',
    frontContent: '',
    backTitle: 'Data Protection',
    backContent: 'The mission to protect personal information and ensure privacy rights in the digital age. Digital privacy initiatives focus on secure data handling and user control over personal information.',
    category: 'mission',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'mission-33',
    frontTitle: 'Elderly Care',
    frontContent: '',
    backTitle: 'Senior Support',
    backContent: 'The mission to provide comprehensive care and support for aging populations. Elderly care initiatives focus on health, social connection, and maintaining dignity and independence.',
    category: 'mission',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'mission-34',
    frontTitle: 'Urban Planning',
    frontContent: '',
    backTitle: 'City Development',
    backContent: 'The mission to design and develop sustainable, livable urban environments. Urban planning focuses on transportation, housing, green spaces, and community infrastructure.',
    category: 'mission',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'mission-35',
    frontTitle: 'Animal Welfare',
    frontContent: '',
    backTitle: 'Creature Protection',
    backContent: 'The mission to protect animals from cruelty and ensure their wellbeing. Animal welfare initiatives focus on ethical treatment, conservation, and protecting endangered species.',
    category: 'mission',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'mission-36',
    frontTitle: 'Space Exploration',
    frontContent: '',
    backTitle: 'Cosmic Discovery',
    backContent: 'The mission to explore and understand the universe beyond Earth. Space exploration advances scientific knowledge and may provide solutions to challenges on our planet.',
    category: 'mission',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'mission-37',
    frontTitle: 'Artificial Intelligence Ethics',
    frontContent: '',
    backTitle: 'Responsible AI',
    backContent: 'The mission to ensure artificial intelligence is developed and used ethically and responsibly. AI ethics focuses on fairness, transparency, and preventing harmful applications.',
    category: 'mission',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'mission-38',
    frontTitle: 'Ocean Conservation',
    frontContent: '',
    backTitle: 'Marine Protection',
    backContent: 'The mission to protect marine ecosystems and ocean resources from pollution and overexploitation. Ocean conservation efforts focus on sustainable fishing and reducing plastic waste.',
    category: 'mission',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'mission-39',
    frontTitle: 'Conflict Resolution',
    frontContent: '',
    backTitle: 'Peace Building',
    backContent: 'The mission to resolve disputes and build lasting peace between communities and nations. Conflict resolution involves mediation, diplomacy, and addressing root causes of conflict.',
    category: 'mission',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'mission-40',
    frontTitle: 'Renewable Resources',
    frontContent: '',
    backTitle: 'Sustainable Materials',
    backContent: 'The mission to develop and use materials that can be replenished naturally over time. Renewable resources reduce dependence on finite materials and support environmental sustainability.',
    category: 'mission',
    color: 'from-green-500 to-teal-500'
  }
];