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
