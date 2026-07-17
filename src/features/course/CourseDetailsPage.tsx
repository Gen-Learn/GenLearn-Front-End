import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { useGetSingleCource } from '@/hooks/queries/useGetSingleCource';
import { CourseHeroCard, CourseContentAccordion } from './components/index';
import { FullPageLoader } from '@/components/loading';
import { EmptyState } from '@/components/empty-states';
import { Header } from '@/layout/index';
import { CourseDetailsSkeleton } from '@/components/loading';
import { useGetCoursesImages } from '@/hooks/queries/useGetCoursesImages';
import { useGetAllCourses } from '@/hooks/queries/useGetAllCources';
export default function CourseDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: course, isLoading, error } = useGetSingleCource(id || '');
  const { data: coursesData } = useGetAllCourses({ page: 1, limit: 100 });
  const imageUrl = coursesData?.courses?.find((c) => c.id === id)?.imageUrl;
  const courseForImages = course && imageUrl ? { ...course, imageUrl } : course;
  const { courseImages, loadingImages } = useGetCoursesImages(courseForImages ? [ courseForImages ] : []);
  return (
    <div className="min-h-screen bg-[#FAFAFC]">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Link
          to="/courses"
          data-nav="courses"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </Link>

        {(isLoading || loadingImages) && <CourseDetailsSkeleton />}

        {!isLoading && (error || !course) && (
          <EmptyState
            title="Course not found"
            description={error instanceof Error ? error.message : "We could not find the course you requested."}
            icon={BookOpen}
          />
        )}

        {!isLoading && !loadingImages && course && (
          <>
            <CourseHeroCard course={course} courseImages={courseImages} />
            <CourseContentAccordion sections={course.sections || []} courseId={course.id} />
          </>
        )}
      </main>
    </div>
  );
}