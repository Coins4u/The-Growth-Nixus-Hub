"use client";

import { useEffect, useMemo, useState } from "react";

type VideoPlayerProps = {
  youtubeId: string;
  title: string;
};

const FALLBACK_YOUTUBE_ID = "46XhZf7Z94E";

function resolveYoutubeId(id: string) {
  return /^[A-Za-z0-9_-]{11}$/.test(id) ? id : FALLBACK_YOUTUBE_ID;
}

export function VideoPlayer({ youtubeId, title }: VideoPlayerProps) {
  const resolvedId = useMemo(() => resolveYoutubeId(youtubeId), [youtubeId]);
  const [activeId, setActiveId] = useState(resolvedId);
  const embedUrl = `https://www.youtube-nocookie.com/embed/${activeId}?autoplay=1&rel=0&modestbranding=1&controls=1`;

  useEffect(() => {
    setActiveId(resolvedId);
  }, [resolvedId]);

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-950/80 p-3">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.15em] text-indigo-300">Theater Mode</p>
        <p className="text-xs text-slate-400">Live Preview Stream</p>
      </div>
      <div className="aspect-video w-full overflow-hidden rounded-lg border border-slate-800">
        <iframe
          className="h-full w-full"
          width="100%"
          height="100%"
          src={embedUrl}
          title={title}
          onError={() => setActiveId(FALLBACK_YOUTUBE_ID)}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    </div>
  );
}
