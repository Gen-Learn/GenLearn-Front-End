import Course from "@/types/coursesModel"
import { Link } from "react-router-dom";
import {Card ,LinearProgress} from "@/components/ui/index"
import {
  Clock,
  BookOpen,
  Play,
} from 'lucide-react';
type props ={
    
    id: string,
    title: string| "Quantum Physics Fundamentals",
    description: string|null,
    thumbnail: string| "https://images.pexels.com/photos/8438980/pexels-photo-8438980.jpeg?auto=compress&cs=tinysrgb&w=800",
    courseDurationInMinutes: number,
    sections_count: number | 4,
    lectures_count: number | 4,
    status:string | null,
    progress_percent: number | 4,
  
}
export default function CourseListItem({ course, formatDuration }: { course: props; formatDuration: (m: number) => string }) {
  const statusLabels = {
    not_started: 'Not Started',
    in_progress: 'In Progress',
    completed: 'Completed',
  };

  return (
    <Link to={`/course-details/${course.id}`} data-nav="course" className="block">
      <Card className="flex gap-6 hover:shadow-soft-lg transition-all">
        {/* Thumbnail */}
        <div className="w-48 flex-shrink-0">
          <div className="relative aspect-video rounded-xl overflow-hidden">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                <Play className="w-5 h-5 text-primary-600 ml-0.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <h3 className="font-bold text-gray-900 text-lg hover:text-primary-600 transition-colors">
                {course.title}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-1 mt-1">{course.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-500 mb-3">
            <span className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              {course.lectures_count} lectures
            </span>
            <span>{course.sections_count} sections</span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {formatDuration(course.courseDurationInMinutes)}
            </span>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-4">
            <div className="flex-1 max-w-xs">
              <LinearProgress
                value={course.progress_percent}
                colorClass={course.status === 'completed' ? 'from-green-500 to-green-600' : 'from-primary-500 to-secondary-500'}
              />
            </div>
            <span className="text-sm font-medium text-gray-900">
              {course.status === 'not_started' ? statusLabels[course.status] : `${course.progress_percent}%`}
            </span>
          </div>

        </div>
      </Card>
    </Link>
  );
}
