export interface StatItem {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}
export interface ActivityDay {
  day: string;
  value: number;
}


export type TabKey = 'activity' | 'courses' | 'badges';
