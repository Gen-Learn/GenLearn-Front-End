import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import axiosInstance from "../../../services/axios";
import { InlineLoader } from '@/components/loading';
import { EmptyState } from '@/components/empty-states';
import { BookOpen } from 'lucide-react';

const domain = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

type VideoPlayerProps = {
  lectureId?: string;
  courseId?: string;
  onEnded?: () => void;
};

export default function VideoPlayer({ lectureId, courseId, onEnded }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<any>(null);
  const blobUrlRef = useRef<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Effect 1: Initialize Video.js ONCE on mount, never recreate it
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    playerRef.current = videojs(videoElement, {
      controls: true,
      fluid: true,
      sources: [],
    });

    playerRef.current.on("ended", () => {
      onEnded?.();
    });

    // Cleanup only on full component unmount
    return () => {
      if (playerRef.current && !playerRef.current.isDisposed()) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, []); // <-- empty deps: runs once

  // Effect 2: Fetch new video and UPDATE the existing player's source
  useEffect(() => {
    if (!lectureId) {
      setError("No lecture selected");
      return;
    }

    if (!playerRef.current || playerRef.current.isDisposed()) return;

    const controller = new AbortController();

    const fetchVideo = async () => {
      try {
        setLoading(true);
        setError(null);

        // Pause and clear current source while loading
        playerRef.current.pause();
        playerRef.current.src([]);

        // Revoke previous blob URL
        if (blobUrlRef.current) {
          URL.revokeObjectURL(blobUrlRef.current);
          blobUrlRef.current = null;
        }

        const videoUrl = `${domain}/api/v1/lectures/${lectureId}/stream`;
        const response = await axiosInstance.get(videoUrl, {
          responseType: "blob",
          signal: controller.signal,
        });

        const url = URL.createObjectURL(response.data);
        console.log("Headers:", response.headers);
        console.log("Blob Type:", response.data.type);
        console.log("Blob Size:", response.data.size);
        console.log(
          "Content-Range:",
          response.headers["content-range"]
        );

        playerRef.current.src({
          src: url,
          type: "video/mp4",
        });
      } catch (err: any) {
        if (err.name === "CanceledError" || err.name === "AbortError") return;
        console.error("Failed to fetch video:", err);
        setError("Failed to load video. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();

    // Cancel in-flight request if lectureId changes mid-fetch
    return () => {
      controller.abort();
    };
  }, [lectureId]);

  return (
    <div className="relative">
      {/* Always keep this mounted — Video.js owns this node */}
      <div data-vjs-player>
        <video ref={videoRef} className="video-js vjs-big-play-centered" />
      </div>

      {/* Loading overlay — sits on top, doesn't touch the video node */}
      {loading && (
        <div className="absolute inset-0 bg-black/75 flex items-center justify-center z-10">
          <InlineLoader className="text-white" />
        </div>
      )}

      {/* Error overlay */}
      {error && !loading && (
        <div className="absolute inset-0 bg-black flex items-center justify-center z-10 p-6">
          <EmptyState
            title="Video error"
            description={error}
            icon={BookOpen}
          />
        </div>
      )}
    </div>
  );
}