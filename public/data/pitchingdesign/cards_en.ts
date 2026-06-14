import { Card } from '../../../components/CanvasBoard/types/Card';

export const cardCategories = {
  audience: {
    name: 'Audience',
    color: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    icon: '💼'
  },
  productandservice: {
    name: 'Product & Service',
    color: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
    icon: '🎯'
  },
  purpose: {
    name: 'Purpose',
    color: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    icon: '🚀'
  },
  technique: {
    name: 'Technique',
    color: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
    icon: '🛠️'
  },
  emotional: {
    name: 'Emotional',
    color: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
    icon: '❤️'
  },
  // duration: {
  //   name: 'Duration',
  //   color: 'linear-gradient(135deg, #f97316 0%, #eab308 100%)',
  //   icon: '⏱️'
  // }
};

export const cards: Card[] = [
  // ── Audience ──────────────────────────────────────────────────────────────
  {
    id: 'audience-1',
    frontTitle: 'Investors',
    frontContent: '',
    backTitle: 'Investors',
    backContent: 'Looking for innovative ideas and strong potential returns. Focus on vision, potential market size, and the uniqueness of your solution.',
    category: 'audience',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'audience-2',
    frontTitle: 'Venture Capitalists (VCs)',
    frontContent: '',
    backTitle: 'Venture Capitalists (VCs)',
    backContent: 'Interested in high-growth potential and scalability. Emphasize traction, market opportunity, and exit strategy.',
    category: 'audience',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'audience-3',
    frontTitle: 'Crowdfunding Backers',
    frontContent: '',
    backTitle: 'Crowdfunding Backers',
    backContent: 'Motivated by the appeal and story behind the product. Highlight the problem, solution, and benefits, and create an emotional connection.',
    category: 'audience',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'audience-4',
    frontTitle: 'Corporate Investors',
    frontContent: '',
    backTitle: 'Corporate Investors',
    backContent: 'Seeking strategic alignment with their business. Focus on how your solution complements their existing offerings and the strategic benefits.',
    category: 'audience',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'audience-5',
    frontTitle: 'Strategic Partners',
    frontContent: '',
    backTitle: 'Strategic Partners',
    backContent: 'Looking for mutually beneficial collaborations. Emphasize synergies, complementary strengths, and joint market opportunities.',
    category: 'audience',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'audience-6',
    frontTitle: 'Banks and Financial Institutions',
    frontContent: '',
    backTitle: 'Banks and Financial Institutions',
    backContent: 'Interested in financial stability and risk mitigation. Present detailed financial projections, creditworthiness, and risk management plans.',
    category: 'audience',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'audience-7',
    frontTitle: 'Government Agencies',
    frontContent: '',
    backTitle: 'Government Agencies',
    backContent: 'Focused on societal impact and policy alignment. Highlight the public benefits, compliance with regulations, and alignment with government goals.',
    category: 'audience',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'audience-8',
    frontTitle: 'Non-Profit Organizations',
    frontContent: '',
    backTitle: 'Non-Profit Organizations',
    backContent: 'Interested in mission alignment and social impact. Emphasize the social value, community benefits, and alignment with their mission.',
    category: 'audience',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'audience-9',
    frontTitle: 'Incubators and Accelerators',
    frontContent: '',
    backTitle: 'Incubators and Accelerators',
    backContent: 'Looking for startups with high growth potential and coachability. Highlight your team\'s capabilities, growth potential, and willingness to learn and adapt.',
    category: 'audience',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'audience-10',
    frontTitle: 'Advisors and Mentors',
    frontContent: '',
    backTitle: 'Advisors and Mentors',
    backContent: 'Interested in the potential to provide guidance and support. Focus on the areas where you seek advice and the potential for growth with their help.',
    category: 'audience',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'audience-11',
    frontTitle: 'Industry Experts',
    frontContent: '',
    backTitle: 'Industry Experts',
    backContent: 'Looking for innovative and feasible solutions within their domain. Present detailed technical aspects, industry relevance, and market potential.',
    category: 'audience',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'audience-12',
    frontTitle: 'Media and Press',
    frontContent: '',
    backTitle: 'Media and Press',
    backContent: 'Seeking compelling stories and newsworthy innovations. Highlight the novelty, human interest aspects, and potential impact.',
    category: 'audience',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'audience-13',
    frontTitle: 'Customers (B2C)',
    frontContent: '',
    backTitle: 'Customers (B2C)',
    backContent: 'Interested in how the product or service solves their problem. Emphasize ease of use, benefits, and user experience.',
    category: 'audience',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'audience-14',
    frontTitle: 'Business Clients (B2B)',
    frontContent: '',
    backTitle: 'Business Clients (B2B)',
    backContent: 'Looking for solutions that improve their operations or bottom line. Focus on ROI, efficiency improvements, and case studies.',
    category: 'audience',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'audience-15',
    frontTitle: 'Employees',
    frontContent: '',
    backTitle: 'Employees',
    backContent: 'Seeking motivation and understanding of the company\'s vision. Emphasize mission, values, and growth opportunities.',
    category: 'audience',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'audience-16',
    frontTitle: 'Board of Directors',
    frontContent: '',
    backTitle: 'Board of Directors',
    backContent: 'Focused on strategic alignment and company performance. Present strategic plans, performance metrics, and risk management.',
    category: 'audience',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'audience-17',
    frontTitle: 'Academic Institutions',
    frontContent: '',
    backTitle: 'Academic Institutions',
    backContent: 'Interested in research collaborations and educational benefits. Highlight research potential, educational value, and funding opportunities.',
    category: 'audience',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'audience-18',
    frontTitle: 'Event Audiences',
    frontContent: '',
    backTitle: 'Event Audiences',
    backContent: 'A mixed audience looking for engaging and informative content. Make the pitch engaging, with clear takeaways and interactive elements.',
    category: 'audience',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'audience-19',
    frontTitle: 'Tech Enthusiasts',
    frontContent: '',
    backTitle: 'Tech Enthusiasts',
    backContent: 'Interested in the technical details and innovation. Focus on technology, innovation, and potential applications.',
    category: 'audience',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'audience-20',
    frontTitle: 'Retail Buyers',
    frontContent: '',
    backTitle: 'Retail Buyers',
    backContent: 'Looking for products that will sell well in their stores. Emphasize market demand, product appeal, and sales projections.',
    category: 'audience',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'audience-21',
    frontTitle: 'Suppliers and Manufacturers',
    frontContent: '',
    backTitle: 'Suppliers and Manufacturers',
    backContent: 'Interested in reliable partnerships and growth potential. Highlight stability, growth projections, and mutually beneficial terms.',
    category: 'audience',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'audience-22',
    frontTitle: 'Distributors',
    frontContent: '',
    backTitle: 'Distributors',
    backContent: 'Looking for scalable products with market demand. Emphasize market reach, scalability, and distribution logistics.',
    category: 'audience',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'audience-23',
    frontTitle: 'Freelancers and Contractors',
    frontContent: '',
    backTitle: 'Freelancers and Contractors',
    backContent: 'Interested in project potential and working conditions. Highlight project scope, timelines, and collaboration opportunities.',
    category: 'audience',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'audience-24',
    frontTitle: 'Alumni Networks',
    frontContent: '',
    backTitle: 'Alumni Networks',
    backContent: 'Focused on supporting innovative ventures from their alma mater. Emphasize the connection to the institution and potential impact.',
    category: 'audience',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'audience-25',
    frontTitle: 'Professional Associations',
    frontContent: '',
    backTitle: 'Professional Associations',
    backContent: 'Looking for industry-relevant innovations and collaborations. Highlight industry relevance, potential impact, and collaboration opportunities.',
    category: 'audience',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'audience-26',
    frontTitle: 'Social Media Influencers',
    frontContent: '',
    backTitle: 'Social Media Influencers',
    backContent: 'Interested in shareable and engaging content. Emphasize the story, visual appeal, and potential for engagement.',
    category: 'audience',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'audience-27',
    frontTitle: 'Local Communities',
    frontContent: '',
    backTitle: 'Local Communities',
    backContent: 'Focused on local impact and benefits. Highlight community benefits, local engagement, and social value.',
    category: 'audience',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'audience-28',
    frontTitle: 'Environmental Groups',
    frontContent: '',
    backTitle: 'Environmental Groups',
    backContent: 'Interested in sustainable and eco-friendly solutions. Emphasize sustainability, environmental impact, and alignment with green goals.',
    category: 'audience',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'audience-29',
    frontTitle: 'Healthcare Providers',
    frontContent: '',
    backTitle: 'Healthcare Providers',
    backContent: 'Looking for solutions that improve patient care or efficiency. Focus on health benefits, efficiency, and compliance with regulations.',
    category: 'audience',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'audience-30',
    frontTitle: 'Educational Institutions',
    frontContent: '',
    backTitle: 'Educational Institutions',
    backContent: 'Interested in tools that enhance learning or educational outcomes. Highlight educational value, ease of integration, and potential impact on learning.',
    category: 'audience',
    color: 'from-purple-500 to-pink-500'
  },

  // ── Product & Service ──────────────────────────────────────────────────────
  {
    id: 'productandservice-1',
    frontTitle: 'Technology and Electronics',
    frontContent: '',
    backTitle: 'Technology and Electronics',
    backContent: 'Computers and Accessories, Mobile Phones and Tablets, Smart Home Devices, Consumer Electronics (e.g., TVs, Cameras)',
    category: 'productandservice',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'productandservice-2',
    frontTitle: 'Healthcare and Pharmaceuticals',
    frontContent: '',
    backTitle: 'Healthcare and Pharmaceuticals',
    backContent: 'Medications, Medical Equipment, Health Supplements, Wellness Services (e.g., Fitness, Therapy)',
    category: 'productandservice',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'productandservice-3',
    frontTitle: 'Food and Beverage',
    frontContent: '',
    backTitle: 'Food and Beverage',
    backContent: 'Grocery Products, Restaurants and Catering, Beverages (e.g., Soft Drinks, Alcohol), Snacks and Confectionery',
    category: 'productandservice',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'productandservice-4',
    frontTitle: 'Fashion and Apparel',
    frontContent: '',
    backTitle: 'Fashion and Apparel',
    backContent: 'Clothing, Footwear, Accessories (e.g., Bags, Jewelry), Sportswear',
    category: 'productandservice',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'productandservice-5',
    frontTitle: 'Automotive',
    frontContent: '',
    backTitle: 'Automotive',
    backContent: 'Vehicles (e.g., Cars, Motorcycles), Auto Parts and Accessories, Car Maintenance Services, Car Rental and Leasing',
    category: 'productandservice',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'productandservice-6',
    frontTitle: 'Home and Garden',
    frontContent: '',
    backTitle: 'Home and Garden',
    backContent: 'Furniture, Home Decor, Gardening Supplies, Home Improvement Services',
    category: 'productandservice',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'productandservice-7',
    frontTitle: 'Travel and Tourism',
    frontContent: '',
    backTitle: 'Travel and Tourism',
    backContent: 'Airlines, Hotels and Resorts, Travel Agencies, Tour Operators',
    category: 'productandservice',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'productandservice-8',
    frontTitle: 'Finance and Insurance',
    frontContent: '',
    backTitle: 'Finance and Insurance',
    backContent: 'Banking Services, Investment Services, Insurance (e.g., Health, Auto, Life), Financial Advisory',
    category: 'productandservice',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'productandservice-9',
    frontTitle: 'Education and Training',
    frontContent: '',
    backTitle: 'Education and Training',
    backContent: 'Schools and Universities, Online Learning Platforms, Professional Training Services, Educational Materials and Supplies',
    category: 'productandservice',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'productandservice-10',
    frontTitle: 'Entertainment and Media',
    frontContent: '',
    backTitle: 'Entertainment and Media',
    backContent: 'Movies and TV Shows, Music and Concerts, Books and Magazines, Gaming (e.g., Video Games, Board Games)',
    category: 'productandservice',
    color: 'from-emerald-500 to-teal-500'
  },

  // ── Purpose ───────────────────────────────────────────────────────────────
  {
    id: 'purpose-1',
    frontTitle: 'Securing Investment',
    frontContent: '',
    backTitle: 'Securing Investment',
    backContent: 'Convince investors to provide funding for your startup or project.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-2',
    frontTitle: 'Attracting Customers',
    frontContent: '',
    backTitle: 'Attracting Customers',
    backContent: 'Persuade potential customers to purchase your product or service.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-3',
    frontTitle: 'Building Partnerships',
    frontContent: '',
    backTitle: 'Building Partnerships',
    backContent: 'Establish strategic partnerships with other businesses or organizations.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-4',
    frontTitle: 'Gaining Sponsorship',
    frontContent: '',
    backTitle: 'Gaining Sponsorship',
    backContent: 'Obtain sponsorship for an event, project, or initiative.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-5',
    frontTitle: 'Hiring Talent',
    frontContent: '',
    backTitle: 'Hiring Talent',
    backContent: 'Attract skilled professionals to join your team.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-6',
    frontTitle: 'Entering a Market',
    frontContent: '',
    backTitle: 'Entering a Market',
    backContent: 'Justify entering a new market or geographic region.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-7',
    frontTitle: 'Launching a Product',
    frontContent: '',
    backTitle: 'Launching a Product',
    backContent: 'Introduce a new product or service to the market.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-8',
    frontTitle: 'Raising Awareness',
    frontContent: '',
    backTitle: 'Raising Awareness',
    backContent: 'Increase awareness about an issue, cause, or product.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-9',
    frontTitle: 'Securing Grants',
    frontContent: '',
    backTitle: 'Securing Grants',
    backContent: 'Obtain grant funding from government or private entities.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-10',
    frontTitle: 'Winning Competitions',
    frontContent: '',
    backTitle: 'Winning Competitions',
    backContent: 'Compete in pitching contests or hackathons to win prizes or recognition.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-11',
    frontTitle: 'Getting Media Coverage',
    frontContent: '',
    backTitle: 'Getting Media Coverage',
    backContent: 'Gain press coverage for your business, product, or event.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-12',
    frontTitle: 'Advisory Support',
    frontContent: '',
    backTitle: 'Advisory Support',
    backContent: 'Seek advice or mentorship from experienced professionals.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-13',
    frontTitle: 'Community Support',
    frontContent: '',
    backTitle: 'Community Support',
    backContent: 'Rally community support for a local initiative or project.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-14',
    frontTitle: 'Educational Purposes',
    frontContent: '',
    backTitle: 'Educational Purposes',
    backContent: 'Teach or inform an audience about a specific topic or industry.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-15',
    frontTitle: 'Improving Products',
    frontContent: '',
    backTitle: 'Improving Products',
    backContent: 'Gather feedback to enhance a product or service.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-16',
    frontTitle: 'Testing Ideas',
    frontContent: '',
    backTitle: 'Testing Ideas',
    backContent: 'Validate an idea or concept with potential stakeholders.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-17',
    frontTitle: 'Securing Pre-Orders',
    frontContent: '',
    backTitle: 'Securing Pre-Orders',
    backContent: 'Obtain pre-orders to demonstrate demand and secure initial revenue.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-18',
    frontTitle: 'Crowdfunding',
    frontContent: '',
    backTitle: 'Crowdfunding',
    backContent: 'Raise funds through platforms like Kickstarter or Indiegogo.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-19',
    frontTitle: 'Government Contracts',
    frontContent: '',
    backTitle: 'Government Contracts',
    backContent: 'Secure contracts or support from government agencies.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-20',
    frontTitle: 'Expanding Operations',
    frontContent: '',
    backTitle: 'Expanding Operations',
    backContent: 'Justify the need for expanding business operations.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-21',
    frontTitle: 'Acquiring Businesses',
    frontContent: '',
    backTitle: 'Acquiring Businesses',
    backContent: 'Convince stakeholders of the value of acquiring another business.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-22',
    frontTitle: 'Selling a Business',
    frontContent: '',
    backTitle: 'Selling a Business',
    backContent: 'Attract buyers for selling your business or a part of it.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-23',
    frontTitle: 'Launching Campaigns',
    frontContent: '',
    backTitle: 'Launching Campaigns',
    backContent: 'Introduce marketing or social campaigns.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-24',
    frontTitle: 'Academic Research',
    frontContent: '',
    backTitle: 'Academic Research',
    backContent: 'Secure funding or support for academic research projects.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-25',
    frontTitle: 'Building Brand',
    frontContent: '',
    backTitle: 'Building Brand',
    backContent: 'Strengthen and build your brand identity.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-26',
    frontTitle: 'Seeking Endorsements',
    frontContent: '',
    backTitle: 'Seeking Endorsements',
    backContent: 'Obtain endorsements from influential individuals or organizations.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-27',
    frontTitle: 'Securing Facilities',
    frontContent: '',
    backTitle: 'Securing Facilities',
    backContent: 'Justify the need for new facilities or office spaces.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-28',
    frontTitle: 'Creating Alliances',
    frontContent: '',
    backTitle: 'Creating Alliances',
    backContent: 'Form alliances with industry peers for mutual benefit.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-29',
    frontTitle: 'Establishing Franchises',
    frontContent: '',
    backTitle: 'Establishing Franchises',
    backContent: 'Pitch the concept of franchising your business model.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-30',
    frontTitle: 'Securing Licenses',
    frontContent: '',
    backTitle: 'Securing Licenses',
    backContent: 'Obtain licenses or permissions necessary for operations.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-31',
    frontTitle: 'Boosting Sales',
    frontContent: '',
    backTitle: 'Boosting Sales',
    backContent: 'Increase sales through strategic initiatives and partnerships.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-32',
    frontTitle: 'Entering Incubators',
    frontContent: '',
    backTitle: 'Entering Incubators',
    backContent: 'Gain entry into business incubator programs.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-33',
    frontTitle: 'Joining Accelerators',
    frontContent: '',
    backTitle: 'Joining Accelerators',
    backContent: 'Get accepted into startup accelerator programs.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-34',
    frontTitle: 'Corporate Buy-In',
    frontContent: '',
    backTitle: 'Corporate Buy-In',
    backContent: 'Gain support from corporate executives for internal projects.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-35',
    frontTitle: 'Sustainability Initiatives',
    frontContent: '',
    backTitle: 'Sustainability Initiatives',
    backContent: 'Promote and secure support for sustainability projects.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-36',
    frontTitle: 'Expanding Product Lines',
    frontContent: '',
    backTitle: 'Expanding Product Lines',
    backContent: 'Justify the need for new product lines or services.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-37',
    frontTitle: 'Crisis Management',
    frontContent: '',
    backTitle: 'Crisis Management',
    backContent: 'Present solutions to manage and recover from crises.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-38',
    frontTitle: 'Policy Advocacy',
    frontContent: '',
    backTitle: 'Policy Advocacy',
    backContent: 'Advocate for policy changes or new regulations.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-39',
    frontTitle: 'International Expansion',
    frontContent: '',
    backTitle: 'International Expansion',
    backContent: 'Pitch the value of expanding internationally.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-40',
    frontTitle: 'Mergers',
    frontContent: '',
    backTitle: 'Mergers',
    backContent: 'Justify merging with another company.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-41',
    frontTitle: 'Technological Upgrades',
    frontContent: '',
    backTitle: 'Technological Upgrades',
    backContent: 'Secure funding or approval for technology upgrades.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-42',
    frontTitle: 'Rebranding',
    frontContent: '',
    backTitle: 'Rebranding',
    backContent: 'Present the case for rebranding your business.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-43',
    frontTitle: 'Event Hosting',
    frontContent: '',
    backTitle: 'Event Hosting',
    backContent: 'Secure support for hosting major events or conferences.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-44',
    frontTitle: 'Joint Ventures',
    frontContent: '',
    backTitle: 'Joint Ventures',
    backContent: 'Propose joint ventures with other businesses.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-45',
    frontTitle: 'Market Research',
    frontContent: '',
    backTitle: 'Market Research',
    backContent: 'Obtain funding for comprehensive market research.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-46',
    frontTitle: 'Product Validation',
    frontContent: '',
    backTitle: 'Product Validation',
    backContent: 'Validate the market need for a new product or service.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-47',
    frontTitle: 'Innovation Projects',
    frontContent: '',
    backTitle: 'Innovation Projects',
    backContent: 'Pitch innovative projects or ideas for internal or external support.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-48',
    frontTitle: 'Employee Training',
    frontContent: '',
    backTitle: 'Employee Training',
    backContent: 'Secure funding or approval for employee training programs.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-49',
    frontTitle: 'Digital Transformation',
    frontContent: '',
    backTitle: 'Digital Transformation',
    backContent: 'Justify the need for digital transformation initiatives.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'purpose-50',
    frontTitle: 'Social Impact',
    frontContent: '',
    backTitle: 'Social Impact',
    backContent: 'Promote projects with significant social impact.',
    category: 'purpose',
    color: 'from-amber-500 to-red-500'
  },

  // ── Technique ─────────────────────────────────────────────────────────────
  {
    id: 'technique-1',
    frontTitle: 'Telling Story',
    frontContent: '',
    backTitle: 'Telling Story',
    backContent: 'Crafting a story involves setting up a scenario with characters facing challenges, showcasing how your pitch resolves them, creating an emotional connection for a memorable message.',
    category: 'technique',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'technique-2',
    frontTitle: 'Fact and Stat',
    frontContent: '',
    backTitle: 'Fact and Stat',
    backContent: 'Facts and statistics bolster your pitch by providing concrete data to back your claims, enhancing credibility, building trust, and illustrating the feasibility and impact of your solution.',
    category: 'technique',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'technique-3',
    frontTitle: 'Unfair Advantage',
    frontContent: '',
    backTitle: 'Unfair Advantage',
    backContent: 'Highlighting your unfair advantage showcases a unique benefit or capability — like proprietary technology, exclusive partnerships, or specialized expertise — that sets you apart from competitors.',
    category: 'technique',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'technique-4',
    frontTitle: 'Social Proof',
    frontContent: '',
    backTitle: 'Social Proof',
    backContent: 'Social proof involves showcasing endorsements like testimonials, case studies, and user reviews to build credibility and trust, demonstrating positive experiences with your solution.',
    category: 'technique',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'technique-5',
    frontTitle: 'Imagination',
    frontContent: '',
    backTitle: 'Imagination',
    backContent: 'Encouraging your audience to use their imagination involves painting a vivid picture of the future with your pitch implemented.',
    category: 'technique',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'technique-6',
    frontTitle: 'User Journey',
    frontContent: '',
    backTitle: 'User Journey',
    backContent: 'Explaining the user journey involves walking the audience through the process a user would go through when interacting with your product or service.',
    category: 'technique',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'technique-7',
    frontTitle: 'Summary / Wrap Up',
    frontContent: '',
    backTitle: 'Summary / Wrap Up',
    backContent: 'Summarizing or wrapping up involves briefly reiterating the key points of your pitch. This ensures that the main message is clear and reinforces the most important aspects of your pitch.',
    category: 'technique',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'technique-8',
    frontTitle: 'Quote',
    frontContent: '',
    backTitle: 'Quote',
    backContent: 'Using a relevant quote from a well-known figure or industry expert can add authority and resonance to your pitch.',
    category: 'technique',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'technique-9',
    frontTitle: 'Memorable Closing',
    frontContent: '',
    backTitle: 'Memorable Closing',
    backContent: 'A memorable closing is a powerful way to end your pitch. This could be a strong statement, a compelling call to action, or a thought-provoking idea.',
    category: 'technique',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'technique-10',
    frontTitle: 'Use of Metaphors',
    frontContent: '',
    backTitle: 'Use of Metaphors',
    backContent: 'Using metaphors involves comparing your pitch to something familiar to make complex ideas more understandable and relatable.',
    category: 'technique',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'technique-11',
    frontTitle: 'Expert in Your Field',
    frontContent: '',
    backTitle: 'Expert in Your Field',
    backContent: 'Demonstrating that you are an expert in your field involves showcasing your knowledge, experience, and credentials.',
    category: 'technique',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'technique-12',
    frontTitle: 'Call to Action',
    frontContent: '',
    backTitle: 'Call to Action',
    backContent: 'A call to action is a clear and direct instruction to the audience on what you want them to do next. This could be to invest, sign up, share, or any other action you need them to take.',
    category: 'technique',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'technique-13',
    frontTitle: 'Clarity and Brevity',
    frontContent: '',
    backTitle: 'Clarity and Brevity',
    backContent: 'Ensuring clarity and brevity means delivering your pitch in a straightforward and concise manner. Avoiding jargon and unnecessary details helps to keep the audience engaged.',
    category: 'technique',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'technique-14',
    frontTitle: 'Anecdotes',
    frontContent: '',
    backTitle: 'Anecdotes',
    backContent: 'Anecdotes can make your pitch more relatable and engaging by connecting real-life experiences to the concepts you are presenting.',
    category: 'technique',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'technique-15',
    frontTitle: 'Object Aids',
    frontContent: '',
    backTitle: 'Object Aids',
    backContent: 'Using object aids involves incorporating physical items that help to illustrate your points. This could include product samples or prototypes that make your pitch more interactive and memorable.',
    category: 'technique',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'technique-16',
    frontTitle: 'Visual Aids',
    frontContent: '',
    backTitle: 'Visual Aids',
    backContent: 'Visual aids such as slides, charts, infographics, and videos help to reinforce your message and make complex information more digestible.',
    category: 'technique',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'technique-17',
    frontTitle: 'Hook',
    frontContent: '',
    backTitle: 'Hook',
    backContent: 'Starting with a hook means beginning your pitch with a compelling opening statement or question that grabs the audience\'s attention.',
    category: 'technique',
    color: 'from-blue-500 to-cyan-500'
  },

  // ── Emotional ─────────────────────────────────────────────────────────────
  {
    id: 'emotional-1',
    frontTitle: 'Passion',
    frontContent: '',
    backTitle: 'Passion',
    backContent: 'Show your deep enthusiasm and love for your idea or product. Demonstrates your dedication and belief in your project.',
    category: 'emotional',
    color: 'from-violet-500 to-pink-500'
  },
  {
    id: 'emotional-2',
    frontTitle: 'Confidence',
    frontContent: '',
    backTitle: 'Confidence',
    backContent: 'Display self-assurance in your knowledge and abilities. Conveys credibility and trustworthiness.',
    category: 'emotional',
    color: 'from-violet-500 to-pink-500'
  },
  {
    id: 'emotional-3',
    frontTitle: 'Excitement',
    frontContent: '',
    backTitle: 'Excitement',
    backContent: 'Express eagerness and anticipation about the potential of your idea. Engages the audience and makes them feel enthusiastic.',
    category: 'emotional',
    color: 'from-violet-500 to-pink-500'
  },
  {
    id: 'emotional-4',
    frontTitle: 'Determination',
    frontContent: '',
    backTitle: 'Determination',
    backContent: 'Show your resolve and commitment to overcoming challenges. Highlights your perseverance and resilience.',
    category: 'emotional',
    color: 'from-violet-500 to-pink-500'
  },
  {
    id: 'emotional-5',
    frontTitle: 'Empathy',
    frontContent: '',
    backTitle: 'Empathy',
    backContent: 'Express understanding and concern for your users\' needs and problems. Demonstrates that you are user-focused and solutions-driven.',
    category: 'emotional',
    color: 'from-violet-500 to-pink-500'
  },
  {
    id: 'emotional-6',
    frontTitle: 'Hope',
    frontContent: '',
    backTitle: 'Hope',
    backContent: 'Convey optimism about the future and the impact of your solution. Inspires the audience to share your vision.',
    category: 'emotional',
    color: 'from-violet-500 to-pink-500'
  },
  {
    id: 'emotional-7',
    frontTitle: 'Urgency',
    frontContent: '',
    backTitle: 'Urgency',
    backContent: 'Communicate the immediate need or opportunity for your solution. Creates a sense of importance and timeliness.',
    category: 'emotional',
    color: 'from-violet-500 to-pink-500'
  },
  {
    id: 'emotional-8',
    frontTitle: 'Gratitude',
    frontContent: '',
    backTitle: 'Gratitude',
    backContent: 'Show appreciation for the judges\' time and consideration. Builds rapport and goodwill.',
    category: 'emotional',
    color: 'from-violet-500 to-pink-500'
  },
  {
    id: 'emotional-9',
    frontTitle: 'Curiosity',
    frontContent: '',
    backTitle: 'Curiosity',
    backContent: 'Demonstrate a keen interest in learning and exploring new possibilities. Indicates a proactive and open-minded approach.',
    category: 'emotional',
    color: 'from-violet-500 to-pink-500'
  },
  {
    id: 'emotional-10',
    frontTitle: 'Pride',
    frontContent: '',
    backTitle: 'Pride',
    backContent: 'Express pride in your achievements and the progress you\'ve made. Highlights your accomplishments and confidence in your work.',
    category: 'emotional',
    color: 'from-violet-500 to-pink-500'
  },
  {
    id: 'emotional-11',
    frontTitle: 'Inspiration',
    frontContent: '',
    backTitle: 'Inspiration',
    backContent: 'Share what inspires you and how it drives your project. Connects emotionally with the judges and motivates them.',
    category: 'emotional',
    color: 'from-violet-500 to-pink-500'
  },
  {
    id: 'emotional-12',
    frontTitle: 'Sincerity',
    frontContent: '',
    backTitle: 'Sincerity',
    backContent: 'Be genuine and honest in your communication. Builds trust and authenticity.',
    category: 'emotional',
    color: 'from-violet-500 to-pink-500'
  },
  {
    id: 'emotional-13',
    frontTitle: 'Fearlessness',
    frontContent: '',
    backTitle: 'Fearlessness',
    backContent: 'Show that you are unafraid to take risks and innovate. Highlights your entrepreneurial spirit and willingness to face challenges.',
    category: 'emotional',
    color: 'from-violet-500 to-pink-500'
  },
  {
    id: 'emotional-14',
    frontTitle: 'Compassion',
    frontContent: '',
    backTitle: 'Compassion',
    backContent: 'Show care and concern for the people your solution will help. Emphasizes your commitment to making a positive impact.',
    category: 'emotional',
    color: 'from-violet-500 to-pink-500'
  },
  {
    id: 'emotional-15',
    frontTitle: 'Visionary',
    frontContent: '',
    backTitle: 'Visionary',
    backContent: 'Convey a clear and inspiring vision of the future. Engages the audience and aligns them with your long-term goals.',
    category: 'emotional',
    color: 'from-violet-500 to-pink-500'
  },
  {
    id: 'emotional-16',
    frontTitle: 'Motivation',
    frontContent: '',
    backTitle: 'Motivation',
    backContent: 'Show what drives you and keeps you focused on your goals. Demonstrates your inner drive and persistence.',
    category: 'emotional',
    color: 'from-violet-500 to-pink-500'
  },
  {
    id: 'emotional-17',
    frontTitle: 'Awareness',
    frontContent: '',
    backTitle: 'Awareness',
    backContent: 'Show that you are well-informed about your industry, market trends, competitors, and potential challenges. Demonstrates your thorough understanding and preparation, making you appear knowledgeable and credible.',
    category: 'emotional',
    color: 'from-violet-500 to-pink-500'
  },
  {
    id: 'emotional-18',
    frontTitle: 'Persuade',
    frontContent: '',
    backTitle: 'Persuade',
    backContent: 'Convince the judges of the value and necessity of your solution through logical arguments and compelling evidence. Increases the likelihood that the judges will buy into your idea and support it.',
    category: 'emotional',
    color: 'from-violet-500 to-pink-500'
  },
  {
    id: 'emotional-19',
    frontTitle: 'Fun',
    frontContent: '',
    backTitle: 'Fun',
    backContent: 'Infuse your pitch with a sense of enjoyment and light-heartedness to keep the judges engaged and entertained. Makes your presentation memorable and helps to build a positive connection with the judges.',
    category: 'emotional',
    color: 'from-violet-500 to-pink-500'
  },

  // ── Duration ──────────────────────────────────────────────────────────────
  {
    id: 'duration-1',
    frontTitle: '30 Seconds',
    frontContent: '',
    backTitle: '30 Seconds',
    backContent: 'An elevator pitch — one crisp problem statement and your unique solution. Lead with the hook and end with a clear ask.',
    category: 'duration',
    color: 'from-orange-500 to-yellow-500'
  },
  {
    id: 'duration-2',
    frontTitle: '1 Minute',
    frontContent: '',
    backTitle: '1 Minute',
    backContent: 'Cover the problem, your solution, and who benefits. Keep every sentence essential — no filler.',
    category: 'duration',
    color: 'from-orange-500 to-yellow-500'
  },
  {
    id: 'duration-3',
    frontTitle: '3 Minutes',
    frontContent: '',
    backTitle: '3 Minutes',
    backContent: 'Problem → Solution → Market → Traction → Ask. One slide per section, sharp transitions.',
    category: 'duration',
    color: 'from-orange-500 to-yellow-500'
  },
  {
    id: 'duration-4',
    frontTitle: '5 Minutes',
    frontContent: '',
    backTitle: '5 Minutes',
    backContent: 'Add a brief competitive landscape and business model to the core narrative. Enough time for one compelling story or demo.',
    category: 'duration',
    color: 'from-orange-500 to-yellow-500'
  },
  {
    id: 'duration-5',
    frontTitle: '10 Minutes',
    frontContent: '',
    backTitle: '10 Minutes',
    backContent: 'Full deck: problem, solution, market size, business model, traction, team, financials, and ask. Leave 5 minutes for Q&A.',
    category: 'duration',
    color: 'from-orange-500 to-yellow-500'
  },
  {
    id: 'duration-6',
    frontTitle: '20 Minutes',
    frontContent: '',
    backTitle: '20 Minutes',
    backContent: 'Deep-dive presentation with live demo or prototype. Cover all sections thoroughly and allow extended Q&A.',
    category: 'duration',
    color: 'from-orange-500 to-yellow-500'
  }
];
