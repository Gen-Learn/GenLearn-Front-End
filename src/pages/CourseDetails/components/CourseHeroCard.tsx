import { BookOpen, Play, Award, Film } from 'lucide-react';
import { Button, Card, Badge, LinearProgress, CircularProgress } from '@/components/ui/index';
import { Link } from 'react-router-dom';
import img from '@/assets/images/Cardimg.png';
import  Course from "@/types/coursesModel"



type Props = {
  course: Course;
};

const statusLabels: Record<string, string> = {
  not_started: 'Not Started',
  in_progress: 'In Progress',
  completed: 'Completed',
};

const statusColors: Record<string, string> = {
  not_started: 'bg-gray-100 text-gray-700',
  in_progress: 'bg-primary-100 text-primary-700',
  completed: 'bg-green-100 text-green-700',
};

export default function CourseHeroCard({ course}: Props) {
  const status = course.status ?? 'not_started';
  const courseName = course.name || 'Untitled Course';
  const courseDescription = course.description || 'No description available';
  const courseProgress = course.progress ?? 0;
  const numsOfSections = course.sections.length ;
  const totalLectures = course.sections.reduce((acc,section)=>{
    if(section.lectures) acc++;
    return acc;
  },0)
  const totalQuizzes =   numsOfSections + totalLectures;
  return (
    <Card className="!p-0 overflow-hidden mb-8">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-96 flex-shrink-0">
          <div className="relative aspect-video lg:aspect-auto lg:h-full">
            <img src={img} alt={courseName} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-r" />
            <div className="absolute bottom-4 left-4 lg:bottom-auto lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
              <div className="relative">
                <CircularProgress
                  value={courseProgress}
                  size={80}
                  strokeWidth={6}
                  showValue
                  colorClass={status === 'completed' ? 'text-green-500' : 'text-white'}
                />
                <div className="absolute inset-0 rounded-full bg-black/20 backdrop-blur-sm -z-10" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 lg:p-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className={statusColors[status]}>{statusLabels[status] ?? status}</Badge>
          </div>

          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">{courseName}</h1>
          <p className="text-gray-600 mb-6 leading-relaxed line-clamp-5">{courseDescription}</p>

          <div className="flex flex-wrap gap-6 mb-6">
            <div className="flex items-center gap-2 text-gray-600">
              <BookOpen className="w-5 h-5" />
              <span>
                {numsOfSections} Section{numsOfSections !== 1 ? 's' : ''}
              </span>
            </div>
            {typeof totalLectures === 'number' && (
              <div className="flex items-center gap-2 text-gray-600">
                <Film className="w-5 h-5" />
                <span>{totalLectures} Lectures</span>
              </div>
            )}
            {typeof totalQuizzes === 'number' && (
              <div className="flex items-center gap-2 text-gray-600">
                <Award className="w-5 h-5" />
                <span>{totalQuizzes} Quizzes</span>
              </div>
            )}
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Course Progress</span>
              <span className="text-lg font-bold text-gray-900">{courseProgress}%</span>
            </div>
            <LinearProgress
              value={courseProgress}
              colorClass={status === 'completed' ? 'from-green-500 to-green-600' : 'from-primary-500 to-secondary-500'}
            />
          </div>

          <Link to={`/course/${course?.id}/section/${course?.sections?.[0]?.id}/lecture/${course?.sections?.[0]?.lectures?.[0]?.id}`} data-nav="lecture">
            <Button size="lg" className="w-full sm:w-auto">
              <Play className="w-5 h-5" />
              {status === 'not_started' ? 'Start Course' : 'Continue Learning'}
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}