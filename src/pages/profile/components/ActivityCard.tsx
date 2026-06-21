import { useState } from 'react';
import { LuBookOpen } from 'react-icons/lu';
import { PiMedalLight } from 'react-icons/pi';
import Tabs from './Tabs';
import WeeklyActivityChart from './WeeklyActivityChart';
import EmptyPanel from './EmptyPanel';
import type { TabKey } from '../types';

const ActivityCard = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('activity');

  return (
    <div className="bg-white rounded-3xl p-6 mt-5 shadow-sm">
      <Tabs active={activeTab} onChange={setActiveTab} />

      {activeTab === 'activity' && <WeeklyActivityChart />}
      {activeTab === 'courses' && (
        <EmptyPanel icon={<LuBookOpen />} message="No completed courses to show yet." />
      )}
      {activeTab === 'badges' && (
        <EmptyPanel icon={<PiMedalLight />} message="No badges earned yet." />
      )}
    </div>
  );
};

export default ActivityCard;
