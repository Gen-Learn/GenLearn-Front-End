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

    // A new load starting means any previous error is now stale — clear it
    // so the overlay doesn't linger once a real source starts loading.
    playerRef.current.on("loadstart", () => {
      setError(null);
    });

    playerRef.current.on("error", () => {
      const mediaError = playerRef.current?.error();
      console.error("Video.js media error:", mediaError);
      setError(
        mediaError?.code === 4
          ? "The video URL returned an invalid or inaccessible file."
          : "Failed to load video. Please try again."
      );
      setLoading(false);
    });

    // Cleanup only on full component unmount
    return () => {
      if (playerRef.current && !playerRef.current.isDisposed()) {
        playerRef.current.dispose();
        playerRef.current = null;
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

        const videoUrl = `${domain}/api/v1/lectures/${lectureId}/stream-url`;
        const response = await axiosInstance.get(videoUrl, {
          signal: controller.signal,
        });
        const data = response.data;

        if (!data?.url) {
          throw new Error("Stream URL missing from response.");
        }

        // No need to pause()/src([]) first — Video.js swaps sources cleanly
        // on its own, and clearing with an empty array was firing a false
        // "no compatible source" error before the real URL even loaded.
        playerRef.current.ready(() => {
          playerRef.current.src({
            src: data.url,
            type: "video/mp4",
          });
        });
      } catch (err: any) {
        if (err.name === "CanceledError" || err.name === "AbortError") return;
        console.error("Failed to fetch video:", err);
        setError(err.message || "Failed to load video. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();

    return () => {
      controller.abort();
    };
  }, [lectureId]);

  return (
    <div className="relative">
      <div data-vjs-player>
        <video ref={videoRef} className="video-js vjs-big-play-centered" />
      </div>

      {loading && (
        <div className="absolute inset-0 bg-black/75 flex items-center justify-center z-10">
          <InlineLoader className="text-white" />
        </div>
      )}

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