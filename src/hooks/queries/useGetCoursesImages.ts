// hooks/queries/useGetCoursesImages.ts
import { useQueries, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import axiosInstance from "@/services/axios";
import Course from "@/types/coursesModel";

interface CourseImageMap {
  [ courseId: string ]: string;
}

// Revoke blob URLs only when React Query actually evicts them from cache
// (gcTime expiry), not when any particular component unmounts. This must
// be registered once globally, not per-hook-instance, or you'll end up
// with duplicate subscriptions and revoke-on-first-unmount bugs again.
let blobRevokeSubscribed = false;

function ensureBlobRevocationSubscription(
  queryClient: ReturnType<typeof useQueryClient>
) {
  if (blobRevokeSubscribed) return;
  blobRevokeSubscribed = true;

  queryClient.getQueryCache().subscribe((event) => {
    if (event.type !== "removed") return;
    if (event.query.queryKey[ 0 ] !== "course-image") return;

    const url = event.query.state.data;
    if (typeof url === "string" && url.startsWith("blob:")) {
      URL.revokeObjectURL(url);
    }
  });
}

export const useGetCoursesImages = (courses: Course[] = []) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    ensureBlobRevocationSubscription(queryClient);
  }, [ queryClient ]);

  const coursesWithImages = courses.filter((c) => c.imageUrl);

  const results = useQueries({
    queries: coursesWithImages.map((course) => ({
      // keyed per course, not per page — a course fetched on page 2 stays
      // cached even after you go back to page 1 and forward again
      queryKey: [ "course-image", course.id, course.imageUrl ],
      queryFn: async (): Promise<string> => {
        const response = await axiosInstance.get(course.imageUrl!, {
          responseType: "blob",
        });
        return URL.createObjectURL(response.data);
      },
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
    })),
  });

  const courseImages: CourseImageMap = {};
  let loadingImages = false;

  results.forEach((result, i) => {
    const course = coursesWithImages[ i ];
    if (result.data) courseImages[ course.id ] = result.data;
    if (result.isLoading) loadingImages = true;
  });

  return {
    courseImages,
    loadingImages,
    errorGettingImages: results.find((r) => r.error)?.error ?? null,
  };
};