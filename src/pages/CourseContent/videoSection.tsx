import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import axiosInstance from "../../services/axios";

// Backend video stream URL
const videoSrc = "https://genlearn-backend-egehcshjhabscsgu.francecentral-01.azurewebsites.net/api/v1/lectures/3d0cf0d6-1fef-4bcf-8528-73422f45f8d0/stream";

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<any>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    // Fetch video stream with authentication
    const fetchVideo = async () => {
      try {
        const response = await axiosInstance.get(videoSrc, {
          responseType: "blob",
        });
        const blob = new Blob([response.data], { type: "video/mp4" });
        const url = URL.createObjectURL(blob);
        setBlobUrl(url);
      } catch (error) {
        console.error("Failed to fetch video:", error);
      }
    };

    fetchVideo();
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;

    // 🛑 IMPORTANT: check element exists and blob is ready
    if (!videoElement || !blobUrl) return;

    // 🛑 Prevent double init (React Strict Mode)
    if (!playerRef.current) {
      playerRef.current = videojs(videoElement, {
        controls: true,
        fluid: true,
        sources: [
          {
            src: blobUrl,
            type: "video/mp4",
          },
        ],
      });

      console.log("Video.js initialized");
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [blobUrl]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
    </div>
  );
}
