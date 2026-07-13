// src/hooks/mutations/useDeleteLectureNote.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLectureNote } from "@/services/lectureNoteService";
import { lectureNoteKeys } from "@/hooks/queries/useGetLectureNotes";

interface DeleteLectureNoteVariables {
    id: string;
    lectureId: string; // needed to invalidate the right cached list
}

export const useDeleteLectureNote = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id }: DeleteLectureNoteVariables) => deleteLectureNote(id),
        onSuccess: (_response, variables) => {
            queryClient.invalidateQueries({
                queryKey: lectureNoteKeys.byLecture(variables.lectureId),
            });
        },
    });
};