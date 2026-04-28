const res = await fetch("/api/translate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ text, mode, tone })
});
