export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture: string | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
