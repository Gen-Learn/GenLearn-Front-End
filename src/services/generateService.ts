import axiosInstance from "./axios";

export type GenerateJobResponse = {
  statusCode?: number;
  jobId?: string;
  status?: string;
  filename?: string;
  fileName?: string;
  downloadUrl?: string;

  data?: {
    jobId?: string;
    status?: string;
    jobStatus?: string;
    resourceId?: string;
    filename?: string;
    fileName?: string;
    downloadUrl?: string;
  };
};

export const submitGenerateJob = async (files: File[]) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });

  const { data } = await axiosInstance.post("/api/v1/generate/test", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data as GenerateJobResponse;
};

export const fetchGenerateJobStatus = async (jobId: string) => {
  const token = localStorage.getItem("accessToken") || localStorage.getItem("token");
  const { data } = await axiosInstance.get(`/api/v1/generate/${jobId}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return data as GenerateJobResponse;
};

export const buildGeneratedFileUrl = (filename: string) => {
  const baseUrl =
    import.meta.env.VITE_API_BASE_URL ||
    "https://genlearn-backend-egehcshjhabscsgu.francecentral-01.azurewebsites.net";
  return `${baseUrl.replace(/\/$/, "")}/api/v1/files/${encodeURIComponent(filename)}`;
};