const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function extractFile(file) {
  const form = new FormData();
  form.append("file", file);

  const resp = await fetch(`${API}/api/extract`, {
    method: "POST",
    body: form,
  });

  const json = await resp.json();
  if (!resp.ok || !json?.ok) {
    throw new Error(json?.error || "Extraction failed");
  }
  return json;
}
