
let API_BASE = import.meta.env.VITE_API_LOCAL;

export async function initApiUrl(): Promise<void> {
  try {
    const res = await fetch(`${API_BASE}/one_law/民法/1`, { method: "GET" });
    if (!res.ok) throw new Error("Local API unhealthy");
    console.log("✅ 使用本地 API:", API_BASE);
  } catch (err) {
    API_BASE = import.meta.env.VITE_API_DEPLOY;
    console.warn("⚠️ 本地 API 不可用，改用部署版:", API_BASE);
  }
}

export function getApiUrl(): string {
  return `${API_BASE}`
}
