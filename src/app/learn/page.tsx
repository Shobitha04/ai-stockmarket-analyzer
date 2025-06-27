'use client';

import { useState, useEffect } from 'react';
import { 
  Book, CheckCircle, ChevronDown, ChevronRight, HelpCircle, Lightbulb, 
  Search, BookOpen, Calculator, TrendingUp, Target,
  Award, Clock, Users, Globe, Shield, AlertTriangle, BarChart3,
  PieChart, Zap, Brain, Library, Video, FileText,
  Play, Star, Filter
} from 'lucide-react';

// A-Z Stock Market Dictionary
const stockMarketDictionary = [
  { term: 'Ask Price', definition: 'The lowest price a seller is willing to accept for a stock', category: 'Trading' },
  { term: 'Bear Market', definition: 'A market condition where prices fall 20% or more from recent highs', category: 'Market Conditions' },
  { term: 'Circuit Breaker', definition: 'Trading halt mechanism to prevent extreme volatility', category: 'Regulations' },
  { term: 'Dividend', definition: 'Payment made by companies to shareholders from profits', category: 'Corporate Actions' },
  { term: 'Earnings Per Share (EPS)', definition: 'Company profit divided by number of outstanding shares', category: 'Financial Metrics' },
  { term: 'Float', definition: 'Number of shares available for public trading', category: 'Share Structure' },
  { term: 'Going Public', definition: 'Process of a private company offering shares to the public (IPO)', category: 'Corporate Actions' },
  { term: 'High Frequency Trading', definition: 'Algorithmic trading with extremely fast execution speeds', category: 'Trading' },
  { term: 'Initial Public Offering (IPO)', definition: 'First sale of stock by a private company to the public', category: 'Corporate Actions' },
  { term: 'Junk Bond', definition: 'High-yield, high-risk corporate bonds with low credit ratings', category: 'Fixed Income' },
  { term: 'Know Your Customer (KYC)', definition: 'Identity verification process required for trading accounts', category: 'Regulations' },
  { term: 'Liquidity', definition: 'How easily an asset can be bought or sold without affecting price', category: 'Market Structure' },
  { term: 'Market Capitalization', definition: 'Total value of company shares (Price × Shares Outstanding)', category: 'Valuation' },
  { term: 'NIFTY 50', definition: 'Stock market index of top 50 companies on NSE', category: 'Indices' },
  { term: 'Options', definition: 'Derivative contracts giving right to buy/sell at specific price', category: 'Derivatives' },
  { term: 'Price-to-Earnings Ratio', definition: 'Stock price divided by earnings per share', category: 'Financial Metrics' },
  { term: 'Quarterly Results', definition: 'Financial performance reports issued every three months', category: 'Financial Reports' },
  { term: 'Return on Equity (ROE)', definition: 'Measure of company profitability relative to shareholders equity', category: 'Financial Metrics' },
  { term: 'Stock Split', definition: 'Division of existing shares into multiple shares', category: 'Corporate Actions' },
  { term: 'Trading Volume', definition: 'Number of shares traded during a specific period', category: 'Market Data' },
  { term: 'Underwriter', definition: 'Financial institution that helps companies issue securities', category: 'Investment Banking' },
  { term: 'Volatility', definition: 'Measure of price fluctuation in a stock or market', category: 'Risk Metrics' },
  { term: 'Working Capital', definition: 'Difference between current assets and current liabilities', category: 'Financial Metrics' },
  { term: 'Ex-Dividend Date', definition: 'Date after which new buyers won\'t receive upcoming dividend', category: 'Corporate Actions' },
  { term: 'Yield', definition: 'Annual dividend payment as percentage of stock price', category: 'Financial Metrics' },
  { term: 'Zero-Coupon Bond', definition: 'Bond sold at discount with no periodic interest payments', category: 'Fixed Income' },
];

