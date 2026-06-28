import { Home, Search, BookOpen } from 'lucide-react';
import { Button, Card } from '../components/ui/index';
import { Link } from 'react-router-dom';

const suggestedPages = [
  { title: 'Browse Courses', href: '/courses', icon: BookOpen },
  { title: 'Upload a PDF', href: '/upload', icon: BookOpen },
  { title: 'Dashboard', href: '/dashboard', icon: BookOpen },
  { title: 'Contact Support', href: '/contact', icon: BookOpen },
];

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFC] flex items-center justify-center p-8">
      <div className="max-w-lg w-full text-center">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="text-[12rem] font-extrabold text-gray-100 leading-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Book illustration */}
              <div className="w-32 h-32 mx-auto mb-6 relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 transform rotate-6" />
                <div className="absolute inset-0 rounded-2xl bg-white shadow-lg flex items-center justify-center">
                  <div className="text-5xl">📚</div>
                </div>
                {/* Floating question marks */}
                <div className="absolute -top-2 -right-2 text-2xl animate-bounce">?</div>
                <div className="absolute -bottom-2 -left-2 text-xl animate-bounce" style={{ animationDelay: '0.3s' }}>?</div>
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          This Page Skipped Class Today
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Looks like this page wandered off to study somewhere else. Let's get you back on track!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link to="/" data-nav="landing">
            <Button size="lg">
              <Home className="w-5 h-5" />
              Back Home
            </Button>
          </Link>
          <Link to="/courses" data-nav="courses">
            <Button size="lg" variant="secondary">
              <Search className="w-5 h-5" />
              Browse Courses
            </Button>
          </Link>
        </div>

        {/* Suggested Pages */}
        <p className="text-sm text-gray-500 mb-4">Or try one of these:</p>
        <div className="grid grid-cols-2 gap-3">
          {suggestedPages.map((page) => (
            <Link key={page.title} to={page.href} data-nav={page.href.replace('#!/', '')}>
              <Card className="hover:bg-gray-50 transition-colors !py-3">
                <div className="flex items-center gap-2 justify-center">
                  <page.icon className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">{page.title}</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Fun fact */}
        <div className="mt-12 p-4 bg-primary-50 rounded-xl">
          <p className="text-sm text-primary-700">
            <strong>Fun fact:</strong> 404 error codes were named after a missing folder in the CERN web server named "404." True story!
          </p>
        </div>
      </div>
    </div>
  );
}
