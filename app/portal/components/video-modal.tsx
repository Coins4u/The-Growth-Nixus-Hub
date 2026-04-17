"use client";

import { VideoPlayer } from "./video-player";

type VideoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  youtubeId: string;
};

export function VideoModal({ isOpen, onClose, title, youtubeId }: VideoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4">
      <div className="w-full max-w-4xl rounded-xl border border-slate-700 bg-slate-900 p-4 shadow-2xl">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-100">{title} - Lecture Preview</p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-700 px-2 py-1 text-xs text-slate-300 hover:border-indigo-400 hover:text-indigo-200"
          >
            Close
          </button>
        </div>
        <VideoPlayer title={title} youtubeId={youtubeId} />
      </div>
    </div>
  );
}
