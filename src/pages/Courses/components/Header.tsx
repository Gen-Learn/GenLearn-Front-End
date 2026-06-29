import React from 'react'
import { Button } from '@/components/ui'
import { Link } from 'react-router-dom'
import { ArrowLeft, Zap} from 'lucide-react';
export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">GenLearn</span>
          </Link>
          <Link to="/">
            <Button variant="ghost"><ArrowLeft className="w-4 h-4" />Back</Button>
          </Link>
        </div>
      </header>
  )
}
