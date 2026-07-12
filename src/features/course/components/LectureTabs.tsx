import { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp, FileText, PenLine } from "lucide-react";
import { Button } from "@/components/ui";
import { Lecture } from "@/types/coursesModel";
import { EmptyState } from '@/components/empty-states';
import { formatTimestamp } from "../utils/formatTimestamp";
type TabKey = "transcript" | "notes" | "materials";

type Props = {
  selectedLecture?: Lecture | null;
  activeTab: TabKey;
  onChangeTab: (tab: TabKey) => void;
  notes: string;
  onNotesChange: (value: string) => void;
  onSaveNotes: () => void;
  currentTime?: number;
};

const tabItems: Array<{ id: TabKey; label: string; icon: typeof FileText }> = [
  { id: "transcript", label: "Transcript", icon: FileText },
  { id: "notes", label: "My Notes", icon: PenLine },
  { id: "materials", label: "Materials", icon: BookOpen },
];

export default function LectureTabs({
  selectedLecture,
  activeTab,
  onChangeTab,
  notes,
  onNotesChange,
  onSaveNotes,
  currentTime = 0,
}: Props) {
  const [isTranscriptExpanded, setIsTranscriptExpanded] = useState(false);
  const scripts = selectedLecture?.scripts ?? [];

  const activeScriptIndex = scripts.findIndex(
    (script: any) => currentTime >= script.startTime && currentTime < script.endTime
  );

  // Fallback: if nothing is "active" (e.g. before first segment starts),
  // just show the first script so the collapsed view isn't empty.
  const fallbackIndex = activeScriptIndex === -1 && scripts.length > 0 ? 0 : activeScriptIndex;

  const visibleScripts = isTranscriptExpanded
    ? scripts
    : fallbackIndex !== -1
    ? [scripts[fallbackIndex]]
    : [];
  
  return (
    <div className="rounded-3xl border border-gray-200 bg-white overflow-hidden shadow-sm">
      <div className="border-b border-gray-100 bg-slate-50 p-3 flex flex-wrap gap-2">
        {tabItems.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChangeTab(tab.id)}
              className={`flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="p-6">
        {!selectedLecture ? (
          <EmptyState
            title="Select a lecture"
            description="Choose a lecture from the sidebar to view transcript, notes, or materials."
            icon={BookOpen}
          />
        ) : activeTab === "transcript" ? (
          <div className="space-y-3">
            {scripts.length > 0 && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsTranscriptExpanded((prev) => !prev)}
                  className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition"
                >
                  {isTranscriptExpanded ? (
                    <>
                      <ChevronUp className="w-3.5 h-3.5" />
                      Collapse
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3.5 h-3.5" />
                      Show full transcript
                    </>
                  )}
                </button>
              </div>
            )}

            <div className="space-y-1 text-sm leading-7 text-slate-700">
              {visibleScripts.length > 0 ? (
                visibleScripts.map((script: any) => {
                  const isActiveSegment =
                    currentTime >= script.startTime && currentTime < script.endTime;

                  return (
                    <div
                      key={script.id}
                      className={`animate-fade-in w-full text-left flex gap-3 rounded-2xl px-3 py-2 transition ${
                        isActiveSegment
                          ? "bg-primary-50 text-primary-900"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <span
                        className={`shrink-0 text-xs font-mono mt-0.5 ${
                          isActiveSegment ? "text-primary-600" : "text-slate-400"
                        }`}
                      >
                        {formatTimestamp(script.startTime)}
                      </span>
                      <p className="whitespace-pre-wrap">{script.text}</p>
                    </div>
                  );
                })
              ) : (
                <EmptyState
                  title="No transcript available"
                  description="This lecture does not have a transcript yet."
                  icon={FileText}
                />
              )}
            </div>
          </div>
        ) : activeTab === "notes" ? (
          <div className="space-y-4">
            <p className="text-sm text-slate-500">Take notes while watching. Notes are saved automatically.</p>
            <textarea
              value={notes}
              onChange={(event) => onNotesChange(event.target.value)}
              placeholder="Start taking notes..."
              className="w-full min-h-64 rounded-3xl border border-gray-200 bg-slate-50 p-4 text-sm text-slate-900 outline-none transition focus:border-primary-300 focus:ring-2 focus:ring-primary-500/20 resize-none"
            />
            <div className="flex justify-end">
              <Button size="sm" onClick={onSaveNotes}>
                Save Notes
              </Button>
            </div>
          </div>
        ) : (
          <EmptyState
            title="No materials available"
            description="There are no additional materials for this lecture yet."
            icon={BookOpen}
          />
        )}
      </div>
    </div>
  );
}