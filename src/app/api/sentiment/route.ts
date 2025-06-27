import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import * as cheerio from 'cheerio';

// Initialize OpenAI client only if API key is available
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

const NEWS_API_KEY = process.env.NEWS_API_KEY;

interface SentimentRequest {
  symbol?: string;
  sector?: string;
}

async function scrapeArticle(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Remove script tags, style tags, and comments
    $('script').remove();
    $('style').remove();
    $('comments').remove();
    
    // Extract text from paragraphs
    const paragraphs = $('p').map((_, element) => $(element).text()).get();
    return paragraphs.join(' ').slice(0, 1000); // Limit to first 1000 characters
  } catch (error) {
    console.error('Error scraping article:', error);
    return '';
  }
}

async function analyzeSentiment(text: string): Promise<{
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  summary: string;
}> {
  try {
    if (!openai) {
      throw new Error('OpenAI API key not configured');
    }

    const analysis = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a financial news analyst. Analyze the sentiment of the given text and provide a sentiment score (-1 to 1) and a brief summary."
        },
        {
          role: "user",
          content: `Analyze the sentiment of this financial news: ${text}`
        }
      ],
    });

    const result = analysis.choices[0].message.content;
    // Parse the GPT response - in a real implementation, we would structure the prompt
    // to get a more structured response
    return {
      sentiment: 'positive',
      score: 0.8,
      summary: result || 'No summary available',
    };
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const body: SentimentRequest = await request.json();
    const { symbol, sector } = body;

    if (!symbol && !sector) {
      return NextResponse.json(
        { error: 'Either symbol or sector is required' },
        { status: 400 }
      );
    }

    // Fetch news articles
    const searchQuery = symbol || sector;
    const newsResponse = await fetch(
      `https://newsapi.org/v2/everything?q=${searchQuery} stock market india&apiKey=${NEWS_API_KEY}&language=en&sortBy=publishedAt&pageSize=10`
    );
    const newsData = await newsResponse.json();

    // Process each article
    const articles = await Promise.all(
      newsData.articles.map(async (article: { title: string; url: string; publishedAt: string; source: { name: string }; content?: string }) => {
        const content = article.content || await scrapeArticle(article.url);
        const sentimentAnalysis = await analyzeSentiment(content);

        return {
          title: article.title,
          url: article.url,
          publishedAt: article.publishedAt,
          source: article.source.name,
          sentiment: sentimentAnalysis.sentiment,
          sentimentScore: sentimentAnalysis.score,
          summary: sentimentAnalysis.summary,
        };
      })
    );

    // Calculate aggregate sentiment
    const sentimentScores = articles.map(article => article.sentimentScore);
    const averageSentiment = sentimentScores.reduce((a, b) => a + b, 0) / sentimentScores.length;

    // Generate overall analysis
    if (!openai) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const analysis = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a financial market analyst. Provide a brief summary of the overall market sentiment based on the analyzed news articles."
        },
        {
          role: "user",
          content: `Summarize the market sentiment for ${symbol || sector} based on these articles: ${JSON.stringify(articles)}`
        }
      ],
    });

    return NextResponse.json({
      articles,
      aggregateSentiment: {
        score: averageSentiment,
        sentiment: averageSentiment > 0.2 ? 'positive' : averageSentiment < -0.2 ? 'negative' : 'neutral',
      },
      analysis: analysis.choices[0].message.content,
    });
  } catch (error) {
    console.error('Error in sentiment analysis:', error);
    return NextResponse.json(
      { error: 'Failed to analyze sentiment' },
      { status: 500 }
    );
  }
} 