// Market Calculators Data
const calculators = [
  {
    name: 'SIP Calculator',
    description: 'Calculate returns from Systematic Investment Plan',
    icon: Calculator,
    type: 'investment'
  },
  {
    name: 'Compound Interest Calculator',
    description: 'Calculate compound returns over time',
    icon: TrendingUp,
    type: 'returns'
  },
  {
    name: 'Risk Assessment Tool',
    description: 'Evaluate your risk tolerance',
    icon: Shield,
    type: 'risk'
  },
  {
    name: 'Portfolio Diversification',
    description: 'Analyze portfolio allocation',
    icon: PieChart,
    type: 'portfolio'
  }
];

// Learning Paths
const learningPaths = [
  {
    title: 'Beginner\'s Journey',
    description: 'Start your stock market journey from basics',
    duration: '4 weeks',
    difficulty: 'Beginner',
    modules: 8,
    icon: BookOpen,
    color: 'green'
  },
  {
    title: 'Technical Analysis Mastery',
    description: 'Master chart patterns and indicators',
    duration: '6 weeks',
    difficulty: 'Intermediate',
    modules: 12,
    icon: BarChart3,
    color: 'blue'
  },
  {
    title: 'Fundamental Analysis Pro',
    description: 'Deep dive into company valuation',
    duration: '8 weeks',
    difficulty: 'Advanced',
    modules: 15,
    icon: Library,
    color: 'purple'
  },
  {
    title: 'Options & Derivatives',
    description: 'Advanced trading strategies',
    duration: '10 weeks',
    difficulty: 'Expert',
    modules: 18,
    icon: Zap,
    color: 'orange'
  }
];

// Video Courses
const videoCourses = [
  {
    title: 'Stock Market Basics for Indians',
    instructor: 'CA Rachana Ranade',
    duration: '2h 30m',
    rating: 4.8,
    students: '50K+',
    thumbnail: '/api/placeholder/300/200',
    level: 'Beginner'
  },
  {
    title: 'Technical Analysis Complete Course',
    instructor: 'Pranjal Kamra',
    duration: '4h 15m',
    rating: 4.9,
    students: '35K+',
    thumbnail: '/api/placeholder/300/200',
    level: 'Intermediate'
  },
  {
    title: 'Options Trading Strategies',
    instructor: 'Zerodha Varsity',
    duration: '3h 45m',
    rating: 4.7,
    students: '25K+',
    thumbnail: '/api/placeholder/300/200',
    level: 'Advanced'
  }
];

