/**
 * `sizes` for an `object-fit: cover` image. When the picture is wider than its box, the box's
 * height decides how many pixels are needed, so each slot width in `sizes` is scaled up by how
 * much wider the image is than the box. Media conditions such as `(max-width: 600px)` are untouched.
 */
export function coverSizes(sizes: string, image: { width: number; height: number }, boxRatio: number) {
  const scale = image.width / image.height / boxRatio;
  if (scale <= 1) return sizes;
  return sizes.replace(/(\d+(?:\.\d+)?)(vw|px)(?=\s*(?:,|$))/g, (_, value: string, unit: string) => `${Math.ceil(Number(value) * scale)}${unit}`);
}
