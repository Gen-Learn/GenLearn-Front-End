import {
  Sparkles,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui';
import { Link } from 'react-router-dom';
import {useGetSingleCource} from "@/hooks/useGetSingleCource"
type OnCompleteProps = {
  courseName?: string;
  courseId?: string;
  downloadUrl?: string;
  resetUpload: () => void;
};
export default function OnComplete({ courseName, courseId, resetUpload }: OnCompleteProps) {
  const { course } = useGetSingleCource(courseId || '');

  return (
    <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8 relative inline-block">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto shadow-glow-lg animate-scale-in">
                <CheckCircle2 className="w-16 h-16 text-white" />
              </div>
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-green-400 animate-fade-in"
                  style={{
                    top: `${50 + 50 * Math.cos((i * Math.PI * 2) / 12)}%`,
                    left: `${50 + 50 * Math.sin((i * Math.PI * 2) / 12)}%`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>

            <h2 className="text-3xl font-extrabold text-gray-900 mb-4 animate-slide-up">
              Your Course is Ready!
            </h2>
            <p className="text-lg text-gray-600 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              AI has successfully transformed your PDF into an interactive learning experience.
            </p>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-soft text-left overflow-hidden mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="p-6 flex gap-4">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">{courseName || 'Course'}</h3>
                  <p className="text-gray-500 text-sm mb-3">Generated from your uploaded document</p>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <span className="text-sm text-gray-500">Ready to start learning</span>
                  <Link to={`/course/${courseId}/section/${course?.sections?.[0]?.id}/lecture/${course?.sections?.[0]?.lectures?.[0]?.id}`} data-nav="course">
                    <Button size="sm">
                      Start Course <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
              </div>
            </div>

            <div className="flex gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button variant="secondary" onClick={resetUpload}>
                Upload Another PDF
              </Button>
              <Link to="/dashboard" data-nav="dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
            </div>
          </div>
  )
}
