import { Link } from 'react-router-dom';
import { Bell, Zap } from 'lucide-react';
import { Button } from '@/components/ui/index';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" data-nav="courses" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">GenLearn</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/generate" data-nav="upload">
            <Button variant="ghost" size="sm">Upload PDF</Button>
          </Link>
          <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary-500" />
          </button>
          <Link
            to="/profile"
            data-nav="profile"
            className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white font-semibold hover:scale-105 transition-transform"
          >
            JP
          </Link>
        </div>
      </div>
    </header>
  );
}