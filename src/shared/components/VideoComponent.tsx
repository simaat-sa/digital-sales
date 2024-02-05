export function VideoComponent({
  src,
  thumb,
}: {
  src: string;
  thumb?: string;
}) {
  return (
    <video
      controls
      preload="none"
      className="w-full h-full"
      autoPlay={false}
      playsInline
    >
      <source src={src} />
      {thumb ? <source src={thumb} type="video/ogg" /> : null}
      Your browser does not support the video tag.
    </video>
  );
}
