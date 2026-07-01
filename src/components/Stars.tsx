import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, type: "spring", stiffness: 250 }}
        >
          <Star size={18} className="fill-[#C41E1E] text-[#C41E1E]" />
        </motion.span>
      ))}
    </div>
  );
}