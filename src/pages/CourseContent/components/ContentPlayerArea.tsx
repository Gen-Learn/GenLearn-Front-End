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
  videoPlayerRef?: React.RefObject<HTMLVideoElement>;
  quizId: string | null;
  showQuiz: boolean;
  onTimeUpdate?: (time: number) => void;
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
  videoPlayerRef,
  onTimeUpdate,
  loading,
  error,
}: Props) {

  return (
    <>
      {/* Video box: aspect-ratio + overflow-hidden only apply here, so the
          quiz below is never boxed into a 16:9 shape. */}
      <div className="relative bg-black aspect-video overflow-hidden">
        {!loading && !error && selectedLecture && !showQuiz ? (
          <VideoPlayer lectureId={selectedLecture.id} onEnded={onVideoEnded} videoPlayerRef={videoPlayerRef} onTimeUpdate={onTimeUpdate} />
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
      </div>

      {!loading && !error && selectedLecture && showQuiz ? (
        <div className="fixed inset-0 z-40  flex items-center justify-center p-4 sm:p-8">
          <div className="fixed w-full h-full bg-black/80 backdrop-blur-sm" onClick={onCloseQuiz}></div>
          <Card className="w-full max-w-2xl max-h-[85vh] overflow-y-auto z-50">
            <div className="p-4 sm:p-6">
              <QuizSection quizId={quizId} onBackToVideo={onCloseQuiz} />
            </div>
          </Card>
        </div>
      ) : null}
    </>
  );
}