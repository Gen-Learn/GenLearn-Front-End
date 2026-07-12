// hooks/useUpdateLectureState.ts
import {
    useMutation,
    useQueryClient,
    type UseMutationOptions,
} from "@tanstack/react-query";
import {
    updateLectureState,
} from "@/services/lectureService";
import { UpdateLectureStateResponse } from "@/types/coursesModel"
export const useUpdateLectureState = (
    options?: UseMutationOptions<UpdateLectureStateResponse, Error, string>
) => {
    const queryClient = useQueryClient();

    return useMutation<UpdateLectureStateResponse, Error, string>({
        mutationFn: (lectureId) => updateLectureState(lectureId),
        ...options,
        onSuccess: (...args) => {
            const [ data, lectureId ] = args;

            // No lecture object comes back, so invalidate rather than write
            // directly into the cache — this refetches the lecture/course
            // queries so progress UI reflects the new state.
            queryClient.invalidateQueries({ queryKey: [ "lecture", lectureId ] });

            // Always invalidate course-level queries so the course details
            // page (progress bar, section completion) updates immediately.
            queryClient.invalidateQueries({ queryKey: [ "course" ] });

            options?.onSuccess?.(...args);
        },
    });
};