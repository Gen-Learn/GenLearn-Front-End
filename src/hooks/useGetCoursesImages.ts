import { useGetAllCourses } from "./useGetAllCources";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "@/services/axios";

interface CourseImageMap {
  [courseId: string]: string; // courseId -> object URL
}

export const useGetCoursesImages = () => {
  const { courses, loading } = useGetAllCourses();
  const [courseImages, setCourseImages] = useState<CourseImageMap>({});
  const [loadingImages, setLoadingImages] = useState(true);
  const [errorGettingImages, setErrorGettingImages] = useState<string | null>(null);

  // keep track of created object URLs so we can revoke them on cleanup
  const objectUrlsRef = useRef<string[]>([]);

  useEffect(() => {
    if (loading) return;

    let cancelled = false;

    const fetchImages = async () => {
      setLoadingImages(true);
      setErrorGettingImages(null);

      const results = await Promise.allSettled(
        courses
          .filter((course) => !!course.imageUrl)
          .map(async (course) => {
            const response = await axiosInstance.get(course.imageUrl!, {
              responseType: "blob",
            });
            const objectUrl = URL.createObjectURL(response.data as Blob);
            return { id: course.id, objectUrl };
          })
      );

      if (cancelled) return;

      const map: CourseImageMap = {};
      const urls: string[] = [];
      const errors: string[] = [];

      results.forEach((result) => {
        if (result.status === "fulfilled") {
          map[result.value.id] = result.value.objectUrl;
          urls.push(result.value.objectUrl);
        } else {
          errors.push(result.reason?.message ?? String(result.reason));
        }
      });

      objectUrlsRef.current = urls;
      setCourseImages(map);
      if (errors.length) setErrorGettingImages(errors.join("; "));
      setLoadingImages(false);
    };

    fetchImages();

    return () => {
      cancelled = true;
      // revoke previous URLs on unmount / re-run to avoid leaking memory
      objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [courses, loading]);

  return { courseImages, loadingImages, errorGettingImages };
};