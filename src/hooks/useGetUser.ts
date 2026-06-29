import { getCurrentUser } from "../services/userService";
import { useState, useEffect } from "react";
import { User } from "../types/userModel";

// Standalone hook for components that want a fresh user fetch without
// pulling in the whole AuthContext. Note: AuthContext.tsx already does this
// exact fetch once on app mount and exposes `user`/`isAuthenticated` from
// useAuth() — prefer that for anything related to "is the user signed in",
// since it's the single source of truth app-wide. Reach for this hook only
// when you specifically need an independent, re-fetchable copy (e.g. a
// settings page that wants to re-pull the latest profile on its own).
export const useGetUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedUser = await getCurrentUser();
        if (isMounted) setUser(fetchedUser);
      } catch {
        if (isMounted) setError("Failed to fetch user");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadUser();

    return () => {
      isMounted = false;
    };
  }, []);

  return { user, loading, error };
};