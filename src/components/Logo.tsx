/*
 * Single-colour Spice360 mark. The live site's "white" logo file is really a
 * grey-to-white bevel and reads muddy on the glows, so the colour logo's
 * alpha is used as a mask and filled with flat currentColor instead:
 * same silhouette (327x87 source, 3x at 29px), any colour, no bevel.
 */
export function Logo({ className = "h-[29px]" }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Spice360"
      className={`block aspect-[327/87] bg-current ${className}`}
      style={{
        maskImage: "url(/logo/spice360-color.png)",
        WebkitMaskImage: "url(/logo/spice360-color.png)",
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
      }}
    />
  );
}