// Solar System Data - Stocks as Planets orbiting Sector Suns
const solarSystemData = [
  {
    sector: 'Banking & Finance',
    color: '#3B82F6', // Blue
    size: 60,
    position: { x: 200, y: 200 },
    stocks: [
      { name: 'HDFC Bank', symbol: 'HDFCBANK', size: 25, distance: 80, angle: 0, price: '₹1,645', change: '+2.3%', marketCap: '₹8.9L Cr' },
      { name: 'ICICI Bank', symbol: 'ICICIBANK', size: 22, distance: 100, angle: 60, price: '₹1,158', change: '+1.8%', marketCap: '₹8.1L Cr' },
      { name: 'SBI', symbol: 'SBIN', size: 20, distance: 120, angle: 120, price: '₹825', change: '+0.9%', marketCap: '₹7.4L Cr' },
      { name: 'Axis Bank', symbol: 'AXISBANK', size: 18, distance: 140, angle: 180, price: '₹1,089', change: '-0.5%', marketCap: '₹3.3L Cr' },
      { name: 'Kotak Bank', symbol: 'KOTAKBANK', size: 16, distance: 160, angle: 240, price: '₹1,756', change: '+1.2%', marketCap: '₹3.5L Cr' },
    ]
  },
  {
    sector: 'Information Technology',
    color: '#10B981', // Green
    size: 55,
    position: { x: 600, y: 200 },
    stocks: [
      { name: 'TCS', symbol: 'TCS', size: 24, distance: 75, angle: 30, price: '₹4,156', change: '+3.2%', marketCap: '₹15.1L Cr' },
      { name: 'Infosys', symbol: 'INFY', size: 22, distance: 95, angle: 90, price: '₹1,798', change: '+2.8%', marketCap: '₹7.4L Cr' },
      { name: 'Wipro', symbol: 'WIPRO', size: 18, distance: 115, angle: 150, price: '₹298', change: '+1.5%', marketCap: '₹1.6L Cr' },
      { name: 'HCL Tech', symbol: 'HCLTECH', size: 16, distance: 135, angle: 210, price: '₹1,845', change: '+0.8%', marketCap: '₹5.0L Cr' },
      { name: 'Tech Mahindra', symbol: 'TECHM', size: 15, distance: 155, angle: 270, price: '₹1,678', change: '-0.3%', marketCap: '₹1.6L Cr' },
    ]
  },
  {
    sector: 'Consumer Goods',
    color: '#F59E0B', // Orange
    size: 50,
    position: { x: 200, y: 500 },
    stocks: [
      { name: 'Hindustan Unilever', symbol: 'HINDUNILVR', size: 20, distance: 70, angle: 45, price: '₹2,456', change: '+1.1%', marketCap: '₹5.8L Cr' },
      { name: 'ITC', symbol: 'ITC', size: 19, distance: 90, angle: 105, price: '₹465', change: '+0.7%', marketCap: '₹5.8L Cr' },
      { name: 'Nestle India', symbol: 'NESTLEIND', size: 17, distance: 110, angle: 165, price: '₹2,198', change: '+2.1%', marketCap: '₹2.1L Cr' },
      { name: 'Britannia', symbol: 'BRITANNIA', size: 16, distance: 130, angle: 225, price: '₹4,789', change: '+0.9%', marketCap: '₹1.2L Cr' },
      { name: 'Dabur India', symbol: 'DABUR', size: 14, distance: 150, angle: 285, price: '₹507', change: '-0.2%', marketCap: '₹90K Cr' },
    ]
  },
  {
    sector: 'Energy & Oil',
    color: '#EF4444', // Red
    size: 48,
    position: { x: 600, y: 500 },
    stocks: [
      { name: 'Reliance', symbol: 'RELIANCE', size: 26, distance: 85, angle: 15, price: '₹2,934', change: '+1.9%', marketCap: '₹19.8L Cr' },
      { name: 'ONGC', symbol: 'ONGC', size: 18, distance: 105, angle: 75, price: '₹298', change: '+2.5%', marketCap: '₹3.8L Cr' },
      { name: 'IOC', symbol: 'IOC', size: 16, distance: 125, angle: 135, price: '₹139', change: '+1.3%', marketCap: '₹1.9L Cr' },
      { name: 'BPCL', symbol: 'BPCL', size: 15, distance: 145, angle: 195, price: '₹289', change: '+0.6%', marketCap: '₹1.3L Cr' },
      { name: 'HPCL', symbol: 'HPCL', size: 14, distance: 165, angle: 255, price: '₹368', change: '-0.8%', marketCap: '₹78K Cr' },
    ]
  },
  {
    sector: 'Pharmaceuticals',
    color: '#8B5CF6', // Purple
    size: 45,
    position: { x: 400, y: 350 },
    stocks: [
      { name: 'Sun Pharma', symbol: 'SUNPHARMA', size: 19, distance: 65, angle: 0, price: '₹1,789', change: '+2.7%', marketCap: '₹4.3L Cr' },
      { name: 'Dr Reddys', symbol: 'DRREDDY', size: 17, distance: 85, angle: 72, price: '₹1,234', change: '+1.4%', marketCap: '₹2.1L Cr' },
      { name: 'Cipla', symbol: 'CIPLA', size: 16, distance: 105, angle: 144, price: '₹1,567', change: '+0.9%', marketCap: '₹1.3L Cr' },
      { name: 'Lupin', symbol: 'LUPIN', size: 15, distance: 125, angle: 216, price: '₹2,089', change: '-0.4%', marketCap: '₹96K Cr' },
      { name: 'Aurobindo', symbol: 'AUROPHARMA', size: 14, distance: 145, angle: 288, price: '₹1,345', change: '+1.8%', marketCap: '₹79K Cr' },
    ]
  }
];

