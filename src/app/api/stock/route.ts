import { NextResponse } from 'next/server';

interface StockQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  marketCap: string;
  lastUpdated: string;
}

interface StockOverview {
  name: string;
  sector: string;
  industry: string;
  marketCap: string;
  peRatio: string;
  dividendYield: string;
  eps: string;
  beta: string;
  weekHigh52: number;
  weekLow52: number;
  description: string;
}

// Comprehensive Indian stock database
const INDIAN_STOCKS = [
  // Banking & Financial Services
  { symbol: 'HDFCBANK', name: 'HDFC Bank Limited', sector: 'Banking', basePrice: 1645, marketCap: 890000 },
  { symbol: 'ICICIBANK', name: 'ICICI Bank Limited', sector: 'Banking', basePrice: 1158, marketCap: 810000 },
  { symbol: 'SBIN', name: 'State Bank of India', sector: 'Banking', basePrice: 825, marketCap: 740000 },
  { symbol: 'AXISBANK', name: 'Axis Bank Limited', sector: 'Banking', basePrice: 1089, marketCap: 330000 },
  { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank Limited', sector: 'Banking', basePrice: 1756, marketCap: 350000 },
  { symbol: 'INDUSINDBK', name: 'IndusInd Bank Limited', sector: 'Banking', basePrice: 975, marketCap: 76000 },
  { symbol: 'BANDHANBNK', name: 'Bandhan Bank Limited', sector: 'Banking', basePrice: 189, marketCap: 30500 },
  { symbol: 'FEDERALBNK', name: 'Federal Bank Limited', sector: 'Banking', basePrice: 143, marketCap: 28600 },
  { symbol: 'PNB', name: 'Punjab National Bank', sector: 'Banking', basePrice: 96, marketCap: 102000 },
  { symbol: 'BANKBARODA', name: 'Bank of Baroda', sector: 'Banking', basePrice: 189, marketCap: 98000 },

  // Information Technology
  { symbol: 'TCS', name: 'Tata Consultancy Services Limited', sector: 'IT', basePrice: 4156, marketCap: 1510000 },
  { symbol: 'INFY', name: 'Infosys Limited', sector: 'IT', basePrice: 1798, marketCap: 740000 },
  { symbol: 'WIPRO', name: 'Wipro Limited', sector: 'IT', basePrice: 298, marketCap: 160000 },
  { symbol: 'HCLTECH', name: 'HCL Technologies Limited', sector: 'IT', basePrice: 1845, marketCap: 500000 },
  { symbol: 'TECHM', name: 'Tech Mahindra Limited', sector: 'IT', basePrice: 1678, marketCap: 160000 },
  { symbol: 'LTI', name: 'Larsen & Toubro Infotech Limited', sector: 'IT', basePrice: 4567, marketCap: 97000 },
  { symbol: 'MPHASIS', name: 'Mphasis Limited', sector: 'IT', basePrice: 2890, marketCap: 55000 },
  { symbol: 'MINDTREE', name: 'Mindtree Limited', sector: 'IT', basePrice: 4234, marketCap: 69000 },
  { symbol: 'COFORGE', name: 'Coforge Limited', sector: 'IT', basePrice: 5678, marketCap: 34000 },

  // Automobiles
  { symbol: 'MARUTI', name: 'Maruti Suzuki India Limited', sector: 'Auto', basePrice: 10234, marketCap: 310000 },
  { symbol: 'TATAMOTORS', name: 'Tata Motors Limited', sector: 'Auto', basePrice: 789, marketCap: 290000 },
  { symbol: 'M&M', name: 'Mahindra & Mahindra Limited', sector: 'Auto', basePrice: 1567, marketCap: 196000 },
  { symbol: 'BAJAJ-AUTO', name: 'Bajaj Auto Limited', sector: 'Auto', basePrice: 6789, marketCap: 196000 },
  { symbol: 'HEROMOTOCO', name: 'Hero MotoCorp Limited', sector: 'Auto', basePrice: 2890, marketCap: 58000 },
  { symbol: 'EICHERMOT', name: 'Eicher Motors Limited', sector: 'Auto', basePrice: 3456, marketCap: 94000 },
  { symbol: 'FORCEMOTORS', name: 'Force Motors Limited', sector: 'Auto', basePrice: 1234, marketCap: 8900 },
  { symbol: 'TVSMOTOR', name: 'TVS Motor Company Limited', sector: 'Auto', basePrice: 1890, marketCap: 89000 },
  { symbol: 'ASHOKLEY', name: 'Ashok Leyland Limited', sector: 'Auto', basePrice: 167, marketCap: 49000 },
  { symbol: 'ESCORTS', name: 'Escorts Limited', sector: 'Auto', basePrice: 3234, marketCap: 40000 },

  // Pharmaceuticals
  { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical Industries Limited', sector: 'Pharma', basePrice: 1789, marketCap: 430000 },
  { symbol: 'DRREDDY', name: 'Dr. Reddys Laboratories Limited', sector: 'Pharma', basePrice: 1234, marketCap: 210000 },
  { symbol: 'CIPLA', name: 'Cipla Limited', sector: 'Pharma', basePrice: 1567, marketCap: 130000 },
  { symbol: 'LUPIN', name: 'Lupin Limited', sector: 'Pharma', basePrice: 2089, marketCap: 96000 },
  { symbol: 'AUROPHARMA', name: 'Aurobindo Pharma Limited', sector: 'Pharma', basePrice: 1345, marketCap: 79000 },
  { symbol: 'BIOCON', name: 'Biocon Limited', sector: 'Pharma', basePrice: 234, marketCap: 28000 },
  { symbol: 'CADILAHC', name: 'Cadila Healthcare Limited', sector: 'Pharma', basePrice: 567, marketCap: 57000 },
  { symbol: 'DIVISLAB', name: 'Divis Laboratories Limited', sector: 'Pharma', basePrice: 4567, marketCap: 120000 },
  { symbol: 'GLENMARK', name: 'Glenmark Pharmaceuticals Limited', sector: 'Pharma', basePrice: 789, marketCap: 22000 },
  { symbol: 'TORNTPHARM', name: 'Torrent Pharmaceuticals Limited', sector: 'Pharma', basePrice: 2890, marketCap: 49000 },

  // Energy & Oil
  { symbol: 'RELIANCE', name: 'Reliance Industries Limited', sector: 'Energy', basePrice: 2934, marketCap: 1980000 },
  { symbol: 'ONGC', name: 'Oil and Natural Gas Corporation Limited', sector: 'Energy', basePrice: 298, marketCap: 380000 },
  { symbol: 'IOC', name: 'Indian Oil Corporation Limited', sector: 'Energy', basePrice: 139, marketCap: 190000 },
  { symbol: 'BPCL', name: 'Bharat Petroleum Corporation Limited', sector: 'Energy', basePrice: 289, marketCap: 130000 },
  { symbol: 'HPCL', name: 'Hindustan Petroleum Corporation Limited', sector: 'Energy', basePrice: 368, marketCap: 78000 },
  { symbol: 'GAIL', name: 'GAIL (India) Limited', sector: 'Energy', basePrice: 189, marketCap: 75000 },
  { symbol: 'NTPC', name: 'NTPC Limited', sector: 'Energy', basePrice: 234, marketCap: 227000 },
  { symbol: 'POWERGRID', name: 'Power Grid Corporation of India Limited', sector: 'Energy', basePrice: 289, marketCap: 270000 },
  { symbol: 'COALINDIA', name: 'Coal India Limited', sector: 'Energy', basePrice: 234, marketCap: 145000 },

  // Consumer Goods & FMCG
  { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Limited', sector: 'FMCG', basePrice: 2456, marketCap: 580000 },
  { symbol: 'ITC', name: 'ITC Limited', sector: 'FMCG', basePrice: 465, marketCap: 580000 },
  { symbol: 'NESTLEIND', name: 'Nestle India Limited', sector: 'FMCG', basePrice: 2198, marketCap: 210000 },
  { symbol: 'BRITANNIA', name: 'Britannia Industries Limited', sector: 'FMCG', basePrice: 4789, marketCap: 120000 },
  { symbol: 'DABUR', name: 'Dabur India Limited', sector: 'FMCG', basePrice: 507, marketCap: 90000 },
  { symbol: 'MARICO', name: 'Marico Limited', sector: 'FMCG', basePrice: 567, marketCap: 73000 },
  { symbol: 'COLPAL', name: 'Colgate-Palmolive (India) Limited', sector: 'FMCG', basePrice: 1890, marketCap: 51000 },
  { symbol: 'GODREJCP', name: 'Godrej Consumer Products Limited', sector: 'FMCG', basePrice: 1234, marketCap: 126000 },
  { symbol: 'TATACONSUM', name: 'Tata Consumer Products Limited', sector: 'FMCG', basePrice: 890, marketCap: 82000 },
  { symbol: 'UBL', name: 'United Breweries Limited', sector: 'FMCG', basePrice: 1567, marketCap: 34000 },

  // Metals & Mining
  { symbol: 'TATASTEEL', name: 'Tata Steel Limited', sector: 'Metals', basePrice: 134, marketCap: 164000 },
  { symbol: 'JSWSTEEL', name: 'JSW Steel Limited', sector: 'Metals', basePrice: 890, marketCap: 220000 },
  { symbol: 'HINDALCO', name: 'Hindalco Industries Limited', sector: 'Metals', basePrice: 567, marketCap: 126000 },
  { symbol: 'VEDL', name: 'Vedanta Limited', sector: 'Metals', basePrice: 234, marketCap: 87000 },
  { symbol: 'SAILSTEEL', name: 'Steel Authority of India Limited', sector: 'Metals', basePrice: 123, marketCap: 51000 },
  { symbol: 'NMDC', name: 'NMDC Limited', sector: 'Metals', basePrice: 189, marketCap: 56000 },
  { symbol: 'JINDALSTEL', name: 'Jindal Steel & Power Limited', sector: 'Metals', basePrice: 456, marketCap: 45000 },

  // Telecom
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel Limited', sector: 'Telecom', basePrice: 1234, marketCap: 680000 },
  { symbol: 'IDEA', name: 'Vodafone Idea Limited', sector: 'Telecom', basePrice: 12, marketCap: 34000 },
  { symbol: 'RCOM', name: 'Reliance Communications Limited', sector: 'Telecom', basePrice: 5, marketCap: 1200 },

  // Cement
  { symbol: 'ULTRACEMCO', name: 'UltraTech Cement Limited', sector: 'Cement', basePrice: 8900, marketCap: 260000 },
  { symbol: 'SHREECEM', name: 'Shree Cement Limited', sector: 'Cement', basePrice: 25000, marketCap: 90000 },
  { symbol: 'ACC', name: 'ACC Limited', sector: 'Cement', basePrice: 2234, marketCap: 42000 },
  { symbol: 'AMBUJACEMENT', name: 'Ambuja Cements Limited', sector: 'Cement', basePrice: 456, marketCap: 91000 },
  { symbol: 'JKCEMENT', name: 'JK Cement Limited', sector: 'Cement', basePrice: 3456, marketCap: 32000 },

  // Infrastructure & Construction
  { symbol: 'LT', name: 'Larsen & Toubro Limited', sector: 'Infrastructure', basePrice: 3456, marketCap: 485000 },
  { symbol: 'ADANIPORTS', name: 'Adani Ports and Special Economic Zone Limited', sector: 'Infrastructure', basePrice: 1234, marketCap: 270000 },
  { symbol: 'ADANIGREEN', name: 'Adani Green Energy Limited', sector: 'Infrastructure', basePrice: 2890, marketCap: 450000 },
  { symbol: 'ADANIENT', name: 'Adani Enterprises Limited', sector: 'Infrastructure', basePrice: 3456, marketCap: 380000 },

  // Retail & Consumer Services
  { symbol: 'DMART', name: 'Avenue Supermarts Limited', sector: 'Retail', basePrice: 4567, marketCap: 295000 },
  { symbol: 'TRENT', name: 'Trent Limited', sector: 'Retail', basePrice: 1890, marketCap: 67000 },
  { symbol: 'JUBLFOOD', name: 'Jubilant FoodWorks Limited', sector: 'Retail', basePrice: 3234, marketCap: 21000 },

  // Media & Entertainment
  { symbol: 'ZEEL', name: 'Zee Entertainment Enterprises Limited', sector: 'Media', basePrice: 234, marketCap: 22000 },
  { symbol: 'SUNTV', name: 'Sun TV Network Limited', sector: 'Media', basePrice: 567, marketCap: 25000 },
  { symbol: 'PVR', name: 'PVR Limited', sector: 'Media', basePrice: 1890, marketCap: 12000 },

  // Real Estate
  { symbol: 'DLF', name: 'DLF Limited', sector: 'Real Estate', basePrice: 456, marketCap: 113000 },
  { symbol: 'GODREJPROP', name: 'Godrej Properties Limited', sector: 'Real Estate', basePrice: 1890, marketCap: 54000 },
  { symbol: 'OBEROIRLTY', name: 'Oberoi Realty Limited', sector: 'Real Estate', basePrice: 1234, marketCap: 45000 },

  // Airlines & Travel
  { symbol: 'INDIGO', name: 'InterGlobe Aviation Limited', sector: 'Airlines', basePrice: 3456, marketCap: 132000 },
  { symbol: 'SPICEJET', name: 'SpiceJet Limited', sector: 'Airlines', basePrice: 89, marketCap: 6500 },

  // Insurance
  { symbol: 'SBILIFE', name: 'SBI Life Insurance Company Limited', sector: 'Insurance', basePrice: 1567, marketCap: 157000 },
  { symbol: 'HDFCLIFE', name: 'HDFC Life Insurance Company Limited', sector: 'Insurance', basePrice: 678, marketCap: 144000 },
  { symbol: 'ICICIPRULI', name: 'ICICI Prudential Life Insurance Company Limited', sector: 'Insurance', basePrice: 567, marketCap: 81000 },

  // Textiles
  { symbol: 'WELCORP', name: 'Welspun Corp Limited', sector: 'Textiles', basePrice: 234, marketCap: 6100 },
  { symbol: 'RTNPOWER', name: 'Reliance Power Limited', sector: 'Power', basePrice: 12, marketCap: 4800 },
];

// Generate real-time price with volatility
function generateRealTimePrice(basePrice: number): { price: number; change: number; changePercent: number; volume: number } {
  const now = Date.now();
  const volatility = 0.02; // 2% volatility
  const timeBasedChange = Math.sin(now / 100000) * volatility;
  const randomChange = (Math.random() - 0.5) * volatility * 2;
  const totalChange = timeBasedChange + randomChange;
  
  const currentPrice = Math.round(basePrice * (1 + totalChange) * 100) / 100;
  const change = currentPrice - basePrice;
  const changePercent = Math.round((change / basePrice) * 10000) / 100;
  
  // Generate volume (in thousands)
  const baseVolume = Math.max(100, Math.round(basePrice / 10));
  const volume = Math.round(baseVolume * (0.5 + Math.random()) * 1000);
  
  return {
    price: currentPrice,
    change: Math.round(change * 100) / 100,
    changePercent,
    volume
  };
}

// Search stocks function
function searchStocks(query: string): typeof INDIAN_STOCKS {
  if (!query || query.length < 1) return [];
  
  const searchTerm = query.toLowerCase();
  return INDIAN_STOCKS.filter(stock => 
    stock.symbol.toLowerCase().includes(searchTerm) ||
    stock.name.toLowerCase().includes(searchTerm) ||
    stock.sector.toLowerCase().includes(searchTerm)
  ).slice(0, 20); // Limit to 20 results
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '10');

    // If search query is provided, return search results
    if (search) {
      const results = searchStocks(search);
      const stocksWithPrices = results.map(stock => {
        const priceData = generateRealTimePrice(stock.basePrice);
        return {
          symbol: stock.symbol,
          name: stock.name,
          sector: stock.sector,
          price: priceData.price,
          change: priceData.change,
          changePercent: priceData.changePercent,
          volume: priceData.volume,
          marketCap: stock.marketCap
        };
      });

      return NextResponse.json({
        stocks: stocksWithPrices,
        total: results.length
      });
    }

    // If specific symbol is requested
    if (symbol) {
      const stock = INDIAN_STOCKS.find(s => s.symbol.toUpperCase() === symbol.toUpperCase());
      
      if (!stock) {
        return NextResponse.json(
          { error: 'Stock not found' },
          { status: 404 }
        );
      }

      const priceData = generateRealTimePrice(stock.basePrice);
      
      // Mock additional data
      const stockData = {
        quote: {
          symbol: stock.symbol,
          price: priceData.price,
          change: priceData.change,
          changePercent: priceData.changePercent,
          volume: priceData.volume,
          high: Math.round(priceData.price * 1.02 * 100) / 100,
          low: Math.round(priceData.price * 0.98 * 100) / 100,
        },
        overview: {
          name: stock.name,
          sector: stock.sector,
          industry: stock.sector,
          marketCap: `${(stock.marketCap / 100000).toFixed(1)}L Cr`,
          peRatio: (15 + Math.random() * 20).toFixed(1),
          dividendYield: (Math.random() * 3).toFixed(2) + '%',
          eps: (priceData.price / (15 + Math.random() * 20)).toFixed(2),
        },
        news: [
          {
            title: `${stock.name} reports strong quarterly results`,
            url: '#',
            publishedAt: new Date().toISOString(),
            source: 'Economic Times',
            sentiment: priceData.changePercent > 0 ? 'positive' : 'negative',
            summary: `${stock.name} shows ${priceData.changePercent > 0 ? 'positive' : 'negative'} momentum in recent trading sessions.`
          }
        ]
      };

      return NextResponse.json(stockData);
    }

    // Return popular stocks if no specific query
    const popularStocks = INDIAN_STOCKS.slice(0, limit).map(stock => {
      const priceData = generateRealTimePrice(stock.basePrice);
      return {
        symbol: stock.symbol,
        name: stock.name,
        sector: stock.sector,
        price: priceData.price,
        change: priceData.change,
        changePercent: priceData.changePercent,
        volume: priceData.volume,
        marketCap: stock.marketCap
      };
    });

    return NextResponse.json({
      stocks: popularStocks,
      total: INDIAN_STOCKS.length
    });

  } catch (error) {
    console.error('Error in stock API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stock data' },
      { status: 500 }
    );
  }
} 