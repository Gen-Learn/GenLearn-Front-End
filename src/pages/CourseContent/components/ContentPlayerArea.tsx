import { useState } from "react";
import { Card } from "@/components/ui";
import { Lecture } from "@/types/coursesModel";
import VideoPlayer from "./video";
import QuizSection from "./quiz";
import { VideoPlayerSkeleton } from '@/components/loading';
import { EmptyState } from '@/components/empty-states';
import { BookOpen } from 'lucide-react';

type Props = {
  courseId?: string;
  selectedLecture?: Lecture | null;
  quizId: string | null;
  showQuiz: boolean;
  onVideoEnded: () => void;
  onCloseQuiz: () => void;
  loading: boolean;
  error: string | null;
};

export default function ContentPlayerArea({
  courseId,
  selectedLecture,
  quizId,
  showQuiz,
  onVideoEnded,
  onCloseQuiz,
  loading,
  error,
}: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <div className="relative bg-black aspect-video  overflow-hidden">
      {!loading && !error && selectedLecture && !showQuiz ? (
        <VideoPlayer lectureId={selectedLecture.id} courseId={courseId} onEnded={onVideoEnded} />
      ) : null}

      {loading ? (
        <div className="absolute inset-0 z-10 bg-black/90 flex items-center justify-center p-8">
          <VideoPlayerSkeleton />
        </div>
      ) : null}

      {error && !loading ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black">
          <EmptyState
            title="Video load failed"
            description={error}
            icon={BookOpen}
          />
        </div>
      ) : null}

      {!loading && !error && selectedLecture && showQuiz ? (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-8">
          <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <QuizSection quizId={quizId} onBackToVideo={onCloseQuiz} />
            </div>
          </Card>
        </div>
      ) : null}
    </div>
  );
}
