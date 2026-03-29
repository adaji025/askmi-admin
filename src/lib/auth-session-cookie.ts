/** Cookie read by middleware; presence mirrors persisted Zustand session (client-only). */
export const AUTH_SESSION_COOKIE = "askmi_admin_auth";

const MAX_AGE_SEC = 60 * 60 * 24 * 7;

export function setAuthSessionCookie(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${AUTH_SESSION_COOKIE}=1; Path=/; Max-Age=${MAX_AGE_SEC}; SameSite=Lax`;
}

export function clearAuthSessionCookie(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${AUTH_SESSION_COOKIE}=; Path=/; Max-Age=0`;
}
