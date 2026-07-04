import { useState } from 'react';
import { ChevronDown, CheckCircle2, Circle, Film, Award, BookOpen } from 'lucide-react';
import { Button, Card } from '@/components/ui/index';
import { Link } from 'react-router-dom';
import { Section  } from "@/types/coursesModel"
import { EmptyState } from '@/components/empty-states';
export type CourseSection = Section;

type Props = {
  sections: Section[];
  courseId:string;
};

export default function CourseContentAccordion({ sections , courseId }: Props) {
  const [expandedSections, setExpandedSections] = useState<string[]>(
    sections[0] ? [sections[0].id] : []
  );

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((sid) => sid !== sectionId) : [...prev, sectionId]
    );
  };

  const totalLectures = sections.reduce((acc, s) => acc + s.lectures.length, 0);

  if (sections.length === 0) {
    return (
      <Card>
        <div className="p-8">
          <EmptyState
            title="No course content"
            description="This course does not have any sections yet."
            icon={BookOpen}
          />
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">Course Content</h2>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>{sections.length} sections</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span>{totalLectures} lectures</span>
        </div>
      </div>

      <div className="space-y-4">
        {sections.map((section, sIndex) => {
          const isExpanded = expandedSections.includes(section.id);
          const sectionTitle = section.title || section.name || `Section ${sIndex + 1}`;
          const completedInSection = section.lectures.filter((l) => l.completed ?? false).length;
          const sectionProgress = section.lectures.length
            ? Math.round((completedInSection / section.lectures.length) * 100)
            : 0;

          return (
            <div key={section.id} className="border border-gray-100 rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      sectionProgress === 100
                        ? 'bg-green-100 text-green-600'
                        : sectionProgress > 0
                        ? 'bg-primary-100 text-primary-600'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {sectionProgress === 100 ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-bold">{sIndex + 1}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{sectionTitle}</h3>
                    <p className="text-sm text-gray-500">
                      {section.lectures.length} lectures • {completedInSection} completed
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                />
              </button>

              {isExpanded && (
                <div className="border-t border-gray-100 bg-gray-50/50">
                  {section.lectures.map((lecture) => {
                    const lectureTitle = lecture.title || lecture.name || 'Untitled Lecture';
                    const lectureDuration = lecture.duration || '0m';
                    const isCompleted = lecture.completed ?? false;

                    return (
                      <div
                        key={lecture.id}
                        className="flex items-center justify-between px-4 py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-100/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="shrink-0">
                            {isCompleted ? (
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                            ) : (
                              <Circle className="w-5 h-5 text-gray-300" />
                            )}
                          </div>
                          <Film className="w-4 h-4 text-gray-400" />
                          <span className={`text-sm ${isCompleted ? 'text-gray-600' : 'text-gray-900'}`}>
                            {lectureTitle}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-gray-500">{lectureDuration}</span>
                          <Link to={`/course/${courseId}/section/${section.id}/lecture/${lecture.id}`} data-nav="lecture">
                            <Button variant="ghost" size="sm" className="text-xs px-2! py-1!">
                              {isCompleted ? 'Rewatch' : 'Watch'}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    );
                  })}

                  {section.quiz && (
                    <div
                      className={`flex items-center justify-between px-4 py-3 ${
                        section.quiz.locked ? 'opacity-50' : 'hover:bg-amber-50/50'
                      } transition-colors`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="shrink-0">
                          {section.quiz.passed ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          ) : (
                            <Award className="w-5 h-5 text-amber-500" />
                          )}
                        </div>
                        <div>
                          <span
                            className={`text-sm font-medium ${
                              section.quiz.passed ? 'text-gray-600' : 'text-gray-900'
                            }`}
                          >
                            {section.quiz.title || 'Quiz'}
                          </span>
                          <span className="text-xs text-gray-500 ml-2">
                            {section.quiz.questions || 0} questions
                          </span>
                        </div>
                      </div>
                      {!section.quiz.locked ? (
                        <Link to={`/quiz/${section.quiz.id}`} data-nav="quiz">
                          <Button
                            variant={section.quiz.passed ? 'ghost' : 'secondary'}
                            size="sm"
                            className="text-xs px-2! py-1!"
                          >
                            {section.quiz.passed ? 'Review' : 'Solve'}
                          </Button>
                        </Link>
                      ) : (
                        <span className="text-xs text-gray-400">Complete previous section</span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}