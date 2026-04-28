export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { text, mode, tone } = req.body;

    const prompt =
      mode === "alpha"
        ? `Translate into Gen Alpha slang. Tone: ${tone}. No explanation.\n\n"${text}"`
        : `Translate Gen Alpha slang into clear English.\n\n"${text}"`;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-5.3",
        input: prompt,
      }),
    });

  const data = await response.json();

console.log("FULL OPENAI RESPONSE:", JSON.stringify(data, null, 2));

const output =
  data?.output?.[0]?.content?.[0]?.text ||
  data?.error?.message ||
  JSON.stringify(data);

res.status(200).json({ output });

    res.status(200).json({ output });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
