import { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  FileText,
  PenLine,
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui";
import { Lecture } from "@/types/coursesModel";
import { EmptyState } from "@/components/empty-states";
import { formatTimestamp } from "../utils/formatTimestamp";
import { useGetLectureNotes } from "@/hooks/queries/useGetLectureNotes";
import { useCreateLectureNote } from "@/hooks/mutations/useCreateLectureNote";
import { useUpdateLectureNote } from "@/hooks/mutations/useUpdateLectureNote";
import { useDeleteLectureNote } from "@/hooks/mutations/useDeleteLectureNote";

type TabKey = "transcript" | "notes" | "materials";

type Props = {
  selectedLecture?: Lecture | null;
  activeTab: TabKey;
  onChangeTab: (tab: TabKey) => void;
  currentTime?: number;
  onSeek?: (time: number) => void;
};

const tabItems: Array<{ id: TabKey; label: string; icon: typeof FileText }> = [
  { id: "transcript", label: "Transcript", icon: FileText },
  { id: "notes", label: "My Notes", icon: PenLine },
  { id: "materials", label: "Materials", icon: BookOpen },
];

function NotesPanel({
  lectureId,
  currentTime,
  onSeek,
}: {
  lectureId: string;
  currentTime: number;
  onSeek?: (time: number) => void;
}) {
  const { data: notes, isLoading } = useGetLectureNotes(lectureId);
  const { mutate: createNote, isPending: isCreating } = useCreateLectureNote();
  const { mutate: updateNote, isPending: isUpdating } = useUpdateLectureNote();
  const { mutate: deleteNote } = useDeleteLectureNote();

  const [ draftContent, setDraftContent ] = useState("");
  const [ editingId, setEditingId ] = useState<string | null>(null);
  const [ editingContent, setEditingContent ] = useState("");
  const [ deletingId, setDeletingId ] = useState<string | null>(null);

  const handleAddNote = () => {
    if (!draftContent.trim()) return;
    createNote(
      { lectureId, content: draftContent.trim(), videoSecond: Math.floor(currentTime) },
      { onSuccess: () => setDraftContent("") },
    );
  };

  const startEditing = (noteId: string, content: string) => {
    setEditingId(noteId);
    setEditingContent(content);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingContent("");
  };

  const saveEdit = (noteId: string) => {
    if (!editingContent.trim()) return;
    updateNote(
      { id: noteId, payload: { content: editingContent.trim() }, lectureId },
      { onSuccess: () => cancelEditing() },
    );
  };

  const handleDelete = (noteId: string) => {
    setDeletingId(noteId);
    deleteNote(
      { id: noteId, lectureId },
      { onSettled: () => setDeletingId(null) },
    );
  };

  return (
    <div className="space-y-4">
      {/* New note composer */}
      <div className="space-y-2">
        <p className="text-sm text-slate-500">
          Take notes while watching — each note is linked to{" "}
          <span className="font-mono font-medium text-slate-600">
            {formatTimestamp(currentTime)}
          </span>
          .
        </p>
        <textarea
          value={draftContent}
          onChange={(e) => setDraftContent(e.target.value)}
          placeholder="Start taking notes..."
          className="w-full min-h-24 rounded-3xl border border-gray-200 bg-slate-50 p-4 text-sm text-slate-900 outline-none transition focus:border-primary-300 focus:ring-2 focus:ring-primary-500/20 resize-none"
        />
        <div className="flex justify-end">
          <Button size="sm" onClick={handleAddNote} disabled={isCreating || !draftContent.trim()}>
            <Plus className="w-4 h-4" />
            {isCreating ? "Adding..." : `Add note at ${formatTimestamp(currentTime)}`}
          </Button>
        </div>
      </div>

      {/* Existing notes list */}
      <div className="border-t border-gray-100 pt-4 space-y-2">
        {isLoading ? (
          <div className="space-y-2">
            {[ ...Array(3) ].map((_, i) => (
              <div key={i} className="h-16 rounded-2xl bg-slate-100 animate-pulse" />
            ))}
          </div>
        ) : !notes || notes.length === 0 ? (
          <EmptyState
            title="No notes yet"
            description="Notes you take while watching this lecture will show up here."
            icon={PenLine}
          />
        ) : (
          notes.map((note) => {
            const isEditing = editingId === note.id;
            const isDeleting = deletingId === note.id;

            return (
              <div
                key={note.id}
                className="group flex gap-3 rounded-2xl px-3 py-3 hover:bg-slate-50 transition"
              >
                <button
                  type="button"
                  onClick={() => onSeek?.(note.videoSecond)}
                  className="shrink-0 text-xs font-mono mt-0.5 text-primary-600 hover:underline"
                  title="Jump to this point in the video"
                >
                  {formatTimestamp(note.videoSecond)}
                </button>

                {isEditing ? (
                  <div className="flex-1 space-y-2">
                    <textarea
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                      className="w-full min-h-20 rounded-xl border border-gray-200 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-primary-300 focus:ring-2 focus:ring-primary-500/20 resize-none"
                      autoFocus
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={cancelEditing}
                        className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-500 hover:bg-slate-100 transition"
                      >
                        <X className="w-3.5 h-3.5" />
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => saveEdit(note.id)}
                        disabled={isUpdating || !editingContent.trim()}
                        className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-primary-600 hover:bg-primary-50 transition disabled:opacity-50"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="flex-1 text-sm text-slate-700 whitespace-pre-wrap">
                      {note.content}
                    </p>
                    <div className="flex items-start gap-1 opacity-0 group-hover:opacity-100 transition">
                      <button
                        type="button"
                        onClick={() => startEditing(note.id, note.content)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
                        title="Edit note"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(note.id)}
                        disabled={isDeleting}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition disabled:opacity-50"
                        title="Delete note"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default function LectureTabs({
  selectedLecture,
  activeTab,
  onChangeTab,
  currentTime = 0,
  onSeek,
}: Props) {
  const [ isTranscriptExpanded, setIsTranscriptExpanded ] = useState(false);
  const scripts = selectedLecture?.scripts ?? [];

  const activeScriptIndex = scripts.findIndex(
    (script: any) => currentTime >= script.startTime && currentTime < script.endTime
  );

  const fallbackIndex = activeScriptIndex === -1 && scripts.length > 0 ? 0 : activeScriptIndex;

  const visibleScripts = isTranscriptExpanded
    ? scripts
    : fallbackIndex !== -1
      ? [ scripts[ fallbackIndex ] ]
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
              className={`flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition ${isActive
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
                      className={`animate-fade-in w-full text-left flex gap-3 rounded-2xl px-3 py-2 transition ${isActiveSegment
                          ? "bg-primary-50 text-primary-900"
                          : "hover:bg-slate-50"
                        }`}
                    >
                      <span
                        className={`shrink-0 text-xs font-mono mt-0.5 ${isActiveSegment ? "text-primary-600" : "text-slate-400"
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
          <NotesPanel
            lectureId={selectedLecture.id}
            currentTime={currentTime}
            onSeek={onSeek}
          />
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