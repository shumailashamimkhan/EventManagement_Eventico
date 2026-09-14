import Image from "next/image";
import { Metadata } from "next";
import { FadeIn } from "@/components/ui/FadeIn";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

export const metadata: Metadata = {
  title: "Events | Eventico",
  description: "Explore celebrations and events planned and organised by Eventico across Qatar.",
  openGraph: {
    title: "Events | Eventico",
    description: "Explore celebrations and events planned and organised by Eventico across Qatar.",
    images: ["/images/wedding1.jpg"],
  }
};

const HIGHLIGHTS = [
  { t: "Children's Activities", d: "Games and entertainment programmes for younger guests." },
  { t: "Stage Performances", d: "Live entertainment celebrating Pakistani culture and tradition." },
  { t: "Food & Shopping", d: "Vendors and stalls bringing food and shopping to every family." },
  { t: "Cultural Celebration", d: "An evening designed to showcase and celebrate heritage." },
  { t: "Family Entertainment", d: "Activities designed for guests of every age." },
  { t: "Community Participation", d: "Volunteers, sponsors and vendors coming together as one team." },
];

const EVENT_GALLERY = [
  { image: "/images/birthday1.jpg", label: "Family Activities" },
  { image: "/images/wedding1.jpg", label: "Cultural Performance" },
  { image: "/images/gala1.jpg", label: "Evening Entertainment" },
  { image: "/images/teamwork1.jpg", label: "Team Coordination" },
  { image: "/images/giftsuite.jpg", label: "Guest Registration" },
  { image: "/images/backdrop1.jpg", label: "Decor & Setup" },
];

export default function EventsPage() {
  return (
    <div>
      <FadeIn direction="down" className="py-16 text-center border-b border-stone">
        <div className="wrap">
          <div className="eyebrow">Our work</div>
          <h1 className="font-serif text-4xl font-medium my-3">Events That Bring People Together</h1>
          <p className="text-text-soft max-w-xl mx-auto">
            A look at the celebrations Eventico has planned and organised
            across Qatar.
          </p>
        </div>
      </FadeIn>

      <section className="py-[88px]">
        <FadeIn className="wrap grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="eyebrow">Case Study</div>
            <h2 className="font-serif text-[30px] font-medium mt-2.5 mb-1.5">August Fiesta 2026</h2>
            <p className="text-gold font-semibold text-sm mb-4.5">Al Wakra, Qatar</p>
            <p className="text-text-soft leading-relaxed mb-5">
              A community celebration organised by Eventico to showcase
              Pakistani culture, cuisine and entertainment — bringing
              together more than 400 families and over 700 people for an
              evening of culture, entertainment, food, shopping and family
              activities.
            </p>
            <div className="flex gap-10">
              <Stat value="400+" label="Families" />
              <Stat value="700+" label="Attendees" />
            </div>
          </div>
          <div className="arch arch-outline relative aspect-[4/5]">
            <Image src="/images/wedding1.jpg" alt="August Fiesta 2026" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </FadeIn>
      </section>

      <section className="bg-ivory py-[88px]">
        <div className="wrap text-center">
          <FadeIn direction="up">
            <div className="eyebrow">Highlights</div>
            <h2 className="font-serif text-[28px] font-medium my-3 mb-10">What Made It Special</h2>
          </FadeIn>
          <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {HIGHLIGHTS.map((h) => (
              <StaggerItem key={h.t}>
                <div className="card text-left">
                  <div className="icon-arch" />
                  <h3 className="text-lg font-medium mb-2">{h.t}</h3>
                  <p className="text-sm text-text-soft">{h.d}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-[88px] text-center">
        <FadeIn direction="up" className="wrap">
          <div className="eyebrow">Community</div>
          <h2 className="font-serif text-[28px] font-medium my-3">
            Connecting Communities Through Celebration
          </h2>
          <p className="text-text-soft max-w-2xl mx-auto leading-relaxed">
            At Eventico, events are more than entertainment. They create
            opportunities for families, communities and different
            generations to come together, celebrate their heritage and
            create shared memories.
          </p>
        </FadeIn>
      </section>

      <section className="bg-ivory py-[88px]">
        <div className="wrap">
          <FadeIn direction="up" className="section-head">
            <div className="eyebrow">Gallery</div>
            <h2 className="font-serif text-3xl font-medium my-3">Moments From August Fiesta</h2>
            <p className="text-xs text-gold">
              Photos below are illustrative placeholders — replace with real
              August Fiesta 2026 photography once available.
            </p>
          </FadeIn>
          <Stagger className="grid grid-cols-2 md:grid-cols-3 gap-4.5">
            {EVENT_GALLERY.map((item) => (
              <StaggerItem key={item.label}>
                <div className="relative aspect-square overflow-hidden group">
                  <Image src={item.image} alt={item.label} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 50vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div className="text-white">
                      <h4 className="font-serif text-base">{item.label}</h4>
                      <p className="text-xs opacity-85">August Fiesta 2026</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-serif text-[34px] text-maroon">{value}</div>
      <div className="text-xs text-text-soft uppercase tracking-wider">{label}</div>
    </div>
  );
}
