export default function cloudflareLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const params = [`width=${width}`, 'format=auto'];
  if (quality) {
    params.push(`quality=${quality}`);
  }
  const paramsString = params.join(',');
  
  // Normalize the src URL if it's absolute
  // Cloudflare image resizing requires the URL to be either relative (if on the same domain)
  // or absolute (if hosted elsewhere but the zone supports it).
  return `/cdn-cgi/image/${paramsString}/${src}`;
}
