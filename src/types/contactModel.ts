// src/types/contact.types.ts

export interface CreateIssuePayload {
    type: 'issue';
    name: string;
    email: string;
    subject: string;
    message: string;
}

export interface CreateFeedbackPayload {
    type: 'feedback';
    name: string;
    email: string;
    rating: number;
    message: string;
}

export type CreateContactPayload = CreateIssuePayload | CreateFeedbackPayload;

export interface ContactMessage {
    id: number;
    name: string;
    email: string;
    type: 'issue' | 'feedback';
    subject: string | null;
    message: string;
    rating: number | null;
    isVisible: boolean;
    isRead: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateContactResponse {
    statusCode: number;
    data: ContactMessage;
}