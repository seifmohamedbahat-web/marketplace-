import { Star } from "lucide-react";

export function StarRating({ count = 5, size = 16 }: { count?: number; size?: number }) {
  return (
    <div className="flex gap-1" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={size} className="fill-brand text-brand" />
      ))}
    </div>
  );
}
