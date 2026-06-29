import { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Grid,
  List,
  BookOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/index';
import { Link } from 'react-router-dom';
import {CourseListItem,CourseCard,Header} from "./components/index"
import {useGetAllCourses} from "@/hooks/useGetAllCources";
import Course from '@/types/coursesModel';


type ViewMode = 'grid' | 'list';
type SortOption = 'recent' | 'title' | 'progress' | 'duration';
type DifficultyFilter = 'all' | 'beginner' | 'intermediate' | 'advanced';
type StatusFilter = 'all' | 'not_started' | 'in_progress' | 'completed';

type DisplayCourse = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  total_duration_minutes: number;
  sections_count: number;
  lectures_count: number;
  status: string;
  progress_percent: number;
  last_lecture_title: string | null;
};

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [showFilters, setShowFilters] = useState(false);
  const { courses, loading, error } = useGetAllCourses();

  const mapCourseForDisplay = (course: Course): DisplayCourse => {
    const sections = course.sections ?? [];
    const lectures = sections.flatMap((section) => section?.lectures ?? []);

    return {
      id: course.id,
      title: course.name,
      description: course.description,
      thumbnail:
        'https://images.pexels.com/photos/8438980/pexels-photo-8438980.jpeg?auto=compress&cs=tinysrgb&w=800',
      total_duration_minutes: 0,
      sections_count: course.numsOfSections,
      lectures_count: lectures.length,
      status: course.status,
      progress_percent: course.progress,
      last_lecture_title: lectures.length > 0 ? lectures[lectures.length - 1].name : null,
    };
  };

  const filteredCourses = useMemo(() => {
    const normalizedCourses = courses.filter(Boolean).map(mapCourseForDisplay);
    let coursesCopy = [...normalizedCourses];

    // Search filter
    if (searchQuery) {
      coursesCopy = coursesCopy.filter(c =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      coursesCopy = coursesCopy.filter(c => c.status === statusFilter);
    }

    // Sorting
    switch (sortBy) {
      case 'title':
        coursesCopy.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'progress':
        coursesCopy.sort((a, b) => b.progress_percent - a.progress_percent);
        break;
      case 'duration':
        coursesCopy.sort((a, b) => a.total_duration_minutes - b.total_duration_minutes);
        break;
      case 'recent':
      default:
        coursesCopy.sort((a, b) => {
          const statusOrder: Record<string, number> = { in_progress: 0, not_started: 1, completed: 2 };
          return statusOrder[a.status] - statusOrder[b.status];
        });
    }

    return coursesCopy;
  }, [courses, searchQuery, statusFilter, sortBy]);

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC]">
      {/* Header */}
      <Header/>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
          <p className="text-gray-600">Continue learning from your generated courses</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          {/* Search Bar */}
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
              {(difficultyFilter !== 'all' || statusFilter !== 'all') && (
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

          {/* Filter Panel */}
          {showFilters && (
            <div className="flex flex-wrap gap-4 p-4 bg-white rounded-2xl border border-gray-200">
              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Status:</span>
                <div className="flex gap-2">
                  {(['all', 'not_started', 'in_progress', 'completed'] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        statusFilter === status
                          ? 'bg-primary-100 text-primary-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {status === 'all' ? 'All' : status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
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

        {/* Results Count */}
        <p className="text-sm text-gray-500 mb-4">
          {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
        </p>

        {/* Courses Grid/List */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters or search query</p>
            <Link to ="/generate" data-nav="upload">
              <Button>Upload a new PDF</Button>
            </Link>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                formatDuration={formatDuration}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCourses.map((course) => (
              <CourseListItem
                key={course.id}
                course={course}
                formatDuration={formatDuration}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
