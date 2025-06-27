'use client';

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, DollarSign, Users, Building, TrendingUp, AlertCircle } from 'lucide-react';

// Sample data - replace with real API data
const upcomingIPOs = [
  {
    name: 'Jio Financial Services Ltd.',
    sector: 'Financial Services',
    issueSize: '7,500',
    priceRange: '100-120',
    openDate: '2024-02-15',
    closeDate: '2024-02-18',
    lotSize: 100,
    subscriptionRate: 0,
    status: 'Upcoming',
  },
  {
    name: 'Ola Electric Mobility',
    sector: 'Electric Vehicles',
    issueSize: '5,500',
    priceRange: '130-140',
    openDate: '2024-02-20',
    closeDate: '2024-02-23',
    lotSize: 50,
    subscriptionRate: 0,
    status: 'Upcoming',
  },
];

const subscriptionData = [
  { name: 'QIB', value: 15.2 },
  { name: 'NII', value: 8.5 },
  { name: 'Retail', value: 4.2 },
];

const ipoAnalysis = {
  strengths: [
    'Market leader in digital payments segment',
    'Strong brand recognition and user base',
    'Robust technology infrastructure',
    'Experienced management team',
  ],
  risks: [
    'Intense competition in fintech space',
    'Regulatory uncertainties',
    'High customer acquisition costs',
    'Dependence on third-party partnerships',
  ],
  financials: [
    { metric: 'Revenue Growth (3Y CAGR)', value: '45%' },
    { metric: 'EBITDA Margin', value: '22%' },
    { metric: 'Net Profit Margin', value: '15%' },
    { metric: 'Debt to Equity', value: '0.8x' },
  ],
};

export default function IPO() {
  const [selectedIPO, setSelectedIPO] = useState(upcomingIPOs[0]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">IPO Analysis</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          AI-powered analysis of upcoming and recent IPOs
        </p>
      </div>

      {/* Upcoming IPOs */}
      <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
        <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Upcoming IPOs</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Company</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Sector</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Issue Size (Cr)</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Price Range</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Open Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {upcomingIPOs.map((ipo) => (
                <tr key={ipo.name}>
                  <td className="whitespace-nowrap px-4 py-3">
                    <div className="font-medium text-gray-900 dark:text-white">{ipo.name}</div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-gray-600 dark:text-gray-400">{ipo.sector}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-gray-600 dark:text-gray-400">₹{ipo.issueSize}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-gray-600 dark:text-gray-400">₹{ipo.priceRange}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-gray-600 dark:text-gray-400">{ipo.openDate}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <button
                      onClick={() => setSelectedIPO(ipo)}
                      className="rounded-md bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      Analyze
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* IPO Analysis */}
      {selectedIPO && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Company Overview */}
          <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Company Overview</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Building className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Sector: {selectedIPO.sector}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Issue Size: ₹{selectedIPO.issueSize} Cr</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Lot Size: {selectedIPO.lotSize} shares</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Open: {selectedIPO.openDate}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Close: {selectedIPO.closeDate}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Price: ₹{selectedIPO.priceRange}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Subscription Status */}
          <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Subscription Status</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subscriptionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Subscription (x times)" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* SWOT Analysis */}
          <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Key Strengths</h2>
            <div className="space-y-2">
              {ipoAnalysis.strengths.map((strength, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <TrendingUp className="mt-1 h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{strength}</span>
                </div>
              ))}
            </div>
            <h2 className="mb-4 mt-6 text-lg font-medium text-gray-900 dark:text-white">Key Risks</h2>
            <div className="space-y-2">
              {ipoAnalysis.risks.map((risk, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <AlertCircle className="mt-1 h-4 w-4 text-red-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{risk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Metrics */}
          <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Financial Metrics</h2>
            <div className="space-y-4">
              {ipoAnalysis.financials.map((metric, index) => (
                <div key={index} className="flex items-center justify-between border-b border-gray-200 pb-2 dark:border-gray-700">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{metric.metric}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{metric.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* AI Recommendation */}
      <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
        <h3 className="mb-2 text-lg font-medium text-blue-900 dark:text-blue-100">AI Recommendation</h3>
        <p className="text-sm text-blue-800 dark:text-blue-200">
          Based on our analysis of {selectedIPO?.name}, we recommend considering this IPO for the following reasons:
          Strong market position in the growing {selectedIPO?.sector} sector, robust financials with consistent growth,
          and reasonable valuations compared to peers. However, investors should note the competitive landscape and regulatory risks.
          Consider applying for long-term investment if your risk appetite aligns with the company&apos;s profile.
        </p>
      </div>
    </div>
  );
} 