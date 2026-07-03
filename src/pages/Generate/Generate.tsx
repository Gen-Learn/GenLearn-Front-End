import { useRef } from 'react';
import {
  Upload as UploadIcon,
  FileText,
  Brain,
  Sparkles,
  CheckCircle2,
  Loader2,
  ChevronRight,
  Zap,
  ArrowLeft,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { Link } from 'react-router-dom';
import handleGenerate from './utils/handleGenerate';

export default function UploadPage() {
  const {
    resetUpload,
    retryUpload,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileSelect,
    isDragOver,
    file,
    processingStage,
    uploadProgress,
    jobStatus,
    downloadUrl,
    error,
    connectionStatus
  }=handleGenerate();
  const fileInputRef = useRef<HTMLInputElement>(null);


  return (
    <div className="min-h-screen bg-[#FAFAFC] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="floating-orb w-96 h-96 bg-primary-400 top-0 right-0 opacity-20" />
      <div className="floating-orb w-80 h-80 bg-secondary-400 bottom-0 left-0 opacity-20" style={{ animationDelay: '3s' }} />

      {/* Top Bar */}
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
          <Link to="/landing" data-nav="landing" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">GenLearn</span>
          </Link>
          <div className="w-20" />
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Idle State - Upload Area */}
        {processingStage === 'idle' && (
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
              onClick={() => fileInputRef.current?.click()}
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
        )}

        {/* Uploading / Generating State */}
        {(processingStage === 'uploading' || processingStage === 'generating') && (
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center">
                  <FileText className="w-7 h-7 text-red-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{file?.name || 'Document.pdf'}</p>
                  <p className="text-sm text-gray-500">{file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : ''}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium text-green-600">
                  {processingStage === 'uploading' ? 'Uploading' : 'Processing'}
                </span>
              </div>
            </div>

            <Card className="!p-0 overflow-hidden mb-8">
              <div className="p-8 bg-gradient-to-br from-primary-500/5 to-secondary-500/5">
                <div className="relative w-48 h-48 mx-auto mb-8">
                  <div className="absolute inset-0 rounded-full border-4 border-primary-100 animate-spin-slow" />
                  <div className="absolute inset-4 rounded-full border-4 border-primary-200 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
                  <div className="absolute inset-8 rounded-full border-4 border-dashed border-primary-300 animate-spin-slow" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-glow-lg animate-pulse">
                      <Brain className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-3 h-3 rounded-full bg-primary-400 animate-float"
                      style={{
                        top: `${50 + 40 * Math.cos((i * Math.PI * 2) / 8)}%`,
                        left: `${50 + 40 * Math.sin((i * Math.PI * 2) / 8)}%`,
                        animationDelay: `${i * 0.2}s`,
                        opacity: 0.6,
                      }}
                    />
                  ))}
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Loader2 className="w-5 h-5 text-primary-500 animate-spin" />
                    <span className="text-xl font-bold text-gray-900">
                      {processingStage === 'uploading' ? 'Uploading' : 'Generating Your Course'}
                    </span>
                  </div>
                  <p className="text-gray-500">
                    {processingStage === 'uploading'
                      ? 'Securing your document...'
                      : "AI is building your course — we'll notify you the moment it's ready."}
                  </p>
                </div>
              </div>

              <div className="px-8 py-4 bg-white border-t border-gray-100">
                  {processingStage === 'uploading' ? (
                    <>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Upload Progress</span>
                        <span className="text-lg font-bold text-primary-600">{uploadProgress}%</span>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Status</span>
                      <div className="flex items-center gap-2">
                        {connectionStatus === 'reconnecting' && (
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                            Reconnecting…
                          </span>
                        )}
                        {connectionStatus === 'error' && (
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200">
                            Connection lost
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-primary-50 text-primary-700 border border-primary-200">
                          {jobStatus ? jobStatus.charAt(0).toUpperCase() + jobStatus.slice(1) : 'Pending'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
            </Card>
          </div>
        )}

        {/* Failed State */}
        {processingStage === 'failed' && (
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
        )}

        {/* Complete State */}
        {processingStage === 'complete' && (
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
                  <h3 className="font-bold text-gray-900 mb-1">{file?.name.replace('.pdf', '') || 'Course'}</h3>
                  <p className="text-gray-500 text-sm mb-3">Generated from your uploaded document</p>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <span className="text-sm text-gray-500">Ready to start learning</span>
                {downloadUrl ? (
                  <Link to={downloadUrl} target="_blank" rel="noreferrer">
                    <Button size="sm">
                      Open Course <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                ) : (
                  <Link to="/course" data-nav="course">
                    <Button size="sm">
                      Start Course <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                )}
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
        )}
      </main>
    </div>
  );
}