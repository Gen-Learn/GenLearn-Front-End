import {
  Flame,
  Trophy,
  Target,
  Clock,
  BookOpen,
  Award,
  Star,
  Calendar,
  ChevronRight,
  Medal,
  Crown,
  Gem,
  Settings,
  ArrowLeft,
} from 'lucide-react';
import { Button, Card, Badge, CircularProgress, LinearProgress } from '@/components/ui/index';
import { Link } from 'react-router-dom';
import { useAuth } from "@/contexts/AuthContext"
import { useAnalytics } from "@/hooks/queries/useGetAnalytics";
import { InlineLoader } from '@/components/loading';
import image from "@/assets/images/logoOld.png";
import { useRecentCourses } from '@/hooks/queries/useGetRecentCourses';
import { useGetCoursesImages } from '@/hooks/queries/useGetCoursesImages';
// Static, non-analytics parts of the profile that don't have a backend
// source yet (badges, XP/level, recent courses). These stay mocked until
// their own endpoints exist.
const userProfile = {
  level: 8,
  xp: 2450,
  xpToNextLevel: 3000,
  joinDate: 'November 2025',
  lecturesWatched: 124,
  quizzesPassed: 87,
  badges: [
    { id: 1, name: 'First Steps', icon: Target, color: 'from-green-500 to-green-600', earned: true, date: 'Nov 15, 2025' },
    { id: 2, name: 'Week Warrior', icon: Flame, color: 'from-orange-500 to-red-500', earned: true, date: 'Nov 22, 2025' },
    { id: 3, name: 'Quiz Master', icon: Award, color: 'from-primary-500 to-primary-600', earned: true, date: 'Dec 5, 2025' },
    { id: 4, name: 'Century Club', icon: Star, color: 'from-amber-500 to-amber-600', earned: true, date: 'Dec 18, 2025' },
    { id: 5, name: 'Deep Diver', icon: BookOpen, color: 'from-blue-500 to-blue-600', earned: false, progress: 60 },
    { id: 6, name: 'Perfectionist', icon: Gem, color: 'from-cyan-500 to-cyan-600', earned: false, progress: 75 },
    { id: 7, name: 'Marathon Mind', icon: Medal, color: 'from-rose-500 to-rose-600', earned: false, progress: 40 },
    { id: 8, name: 'Guru', icon: Crown, color: 'from-primary-600 to-secondary-500', earned: false, progress: 25 },
  ],
};

const levelThresholds = [
  { level: 1, xp: 0 }, { level: 2, xp: 100 }, { level: 3, xp: 250 },
  { level: 4, xp: 450 }, { level: 5, xp: 700 }, { level: 6, xp: 1000 },
  { level: 7, xp: 1400 }, { level: 8, xp: 2000 }, { level: 9, xp: 3000 },
  { level: 10, xp: 4500 },
];

