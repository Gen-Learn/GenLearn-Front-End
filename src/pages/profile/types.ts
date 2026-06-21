export interface StatItem {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}
export interface UserProfile {
  id: number | string;
  name: string;
  email: string;
  profilePicture: string | null;
  createdAt: Date;
  updatedAt: Date;
}
export interface ActivityDay {
  day: string;
  value: number;
}


export type TabKey = 'activity' | 'courses' | 'badges';
