const API_KEY = "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";

document.getElementById("translateBtn").onclick = async () => {
  const text = document.getElementById("inputText").value;
  const mode = document.getElementById("mode").value;
  const tone = document.getElementById("tone").value;
  const outputBox = document.getElementById("outputBox");

  if (!text) {
    outputBox.innerText = "Please enter text.";
    return;
  }

  outputBox.innerText = "Translating...";

  const prompt =
    mode === "alpha"
      ? `Translate this into Gen Alpha slang.
Tone: ${tone}
- Keep it natural
- No explanation

"${text}"`
      : `Translate this Gen Alpha slang into clear English.
- Preserve meaning and tone

"${text}"`;

  try {
    const res = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + API_KEY
      },
      body: JSON.stringify({
        model: "gpt-5.3",
        input: prompt
      })
    });

    const data = await res.json();
    outputBox.innerText = data.output[0].content[0].text;

  } catch (err) {
    console.error(err);
    outputBox.innerText = "Error: " + err.message;
  }
};
