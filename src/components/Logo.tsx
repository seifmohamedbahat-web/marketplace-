import logoAsset from "@/assets/avexa-logo.png.asset.json";

export function Logo({ className = "", size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "h-14", md: "h-20", lg: "h-28 md:h-36" };
  return (
    <img
      src={logoAsset.url}
      alt="Avexa"
      className={`${sizes[size]} w-auto select-none ${className}`}
      draggable={false}
    />
  );
}