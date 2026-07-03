export interface GenerateJobResponse {
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