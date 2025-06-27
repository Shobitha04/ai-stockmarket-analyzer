# StockSage AI - Deployment Guide

## Deploy to Vercel

### Prerequisites
1. A personal GitHub account
2. A Vercel account (sign up at vercel.com)
3. API keys for the following services:
   - OpenAI API key from https://platform.openai.com/api-keys
   - Alpha Vantage API key from https://www.alphavantage.co/support/#api-key
   - News API key from https://newsapi.org/register

### Step 1: Push to Personal GitHub
1. Create a new repository on your personal GitHub account
2. Change the remote origin to your personal repository:
   ```bash
   git remote set-url origin https://github.com/YOUR_USERNAME/ai-stockmarket-analyzer.git
   ```
3. Push the code:
   ```bash
   git push -u origin main
   ```

### Step 2: Deploy to Vercel
1. Go to https://vercel.com and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Configure the following environment variables in Vercel:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `ALPHA_VANTAGE_API_KEY`: Your Alpha Vantage API key
   - `NEWS_API_KEY`: Your News API key

### Step 3: Configure Environment Variables
In your Vercel project settings:
1. Go to Settings → Environment Variables
2. Add each variable with its corresponding value
3. Make sure to add them for all environments (Production, Preview, Development)

### Features Included
- ✅ Real-time stock data simulation
- ✅ AI-powered sentiment analysis
- ✅ Portfolio tracking with live updates
- ✅ 3D Galaxy of Stocks visualization
- ✅ Comprehensive learning platform
- ✅ Strategy backtesting
- ✅ IPO analysis
- ✅ Market news and alerts
- ✅ Dark/Light theme support
- ✅ Mobile responsive design

### Post-Deployment
After deployment, your app will be available at `https://your-project-name.vercel.app`

The app is optimized for Indian markets (NSE/BSE) and includes:
- 100+ Indian stocks across all major sectors
- Real-time price updates every 3-5 seconds
- AI-powered analysis and recommendations
- Interactive 3D stock galaxy visualization
- Comprehensive educational content 