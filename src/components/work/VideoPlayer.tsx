import { useState } from "react";
import { Play, Video } from "lucide-react";
import { isSafeDirectVideoUrl, parseVideoUrl } from "@/lib/video-embed";

type VideoPlayerProps = {
  url: string | null | undefined;
  title: string;
  poster?: string | null;
  legacyYouTubeId?: string | null;
  className?: string;
};

const VideoPlayer = ({
  url,
  title,
  poster,
  legacyYouTubeId,
  className = "",
}: VideoPlayerProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const parsed = parseVideoUrl(url);
  const safeLegacyYouTubeId = legacyYouTubeId?.trim().match(/^[A-Za-z0-9_-]{6,200}$/)?.[0];
  const legacyEmbed = !parsed && safeLegacyYouTubeId
    ? `https://www.youtube.com/embed/${safeLegacyYouTubeId}`
    : null;
  const embedUrl = parsed?.embedUrl ?? legacyEmbed;

  if (parsed?.provider === "google-drive" && !isOpened) {
    return (
      <button
        type="button"
        onClick={() => setIsOpened(true)}
        aria-label={`Play ${title} video`}
        className={`group relative block aspect-video w-full overflow-hidden rounded-[24px] border border-white/10 bg-[#07101f] text-white ${className}`}
      >
        {poster ? (
          <img
            src={poster}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <span className="absolute inset-0 grid place-items-center bg-gradient-to-br from-white/10 to-transparent text-white/30">
            <Video className="h-16 w-16" aria-hidden="true" />
          </span>
        )}
        <span className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/35" />
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid h-16 w-16 place-items-center rounded-full border border-white/30 bg-white text-black shadow-xl transition duration-300 group-hover:scale-110">
            <Play className="ml-1 h-7 w-7 fill-current" aria-hidden="true" />
          </span>
        </span>
      </button>
    );
  }

  if (embedUrl) {
    const isGoogleDrive = parsed?.provider === "google-drive";
    return (
      <div className={`aspect-video w-full overflow-hidden rounded-[24px] border border-white/10 bg-black ${className}`}>
        <iframe
          src={embedUrl}
          title={`${title} video`}
          allow={isGoogleDrive
            ? "autoplay"
            : "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"}
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className="h-full w-full"
        />
      </div>
    );
  }

  if (!isSafeDirectVideoUrl(url)) return null;
  return (
    <video
      src={url?.trim()}
      poster={poster ?? undefined}
      preload="metadata"
      controls
      playsInline
      className={`w-full rounded-[24px] border border-white/10 bg-black ${className}`}
    />
  );
};

export default VideoPlayer;
