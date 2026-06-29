import axiosInstance from "./axios";
import { User } from "../types/userModel";

const domain = import.meta.env.VITE_API_BASE_URL;

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await axiosInstance.get(`${domain}/api/v1/users/me`);
    return response.data?.data.user ?? response.data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
};

export const updateCurrentUser = async (
  userData: Partial<Pick<User, "name" | "email" | "biography">>
): Promise<User | null> => {
  try {
    const payload: Record<string, string | null> = {};
    if (userData.name !== undefined) payload.name = userData.name;
    if (userData.email !== undefined) payload.email = userData.email;
    if (userData.biography !== undefined) payload.biography = userData.biography;

    const response = await axiosInstance.put(`${domain}/api/v1/users/me`, payload);
    return response.data?.data?.user ?? response.data;
  } catch (error) {
    console.error("Error updating current user:", error);
    return null;
  }
};

export const deleteCurrentUser = async (): Promise<boolean> => {
  // Nothing to clean up in localStorage anymore — the session lives in
  // httpOnly cookies. The backend's delete-account endpoint is expected to
  // clear those cookies (Set-Cookie, Max-Age=0) on success, the same way
  // /logout does. The caller (e.g. AuthContext) is responsible for clearing
  // the in-memory `user` state once this resolves true.
  try {
    await axiosInstance.delete(`${domain}/api/v1/users/me`);
    return true;
  } catch (error) {
    console.error("Error deleting current user:", error);
    return false;
  }
};

export const updateImageProfile = async (imageFile: File): Promise<User | null> => {
  try {
    const formData = new FormData();
    formData.append("profilePicture", imageFile);
    const response = await axiosInstance.put(`${domain}/api/v1/users/me/profile-image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data?.data ?? response.data;
  } catch (error) {
    console.error("Error updating user profile picture:", error);
    return null;
  }
};

export const getImageProfile = async (userId: string): Promise<User | null> => {
  try {
    const response = await axiosInstance.get(`${domain}/api/v1/users/me/profile-image`);
    return response.data?.data ?? response.data;
  } catch (error) {
    console.error("Error fetching user profile picture:", error);
    return null;
  }
};

export const deleteImageProfile = async (): Promise<boolean> => {
  try {
    await axiosInstance.delete(`${domain}/api/v1/users/me/profile-image`);
    return true;
  } catch (error) {
    console.error("Error deleting user profile picture:", error);
    return false;
  }
};