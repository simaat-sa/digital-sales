import Image, { ImageProps } from "next/image";
import React from "react";

interface BaseImageProps extends ImageProps {
  src: string;
  alt: string;
}

export default function BaseImage({ src, alt, ...props }: BaseImageProps) {
  return (
    <div className="flex flex-col">
      <Image
        {...props}
        alt={alt}
        src={src}
        sizes="(min-width: 808px) 50vw, 100vw"
        style={{
          width: "100%",
          height: "auto",
        }}
      />
    </div>
  );
}
