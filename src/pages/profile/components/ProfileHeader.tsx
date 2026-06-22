import { TbChartBarPopular } from 'react-icons/tb';
import { HiOutlineFire } from 'react-icons/hi2';
import { LuBookOpenCheck } from 'react-icons/lu';
import { PiMedalLight } from 'react-icons/pi';
import StatCard from './StatCard';
import type { UserProfile } from '../types';
const ProfileHeader = ({user}: { user: UserProfile }) => (
  <div className="bg-[#f3e9fb] rounded-3xl p-5 grid md:grid-cols-2 grid-cols-1 gap-5">
    <div>
        <span className="text-[30px] gradient-bg-text font-bold ">
          Profile
        </span>
        <div className="flex items-center gap-4 ">
          <img
            src={user.profilePicture || "https://api.dicebear.com/7.x/adventurer/svg?seed=Mohamed&backgroundColor=b6e3f4"}
            alt={`${user.name} avatar`}
            className="w-16 h-16 rounded-2xl border-2 border-white object-cover bg-white"
          />
          <div>
            <h2 className="text-brand-text font-bold text-base leading-tight">
              {user.name}
            </h2>
            <p className="text-gray-400 text-[12px] leading-snug max-w-xs mt-0.5">
              Passionate about continuous learning, using smart tools to turn information into
              meaningful knowledge.
            </p>
          </div>
        </div>
    </div>

    <div className="grid grid-cols-2 gap-2.5">
      <StatCard label="Rank" value="1236" icon={<TbChartBarPopular />}  />
      <StatCard label="Badges" value={0} icon={<PiMedalLight />}  />
      <StatCard label="Streak" value={0} icon={<HiOutlineFire />}  />
      <StatCard
        label="Completed Courses"
        value={0}
        icon={<LuBookOpenCheck />}
      />
    </div>
  </div>
);

export default ProfileHeader;
