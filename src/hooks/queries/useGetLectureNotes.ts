// src/hooks/queries/useGetLectureNotes.ts
import { useQuery } from "@tanstack/react-query";
import { getLectureNotes } from "@/services/lectureNoteService";

export const lectureNoteKeys = {
    all: [ "lecture-notes" ] as const,
    byLecture: (lectureId: string) => [ ...lectureNoteKeys.all, lectureId ] as const,
};

export const useGetLectureNotes = (lectureId: string) => {
    return useQuery({
        queryKey: lectureNoteKeys.byLecture(lectureId),
        queryFn: () => getLectureNotes(lectureId),
        enabled: !!lectureId,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
};