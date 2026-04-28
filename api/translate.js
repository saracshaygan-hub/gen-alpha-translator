export default async function handler(req, res) {
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

  res.status(200).json({
    output: data.output[0].content[0].text,
  });
}
