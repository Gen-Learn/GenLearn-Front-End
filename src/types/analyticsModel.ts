// types/analyticsModel.ts
export interface ActivityEntry {
    day: string; // ISO date string, e.g. "2026-07-10"
    totalDuration: number;
}

export interface Analytics {
    bestLoginStreak: number;
    currentLoginStreak: number;
    quizAvg: number;
    totalMinOfLectureDone: number;
    courseDone: number;
    activity: ActivityEntry[];
}

export interface AnalyticsResponseData {
    analytics: Analytics;
}

// The real shape returned by the backend
export interface AnalyticsApiResponse {
    statusCode: number;
    data: AnalyticsResponseData;
}