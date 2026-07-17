import { BookOpen, Play, Award, Film } from 'lucide-react';
import { Button, Card, Badge, LinearProgress, CircularProgress } from '@/components/ui/index';
import { Link } from 'react-router-dom';
import Course from "@/types/coursesModel"

interface CourseImageMap {
  [ courseId: string ]: string; // courseId -> object URL
}

type Props = {
  course: Course;
  courseImages: CourseImageMap
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

export default function CourseHeroCard({ course, courseImages }: Props) {
  const status = course.percentage > 0 && course.percentage < 100 ? 'in_progress' :
    course.percentage === 100 ?
      'completed' : 'not_started';
  const courseName = course.name || 'Untitled Course';
  const courseDescription = course.description || 'No description available';
  const courseProgress = course.percentage ?? 0;
  const numsOfSections = course.sections.length;
  const totalLectures = course.sections.reduce((acc, section) => {
    if (section.lectures) acc = acc + section.lectures.length;
    return acc;
  }, 0)
  const totalQuizzes = numsOfSections + totalLectures - 1;
  console.log("imageUrl:", courseImages[ course.id ], "id:", course?.id, "type:", typeof course?.id);
  return (
    <Card className="!p-0 overflow-hidden mb-8">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-96 flex-shrink-0">
          <div className="relative aspect-video lg:aspect-auto lg:h-full">
            {courseImages[ course.id ] ? (
              <img src={courseImages[ course.id ]} alt={courseName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                <BookOpen className="w-12 h-12" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-r" />
          </div>
        </div>

        <div className="flex-1 p-6 lg:p-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className={statusColors[ status ]}>{statusLabels[ status ] ?? status}</Badge>
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

          <Link to={`/course/${course?.id}/section/${course?.sections?.[ 0 ]?.id}/lecture/${course?.sections?.[ 0 ]?.lectures?.[ 0 ]?.id}`} data-nav="lecture">
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