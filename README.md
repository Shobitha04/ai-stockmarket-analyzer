# StockSage AI - Indian Stock Market Intelligence Platform

StockSage AI is a comprehensive web-based platform that provides AI-powered analysis and insights for Indian stock markets (NSE/BSE). The platform helps retail investors make informed decisions through advanced portfolio analysis, news sentiment tracking, IPO analysis, and strategy backtesting.

## 🚀 Features

### 📊 Portfolio Analysis
- Upload and track your Indian stock portfolio
- Get AI-powered insights on diversification and risk
- View sectoral allocation and performance metrics
- Receive personalized recommendations

### 📰 Market News & Sentiment
- Real-time news aggregation from top Indian financial sources
- AI-powered sentiment analysis
- Sector-wise sentiment tracking
- Trending topics and market movers

### 🔍 IPO Analysis
- Comprehensive analysis of upcoming IPOs
- AI-generated summaries of prospectus documents
- Subscription status tracking
- Historical IPO performance data

### 📈 Strategy Lab
- Backtest trading strategies using natural language
- AI translation of strategies into technical rules
- Performance metrics and analysis
- Sample strategy templates

### 📚 Learning Center
- Interactive stock market education modules
- Beginner-friendly explanations
- Quizzes and progress tracking
- Personalized learning paths

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TailwindCSS
- **Charts**: Recharts
- **UI Components**: Custom components with Tailwind
- **API Integration**: Alpha Vantage, News API
- **AI/ML**: OpenAI GPT-4
- **Data Processing**: Node.js

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/stocksage-ai.git
   cd stocksage-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example` and add your API keys:
   ```env
   ALPHA_VANTAGE_API_KEY=your_key
   NEWS_API_KEY=your_key
   OPENAI_API_KEY=your_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Configuration

The application can be configured through environment variables:

- `ALPHA_VANTAGE_API_KEY`: API key for stock market data
- `NEWS_API_KEY`: API key for news aggregation
- `OPENAI_API_KEY`: API key for AI/ML features
- `ENABLE_BACKTESTING`: Enable/disable strategy backtesting
- `ENABLE_SENTIMENT_ANALYSIS`: Enable/disable sentiment analysis
- `API_RATE_LIMIT`: API rate limiting configuration
- `API_TIMEOUT`: API timeout configuration

## 📱 Usage

1. **Portfolio Management**:
   - Add stocks to your portfolio with purchase details
   - View portfolio analytics and AI insights
   - Track performance and get recommendations

2. **Market Analysis**:
   - Browse real-time market news and sentiment
   - Filter news by sector or company
   - View sentiment trends and analysis

3. **IPO Research**:
   - Explore upcoming IPOs
   - Read AI-generated analysis
   - Track subscription status

4. **Strategy Testing**:
   - Write strategies in plain English
   - Backtest on historical data
   - View performance metrics

5. **Learning**:
   - Start with basic modules
   - Take quizzes to test knowledge
   - Track learning progress

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Alpha Vantage](https://www.alphavantage.co/) for stock market data
- [News API](https://newsapi.org/) for news aggregation
- [OpenAI](https://openai.com/) for AI/ML capabilities
- [TailwindCSS](https://tailwindcss.com/) for styling
- [Recharts](https://recharts.org/) for charts

## 📞 Support

For support, please email support@stocksage-ai.com or open an issue in the GitHub repository.
