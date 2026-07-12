// src/hooks/useCreateContact.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createContact } from "@/services/contactService";
import { feedbackKeys } from "@/hooks/queries/useGetFeedback";
import { CreateContactPayload } from "@/types/contactModel";

export const useCreateContact = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateContactPayload) => createContact(payload),
        onSuccess: (response) => {
            // Refresh the feedback list if a feedback message was just created
            if (response.data.type === 'feedback') {
                queryClient.invalidateQueries({ queryKey: feedbackKeys.all });
            }
        },
    });
};