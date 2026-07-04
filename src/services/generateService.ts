import axiosInstance from "./axios";

import {GenerateJobResponse} from "../types/generation";

export const submitGenerateJob = async (
  files: File[],
  onProgress: (pct: number) => void
): Promise<GenerateJobResponse> => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("file", file); // field name backend expects
  });

  const { data } = await axiosInstance.post("/api/v1/generate", formData, {
    headers: {
      "Content-Type": undefined, 
    },
    onUploadProgress: (e) => {
      if (e.total) onProgress(Math.round((e.loaded / e.total) * 95));
    },
  });
  onProgress(100);
  return data as GenerateJobResponse;
};


export const fetchGenerateJobStatus = async (jobId: string) => {
  const { data } = await axiosInstance.get(`/api/v1/generate/${jobId}`, );
  return data as GenerateJobResponse;
};

export const buildGeneratedFileUrl = (filename: string) => {
  const baseUrl =
    import.meta.env.VITE_API_BASE_URL ||
    "https://genlearn-backend-egehcshjhabscsgu.francecentral-01.azurewebsites.net";
  return `${baseUrl.replace(/\/$/, "")}/api/v1/files/${encodeURIComponent(filename)}`;
};