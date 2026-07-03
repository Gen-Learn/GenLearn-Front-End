import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { useGetSingleCource } from '../../hooks/useGetSingleCource';
import { Header,CourseHeroCard ,CourseContentAccordion} from './components/index';
import { FullPageLoader } from '@/components/loading';
import { EmptyState } from '@/components/empty-states';

export default function CourseDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { course, loading, error } = useGetSingleCource(id || '');
  console.log("CourseDetailsPage - course:", course);
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

        {loading && <FullPageLoader />}

        {!loading && (error || !course) && (
          <EmptyState
            title="Course not found"
            description={error ?? 'We could not find the course you requested.'}
            icon={BookOpen}
          />
        )}

        {!loading && course && (
          <>
            <CourseHeroCard course={course} />
            <CourseContentAccordion sections={course.sections || []} id={course.id} />
          </>
        )}
      </main>
    </div>
  );
}