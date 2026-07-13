// src/services/lectureNoteService.ts
import axiosInstance from "@/services/axios";
import {
    GetLectureNotesResponse,
    LectureNote,
    CreateLectureNotePayload,
    CreateLectureNoteResponse,
    UpdateLectureNotePayload,
    UpdateLectureNoteResponse,
    DeleteLectureNoteResponse,
} from "@/types/notesModel";

export const getLectureNotes = async (lectureId: string): Promise<LectureNote[]> => {
    const { data } = await axiosInstance.get<GetLectureNotesResponse>(
        `/api/v1/lecture-notes/${lectureId}`,
    );
    return data.data;
};

export const createLectureNote = async (
    payload: CreateLectureNotePayload,
): Promise<LectureNote> => {
    const { data } = await axiosInstance.post<CreateLectureNoteResponse>(
        "/api/v1/lecture-notes",
        payload,
    );
    return data.data;
};

export const updateLectureNote = async (
    id: string,
    payload: UpdateLectureNotePayload,
): Promise<LectureNote> => {
    const { data } = await axiosInstance.patch<UpdateLectureNoteResponse>(
        `/api/v1/lecture-notes/${id}`,
        payload,
    );
    return data.data;
};

export const deleteLectureNote = async (id: string): Promise<DeleteLectureNoteResponse> => {
    const { data } = await axiosInstance.delete<DeleteLectureNoteResponse>(
        `/api/v1/lecture-notes/${id}`,
    );
    return data;
};