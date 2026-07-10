import { useQuery } from "@tanstack/react-query";
import { useGetAllCourses } from "./useGetAllCources";
import axiosInstance from "@/services/axios";

interface CourseImageMap {
  [courseId: string]: string;
}

export const useGetCoursesImages = () => {
  const { data: courses = [], isLoading: loadingCourses } = useGetAllCourses();

  const query = useQuery({
    queryKey: ["course-images", courses.map((c) => c.id)],
    enabled: !loadingCourses && courses.length > 0,

    queryFn: async (): Promise<CourseImageMap> => {
      const results = await Promise.allSettled(
        courses
          .filter((course) => course.imageUrl)
          .map(async (course) => {
            const response = await axiosInstance.get(course.imageUrl!, {
              responseType: "blob",
            });

            return {
              id: course.id,
              objectUrl: URL.createObjectURL(response.data),
            };
          })
      );

      const map: CourseImageMap = {};

      results.forEach((result) => {
        if (result.status === "fulfilled") {
          map[result.value.id] = result.value.objectUrl;
        }
      });

      return map;
    },

    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });

  return {
    courseImages: query.data ?? {},
    loadingImages: query.isLoading,
    errorGettingImages: query.error,
  };
};