import { SERVICES } from "@/lib/data/services";
import { ServiceCard } from "@/components/service-card/ServiceCard";
import { Metadata } from "next";
import { FadeIn } from "@/components/ui/FadeIn";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

export const metadata: Metadata = {
  title: "Services | Eventico",
  description: "Comprehensive event planning, coordination, and management services across Qatar.",
  openGraph: {
    title: "Services | Eventico",
    description: "Comprehensive event planning, coordination, and management services across Qatar.",
    images: ["/images/hero.jpg"],
  }
};

export default function ServicesPage() {
  const activeServices = SERVICES.filter((s) => s.isActive);

  return (
    <div>
      <FadeIn direction="down" className="py-16 text-center border-b border-stone">
        <div className="wrap">
          <div className="eyebrow">What we offer</div>
          <h1 className="font-serif text-4xl font-medium my-3">From Concept to Celebration</h1>
          <p className="text-text-soft max-w-xl mx-auto">
            Every engagement includes creative planning, coordination, and
            on-site management from concept to execution.
          </p>
        </div>
      </FadeIn>

      <section className="py-[88px]">
        <Stagger className="wrap grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {activeServices.map((s) => (
            <StaggerItem key={s.slug}>
              <ServiceCard service={s} showFeatures />
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </div>
  );
}