export default function profile() {
  const { user } = useAuth();
  const { data, isLoading, isError, error } = useAnalytics();
  const { data: courses, isLoading: loadingRecent, isError: errorRecent } = useRecentCourses({ page: 1, limit: 4 });
  const { courseImages, loadingImages } = useGetCoursesImages();
  const analytics = data;
  console.log("analytics", data)
  const currentStreak = analytics?.currentLoginStreak ?? 0;
  const bestStreak = analytics?.bestLoginStreak ?? 0;
  const totalHours = analytics ? Math.round(analytics.totalMinOfLectureDone / 60) : 0;
  const coursesCompleted = analytics?.courseDone ?? 0;
  const quizAvg = analytics ? Math.round(analytics.quizAvg) : 0;

  // Build a full Mon–Sun week and merge the API data into it so all 7
  // bars are always present (days without activity show 0 minutes).
  const DAY_LABELS = [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ] as const;

  // Index API entries by their date string ("YYYY-MM-DD") for fast lookup
  const activityByDate = new Map<string, number>();
  for (const entry of analytics?.activity ?? []) {
    // Normalise to YYYY-MM-DD in local time so the key matches our generated dates
    const d = new Date(entry.day);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    activityByDate.set(key, entry.totalDuration);
  }

  // Determine the Monday of the current week
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0=Sun, 1=Mon … 6=Sat
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // shift back to Monday
  const monday = new Date(now);
  monday.setDate(now.getDate() + mondayOffset);

  const weeklyActivity = DAY_LABELS.map((label, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    return { day: label, minutes: activityByDate.get(key) ?? 0 };
  });

  const maxMinutes = weeklyActivity.length > 0
    ? Math.max(1, ...weeklyActivity.map((d) => d.minutes))
    : 1;

  const xpProgress = (userProfile.xp / userProfile.xpToNextLevel) * 100;

  return (
    <div className="min-h-screen bg-[#FAFAFC]">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" data-nav="dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </Link>
          </div>
          <Link to="/" data-nav="landing" className="flex items-center gap-3">
            <img src={image} alt="Genlearn" className='w-12' />
            <span className="text-xl font-bold text-gray-900">GenLearn</span>
          </Link>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
            <Link to="/manage-account" data-nav="settings">
              Settings
            </Link>
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {isError && (
          <div className="mb-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
            Couldn't load your analytics: {error?.message ?? 'Please try again later.'}
          </div>
        )}

        {/* Profile Header */}
        <Card className="mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-3xl font-bold shadow-glow-lg">
                JP
              </div>
              <div className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-sm font-bold border-4 border-white shadow-lg">
                {userProfile.level}
              </div>
            </div>

            {/* Info */}
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{user?.name}</h1>
              <p className="text-gray-500 mb-4">{user?.email}</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                <Badge variant="primary">Level {userProfile.level}</Badge>
                <Badge variant="success" icon={<Flame className="w-3 h-3" />}>
                  {isLoading ? '—' : currentStreak} Day Streak
                </Badge>
                <Badge variant="gray">{userProfile.joinDate}</Badge>
              </div>
            </div>

            {/* XP Progress */}
            <div className="text-center">
              <CircularProgress
                value={xpProgress}
                size={120}
                strokeWidth={8}
                showValue={false}
              />
              <div className="mt-2">
                <p className="text-2xl font-bold text-gray-900">{userProfile.xp.toLocaleString()} XP</p>
                <p className="text-sm text-gray-500">{userProfile.xpToNextLevel - userProfile.xp} XP to Level {userProfile.level + 1}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            { icon: Flame, label: 'Current Streak', value: `${currentStreak} days`, color: 'from-orange-500 to-red-500' },
            { icon: Trophy, label: 'Best Streak', value: `${bestStreak} days`, color: 'from-amber-500 to-amber-600' },
            { icon: Clock, label: 'Total Hours', value: totalHours, color: 'from-primary-500 to-secondary-500' },
            { icon: BookOpen, label: 'Courses Done', value: coursesCompleted, color: 'from-green-500 to-green-600' },
            { icon: Target, label: 'Quiz Avg', value: `${quizAvg}%`, color: 'from-blue-500 to-blue-600' },
          ].map((stat, i) => (
            <Card key={i} className="!p-4 text-center">
              <div className={`w-10 h-10 mx-auto rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-2`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {isLoading ? <InlineLoader className="mx-auto" /> : stat.value}
              </div>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weekly Activity */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary-500" />
                  Weekly Activity
                </h2>
                <span className="text-sm text-gray-500">This week</span>
              </div>

              {isLoading || loadingImages ? (
                <div className="flex items-center justify-center h-32">
                  <InlineLoader />
                </div>
              ) : weeklyActivity.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-8">
                  No activity recorded yet this week.
                </p>
              ) : (
                <div className="flex items-end justify-between gap-3 h-32">
                  {weeklyActivity.map((day, i) => (
                    <div key={`${day.day}-${i}`} className="flex-1 flex flex-col items-center h-full">
                      {/* Bar area — flex-1 so it fills remaining height after labels,
                          giving the percentage-based bar a real pixel height to resolve against. */}
                      <div className="flex-1 w-full flex items-end justify-center">
                        <div
                          className={` w-6 rounded-t-lg transition-all ${day.minutes === maxMinutes
                            ? 'bg-gradient-to-t from-primary-500 to-secondary-500'
                            : 'bg-gradient-to-t from-primary-300 to-primary-200'
                            }`}
                          style={{ height: `${(day.minutes / maxMinutes) * 100}%` }}
                        />
                      </div>
                      <div className="text-center mt-1">
                        <span className="text-xs text-gray-500 font-medium block">{day.day}</span>
                        <span className="text-xs text-gray-400 block">{day.minutes}m</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Recent Courses */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary-500" />
                  Recent Courses
                </h2>
                <Link to="/courses" data-nav="settings">
                  <Button variant="ghost" size="sm">
                    View All <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <div className="space-y-3">
                {courses?.map((course) => (
                  <Link to={`/course-details/${course.id}`}>
                    <div key={course.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                      <img
                        src={courseImages[ course.id ]}
                        alt={course.name}
                        className="w-16 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{course.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <LinearProgress value={course.percentage} className="flex-1 !mb-0" />
                          <span className="text-sm font-medium text-gray-600">{course.percentage}%</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Badges */}
          <div className="space-y-6">
            <Card className="!p-0 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gradient-to-br from-amber-50 to-amber-100/50">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-500" />
                    Badges
                  </h2>
                  <span className="text-sm font-medium text-gray-500">
                    {userProfile.badges.filter(b => b.earned).length}/{userProfile.badges.length}
                  </span>
                </div>
              </div>
              <div className="p-4 max-h-[600px] overflow-y-auto">
                <div className="space-y-3">
                  {userProfile.badges.map((badge) => {
                    const Icon = badge.icon;
                    return (
                      <div
                        key={badge.id}
                        className={`p-3 rounded-xl transition-colors ${badge.earned
                          ? 'bg-gradient-to-r from-gray-50 to-transparent hover:from-primary-50'
                          : 'bg-gray-50 opacity-60'
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${badge.earned
                            ? `bg-gradient-to-br ${badge.color} shadow-glow`
                            : 'bg-gray-200'
                            }`}>
                            <Icon className={`w-6 h-6 ${badge.earned ? 'text-white' : 'text-gray-400'}`} />
                          </div>
                          <div className="flex-1">
                            <p className={`font-semibold ${badge.earned ? 'text-gray-900' : 'text-gray-400'}`}>
                              {badge.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {badge.earned ? badge.date : `${badge.progress}% complete`}
                            </p>
                            {!badge.earned && (
                              <div className="mt-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gray-400 rounded-full"
                                  style={{ width: `${badge.progress}%` }}
                                />
                              </div>
                            )}
                          </div>
                          {badge.earned && (
                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                              <Star className="w-3 h-3 text-green-600 fill-current" />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>

            {/* Learning Stats Summary */}
            {/* <Card className="bg-gradient-to-br from-primary-500 to-secondary-500 !text-white">
              <h3 className="font-bold text-lg mb-4">Learning Journey</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/80">Lectures Watched</span>
                  <span className="font-bold">{userProfile.lecturesWatched}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Quizzes Passed</span>
                  <span className="font-bold">{userProfile.quizzesPassed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Average Score</span>
                  <span className="font-bold">{isLoading ? '—' : `${quizAvg}%`}</span>
                </div>
                <div className="h-px bg-white/20 my-2" />
                <div className="flex justify-between">
                  <span className="text-white/80">Total Learning Time</span>
                  <span className="font-bold">{isLoading ? '—' : `${totalHours}h`}</span>
                </div>
              </div>
            </Card> */}

          </div>
        </div>
      </main>
    </div>
  );
}