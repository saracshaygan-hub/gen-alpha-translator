export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { text, mode, tone } = req.body;

    const prompt =
      mode === "alpha"
        ? `Translate this into Gen Alpha slang.
Tone: ${tone}
No explanation.

"${text}"`
        : `Translate this Gen Alpha slang into clear English.

"${text}"`;

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

    const output =
      data?.output?.[0]?.content?.[0]?.text ||
      "No response from AI";

    return res.status(200).json({ output });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
}
