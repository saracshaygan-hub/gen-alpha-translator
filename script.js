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

  try {
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text, mode, tone })
    });

    const data = await res.json();
    outputBox.innerText = data.output;

  } catch (err) {
    console.error(err);
    outputBox.innerText = "Error: " + err.message;
  }
};
