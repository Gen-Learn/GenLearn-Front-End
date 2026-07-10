
import {
  Zap,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui';
import { Link } from 'react-router-dom';
import image from '@/assets/images/logoOld.png';

export default function Header() {
  return (
    <header className="relative z-10 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" data-nav="dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        </div>
        <Link to="/" data-nav="landing" className="flex items-center gap-3">
          <img src={image} alt="GenLearn Logo" className="w-15 h-15" />
          <span className="text-xl font-bold text-gray-900">GenLearn</span>
        </Link>
        <div className="w-20" />
      </div>
    </header>
  )
}
