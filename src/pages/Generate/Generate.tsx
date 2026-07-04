import React, { useRef } from 'react';
import {
  Upload as UploadIcon,
  FileText,
  Brain,
  Sparkles,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { Card } from '@/components/ui';
import handleGenerate from './utils/handleGenerate';
import { OnComplete, OnFailed, StageTimeline, OnIdle, Header } from './components/index';

type ProcessingStage =
  | 'idle'
  | 'connecting'
  | 'connected'
  | 'reconnecting'
  | 'error'
  | 'completed'
  | 'rendering'
  | 'generating'
  | 'extracting'
  | 'uploading';

interface StageInfo {
  id: ProcessingStage;
  label: string;
  description: string;
  icon: typeof UploadIcon;
}

// Ordered to match the backend's actual job lifecycle.
const stages: StageInfo[] = [
  { id: 'uploading', label: 'Uploading', description: 'Securing your document...', icon: UploadIcon },
  { id: 'extracting', label: 'Extracting Content', description: 'AI is reading your document...', icon: FileText },
  { id: 'generating', label: 'Generating Structure', description: 'Building course outline...', icon: Brain },
  { id: 'rendering', label: 'Rendering Content', description: 'Creating final course materials...', icon: Sparkles },
  { id: 'completed', label: 'Complete', description: 'Your course is ready!', icon: CheckCircle2 },
];

const STAGE_ORDER = stages.map((s) => s.id);

// Transport states that mean "connecting to the socket", not yet a real job stage.
// While in one of these, we still show the "in progress" screen but treat the
// timeline as sitting at 'generating' until a real stage status arrives.
const TRANSPORT_STATES: ProcessingStage[] = ['connecting', 'connected', 'reconnecting'];

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
    downloadUrl,
    error,
    courseId,
    courseName,
  } = handleGenerate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // processingStage IS the active stage now — no separate jobStatus to
  // reconcile against. We only need to map transport states (connecting/
  // connected/reconnecting) onto a sensible timeline position, since those
  // aren't one of the 5 stages shown in the timeline.
const activeStageId: ProcessingStage =
  processingStage === 'completed'
    ? 'completed'
    : (STAGE_ORDER as string[]).includes(processingStage)
    ? processingStage
    : 'uploading'; // connecting/connected/reconnecting/idle -> no real stage yet, don't fast-forward

  const activeIndex = STAGE_ORDER.indexOf(activeStageId);
  const isJobDone = processingStage === 'completed';

  // Covers every "job is running" state: the initial upload, the socket
  // connecting/reconnecting, and every real backend stage.
  const isInProgress =
    processingStage === 'uploading' ||
    processingStage === 'extracting' ||
    processingStage === 'generating' ||
    processingStage === 'rendering' ||
    TRANSPORT_STATES.includes(processingStage);

  return (
    <div className="min-h-screen bg-[#FAFAFC] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="floating-orb w-96 h-96 bg-primary-400 top-0 right-0 opacity-20" />
      <div className="floating-orb w-80 h-80 bg-secondary-400 bottom-0 left-0 opacity-20" style={{ animationDelay: '3s' }} />

      {/* Top Bar */}
      <Header />

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Idle State - Upload Area */}
        {processingStage === 'idle' && (
          <OnIdle
            isDragOver={isDragOver}
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
            handleDrop={handleDrop}
            handleFileSelect={handleFileSelect}
            fileInputRef={fileInputRef as React.RefObject<HTMLInputElement>}
          />
        )}

        {/* Uploading / Connecting / Generating State */}
        {isInProgress && (
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
                      {activeStageId === 'uploading' && <UploadIcon className="w-10 h-10 text-white" />}
                      {activeStageId === 'extracting' && <FileText className="w-10 h-10 text-white" />}
                      {activeStageId === 'generating' && <Brain className="w-10 h-10 text-white" />}
                      {activeStageId === 'rendering' && <Sparkles className="w-10 h-10 text-white" />}
                      {activeStageId === 'completed' && <CheckCircle2 className="w-10 h-10 text-white" />}
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
                      {processingStage === 'uploading'
                        ? 'Uploading'
                        : stages.find((s) => s.id === activeStageId)?.label ?? 'Generating Your Course'}
                    </span>
                  </div>
                  <p className="text-gray-500">
                    {processingStage === 'uploading'
                      ? 'Securing your document...'
                      : stages.find((s) => s.id === activeStageId)?.description ??
                        "AI is building your course — we'll notify you the moment it's ready."}
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
                      {processingStage === 'reconnecting' && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                          Reconnecting…
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-primary-50 text-primary-700 border border-primary-200">
                        {processingStage.charAt(0).toUpperCase() + processingStage.slice(1)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Stage Timeline */}
            <StageTimeline
              stages={stages}
              activeStageId={activeStageId}
              activeIndex={activeIndex}
              isJobDone={isJobDone}
            />
          </div>
        )}

        {/* Failed State */}
        {processingStage === 'error' && (
          <OnFailed
            error={error ?? undefined}
            file={file ?? null}
            resetUpload={resetUpload}
            retryUpload={retryUpload}
          />
        )}

        {/* Complete State */}
        {processingStage === 'completed' && (
          <OnComplete
            courseName={courseName ?? undefined}
            courseId={courseId ?? undefined}
            downloadUrl={downloadUrl ?? undefined}
            resetUpload={resetUpload}
          />
        )}
      </main>
    </div>
  );
}