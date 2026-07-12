// src/hooks/useFeedbacks.ts
import { useQuery } from "@tanstack/react-query";
import { getFeedbacks } from "@/services/contactService";

export const feedbackKeys = {
    all: [ "feedbacks" ] as const,
};

export const useFeedbacks = () => {
    return useQuery({
        queryKey: feedbackKeys.all,
        queryFn: getFeedbacks,
        select: (response) => response.data, // unwraps to Feedback[] directly in components
    });
};