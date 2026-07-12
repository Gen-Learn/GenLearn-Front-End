// src/types/feedback.types.ts
export interface Feedback {
    id: string;
    name: string;
    email: string;
    type: string; // narrow to a union if you know the fixed set of values
    subject: string | null;
    message: string;
    rating: number;
    isVisible: boolean;
    isRead: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface FeedbacksResponse {
    statusCode: number;
    data: Feedback[];
}