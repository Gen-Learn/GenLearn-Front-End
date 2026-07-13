// src/services/statisticsService.ts
import axiosInstance from "@/services/axios";
import { StatisticsResponse, Statistics } from "@/types/statisticsModel";

export const getStatistics = async (): Promise<Statistics> => {
    const { data } = await axiosInstance.get<StatisticsResponse>(
        "/api/v1/home/statistics",
    );

    return data.data.statistics;
};