import Image from "next/image";
import type { Service } from "@/lib/data/services";
import { Button } from "@/components/ui/Button";

export function ServiceCard({ service, showFeatures = false }: { service: Service; showFeatures?: boolean }) {
  return (
    <div className="card flex flex-col group hover:shadow-xl transition-shadow duration-300">
      <div className="relative -mx-8 -mt-8 mb-4.5 aspect-[4/3] overflow-hidden rounded-t-[4px]">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <h3 className="text-lg font-medium mb-2.5">{service.title}</h3>
      <p className="text-sm text-text-soft leading-relaxed mb-3.5">{service.description}</p>

      {showFeatures && (
        <ul className="list-disc pl-4.5 mb-4 text-sm text-text-soft space-y-1">
          {service.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      )}

      <div className="mt-auto">
        {showFeatures ? (
          <Button href="/contact" variant="gold" className="w-full justify-center !py-2.5">
            Request a Quote
          </Button>
        ) : (
          <a href="/contact" className="text-sm font-semibold text-maroon">
            Request a Quote →
          </a>
        )}
      </div>
    </div>
  );
}
