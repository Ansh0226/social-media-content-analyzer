// backend/services/analysis.js
// Pure-JS implementation: tokenization, keywords, hashtags, sentiment & engagement score

const natural = require("natural"); // npm install natural
const stopword = require("stopword"); // npm install stopword
const Sentiment = require("sentiment"); // npm install sentiment

const sentiment = new Sentiment();
const tokenizer = new natural.WordTokenizer();

function cleanText(text) {
  return (text || "").replace(/\s+/g, " ").trim();
}

function sentimentScores(text) {
  const res = sentiment.analyze(text || "");
  return { score: res.score, comparative: res.comparative };
}

function topKeywords(text, n = 20) {
  const plain = (text || "").toLowerCase();
  const tokens = tokenizer.tokenize(plain); // array of tokens
  // Filter: keep alphanumerics, length > 2, remove stopwords
  const filtered = stopword.removeStopwords(tokens).filter((w) => {
    return /^[a-z0-9]+$/.test(w) && w.length > 2;
  });

  const freq = filtered.reduce((acc, w) => {
    acc[w] = (acc[w] || 0) + 1;
    return acc;
  }, {});

  // Convert to array and sort descending
  const arr = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  return arr.slice(0, n);
}

function generateHashtags(keywords, maxTags = 6) {
  const tags = [];
  for (const [word] of keywords) {
    const tag = "#" + word.replace(/[^a-z0-9]/gi, "");
    if (tag.length > 1) tags.push(tag);
    if (tags.length >= maxTags) break;
  }
  return tags;
}

function engagementScore(text, sentimentObj) {
  const length = Math.max(1, (text || "").length);
  const polarity = sentimentObj?.comparative || 0;
  // simple intuitive formula:
  // - polarity in [-1,1] -> normalize to [0,1]
  // - length contributes via log scale (avoid huge boost)
  const polarityFactor = (polarity + 1) / 2; // 0..1
  const lengthFactor = Math.min(1, Math.log10(length + 1) / 3); // roughly 0..1
  const score = (0.6 * polarityFactor + 0.4 * lengthFactor) * 100;
  return Math.round(score * 10) / 10; // one decimal
}

async function analyzeText(text) {
  const cleaned = cleanText(text);
  const sent = sentimentScores(cleaned);
  const keywords = topKeywords(cleaned, 30);
  const hashtags = generateHashtags(keywords, 6);
  const score = engagementScore(cleaned, sent);
  return { sentiment: sent, keywords, hashtags, engagement_score: score };
}

module.exports = { analyzeText };