const chapters = [
  {
    title: 'Stock Market Fundamentals',
    icon: BookOpen,
    lessons: [
      {
        title: 'What is Stock Market?',
        duration: '15 min',
        content: `The stock market is a platform where shares of publicly listed companies are bought and sold. In India, we have two major exchanges:

🏢 **National Stock Exchange (NSE)**
• Established: 1992
• Index: NIFTY 50
• Electronic trading platform
• Largest derivatives exchange

🏢 **Bombay Stock Exchange (BSE)**
• Established: 1875 (Asia's oldest)
• Index: SENSEX
• Over 5,000 listed companies
• Benchmark for Indian markets

**How Stock Markets Work:**
1. Companies list their shares
2. Investors buy/sell through brokers
3. Prices determined by supply & demand
4. Regulated by SEBI (Securities and Exchange Board of India)

**Key Participants:**
• Retail Investors (Individual investors)
• Institutional Investors (Mutual funds, Insurance companies)
• Foreign Institutional Investors (FIIs)
• High Net Worth Individuals (HNIs)
• Market Makers & Arbitrageurs`,
        quiz: [
          {
            question: 'Which is the benchmark index of BSE?',
            options: ['NIFTY 50', 'SENSEX', 'NIFTY Bank', 'BSE 500'],
            correctAnswer: 1,
          },
        ],
      },
      {
        title: 'Types of Stocks & Securities',
        duration: '20 min',
        content: `**Equity Shares (Common Stock):**
• Voting rights in company decisions
• Dividend eligibility (not guaranteed)
• Capital appreciation potential
• Residual claim on assets

**Preference Shares:**
• Fixed dividend rate
• Priority over equity in dividends
• Limited/No voting rights
• Lower risk than equity

**Bonds & Debentures:**
• Fixed income securities
• Regular interest payments
• Principal repayment at maturity
• Lower risk than stocks

**Mutual Funds:**
• Pooled investment vehicle
• Professional management
• Diversification benefits
• Different types: Equity, Debt, Hybrid

**Exchange Traded Funds (ETFs):**
• Trade like stocks
• Track indices or commodities
• Lower expense ratios
• Real-time pricing

**Derivatives:**
• Futures & Options
• Derive value from underlying assets
• Used for hedging or speculation
• Higher risk and complexity`,
        quiz: [
          {
            question: 'Which type of shares typically have voting rights?',
            options: ['Preference Shares', 'Equity Shares', 'Bonds', 'Debentures'],
            correctAnswer: 1,
          },
        ],
      }
    ],
  },
  {
    title: 'Investment Strategies',
    icon: Target,
    lessons: [
      {
        title: 'Value Investing',
        duration: '25 min',
        content: `**Value Investing Philosophy:**
"Buy a dollar for 50 cents" - Warren Buffett

**Key Principles:**
• Buy undervalued companies
• Focus on intrinsic value vs market price
• Long-term investment horizon
• Margin of safety concept

**Value Metrics to Consider:**
📊 **Price-to-Earnings (P/E) Ratio**
• P/E = Market Price / Earnings Per Share
• Lower P/E might indicate undervaluation
• Compare with industry average

📊 **Price-to-Book (P/B) Ratio**
• P/B = Market Price / Book Value per Share
• P/B < 1 might indicate undervaluation
• Useful for asset-heavy companies

📊 **Debt-to-Equity Ratio**
• D/E = Total Debt / Total Equity
• Lower ratios generally better
• Indicates financial stability

**Famous Value Investors:**
• Warren Buffett (Berkshire Hathaway)
• Benjamin Graham (Father of Value Investing)
• Charlie Munger (Buffett's partner)
• In India: Rakesh Jhunjhunwala, Radhakishan Damani

**Value Investing Process:**
1. Screen for undervalued stocks
2. Analyze financial statements
3. Calculate intrinsic value
4. Buy with margin of safety
5. Hold for long term`,
        quiz: [
          {
            question: 'What does a P/E ratio compare?',
            options: ['Price to Earnings', 'Profit to Equity', 'Price to Equity', 'Profit to Expenses'],
            correctAnswer: 0,
          },
        ],
      }
    ],
  },
  {
    title: 'Technical Analysis',
    icon: BarChart3,
    lessons: [
      {
        title: 'Chart Patterns & Indicators',
        duration: '30 min',
        content: `**Technical Analysis Basics:**
Study of price movements and trading volume to predict future price direction.

**Key Assumptions:**
• Price discounts everything
• Prices move in trends
• History repeats itself

**Popular Chart Patterns:**

📈 **Bullish Patterns:**
• Head & Shoulders (Reversal)
• Double Bottom
• Ascending Triangle
• Bull Flag

📉 **Bearish Patterns:**
• Head & Shoulders Top
• Double Top
• Descending Triangle
• Bear Flag

**Essential Technical Indicators:**

🔹 **Moving Averages (MA)**
• Simple MA: Average price over period
• Exponential MA: More weight to recent prices
• Golden Cross: 50-day MA crosses above 200-day MA
• Death Cross: 50-day MA crosses below 200-day MA

🔹 **Relative Strength Index (RSI)**
• Momentum oscillator (0-100)
• RSI > 70: Overbought
• RSI < 30: Oversold
• Divergence signals potential reversal

🔹 **MACD (Moving Average Convergence Divergence)**
• Trend-following momentum indicator
• Signal line crossovers
• Histogram shows momentum changes
• Bullish/Bearish divergences

🔹 **Bollinger Bands**
• Price channels around moving average
• Upper/Lower bands show volatility
• Price touching bands indicates potential reversal
• Squeeze patterns show breakout potential`,
        quiz: [
          {
            question: 'What does RSI above 70 typically indicate?',
            options: ['Oversold', 'Overbought', 'Neutral', 'Strong trend'],
            correctAnswer: 1,
          },
        ],
      }
    ],
  }
];

