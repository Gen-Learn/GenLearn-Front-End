export interface User {
  id: string | null;
  name: string | null;
  email: string | null;
  profilePicture: string | null;
  createdAt: string | null; // ISO date string
  updatedAt: string | null; // ISO date string
  biography: string | null;
  onboardingStatus?: "pending" | "completed" | "skipped";
}


