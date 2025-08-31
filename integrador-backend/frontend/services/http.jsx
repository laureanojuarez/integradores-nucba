const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export async function http(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {"Content-Type": "application/json", ...(options.headers || {})},
    ...options,
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Error HTTP");
  }
  return res.json();
}
