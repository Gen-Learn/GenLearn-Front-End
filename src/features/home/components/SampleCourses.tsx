import { Play, Clock, ChevronRight } from 'lucide-react';
import {LinearProgress}  from '@/components/ui/Progress';
import  Button  from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Link } from 'react-router-dom';

const courses = [
  {
    title: 'Quantum  Fundamentals',
    thumbnail: 'https://images.pexels.com/photos/8438980/pexels-photo-8438980.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '3h 45m',
    lectures: 12,
    difficulty: 'Advanced',
    progress: 33,
    category: 'Physics',
  },
  {
    title: 'Molecular Biology Essentials',
    thumbnail: 'https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '5h 20m',
    lectures: 18,
    difficulty: 'Intermediate',
    progress: 67,
    category: 'Biology',
  },
  {
    title: 'Machine Learning Basics',
    thumbnail: 'https://images.pexels.com/photos/8438980/pexels-photo-8438980.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '6h 15m',
    lectures: 22,
    difficulty: 'Beginner',
    progress: 100,
    category: 'Computer Science',
  },
  {
    title: 'Organic Chemistry Reactions',
    thumbnail: 'https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '4h 30m',
    lectures: 15,
    difficulty: 'Intermediate',
    progress: 20,
    category: 'Chemistry',
  },
];

export default function SampleCourses() {
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
          {courses.map((course, i) => (
            <div
              key={i}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                    <Play className="w-6 h-6 text-primary-600 ml-1" />
                  </div>
                </div>
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <Badge variant="primary" className="bg-white/90 backdrop-blur-sm text-primary-700">
                    {course.category}
                  </Badge>
                </div>
                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3">
                  <div className="flex items-center gap-1 text-white text-xs font-medium bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                    <Clock className="w-3 h-3" />
                    {course.duration}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                  {course.title}
                </h3>

                <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                  <span>{course.lectures} lectures</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span className={`
                    ${course.difficulty === 'Beginner' ? 'text-green-600' : ''}
                    ${course.difficulty === 'Intermediate' ? 'text-amber-600' : ''}
                    ${course.difficulty === 'Advanced' ? 'text-red-600' : ''}
                  `}>
                    {course.difficulty}
                  </span>
                </div>

                {/* Progress */}
                {course.progress > 0 && (
                  <div className="mb-3">
                    <LinearProgress
                      value={course.progress}
                      showValue
                      colorClass={course.progress === 100 ? 'from-green-500 to-green-600' : 'from-primary-500 to-secondary-500'}
                    />
                  </div>
                )}

                {/* CTA */}
                <Link to="/course" className="block w-full py-2.5 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-primary-50 hover:text-primary-600 transition-colors flex items-center justify-center gap-2 text-center">
                  {course.progress === 0 && 'Start Course'}
                  {course.progress > 0 && course.progress < 100 && 'Continue Learning'}
                  {course.progress === 100 && 'Review Course'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
