// services/analyticsService.ts
import axiosInstance from "./axios";
import type { Analytics, AnalyticsApiResponse } from "@/types/analyticsModel";

export const getAnalytics = async (): Promise<Analytics> => {
    const response = await axiosInstance.get<AnalyticsApiResponse>(
        `/api/v1/users/me/analytics`
    );
    return response.data.data.analytics;
};