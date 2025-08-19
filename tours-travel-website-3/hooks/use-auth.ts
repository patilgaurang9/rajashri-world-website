import { useEffect, useState } from "react";

// This hook checks if the user is authenticated by checking the presence of the HTTP-only cookie via a serverless API call.
// It does NOT expose the JWT to the client, only returns a boolean.
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  // Function to check auth state
  const checkAuth = async () => {
    setLoading(true);
    try {
  const res = await fetch("/api/auth/me", { credentials: "include", cache: "no-store" });
      setIsAuthenticated(res.ok);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
    // Listen for custom auth-changed event to refresh auth state instantly
    window.addEventListener("auth-changed", checkAuth);
    return () => window.removeEventListener("auth-changed", checkAuth);
  }, []);

  return { isAuthenticated, loading };
}
