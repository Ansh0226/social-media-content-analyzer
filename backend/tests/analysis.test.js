// backend/tests/analysis.test.js
const { analyzeText } = require("../services/analysis");

describe("analysis service", () => {
  test("analyzeText returns expected shape and sensible values", async () => {
    const sample = `OpenAI announced a new model today. This is great news for developers.
      The model can generate code, review PRs, and improve productivity.`;

    const res = await analyzeText(sample);
    expect(res).toHaveProperty("sentiment");
    expect(res).toHaveProperty("keywords");
    expect(res).toHaveProperty("hashtags");
    expect(res).toHaveProperty("engagement_score");

    // sentiment object shape
    expect(res.sentiment).toHaveProperty("score");
    expect(res.sentiment).toHaveProperty("comparative");

    // keywords array non-empty
    expect(Array.isArray(res.keywords)).toBe(true);
    expect(res.keywords.length).toBeGreaterThanOrEqual(0);

    // hashtags array
    expect(Array.isArray(res.hashtags)).toBe(true);

    // engagement_score is a number between 0 and 100
    expect(typeof res.engagement_score).toBe("number");
    expect(res.engagement_score).toBeGreaterThanOrEqual(0);
    expect(res.engagement_score).toBeLessThanOrEqual(100);
  });
});
