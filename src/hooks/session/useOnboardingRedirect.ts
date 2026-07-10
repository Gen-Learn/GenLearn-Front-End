import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

/**
 * Hook to redirect user to onboarding if their status is pending
 * and they just completed login/register
 */
export const useOnboardingRedirect = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (
      isAuthenticated &&
      user?.onboardingStatus === "pending"
    ) {
      navigate("/onboarding", { replace: true });
    }
  }, [ user?.onboardingStatus, isAuthenticated, navigate ]);
};
