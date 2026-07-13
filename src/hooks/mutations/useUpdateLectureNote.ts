// src/hooks/mutations/useUpdateLectureNote.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLectureNote } from "@/services/lectureNoteService";
import { lectureNoteKeys } from "@/hooks/queries/useGetLectureNotes";
import { UpdateLectureNotePayload } from "@/types/notesModel";

interface UpdateLectureNoteVariables {
    id: string;
    payload: UpdateLectureNotePayload;
    lectureId: string; // needed to invalidate the right cached list
}

export const useUpdateLectureNote = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: UpdateLectureNoteVariables) =>
            updateLectureNote(id, payload),
        onSuccess: (_note, variables) => {
            queryClient.invalidateQueries({
                queryKey: lectureNoteKeys.byLecture(variables.lectureId),
            });
        },
    });
};