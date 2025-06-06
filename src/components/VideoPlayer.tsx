import React from 'react';

interface VideoPlayerProps {
  videoSrc: string;
  thumbnailSrc?: string;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc, thumbnailSrc, className = "" }) => {
  return (
    <div className={`relative w-full rounded-lg overflow-hidden bg-black ${className}`} style={{ aspectRatio: "16/9" }}>
      <video
        src={videoSrc}
        poster={thumbnailSrc}
        controls
        className="w-full h-full"
        style={{ objectFit: "contain" }}
      >
        Je browser ondersteunt geen video weergave.
      </video>
    </div>
  );
};

export default VideoPlayer;

