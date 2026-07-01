import { BookOpen, FileText, PenLine } from "lucide-react";
import { Button } from "@/components/ui";
import { Lecture } from "@/types/coursesModel";
import { EmptyState } from '@/components/empty-states';

type TabKey = "transcript" | "notes" | "materials";

type Props = {
  selectedLecture?: Lecture | null;
  activeTab: TabKey;
  onChangeTab: (tab: TabKey) => void;
  notes: string;
  onNotesChange: (value: string) => void;
  onSaveNotes: () => void;
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
}: Props) {
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
          <div className="space-y-4 text-sm leading-7 text-slate-700">
            {selectedLecture.scripts && selectedLecture.scripts.length > 0 ? (
              selectedLecture.scripts.map((script) => (
                <div key={script.id}>
                  <p className="text-xs uppercase tracking-[0.15em] text-slate-500">
                    {script.language}
                  </p>
                  <p className="whitespace-pre-wrap">{script.content}</p>
                </div>
              ))
            ) : (
              <EmptyState
                title="No transcript available"
                description="This lecture does not have a transcript yet."
                icon={FileText}
              />
            )}
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
