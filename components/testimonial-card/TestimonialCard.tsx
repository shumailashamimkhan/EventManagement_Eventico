import type { Testimonial } from "@/lib/data/testimonials";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-ivory border border-stone p-7 relative">
      {testimonial.isPlaceholder && (
        <span className="absolute top-3 right-3 text-[10px] uppercase tracking-wide text-gold font-semibold">
          Placeholder
        </span>
      )}
      <div className="text-gold text-sm mb-3.5">★★★★★</div>
      <p className="text-sm text-text-soft leading-relaxed italic mb-4.5">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-sand-2 border border-stone" />
        <div>
          <strong className="block text-sm">{testimonial.name}</strong>
          <span className="text-xs text-text-soft">{testimonial.role}</span>
        </div>
      </div>
    </div>
  );
}
