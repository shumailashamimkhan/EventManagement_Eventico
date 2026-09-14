import Image from "next/image";
import { Metadata } from "next";
import { FadeIn } from "@/components/ui/FadeIn";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

export const metadata: Metadata = {
  title: "About Us | Eventico",
  description: "Learn about Eventico Management & Organisation, the premier event planning company in Doha, Qatar.",
  openGraph: {
    title: "About Us | Eventico",
    description: "Learn about Eventico Management & Organisation, the premier event planning company in Doha, Qatar.",
    images: ["/images/teamwork1.jpg"],
  }
};

const APPROACH = [
  { t: "Creative Planning", d: "We transform ideas into engaging event experiences." },
  { t: "Professional Coordination", d: "We coordinate people, activities, vendors and event requirements." },
  { t: "Community Connection", d: "We create opportunities for families and communities to come together." },
  { t: "Memorable Experiences", d: "Every event is designed to leave guests with lasting memories." },
];

const LEADERSHIP = [
  { name: "Faiza Hashmat", role: "Owner" },
  { name: "Shumaila Khalid", role: "Managing Partner" },
  { name: "Coordination Team", role: "Volunteers & Event Staff" },
  { name: "Partner Network", role: "Vendors & Performers" },
];

export default function AboutPage() {
  return (
    <div>
      <FadeIn direction="down" className="py-16 text-center border-b border-stone">
        <div className="wrap">
          <div className="eyebrow">Our story</div>
          <h1 className="font-serif text-4xl font-medium my-3">
            Creating Meaningful Moments Through Events
          </h1>
          <p className="text-text-soft max-w-xl mx-auto">
            A Qatar-based events company bringing communities, families and
            cultures together.
          </p>
        </div>
      </FadeIn>

      <section className="py-[88px]">
        <FadeIn className="wrap grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="font-serif text-[30px] font-medium mb-4.5">Who We Are</h2>
            <p className="text-text-soft leading-relaxed mb-4">
              Eventico Management &amp; Organisation brings people together
              through thoughtfully planned and professionally organised
              events. From cultural celebrations and community gatherings to
              family entertainment and special occasions, we create
              experiences designed to connect people, celebrate traditions
              and create lasting memories.
            </p>
            <p className="text-text-soft leading-relaxed">
              Our team most recently organised August Fiesta 2026 in Al
              Wakra, bringing together more than 400 families and 700 people
              for an evening of community celebration.
            </p>
          </div>
          <div className="arch arch-outline relative aspect-[4/5]">
            <Image src="/images/teamwork1.jpg" alt="Eventico team" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </FadeIn>
      </section>

      <section className="bg-ivory py-[88px]">
        <div className="wrap text-center">
          <FadeIn direction="up">
            <div className="eyebrow">Our Approach</div>
            <h2 className="font-serif text-[30px] font-medium my-3 mb-10">
              How We Bring Events to Life
            </h2>
          </FadeIn>
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {APPROACH.map((item) => (
              <StaggerItem key={item.t}>
                <div className="card text-center">
                  <div className="icon-arch mx-auto" />
                  <h3 className="text-lg font-medium mb-2">{item.t}</h3>
                  <p className="text-sm text-text-soft">{item.d}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-[88px]">
        <div className="wrap">
          <FadeIn direction="up" className="section-head">
            <div className="eyebrow">Leadership</div>
            <h2 className="font-serif text-3xl font-medium my-3">The People Behind Eventico</h2>
            <p className="text-xs text-gold">
              Titles as reported by Qatar Tribune — to be confirmed with the
              company before publishing.
            </p>
          </FadeIn>
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LEADERSHIP.map((person) => (
              <StaggerItem key={person.name}>
                <div>
                  {person.name === "Faiza Hashmat" ? (
                    <div className="arch relative aspect-[3/4] mb-3.5 overflow-hidden">
                      <Image src="/images/professional.jpg" alt={person.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                    </div>
                  ) : person.name === "Shumaila Khalid" ? (
                    <div className="arch relative aspect-[3/4] mb-3.5 overflow-hidden">
                      <Image src="/images/professional2.jpg" alt={person.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                    </div>
                  ) : (
                    <div className="arch aspect-[3/4] bg-gradient-to-br from-maroon to-ink mb-3.5" />
                  )}
                  <h4 className="text-[15px] mb-0.5">{person.name}</h4>
                  <span className="text-xs text-gold">{person.role}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </div>
  );
}
