// demo helper — uses the local demo path (server should expose /samples/demo.png)
const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function fetchDemoAndPost(onResult, onError) {
  try {
    // The uploaded local file path (transform to URL on your environment or serve via backend)
    // Developer-provided path:
    const LOCAL_DEMO_PATH =
      "../samples.sampleimage.png";
    // If backend serves it as /samples/demo.png prefer that
    const demoUrl = `${API}/samples/sampleimage.png`;

    const r = await fetch(demoUrl);
    if (!r.ok) throw new Error("Failed to fetch demo image");
    const blob = await r.blob();
    const file = new File([blob], "demo.png", {
      type: blob.type || "image/png",
    });

    const form = new FormData();
    form.append("file", file);

    const extractResp = await fetch(`${API}/api/extract`, {
      method: "POST",
      body: form,
    });
    const json = await extractResp.json();
    if (!extractResp.ok) throw new Error(json?.error || "Extraction failed");
    onResult && onResult(json);
  } catch (err) {
    onError && onError(err);
  }
}
