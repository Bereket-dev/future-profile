const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

async function request(path, { method = "GET", body, headers } = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(headers || {})
    },
    body: body ? JSON.stringify(body) : undefined
  });

  const contentType = res.headers.get("content-type") || "";
  const data = contentType.includes("application/json") ? await res.json() : await res.text();

  if (!res.ok) {
    const message = typeof data === "string" ? data : data?.message || "Request failed";
    const err = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

export const api = {
  health: () => request("/api/health"),
  createPrediction: (answers) => request("/api/predict", { method: "POST", body: { answers } }),
  getDemoSession: () => request("/api/demo-session"),
  getSession: (sessionId) => request(`/api/sessions/${sessionId}`),
  createShare: (payload) => request("/api/share", { method: "POST", body: payload }),
  getShare: (shareId) => request(`/api/share/${shareId}`)
};
