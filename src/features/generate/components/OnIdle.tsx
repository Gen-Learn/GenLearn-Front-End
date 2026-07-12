import { useRef } from 'react';
import {
  Upload as UploadIcon,
  FileText,
  Brain,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui';

type OnIdleProps = {
  isDragOver: boolean;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef?: React.RefObject<HTMLInputElement>;
};

export default function OnIdle({ isDragOver, handleDragOver, handleDragLeave, handleDrop, handleFileSelect, fileInputRef }: OnIdleProps) {


  return (
    <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
                Transform Your PDF Into a{' '}
                <span className="text-gradient-animated">Complete Course</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-xl mx-auto">
                Upload any scientific textbook, research paper, or PDF. Our AI will create video lectures, quizzes, and learning materials in minutes.
              </p>
            </div>

            <div
              className={`relative border-3 border-dashed rounded-3xl p-12 text-center transition-all duration-300 cursor-pointer group ${
                isDragOver
                  ? 'border-primary-400 bg-primary-50 scale-[1.02]'
                  : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-gray-50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef?.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleFileSelect}
              />

              <div className="w-24 h-24 mx-auto mb-6 relative">
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 opacity-20 ${isDragOver ? 'animate-pulse' : ''}`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center transition-transform group-hover:scale-110 ${isDragOver ? 'animate-float' : ''}`}>
                    <UploadIcon className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {isDragOver ? 'Drop your PDF here' : 'Drag & drop your PDF'}
              </h3>
              <p className="text-gray-500 mb-6">or click to browse from your computer</p>

              <Button className="pointer-events-none">
                <UploadIcon className="w-5 h-5" />
                Select PDF File
              </Button>

              <p className="text-sm text-gray-400 mt-4">Supports: PDF files up to 100MB</p>
            </div>

            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              {[
                { icon: FileText, title: 'Textbooks', desc: 'Any scientific textbook works great' },
                { icon: Brain, title: 'Research Papers', desc: 'Transform papers into courses' },
                { icon: Sparkles, title: 'Lecture Notes', desc: 'Convert notes to interactive content' },
              ].map((tip, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100">
                  <tip.icon className="w-5 h-5 text-primary-500 mb-2" />
                  <p className="font-medium text-gray-900">{tip.title}</p>
                  <p className="text-sm text-gray-500">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>
  )
}