export default function Learn() {
  const [activeTab, setActiveTab] = useState('courses');
  const [expandedChapter, setExpandedChapter] = useState<number | null>(0);
  const [selectedLesson, setSelectedLesson] = useState<{chapter: number; lesson: number} | null>({chapter: 0, lesson: 0});
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStock, setSelectedStock] = useState<any>(null);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [animationTime, setAnimationTime] = useState(0);

  // Animation loop for solar system
  useEffect(() => {
    if (activeTab === 'solar-system' && animationSpeed > 0) {
      const interval = setInterval(() => {
        setAnimationTime(prev => prev + animationSpeed);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [activeTab, animationSpeed]);

  const handleLessonClick = (chapterIndex: number, lessonIndex: number) => {
    setSelectedLesson({chapter: chapterIndex, lesson: lessonIndex});
    setShowQuiz(false);
    setSelectedAnswer(null);
    setShowAnswer(false);
  };

  const handleQuizSubmit = () => {
    setShowAnswer(true);
  };

  // Filter dictionary based on search and category
  const filteredDictionary = stockMarketDictionary.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...Array.from(new Set(stockMarketDictionary.map(item => item.category)))];

  const tabs = [
    { id: 'courses', name: 'Courses', icon: BookOpen },
    { id: 'paths', name: 'Learning Paths', icon: Target },
    { id: 'dictionary', name: 'A-Z Dictionary', icon: Book },
    { id: 'calculators', name: 'Calculators', icon: Calculator },
    { id: 'videos', name: 'Video Courses', icon: Video },
    { id: 'solar-system', name: 'Stock Universe', icon: Globe },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'courses':
        return (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Chapters Sidebar */}
            <div className="lg:col-span-1">
              <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Course Chapters</h2>
                <div className="space-y-2">
                  {chapters.map((chapter, chapterIndex) => (
                    <div key={chapterIndex}>
                      <button
                        onClick={() => setExpandedChapter(expandedChapter === chapterIndex ? null : chapterIndex)}
                        className="flex w-full items-center justify-between rounded-md p-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <div className="flex items-center">
                          <chapter.icon className="mr-2 h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{chapter.title}</span>
                        </div>
                        {expandedChapter === chapterIndex ? (
                          <ChevronDown className="h-4 w-4 text-gray-500" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-gray-500" />
                        )}
                      </button>
                      {expandedChapter === chapterIndex && (
                        <div className="ml-6 mt-2 space-y-1">
                          {chapter.lessons.map((lesson, lessonIndex) => (
                            <button
                              key={lessonIndex}
                              onClick={() => handleLessonClick(chapterIndex, lessonIndex)}
                              className={`flex w-full items-center justify-between rounded-md p-2 text-left text-sm ${
                                selectedLesson?.chapter === chapterIndex && selectedLesson?.lesson === lessonIndex
                                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-200'
                                  : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700'
                              }`}
                            >
                              <span>{lesson.title}</span>
                              <span className="text-xs text-gray-400">{lesson.duration}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Lesson Content */}
            <div className="lg:col-span-2">
              {selectedLesson !== null && (
                <div className="space-y-6">
                  <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                        {chapters[selectedLesson.chapter].lessons[selectedLesson.lesson].title}
                      </h2>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{chapters[selectedLesson.chapter].lessons[selectedLesson.lesson].duration}</span>
                      </div>
                    </div>
                    <div className="prose max-w-none dark:prose-invert">
                      <div className="whitespace-pre-wrap text-gray-600 dark:text-gray-400">
                        {chapters[selectedLesson.chapter].lessons[selectedLesson.lesson].content}
                      </div>
                    </div>
                  </div>

                  {!showQuiz ? (
                    <button
                      onClick={() => setShowQuiz(true)}
                      className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Take Quiz
                    </button>
                  ) : (
                    <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                      <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Quiz</h3>
                      <div className="space-y-4">
                        {chapters[selectedLesson.chapter].lessons[selectedLesson.lesson].quiz.map((quizItem, index) => (
                          <div key={index} className="space-y-3">
                            <p className="text-gray-900 dark:text-white">{quizItem.question}</p>
                            <div className="space-y-2">
                              {quizItem.options.map((option, optionIndex) => (
                                <button
                                  key={optionIndex}
                                  onClick={() => setSelectedAnswer(optionIndex)}
                                  className={`block w-full rounded-md border p-3 text-left ${
                                    selectedAnswer === optionIndex
                                      ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20'
                                      : 'border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700'
                                  }`}
                                >
                                  <span className="text-sm text-gray-700 dark:text-gray-300">{option}</span>
                                </button>
                              ))}
                            </div>
                            {selectedAnswer !== null && !showAnswer && (
                              <button
                                onClick={handleQuizSubmit}
                                className="mt-4 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                              >
                                Submit Answer
                              </button>
                            )}
                            {showAnswer && (
                              <div className={`mt-4 rounded-md p-4 ${
                                selectedAnswer === quizItem.correctAnswer
                                  ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-200'
                                  : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-200'
                              }`}>
                                {selectedAnswer === quizItem.correctAnswer ? (
                                  <div className="flex items-center">
                                    <CheckCircle className="mr-2 h-5 w-5" />
                                    <span>Correct! Well done!</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center">
                                    <Lightbulb className="mr-2 h-5 w-5" />
                                    <span>
                                      The correct answer is: {quizItem.options[quizItem.correctAnswer]}
                                    </span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );

      case 'paths':
        return (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {learningPaths.map((path, index) => (
              <div key={index} className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`rounded-lg p-2 ${
                      path.color === 'green' ? 'bg-green-100 text-green-600' :
                      path.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                      path.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                      'bg-orange-100 text-orange-600'
                    }`}>
                      <path.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{path.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{path.description}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>{path.duration}</span>
                  <span>{path.modules} modules</span>
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                    path.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                    path.difficulty === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
                    path.difficulty === 'Advanced' ? 'bg-purple-100 text-purple-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {path.difficulty}
                  </span>
                </div>
                <button className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  Start Learning Path
                </button>
              </div>
            ))}
          </div>
        );

      case 'dictionary':
        return (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search terms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 dark:border-gray-600 dark:bg-gray-700"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Dictionary Grid */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredDictionary.map((item, index) => (
                <div key={index} className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{item.term}</h3>
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                      {item.category}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{item.definition}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'calculators':
        return (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {calculators.map((calc, index) => (
              <div key={index} className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                <div className="flex items-center space-x-3">
                  <div className="rounded-lg bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/20 dark:text-blue-300">
                    <calc.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{calc.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{calc.description}</p>
                  </div>
                </div>
                <button className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  Open Calculator
                </button>
              </div>
            ))}
          </div>
        );

      case 'videos':
        return (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {videoCourses.map((course, index) => (
              <div key={index} className="rounded-lg bg-white shadow dark:bg-gray-800 overflow-hidden">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <Play className="h-12 w-12 text-gray-400" />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white">{course.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">by {course.instructor}</p>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-gray-500">{course.duration}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500">{course.students} students</span>
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                      course.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                      course.level === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {course.level}
                    </span>
                  </div>
                  <button className="mt-3 w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                    Watch Course
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      case 'solar-system':
        return (
          <div className="space-y-6">
            {/* Solar System Header */}
            <div className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">Stock Universe Explorer</h2>
              <p className="text-blue-100">
                Visualize the stock market as a solar system where sectors are suns and stocks are planets orbiting around them.
                Each planet's size represents market capitalization, and distance from the sun indicates sector weight.
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-white p-4 shadow dark:bg-gray-800">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Animation Speed:
                </label>
                <input
                  type="range"
                  min="0"
                  max="3"
                  step="0.5"
                  value={animationSpeed}
                  onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                  className="w-24"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">{animationSpeed}x</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedStock(null)}
                  className="rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  Reset View
                </button>
              </div>
            </div>

            {/* Solar System Visualization */}
            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
              <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900" style={{ height: '600px' }}>
                <svg width="100%" height="100%" viewBox="0 0 800 600" className="absolute inset-0">
                  {/* Background stars */}
                  {Array.from({ length: 50 }).map((_, i) => (
                    <circle
                      key={`star-${i}`}
                      cx={Math.random() * 800}
                      cy={Math.random() * 600}
                      r={Math.random() * 1.5 + 0.5}
                      fill="white"
                      opacity={Math.random() * 0.8 + 0.2}
                    />
                  ))}

                  {/* Render each sector solar system */}
                  {solarSystemData.map((sector, sectorIndex) => (
                    <g key={sectorIndex}>
                      {/* Orbital paths */}
                      {sector.stocks.map((stock, stockIndex) => (
                        <circle
                          key={`orbit-${sectorIndex}-${stockIndex}`}
                          cx={sector.position.x}
                          cy={sector.position.y}
                          r={stock.distance}
                          fill="none"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="1"
                          strokeDasharray="2,2"
                        />
                      ))}

                      {/* Sector Sun */}
                      <g>
                        <circle
                          cx={sector.position.x}
                          cy={sector.position.y}
                          r={sector.size}
                          fill={sector.color}
                          opacity="0.8"
                          className="cursor-pointer"
                        />
                        <circle
                          cx={sector.position.x}
                          cy={sector.position.y}
                          r={sector.size - 10}
                          fill={sector.color}
                          opacity="0.4"
                        />
                        <text
                          x={sector.position.x}
                          y={sector.position.y + 5}
                          textAnchor="middle"
                          className="fill-white text-xs font-bold"
                        >
                          {sector.sector.split(' ')[0]}
                        </text>
                      </g>

                      {/* Stock Planets */}
                      {sector.stocks.map((stock, stockIndex) => {
                        const currentAngle = stock.angle + (animationTime * (stockIndex + 1) * 0.5) % 360;
                        const radian = (currentAngle * Math.PI) / 180;
                        const x = sector.position.x + Math.cos(radian) * stock.distance;
                        const y = sector.position.y + Math.sin(radian) * stock.distance;
                        
                        return (
                          <g key={`stock-${sectorIndex}-${stockIndex}`}>
                            <circle
                              cx={x}
                              cy={y}
                              r={stock.size}
                              fill={stock.change.startsWith('+') ? '#10B981' : stock.change.startsWith('-') ? '#EF4444' : '#6B7280'}
                              opacity="0.9"
                              className="cursor-pointer hover:opacity-100"
                              onClick={() => setSelectedStock(stock)}
                            />
                            <circle
                              cx={x}
                              cy={y}
                              r={stock.size - 3}
                              fill="white"
                              opacity="0.3"
                            />
                            <text
                              x={x}
                              y={y + 2}
                              textAnchor="middle"
                              className="fill-white text-xs font-medium pointer-events-none"
                            >
                              {stock.symbol.slice(0, 4)}
                            </text>
                          </g>
                        );
                      })}
                    </g>
                  ))}
                </svg>
              </div>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Legend</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    <span className="text-gray-600 dark:text-gray-400">Sector Sun</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-gray-600 dark:text-gray-400">Positive Stock</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-gray-600 dark:text-gray-400">Negative Stock</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1 h-1 rounded-full bg-white"></div>
                    <span className="text-gray-600 dark:text-gray-400">Orbital Path</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Understanding the Universe</h3>
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <p>• Planet size = Market Cap</p>
                  <p>• Distance from sun = Sector weight</p>
                  <p>• Color = Price performance</p>
                  <p>• Orbit speed = Volatility</p>
                </div>
              </div>

              <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Sectors</h3>
                <div className="space-y-1 text-sm">
                  {solarSystemData.map((sector, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: sector.color }}></div>
                      <span className="text-gray-600 dark:text-gray-400">{sector.sector}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected Stock Details */}
            {selectedStock && (
              <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedStock.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Symbol: {selectedStock.symbol}</p>
                  </div>
                  <button
                    onClick={() => setSelectedStock(null)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    ×
                  </button>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Current Price</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{selectedStock.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Change</p>
                    <p className={`text-lg font-semibold ${
                      selectedStock.change.startsWith('+') ? 'text-green-600' : 
                      selectedStock.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {selectedStock.change}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Market Cap</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{selectedStock.marketCap}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Stock Market Learning Hub</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Comprehensive A-Z stock market education with courses, tools, and resources
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Courses</span>
          </div>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">50+</p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <div className="flex items-center space-x-2">
            <Book className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Dictionary</span>
          </div>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{stockMarketDictionary.length}</p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <div className="flex items-center space-x-2">
            <Calculator className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Calculators</span>
          </div>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{calculators.length}</p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <div className="flex items-center space-x-2">
            <Video className="h-5 w-5 text-orange-600" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Videos</span>
          </div>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{videoCourses.length}</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 whitespace-nowrap border-b-2 py-2 px-1 text-sm font-medium ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
} 