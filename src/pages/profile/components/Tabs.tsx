import { HiOutlineChartBarSquare } from 'react-icons/hi2';
import { LuBookOpen } from 'react-icons/lu';
import { PiMedalLight } from 'react-icons/pi';
import type { TabKey } from '../types';

interface TabsProps {
  active: TabKey;
  onChange: (tab: TabKey) => void;
}

const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: 'activity', label: 'Weekly Activity', icon: <HiOutlineChartBarSquare size={16} /> },
  { key: 'courses', label: 'Completed Courses', icon: <LuBookOpen size={16} /> },
  { key: 'badges', label: 'Badges', icon: <PiMedalLight size={16} /> },
];

const Tabs = ({ active, onChange }: TabsProps) => (
  <div className="flex items-center gap-6 border-b border-gray-100">
    {TABS.map((tab) => {
      const isActive = tab.key === active;
      return (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`flex items-center gap-1.5 pb-3 text-[13px] font-medium transition-colors relative ${
            isActive ? 'text-brand-violet' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          {tab.icon}
          {tab.label}
          {isActive && (
            <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-brand-violet rounded-full" />
          )}
        </button>
      );
    })}
  </div>
);

export default Tabs;
