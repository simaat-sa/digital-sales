"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function BaseImage({
  src,
  alt,
}: Readonly<{ src: string; alt: string }>) {
  const [source, setSource] = useState(src || "");

  return (
    <div className="w-full h-full relative">
      <Image
        src={source}
        alt={alt}
        fill
        sizes="(min-width: 808px) 50vw, 100vw"
        style={{
          objectFit: "cover",
        }}
        onError={() => setSource("/assets/images/default.png")}
      />
    </div>
  );
}
