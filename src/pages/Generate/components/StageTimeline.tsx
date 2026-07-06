import { CheckCircle2, Loader2 } from 'lucide-react';
import type { ProcessingStage, StageInfo } from '../utils/stages';

interface StageTimelineProps {
  stages: StageInfo[];
  activeStageId?: ProcessingStage;
  activeIndex?: number;
  isJobDone?: boolean;
}

export default function StageTimeline({
  stages,
  activeStageId,
  activeIndex,
  isJobDone = false,
}: StageTimelineProps) {
  const stageOrder = stages.map((s) => s.id);
  const derivedActiveIndex =
    typeof activeIndex === 'number'
      ? activeIndex
      : activeStageId
      ? stageOrder.indexOf(activeStageId)
      : -1;

  return (
    <div className="relative">
      <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-100" />
      <div
        className="grid gap-2 sm:gap-4"
        style={{ gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))` }}
      >
        {stages.map((stage) => {
          const stageIndex = stageOrder.indexOf(stage.id);
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
  );
}