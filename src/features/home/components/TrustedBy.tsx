import { GraduationCap, Microscope, Stethoscope, Cpu, Building2, LucideIcon } from 'lucide-react';
import { useGetStatistics } from '@/hooks/queries/useGetStatistics';

const iconMap: Record<string, LucideIcon> = {
  'Student': GraduationCap,
  'Medical Student': Stethoscope,
  'Researcher': Microscope,
  'Engineer': Cpu,
};

const formatCount = (count: number) => {
  if (count >= 1000) return `${(count / 1000).toFixed(count >= 10000 ? 0 : 1)}K+`;
  return `${count}+`;
};

export default function TrustedBy() {
  const { data: statistics, isLoading, isError } = useGetStatistics();

  if (isLoading) {
    return (
      <section className="py-16 border-y border-gray-100 bg-[#FAFAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm font-medium text-gray-500 mb-8 tracking-wider uppercase">
            Trusted by learners worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            {[ ...Array(4) ].map((_, i) => (
              <div key={i} className="flex items-center gap-3 animate-pulse">
                <div className="w-10 h-10 rounded-xl bg-gray-200" />
                <div>
                  <div className="h-5 w-12 bg-gray-200 rounded mb-1" />
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError || !statistics) return null;

  const activeUserTypes = statistics.userTypes.filter((t) => t.count >= 0);

  if (activeUserTypes.length === 0) return null;

  return (
    <section className="py-16 border-y border-gray-100 bg-[#FAFAFC]">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm font-medium text-gray-500 mb-8 tracking-wider uppercase">
          Trusted by learners worldwide
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
          {activeUserTypes.map((type) => {
            const Icon = iconMap[ type.name ] ?? Building2;
            return (
              <div
                key={type.name}
                className="flex items-center gap-3 text-gray-400 hover:text-gray-600 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-primary-50 flex items-center justify-center transition-colors">
                  <Icon className="w-5 h-5 text-gray-500 group-hover:text-primary-500 transition-colors" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">{formatCount(type.count)}</p>
                  <p className="text-sm text-gray-500">{type.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}