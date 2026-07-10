import axiosInstance from "./axios";
import { UpdateLectureStateResponse } from "@/types/coursesModel"
const domain = import.meta.env.VITE_API_BASE_URL;

export const getLecture = async (lectureId: string) => {
  const response = await axiosInstance.get(`${domain}/api/v1/lectures/${lectureId}`);
  return response.data;
}


export const updateLectureState = async (
  lectureId: string
): Promise<UpdateLectureStateResponse> => {
  const { data } = await axiosInstance.patch<UpdateLectureStateResponse>(
    `/api/v1/lectures/analytics/${lectureId}/updatelecturestate`
  );
  return data;
};