export function VideoComponent({
  src,
  thumb,
}: {
  src: string;
  thumb?: string;
}) {
  return (
    <video controls className="w-full h-auto" autoPlay={false} playsInline>
      <source src={src} type="video/mp4" />
      {thumb ? <source src={thumb} type="video/ogg" /> : null}
      Your browser does not support the video tag.
    </video>
  );
}
