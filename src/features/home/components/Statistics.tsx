import { useEffect, useState, useRef } from 'react';
import { Users, BookOpen, Video, Clock } from 'lucide-react';
import { useGetStatistics } from '@/hooks/queries/useGetStatistics';
import { Statistics as StatisticsType } from '@/types/statisticsModel';

function useCountUp(end: number, duration: number = 2000) {
  const [ count, setCount ] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (end === 0) return;
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      countRef.current = Math.floor(easeOutQuart * end);
      setCount(countRef.current);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [ end, duration ]);

  return count;
}

function useOnScreen(ref: React.RefObject<HTMLElement>) {
  const [ isVisible, setIsVisible ] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([ entry ]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ ref ]);

  return isVisible;
}

function formatStat(count: number) {
  if (count >= 10000) return `${Math.floor(count / 1000)}K`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return `${count}`;
}

interface StatConfig {
  key: keyof ReturnType<typeof buildStatValues>;
  icon: typeof Users;
  label: string;
}

function buildStatValues(statistics: StatisticsType) {
  return {
    totalUsers: statistics.totalUsers,
    totalLectures: statistics.totalLectures,
    totalCourses: statistics.totalCourses,
    learningHours: Math.floor(statistics.totalLectureMinutes / 60),
  };
}

const statConfigs: { key: keyof ReturnType<typeof buildStatValues>; icon: typeof Users; label: string }[] = [
  { key: 'totalUsers', icon: Users, label: 'Active Users' },
  { key: 'totalLectures', icon: Video, label: 'Generated Lectures' },
  { key: 'totalCourses', icon: BookOpen, label: 'Courses Created' },
  { key: 'learningHours', icon: Clock, label: 'Learning Hours' },
];

function StatCounter({ value, icon: Icon, label }: { value: number; icon: typeof Users; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref as React.RefObject<HTMLElement>);
  const count = useCountUp(isVisible ? value : 0);

  return (
    <div ref={ref} className="text-center group">
      <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-glow">
        <Icon className="w-7 h-7 text-white" />
      </div>
      <div className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-2">
        {formatStat(count)}+
      </div>
      <p className="text-gray-600 font-medium">{label}</p>
    </div>
  );
}

function StatSkeleton() {
  return (
    <div className="text-center">
      <div className="w-14 h-14 mx-auto rounded-2xl bg-gray-200 animate-pulse mb-4" />
      <div className="h-10 w-20 mx-auto bg-gray-200 animate-pulse rounded mb-2" />
      <div className="h-4 w-24 mx-auto bg-gray-200 animate-pulse rounded" />
    </div>
  );
}

export default function Statistics() {
  const { data: statistics, isLoading, isError } = useGetStatistics();

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-transparent to-secondary-50/50" />
      <div className="absolute w-96 h-96 bg-primary-200/30 rounded-full blur-3xl -top-48 -left-48" />
      <div className="absolute w-96 h-96 bg-secondary-200/30 rounded-full blur-3xl -bottom-48 -right-48" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {isLoading || isError || !statistics
            ? [ ...Array(4) ].map((_, i) => <StatSkeleton key={i} />)
            : (() => {
              const values = buildStatValues(statistics);
              return statConfigs.map((config) => (
                <StatCounter
                  key={config.key}
                  value={values[ config.key ]}
                  icon={config.icon}
                  label={config.label}
                />
              ));
            })()}
        </div>
      </div>
    </section>
  );
}