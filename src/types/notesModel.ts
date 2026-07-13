// src/types/lectureNote.types.ts

export interface LectureNote {
    id: string;
    content: string;
    videoSecond: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface GetLectureNotesResponse {
    statusCode: number;
    data: LectureNote[];
}

export interface CreateLectureNotePayload {
    lectureId: string;
    content: string;
    videoSecond: number;
}

export interface CreateLectureNoteResponse {
    statusCode: number;
    data: LectureNote;
}

export interface UpdateLectureNotePayload {
    content?: string;
    videoSecond?: number;
}

export interface UpdateLectureNoteResponse {
    statusCode: number;
    data: LectureNote;
}

export interface DeleteLectureNoteResponse {
    statusCode: number;
    message: string;
}