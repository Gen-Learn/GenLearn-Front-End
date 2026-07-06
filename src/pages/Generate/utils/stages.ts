import {
  Upload as UploadIcon,
  FileText,
  Brain,
  Video,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export type ProcessingStage =
  | 'idle'
  | 'connecting'
  | 'connected'
  | 'reconnecting'
  | 'error'
  | 'completed'
  | 'extracting'
  | 'structuring'
  | 'creating'
  | 'finalizing'
  | 'uploading';

export interface StageInfo {
  id: ProcessingStage;
  label: string;
  description: string;
  icon: typeof UploadIcon;
}

// Matches the backend's real jobStatusUpdated payloads 1:1:
// extracting -> generation -> creating -> finalizing -> (jobCompleted event)
// The backend emits a single "creating" status for both video and quiz
// generation, so there's no separate stage for quizzes — folding that into
// one "generating_videos" stage keeps the timeline from stalling on a stage
// real data can never reach.
export const stages: StageInfo[] = [
  { id: 'uploading', label: 'Uploading', description: 'Securing your document...', icon: UploadIcon },
  { id: 'extracting', label: 'Extracting Content', description: 'AI is reading your document...', icon: FileText },
  { id: 'structuring', label: 'Generating Structure', description: 'Building course outline...', icon: Brain },
  { id: 'creating', label: 'Creating Content', description: 'AI is generating videos & quizzes...', icon: Video },
  { id: 'finalizing', label: 'Finalizing Course', description: 'Putting everything together...', icon: Sparkles },
  { id: 'completed', label: 'Complete', description: 'Your course is ready!', icon: CheckCircle2 },
];

export const STAGE_ORDER = stages.map((s) => s.id);