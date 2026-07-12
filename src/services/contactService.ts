// src/services/feedback.service.ts
import axiosInstance from "@/services/axios";
import { FeedbacksResponse } from "@/types/feedbackModel";
import { CreateContactPayload, CreateContactResponse } from "@/types/contactModel";


export const getFeedbacks = async (): Promise<FeedbacksResponse> => {
    const { data } = await axiosInstance.get<FeedbacksResponse>(
        "/api/v1/contact/feedbacks",
    );
    return data;
};


export const createContact = async (
    payload: CreateContactPayload,
): Promise<CreateContactResponse> => {
    const { data } = await axiosInstance.post<CreateContactResponse>(
        "/api/v1/contact",
        payload,
    );
    return data;
};