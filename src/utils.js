export function cleanInput(value) {
  return String(value || "")
    .trim()
    .replace(/^https?:\/\/github\.com\//i, "")
    .replace(/^github\.com\//i, "")
    .replace(/^\/+|\/+$/g, "");
}

export function parseUsername(value) {
  return cleanInput(value).split("/").filter(Boolean)[0] || "";
}

export function parseRepo(value) {
  const segments = cleanInput(value).split("/").filter(Boolean);
  if (!segments.length) return "";
  return segments.length > 1 ? segments[1] : segments[0];
}

export function dedupeByUrl(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  });
}

export function cleanPath(path) {
  return String(path || "").replace(/^\/+/, "");
}

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function buildBadgeImageUrl(label, color) {
  const safeLabel = encodeURIComponent(label || "Open on GitHub");
  const safeColor = encodeURIComponent(color || "pink");
  return `https://img.shields.io/badge/${safeLabel}-${safeColor}?style=for-the-badge&logo=github`;
}

export async function copyToClipboard(value) {
  if (!value) return false;
  if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) return false;

  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    return false;
  }
}
