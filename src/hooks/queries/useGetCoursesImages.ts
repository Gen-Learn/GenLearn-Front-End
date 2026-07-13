// hooks/queries/useGetCoursesImages.ts
import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useGetAllCourses } from "./useGetAllCources"; // fixed typo: Cources -> Courses
import axiosInstance from "@/services/axios";
import Course from "@/types/coursesModel";

interface CourseImageMap {
  [ courseId: string ]: string;
}

export const useGetCoursesImages = () => {
  const { data: courses = [], isLoading: loadingCourses } = useGetAllCourses();
  const previousUrlsRef = useRef<string[]>([]);

  const query = useQuery({
    queryKey: [ "course-images", courses.map((c: Course) => c.id) ],
    enabled: !loadingCourses && courses.length > 0,

    queryFn: async (): Promise<CourseImageMap> => {
      const results = await Promise.allSettled(
        courses
          .filter((course: Course) => course.imageUrl)
          .map(async (course: Course) => {
            const response = await axiosInstance.get(course.imageUrl!, {
              responseType: "blob",
            });

            return {
              id: course.id,
              objectUrl: URL.createObjectURL(response.data),
            };
          }),
      );

      const map: CourseImageMap = {};

      results.forEach((result: any) => {
        if (result.status === "fulfilled") {
          map[ result.value.id ] = result.value.objectUrl;
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