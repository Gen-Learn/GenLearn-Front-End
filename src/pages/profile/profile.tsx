import {
  Zap,
  Flame,
  Trophy,
  Target,
  Clock,
  BookOpen,
  Award,
  Star,
  TrendingUp,
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
import {useAuth} from "@/contexts/AuthContext"
const userProfile = {
  name: 'John Parker',
  email: 'john.parker@example.com',
  avatar: null,
  level: 8,
  xp: 2450,
  xpToNextLevel: 3000,
  streak: 7,
  maxStreak: 14,
  totalHours: 48,
  coursesCompleted: 3,
  lecturesWatched: 124,
  quizzesPassed: 87,
  avgQuizScore: 92,
  joinDate: 'November 2025',
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
  weeklyActivity: [
    { day: 'Mon', minutes: 45 },
    { day: 'Tue', minutes: 90 },
    { day: 'Wed', minutes: 30 },
    { day: 'Thu', minutes: 60 },
    { day: 'Fri', minutes: 120 },
    { day: 'Sat', minutes: 75 },
    { day: 'Sun', minutes: 45 },
  ],
  recentCourses: [
    { id: 1, title: 'Quantum Physics Fundamentals', progress: 67, thumbnail: 'https://images.pexels.com/photos/8438980/pexels-photo-8438980.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 2, title: 'Molecular Biology Essentials', progress: 89, thumbnail: 'https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 3, title: 'Machine Learning Basics', progress: 100, thumbnail: 'https://images.pexels.com/photos/8438980/pexels-photo-8438980.jpeg?auto=compress&cs=tinysrgb&w=400' },
  ],
};

const levelThresholds = [
  { level: 1, xp: 0 }, { level: 2, xp: 100 }, { level: 3, xp: 250 },
  { level: 4, xp: 450 }, { level: 5, xp: 700 }, { level: 6, xp: 1000 },
  { level: 7, xp: 1400 }, { level: 8, xp: 2000 }, { level: 9, xp: 3000 },
  { level: 10, xp: 4500 },
];

export default function profile() {
  const xpProgress = (userProfile.xp / userProfile.xpToNextLevel) * 100;
  const maxMinutes = Math.max(...userProfile.weeklyActivity.map(d => d.minutes));
  const { user } = useAuth();
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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
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
                  {userProfile.streak} Day Streak
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
            { icon: Flame, label: 'Current Streak', value: `${userProfile.streak} days`, color: 'from-orange-500 to-red-500' },
            { icon: Trophy, label: 'Best Streak', value: `${userProfile.maxStreak} days`, color: 'from-amber-500 to-amber-600' },
            { icon: Clock, label: 'Total Hours', value: userProfile.totalHours, color: 'from-primary-500 to-secondary-500' },
            { icon: BookOpen, label: 'Courses Done', value: userProfile.coursesCompleted, color: 'from-green-500 to-green-600' },
            { icon: Target, label: 'Quiz Avg', value: `${userProfile.avgQuizScore}%`, color: 'from-blue-500 to-blue-600' },
          ].map((stat, i) => (
            <Card key={i} className="!p-4 text-center">
              <div className={`w-10 h-10 mx-auto rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-2`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Level Progression */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary-500" />
                  Level Progression
                </h2>
                <Button variant="ghost" size="sm">
                  View All <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="relative h-20">
                {/* Level markers */}
                <div className="absolute left-0 right-0 top-0 flex items-end justify-between">
                  {levelThresholds.map((threshold) => {
                    const isCurrentLevel = threshold.level === userProfile.level;
                    const isPast = threshold.level < userProfile.level;
                    const isNextLevel = threshold.level === userProfile.level + 1;
                    const position = ((threshold.level - 1) / 9) * 100;

                    return (
                      <div
                        key={threshold.level}
                        className="flex flex-col items-center relative"
                        style={{ position: 'absolute', left: `${position}%`, transform: 'translateX(-50%)' }}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          isPast || isCurrentLevel
                            ? 'bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-glow'
                            : isNextLevel
                            ? 'bg-white border-2 border-primary-300 text-primary-500'
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          {threshold.level}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Progress Bar */}
                <div className="absolute top-[42px] left-0 right-0 h-2 bg-gray-100 rounded-full">
                  <div
                    className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                    style={{ width: `${xpProgress}%` }}
                  />
                </div>
              </div>
            </Card>

            {/* Weekly Activity */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary-500" />
                  Weekly Activity
                </h2>
                <span className="text-sm text-gray-500">This week</span>
              </div>
              <div className="flex items-end justify-between gap-3 h-32">
                {userProfile.weeklyActivity.map((day) => (
                  <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className={`w-full rounded-t-lg transition-all ${
                        day.minutes === maxMinutes
                          ? 'bg-gradient-to-t from-primary-500 to-secondary-500'
                          : 'bg-gradient-to-t from-primary-300 to-primary-200'
                      }`}
                      style={{ height: `${(day.minutes / maxMinutes) * 100}%` }}
                    />
                    <span className="text-xs text-gray-500 font-medium">{day.day}</span>
                    <span className="text-xs text-gray-400">{day.minutes}m</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Courses */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary-500" />
                  Recent Courses
                </h2>
                <Button variant="ghost" size="sm">
                  View All <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-3">
                {userProfile.recentCourses.map((course) => (
                  <div key={course.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-16 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{course.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <LinearProgress value={course.progress} className="flex-1 !mb-0" />
                        <span className="text-sm font-medium text-gray-600">{course.progress}%</span>
                      </div>
                    </div>
                    {course.progress === 100 && (
                      <Badge variant="success">Complete</Badge>
                    )}
                  </div>
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
                        className={`p-3 rounded-xl transition-colors ${
                          badge.earned
                            ? 'bg-gradient-to-r from-gray-50 to-transparent hover:from-primary-50'
                            : 'bg-gray-50 opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            badge.earned
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
            <Card className="bg-gradient-to-br from-primary-500 to-secondary-500 !text-white">
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
                  <span className="font-bold">{userProfile.avgQuizScore}%</span>
                </div>
                <div className="h-px bg-white/20 my-2" />
                <div className="flex justify-between">
                  <span className="text-white/80">Total Learning Time</span>
                  <span className="font-bold">{userProfile.totalHours}h</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
