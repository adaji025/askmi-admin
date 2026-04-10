import { AUTH_SESSION_COOKIE } from "./auth-session-constants";

/** Client-only helpers; cookie name is shared via auth-session-constants (safe for proxy). */
export { AUTH_SESSION_COOKIE };

const MAX_AGE_SEC = 60 * 60 * 24 * 7;

export function setAuthSessionCookie(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${AUTH_SESSION_COOKIE}=1; Path=/; Max-Age=${MAX_AGE_SEC}; SameSite=Lax`;
}

export function clearAuthSessionCookie(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${AUTH_SESSION_COOKIE}=; Path=/; Max-Age=0`;
}
