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

            // courseDone tells you whether this was the last lecture in the
            // course — invalidate course-level queries too so completion
            // badges / certificates update.
            if (data.courseDone) {
                queryClient.invalidateQueries({ queryKey: [ "course" ] });
            }

            options?.onSuccess?.(...args);
        },
    });
};