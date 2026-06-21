import type { StatItem } from '../types';

const StatCard = ({ label, value, icon }: StatItem) => {

  return (
    <div className="bg-[#a855c9] rounded-2xl px-4 py-2 flex flex-col gap-1.5 min-w-24 justify-center items-start">
      <span className="text-white/80 text-[12px] font-medium">{label}</span>
      <div className="flex items-center gap-2.5 text-white">
        <span className="text-[25px] text-black">{icon}</span>
        <span className="font-bold text-[20px]">{value}</span>
      </div>
    </div>
  );
};

export default StatCard;
