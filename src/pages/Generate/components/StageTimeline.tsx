import {
  Upload as UploadIcon,
  FileText,
  Brain,
  Sparkles,
  CheckCircle2,
  Loader2,
  Video,
  FileQuestion,
} from 'lucide-react';
type ProcessingStage =
  | 'idle'
  | 'connecting'
  | 'connected'
  | 'reconnecting'
  | 'error'
  | 'completed'
  | 'extracting'
  | 'structuring'
  | 'generating_videos'
  | 'generating_quizzes'
  | 'finalizing'
  | 'uploading';

type Stage = {
  id: ProcessingStage;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};
interface StageInfo {
  id: ProcessingStage;
  label: string;
  description: string;
  icon: typeof UploadIcon;
}

const stages: StageInfo[] = [
  { id: 'uploading', label: 'Uploading', description: 'Securing your document...', icon: UploadIcon },
  { id: 'extracting', label: 'Extracting Content', description: 'AI is reading your document...', icon: FileText },
  { id: 'structuring', label: 'Generating Structure', description: 'Building course outline...', icon: Brain },
  { id: 'generating_videos', label: 'Creating Videos', description: 'AI is generating video lectures...', icon: Video },
  { id: 'generating_quizzes', label: 'Generating Quizzes', description: 'Creating intelligent quizzes...', icon: FileQuestion },
  { id: 'finalizing', label: 'Finalizing Course', description: 'Putting everything together...', icon: Sparkles },
  { id: 'completed', label: 'Complete', description: 'Your course is ready!', icon: CheckCircle2 },
];

const STAGE_ORDER = stages.map((s) => s.id);

export default function StageTimeline({
  stages,
  activeStageId,
  activeIndex,
  isJobDone = false,
}: {
  stages: Stage[];
  activeStageId?: ProcessingStage;
  activeIndex?: number;
  isJobDone?: boolean;
}) {
  // derive activeIndex if only activeStageId provided
  const derivedActiveIndex =
    typeof activeIndex === 'number'
      ? activeIndex
      : activeStageId
      ? STAGE_ORDER.indexOf(activeStageId)
      : -1;
  return (
    <div className="relative">
              <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-100" />
              <div className="grid grid-cols-5 gap-4">
                {stages.map((stage) => {
                  const stageIndex = STAGE_ORDER.indexOf(stage.id);
                  const isComplete = isJobDone || stageIndex < derivedActiveIndex;
                  const isActive = !isJobDone && stage.id === activeStageId;
                  const StageIcon = stage.icon;

                  return (
                    <div key={stage.id} className="relative">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center relative z-10 mx-auto ${
                          isComplete
                            ? 'bg-gradient-to-br from-primary-500 to-secondary-500 shadow-glow'
                            : isActive
                            ? 'bg-white border-2 border-primary-300 shadow-soft'
                            : 'bg-white border-2 border-gray-200'
                        }`}
                      >
                        {isComplete ? (
                          <CheckCircle2 className="w-6 h-6 text-white" />
                        ) : isActive ? (
                          <Loader2 className="w-5 h-5 text-primary-500 animate-spin" />
                        ) : (
                          <StageIcon className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <p
                        className={`text-xs font-medium mt-3 text-center ${
                          isActive || isComplete ? 'text-gray-900' : 'text-gray-400'
                        }`}
                      >
                        {stage.label.split(' ')[0]}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
  )
}
