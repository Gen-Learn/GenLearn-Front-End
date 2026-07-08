export interface ChatbotMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatbotRequest {
  messages: ChatbotMessage[];
  courseId?: string;
}

export interface ChatbotResponsePayload {
  statusCode: number;
  data: {
    response: string;
  };
  message?: string;
}