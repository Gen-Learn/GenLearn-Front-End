import { BookOpen, Bell, Award, Search, Sparkles, MessageCircle, FolderUp, FileQuestion } from 'lucide-react';
import { Button, Card } from '../ui';

interface EmptyStateProps {
  title: string;
  description: string;
  icon: React.ElementType;
  actionLabel?: string;
  actionHref?: string;
  dataNav?: string;
}

export function EmptyState({ title, description, icon: Icon, actionLabel, actionHref, dataNav }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
        <Icon className="w-12 h-12 text-gray-300" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 max-w-sm mb-6">{description}</p>
      {actionLabel && actionHref && (
        <a href={actionHref} data-nav={dataNav || actionHref.replace('#!/', '')}>
          <Button>{actionLabel}</Button>
        </a>
      )}
    </div>
  );
}

export function NoCourses() {
  return (
    <EmptyState
      title="No courses yet"
      description="Upload your first PDF to transform it into an interactive learning experience with AI."
      icon={BookOpen}
      actionLabel="Upload a PDF"
      actionHref="#!/upload"
      dataNav="upload"
    />
  );
}

export function NoNotifications() {
  return (
    <EmptyState
      title="All caught up!"
      description="You have no new notifications. We'll let you know when there's something new."
      icon={Bell}
    />
  );
}

export function NoQuizAttempts() {
  return (
    <EmptyState
      title="No quiz attempts yet"
      description="Complete a lecture quiz to start tracking your progress and earn XP."
      icon={Award}
      actionLabel="Browse Courses"
      actionHref="#!/courses"
      dataNav="courses"
    />
  );
}

export function NoSearchResults() {
  return (
    <EmptyState
      title="No results found"
      description="Try adjusting your search or filters to find what you're looking for."
      icon={Search}
    />
  );
}

export function NoGeneratedCourses() {
  return (
    <Card className="text-center py-16">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center mx-auto mb-6">
        <FolderUp className="w-12 h-12 text-primary-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">No generated courses</h3>
      <p className="text-gray-500 max-w-sm mx-auto mb-6">
        Upload a PDF textbook to create your first AI-powered course with video lectures and quizzes.
      </p>
      <a href="#!/upload" data-nav="upload">
        <Button>
          <Sparkles className="w-4 h-4" />
          Generate Your First Course
        </Button>
      </a>
    </Card>
  );
}

export function NoChatHistory() {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
        <MessageCircle className="w-8 h-8 text-gray-300" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No chat history</h3>
      <p className="text-sm text-gray-500">Start a conversation with the AI assistant.</p>
    </div>
  );
}

export function NoQuestionsYet() {
  return (
    <EmptyState
      title="No questions available"
      description="This quiz hasn't been generated yet. Please wait for the course generation to complete."
      icon={FileQuestion}
    />
  );
}
