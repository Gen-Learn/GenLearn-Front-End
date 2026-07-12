import {
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui';

type OnFailedProps = {
  error?: string;
  file?: File | null;
  resetUpload: () => void;
  retryUpload: () => void;
};
export default function OnFailed( { error, file, resetUpload, retryUpload }: OnFailedProps) {
  return (
    <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-12 h-12 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-gray-500 mb-8">{error || "We couldn't generate your course. Please try again."}</p>
            <div className="flex gap-4 justify-center">
              <Button variant="secondary" onClick={resetUpload}>
                Upload a Different File
              </Button>
              {file && (
                <Button onClick={retryUpload}>
                  <RefreshCw className="w-4 h-4" />
                  Retry
                </Button>
              )}
            </div>
          </div>
  )
}
