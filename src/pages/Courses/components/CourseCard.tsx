import {
  Clock,
  BookOpen,
  Play,
} from 'lucide-react';
import {  Card, LinearProgress } from '@/components/ui/index';
import { Link } from 'react-router-dom';


type props ={
    id: string,
    title: string| "Quantum Physics Fundamentals",
    description: string|null,
    thumbnail: string| "https://images.pexels.com/photos/8438980/pexels-photo-8438980.jpeg?auto=compress&cs=tinysrgb&w=800",
    difficulty: string| "Unknown",
    total_duration_minutes: number,
    sections_count: number | 4,
    lectures_count: number | 4,
    status:string | "In Progress",
    progress_percent: number | 4,
    last_lecture_title: string | null,
  
}


export default function CourseCard({ course, formatDuration }: { course: props; formatDuration: (m: number) => string }) {
  const difficultyColors: Record<string, string> = {
    beginner: 'bg-green-100 text-green-700',
    intermediate: 'bg-amber-100 text-amber-700',
    advanced: 'bg-red-100 text-red-700',
  };

  const statusLabels: Record<string, string> = {
    not_started: 'Not Started',
    in_progress: 'In Progress',
    completed: 'Completed',
  };

  return (
    <Link to={`/course-details/${course.id}`} data-nav="course" className="group">
      <Card className="!p-0 overflow-hidden hover:shadow-soft-lg transition-all">
        {/* Thumbnail */}
        <div className="relative aspect-video">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
              <Play className="w-6 h-6 text-primary-600 ml-1" />
            </div>
          </div>
          <div className="absolute top-3 left-3 flex gap-2">
            {(() => {
              const diff = (course.difficulty || '').toLowerCase();
              const classes = difficultyColors[diff] ?? 'bg-gray-100 text-gray-700';
              const label = diff ? diff.charAt(0).toUpperCase() + diff.slice(1) : 'Unknown';
              return (
                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${classes}`}>
                  {label}
                </span>
              );
            })()}
          </div>
          <div className="absolute bottom-3 right-3">
            <span className="flex items-center gap-1 text-white text-xs font-medium bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
              <Clock className="w-3 h-3" />
              {formatDuration(course.total_duration_minutes)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-primary-600 transition-colors">
            {course.title}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2 mb-4">{course.description}</p>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <span className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              {course.lectures_count} lectures
            </span>
            <span>{course.sections_count} sections</span>
          </div>

          {/* Progress */}
          {course.status !== 'not_started' && (
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600">{statusLabels[course.status]}</span>
                <span className="font-medium text-gray-900">{course.progress_percent}%</span>
              </div>
              <LinearProgress
                value={course.progress_percent}
                colorClass={course.status === 'completed' ? 'from-green-500 to-green-600' : 'from-primary-500 to-secondary-500'}
              />
            </div>
          )}

          {/* Last viewed */}
          {course.last_lecture_title && (
            <p className="text-xs text-gray-500 truncate">
              Last: {course.last_lecture_title}
            </p>
          )}
        </div>
      </Card>
    </Link>
  );
}