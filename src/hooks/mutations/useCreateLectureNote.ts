// src/hooks/mutations/useCreateLectureNote.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLectureNote } from "@/services/lectureNoteService";
import { lectureNoteKeys } from "@/hooks/queries/useGetLectureNotes";
import { CreateLectureNotePayload } from "@/types/notesModel";

export const useCreateLectureNote = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateLectureNotePayload) => createLectureNote(payload),
        onSuccess: (_note, variables) => {
            queryClient.invalidateQueries({
                queryKey: lectureNoteKeys.byLecture(variables.lectureId),
            });
        },
    });
};