import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useGetSingleCource } from '../../hooks/useGetSingleCource';
import { CourseNavbar,CourseHeroCard ,CourseContentAccordion} from './components/index';

export default function CourseDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { course, loading, error } = useGetSingleCource(id || '');

  return (
    <div className="min-h-screen bg-[#FAFAFC]">
      <CourseNavbar />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Link
          to="/courses"
          data-nav="courses"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </Link>

        {loading && (
          <div className="text-center py-20 text-gray-500">Loading course details...</div>
        )}

        {!loading && (error || !course) && (
          <div className="text-center py-20 text-red-600">{error || 'Course not found'}</div>
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