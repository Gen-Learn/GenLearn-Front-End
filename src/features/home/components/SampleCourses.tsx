import { Play, Clock, ChevronRight } from 'lucide-react';
import { LinearProgress } from '@/components/ui/Progress';
import Button from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import { useRecentCourses } from '@/hooks/queries/useGetRecentCourses';
import { useGetCoursesImages } from '@/hooks/queries/useGetCoursesImages';
import { CourseCardSkeleton, Skeleton } from '@/components/loading/index';

export default function SampleCourses() {
  const { data: courses, isLoading, isError } = useRecentCourses({ page: 1, limit: 4 });
  const { courseImages, loadingImages } = useGetCoursesImages(courses?.courses ?? []);

  if (isLoading || loadingImages) {
    return (
      <section id="courses" className="py-24 bg-[#F5F7FB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="text-sm font-semibold text-primary-600 tracking-wider uppercase mb-3">
                Sample Courses
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                AI-Generated Masterpieces
              </h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[ ...Array(4) ].map((_, i) => (
              <CourseCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError || !courses || courses.courses.length === 0) {
    return null;
  }

  return (
    <section id="courses" className="py-24 bg-[#F5F7FB]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-sm font-semibold text-primary-600 tracking-wider uppercase mb-3">
              Sample Courses
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
              AI-Generated Masterpieces
            </h2>
          </div>
          <Link to="/courses">
            <Button variant="secondary">
              View All Courses
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.courses.map((course) => {
            const imageSrc = courseImages[ course.id ];

            return (
              <div
                key={course.id}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-gray-100">
                  {loadingImages ? (
                    <Skeleton className="w-full h-full" />
                  ) : imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={course.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <Play className="w-10 h-10" />
                    </div>
                  )}
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                      <Play className="w-6 h-6 text-primary-600 ml-1" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  {course.courseDurationInMinutes > 0 && (
                    <div className="absolute bottom-3 right-3">
                      <div className="flex items-center gap-1 text-white text-xs font-medium bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                        <Clock className="w-3 h-3" />
                        {course.courseDurationInMinutes}m
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {course.name}
                  </h3>

                  {/* Progress — always shown, even at 0%, so cards don't jump in height */}
                  <div className="mb-3">
                    <LinearProgress
                      value={course.percentage}
                      showValue
                      colorClass={
                        course.percentage === 100
                          ? 'from-green-500 to-green-600'
                          : 'from-primary-500 to-secondary-500'
                      }
                    />
                  </div>

                  {/* CTA */}
                  <Link
                    to={`/course-details/${course.id}`}
                    className="block w-full py-2.5 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-primary-50 hover:text-primary-600 transition-colors flex items-center justify-center gap-2 text-center"
                  >
                    {course.progress === 0 && 'Start Course'}
                    {course.progress > 0 && course.progress < 100 && 'Continue Learning'}
                    {course.progress === 100 && 'Review Course'}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}