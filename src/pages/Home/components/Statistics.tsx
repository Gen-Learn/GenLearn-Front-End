import { useEffect, useState, useRef } from 'react';
import { Users, BookOpen, Video, Clock } from 'lucide-react';

const stats = [
  { icon: Users, value: 50000, suffix: '+', label: 'Active Users' },
  { icon: Video, value: 120000, suffix: '+', label: 'Generated Lectures' },
  { icon: BookOpen, value: 10000, suffix: '+', label: 'Courses Created' },
  { icon: Clock, value: 500000, suffix: '+', label: 'Learning Hours' },
];

function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      countRef.current = Math.floor(easeOutQuart * end);
      setCount(countRef.current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration]);

  return count;
}

function StatCounter({ stat }: { stat: typeof stats[0] }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const count = useCountUp(isVisible ? stat.value : 0);
  const formattedCount = count >= 1000 ? (count / 1000).toFixed(count >= 10000 ? 0 : 1) + 'K' : count;

  return (
    <div ref={ref} className="text-center group">
      <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-glow">
        <stat.icon className="w-7 h-7 text-white" />
      </div>
      <div className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-2">
        {formattedCount}{stat.suffix}
      </div>
      <p className="text-gray-600 font-medium">{stat.label}</p>
    </div>
  );
}

export default function Statistics() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-transparent to-secondary-50/50" />

      {/* Decorative Elements */}
      <div className="absolute w-96 h-96 bg-primary-200/30 rounded-full blur-3xl -top-48 -left-48" />
      <div className="absolute w-96 h-96 bg-secondary-200/30 rounded-full blur-3xl -bottom-48 -right-48" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <StatCounter key={i} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
