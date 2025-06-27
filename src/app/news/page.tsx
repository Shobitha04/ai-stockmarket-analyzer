'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


// Sample data - replace with real API data
const sentimentData = [
  { date: '2024-01-01', nifty: 75, banking: 65, it: 80 },
  { date: '2024-01-02', nifty: 72, banking: 68, it: 82 },
  { date: '2024-01-03', nifty: 78, banking: 70, it: 85 },
  { date: '2024-01-04', nifty: 80, banking: 72, it: 83 },
  { date: '2024-01-05', nifty: 82, banking: 75, it: 80 },
];

const newsItems = [
  {
    title: 'IT stocks surge on strong US tech earnings',
    source: 'Economic Times',
    time: '2 hours ago',
    sentiment: 'positive',
    summary: 'Indian IT stocks rallied following robust earnings from US tech giants. Analysts expect improved deal momentum in coming quarters.',
    category: 'Sector News',
    tickers: ['INFY', 'TCS', 'WIPRO'],
  },
  {
    title: 'RBI maintains status quo on rates',
    source: 'Moneycontrol',
    time: '4 hours ago',
    sentiment: 'neutral',
    summary: 'The Reserve Bank of India kept the repo rate unchanged at 6.5% for the sixth consecutive time, maintaining its stance on withdrawal of accommodation.',
    category: 'Economy',
    tickers: ['BANKING'],
  },
  {
    title: 'Global markets cautious amid Middle East tensions',
    source: 'Dalal Street',
    time: '6 hours ago',
    sentiment: 'negative',
    summary: 'Asian markets traded lower as geopolitical tensions in the Middle East raised concerns about oil prices and global trade.',
    category: 'Global Markets',
    tickers: ['NIFTY50'],
  },
];

const categories = ['All', 'Sector News', 'Economy', 'Global Markets', 'Corporate Actions', 'Technical Analysis'];

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredNews = selectedCategory === 'All' 
    ? newsItems 
    : newsItems.filter(item => item.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Market News & Sentiment</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          AI-powered news analysis and market sentiment tracking
        </p>
      </div>

      {/* Sentiment Chart */}
      <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
        <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Market Sentiment Trends</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sentimentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="nifty" stroke="#8884d8" name="Nifty 50" />
              <Line type="monotone" dataKey="banking" stroke="#82ca9d" name="Banking" />
              <Line type="monotone" dataKey="it" stroke="#ffc658" name="IT" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* News Categories */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* News Feed */}
      <div className="space-y-4">
        {filteredNews.map((news, index) => (
          <div key={index} className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
            <div className="mb-2 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{news.title}</h3>
                <div className="mt-1 flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
                  <span>{news.source}</span>
                  <span>•</span>
                  <span>{news.time}</span>
                  <span>•</span>
                  <span className="font-medium">{news.category}</span>
                </div>
              </div>
              <div className={`rounded-full px-3 py-1 text-sm font-medium ${
                news.sentiment === 'positive' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300' :
                news.sentiment === 'negative' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300' :
                'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300'
              }`}>
                {news.sentiment.charAt(0).toUpperCase() + news.sentiment.slice(1)}
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{news.summary}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {news.tickers.map((ticker) => (
                <span
                  key={ticker}
                  className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                >
                  {ticker}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* AI Summary */}
      <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
        <h3 className="mb-2 text-lg font-medium text-blue-900 dark:text-blue-100">AI Market Summary</h3>
        <p className="text-sm text-blue-800 dark:text-blue-200">
          Market sentiment is showing improvement in the IT sector due to strong US tech earnings and positive deal momentum. 
          Banking sector sentiment remains neutral following the RBI&apos;s policy decision. 
          Watch for potential impact on markets from global geopolitical developments.
        </p>
      </div>
    </div>
  );
} 