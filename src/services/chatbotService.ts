import axiosInstance from "./axios";
import { ChatbotRequest, ChatbotResponsePayload } from "@/types/chatbotModel";


export const sendChatbotResponse = async ({
  messages,
  courseId,
}: ChatbotRequest): Promise<string> => {
  const payload = {
    messages,
    ...(courseId ? { courseId } : {}),
  };

  const { data } = await axiosInstance.post<ChatbotResponsePayload>(
    "/api/v1/chatbot/response",
    payload,
  );

  return data?.data?.response || "";
};
