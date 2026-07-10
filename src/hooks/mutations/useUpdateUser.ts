import { useState } from "react";
import { updateCurrentUser } from "../../services/userService";

export const useUpdateUser = () => {
  const [ user, setUser ] = useState<{
    name: string | null,
    biography: string | null
  } | null>(null);
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ error, setError ] = useState<string | null>(null);

  const handleUpdate = async (userData: {
    "name": string,
    "biography": string
  }) => {
    if (!userData) return;
    setLoading(true);
    setError(null);
    try {
      const updated = await updateCurrentUser(userData);
      setUser(updated);
      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    } catch (err) {
      setError("error can't update the user data");
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, handleUpdate };
};