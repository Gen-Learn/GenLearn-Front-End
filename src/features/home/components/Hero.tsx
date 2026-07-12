import { ArrowRight, Upload, Sparkles, BookOpen, Video, Brain } from 'lucide-react';
import  Button  from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import {useAuth} from "@/contexts/AuthContext"
export default function Hero() {
  const{isAuthenticated} =useAuth();
  return (
    <section className="relative min-h-screen pt-20 pb-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute inset-0 dot-pattern opacity-30" />

      {/* Floating Orbs */}
      <div className="floating-orb w-96 h-96 bg-primary-400 top-20 -left-48" />
      <div className="floating-orb w-80 h-80 bg-secondary-400 top-40 right-0" style={{ animationDelay: '2s' }} />
      <div className="floating-orb w-64 h-64 bg-primary-300 bottom-20 left-1/3" style={{ animationDelay: '4s' }} />

      {/* Neural Lines Overlay */}
      <div className="absolute inset-0 neural-lines opacity-20" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-2xl">

            {/* Headline */}
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 leading-tight mb-6 animate-slide-up">
              Turn Any Scientific Book Into an{' '}
              <span className="text-gradient-animated">Interactive AI Course</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-600 leading-relaxed mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Upload your PDF and let AI generate video lectures, quizzes, summaries, and personalized learning paths automatically. Transform passive reading into active learning.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-5 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              
              <Link to={isAuthenticated ? "/courses":"/signup"}>
                <Button size="lg">
                  {isAuthenticated ? "Start Learning" : "Start Free"}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to={isAuthenticated ? "/generate":"/login"}>
                <Button variant="secondary" size="lg">
                  <Upload className="w-5 h-5" />
                  Upload PDF
                </Button>
              </Link>
            </div>
   
          </div>

          {/* Right Side - AI Illustration */}
          <div className="relative lg:pl-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {/* Main Card */}
            <div className="relative">
              {/* Processing Pipeline */}
              <div className="glass-gradient rounded-3xl p-8 shadow-glass-lg">
                {/* Pipeline Steps */}
                <div className="grid grid-cols-5 gap-3 mb-8">
                  {[
                    { icon: BookOpen, label: 'PDF', color: 'from-gray-500 to-gray-600' },
                    { icon: Brain, label: 'AI', color: 'from-primary-500 to-primary-600' },
                    { icon: Sparkles, label: 'Course', color: 'from-secondary-500 to-secondary-600' },
                    { icon: Video, label: 'Videos', color: 'from-primary-500 to-secondary-500' },
                    { icon: BookOpen, label: 'Quiz', color: 'from-green-500 to-green-600' },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg animate-float`}
                        style={{ animationDelay: `${i * 0.2}s` }}
                      >
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-medium text-gray-600">{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* Connecting Lines Animation */}
                <div className="relative h-2 mb-8">
                  <div className="absolute inset-0 bg-gray-100 rounded-full overflow-hidden">
                    <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500 animate-gradient bg-300% rounded-full" />
                  </div>
                </div>

                {/* Sample Output Preview */}
         <div className="flex items-center gap-4 text-sm text-gray-500 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 border-2 border-white flex items-center justify-center text-xs text-white font-medium"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <span>
                <strong className="text-gray-900">50,000+</strong> students already learning
              </span>
            </div>
              </div>

              {/* Floating AI Particles */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 rounded-full bg-primary-400 animate-float opacity-40"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                />
              ))}

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br from-secondary-400/20 to-primary-400/20 blur-xl" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-gradient-to-br from-primary-400/20 to-secondary-400/20 blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
