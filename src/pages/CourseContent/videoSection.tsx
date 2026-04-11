import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import testVideo from "../../assets/videos/test.mp4";
const videoSrc = testVideo;
export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    // 🛑 IMPORTANT: check element exists
    if (!videoElement) return;

    // 🛑 Prevent double init (React Strict Mode)
    if (!playerRef.current) {
      playerRef.current = videojs(videoElement, {
        controls: true,
        fluid: true,
        sources: [
          {
            src: videoSrc,
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
    };
  }, []);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
    </div>
  );
}
