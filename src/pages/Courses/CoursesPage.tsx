import { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Grid,
  List,
  BookOpen,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/index';
import { CourseListItem, CourseCard } from "./components/index";
import { Header } from '@/layout/index';
import { useGetAllCourses } from "@/hooks/queries/useGetAllCources";
import { useGetSingleCource } from '@/hooks/queries/useGetSingleCource';
import Course from '@/types/coursesModel';
import { CourseGridSkeleton } from '@/components/loading';
import { EmptyState } from '@/components/empty-states';
import { Link } from 'react-router-dom';
import { useGetCoursesImages } from "@/hooks/queries/useGetCoursesImages"
type ViewMode = 'grid' | 'list';
type SortOption = 'recent' | 'title' | 'progress' | 'duration';
type StatusFilter = 'all' | 'not_started' | 'in_progress' | 'completed';

type DisplayCourse = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  courseDurationInMinutes: number;
  sections_count: number;
  lectures_count: number;
  status: string;
  progress_percent: number;
};

// ─── Per-course wrapper: calls the hook at the top level ───────────────────────
function CourseCardWithDetails({
  course,
  formatDuration,
  courseImage,
  viewMode,
}: {
  course: Course;
  formatDuration: (minutes: number) => string;
  courseImage: string;
  viewMode: ViewMode;
}) {
  const { data: singleCourse } = useGetSingleCource(course.id);

  // Use reduce to count total lectures across all sections
  const lecturesCount = useMemo(() => {
    if (!singleCourse?.sections) return 0;
    return singleCourse.sections.reduce(
      (total, section) => total + (section.lectures?.length ?? 0),
      0
    );
  }, [ singleCourse ]);
  const displayCourse: DisplayCourse = {
    id: course.id,
    title: course.name,
    description: course.description,
    thumbnail: courseImage,
    courseDurationInMinutes: course.courseDurationInMinutes,
    sections_count: course.numsOfSections,
    lectures_count: lecturesCount,
    status: course.status,
    progress_percent: course.progress,
  };

  return viewMode === 'grid' ? (
    <CourseCard course={displayCourse} formatDuration={formatDuration} />
  ) : (
    <CourseListItem course={displayCourse} formatDuration={formatDuration} />
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function CoursesPage() {
  const [ searchQuery, setSearchQuery ] = useState('');
  const [ viewMode, setViewMode ] = useState<ViewMode>('grid');
  const [ sortBy, setSortBy ] = useState<SortOption>('recent');
  const [ statusFilter, setStatusFilter ] = useState<StatusFilter>('all');
  const [ showFilters, setShowFilters ] = useState(false);
  const {
    data: courses = [],
    isLoading,
    error,
  } = useGetAllCourses();
  const { courseImages, loadingImages } = useGetCoursesImages();
  const filteredCourses = useMemo(() => {
    let coursesCopy = [ ...courses.filter(Boolean) ];

    if (searchQuery) {
      coursesCopy = coursesCopy.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      coursesCopy = coursesCopy.filter(c => c.status === statusFilter);
    }

    switch (sortBy) {
      case 'title':
        coursesCopy.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'progress':
        coursesCopy.sort((a, b) => b.progress - a.progress);
        break;
      case 'recent':
      default:
        coursesCopy.sort((a, b) => {
          const statusOrder: Record<string, number> = {
            in_progress: 0,
            not_started: 1,
            completed: 2,
          };
          return statusOrder[ a.status ] - statusOrder[ b.status ];
        });
    }

    return coursesCopy;
  }, [ courses, searchQuery, statusFilter, sortBy ]);


  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAFAFC]">
        <Header />
        <main className="max-w-7xl mx-auto px-6 py-8">
          <EmptyState
            title="Unable to load courses"
            description={error instanceof Error ? error.message : "Something went wrong."}
            icon={BookOpen}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFC]">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">

        <div className="mb-8">
          <div className="flex  gap-4 mb-2 justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
            <Link
              to="/"
              data-nav="home"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 "
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
          <p className="text-gray-600">Continue learning from your generated courses</p>
        </div>

        <div className="mb-6 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 bg-white focus:border-primary-300 focus:ring-2 focus:ring-primary-500/20 transition-all"
              />
            </div>
            <Button
              variant="secondary"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
              {statusFilter !== 'all' && (
                <span className="w-2 h-2 rounded-full bg-primary-500" />
              )}
            </Button>
            <div className="flex rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 ${viewMode === 'grid' ? 'bg-primary-50 text-primary-600' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 ${viewMode === 'list' ? 'bg-primary-50 text-primary-600' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="flex flex-wrap gap-4 p-4 bg-white rounded-2xl border border-gray-200">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Status:</span>
                <div className="flex gap-2">
                  {([ 'all', 'not_started', 'in_progress', 'completed' ] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${statusFilter === status
                          ? 'bg-primary-100 text-primary-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                      {status === 'all'
                        ? 'All'
                        : status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm font-medium text-gray-700">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                >
                  <option value="recent">Recently Viewed</option>
                  <option value="title">Title</option>
                  <option value="progress">Progress</option>
                  <option value="duration">Duration</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <p className="text-sm text-gray-500 mb-4">
          {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
        </p>

        {isLoading || loadingImages ? (
          <CourseGridSkeleton />
        ) : filteredCourses.length === 0 ? (
          searchQuery || statusFilter !== 'all' ? (
            <EmptyState
              title="No results found"
              description="Try adjusting your search or filters to find the course you're looking for."
              icon={Search}
            />
          ) : (
            <EmptyState
              title="No courses yet"
              description="Upload your first PDF to transform it into an interactive learning experience with AI."
              icon={BookOpen}
              actionLabel="Generate a course"
              actionHref="/generate"
              dataNav="generate"
            />
          )
        ) : (

          // ↓ viewMode passed down; CourseCardWithDetails renders the right variant
          <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredCourses.map((course) => (
              <CourseCardWithDetails
                key={course.id}
                course={course}
                formatDuration={formatDuration}
                viewMode={viewMode}
                courseImage={courseImages[ course.id ]}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}