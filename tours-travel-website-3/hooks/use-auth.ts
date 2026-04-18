import { useEffect, useState } from "react";

// This hook checks if the user is authenticated by checking the presence of the HTTP-only cookie via a serverless API call.
// It does NOT expose the JWT to the client, only returns auth status and role.
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  // Function to check auth state
  const checkAuth = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/me", { credentials: "include", cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setIsAuthenticated(true);
        setRole(data.role || "user");
      } else {
        setIsAuthenticated(false);
        setRole(null);
      }
    } catch {
      setIsAuthenticated(false);
      setRole(null);
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

  return { isAuthenticated, loading, role };
}
