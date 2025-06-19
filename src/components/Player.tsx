"use client";
import React, { useState } from "react";

interface VideoPlayerProps {
  src: string;
}

const Player: React.FC<VideoPlayerProps> = ({ src }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="w-full min-w-[320px] max-w-[1030px]">
      {!isLoaded && (
        <div className="w-full rounded-[30px] min-w-[300px] sm:min-w-[500px] md:min-w-[700px] lg:min-w-[900px] xl:min-w-[1000px] max-w-[1030px] h-[530px] bg-neutral-800 animate-pulse border border-neutral-700 shadow-md" />
      )}

      <video
        src={src}
        className={`rounded-[30px] w-full h-auto transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0 absolute"
        }`}
        onCanPlayThrough={() => setIsLoaded(true)}
        autoPlay
        loop
        muted
        playsInline
        controls
      />
    </div>
  );
};

export default Player;
