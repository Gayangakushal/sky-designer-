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
  const parsed = parseVideoUrl(url);
  const safeLegacyYouTubeId = legacyYouTubeId?.trim().match(/^[A-Za-z0-9_-]{6,200}$/)?.[0];
  const legacyEmbed = !parsed && safeLegacyYouTubeId
    ? `https://www.youtube.com/embed/${safeLegacyYouTubeId}`
    : null;
  const embedUrl = parsed?.embedUrl ?? legacyEmbed;

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
