// src/types/statistics.types.ts

export interface UserTypeCount {
    name: string;
    count: number;
}

export interface Statistics {
    totalUsers: number;
    activeUsers: number;
    totalCourses: number;
    totalLectures: number;
    totalLectureMinutes: number;
    userTypes: UserTypeCount[];
}

export interface StatisticsResponse {
    statusCode: number;
    data: {
        statistics: Statistics;
    };
}