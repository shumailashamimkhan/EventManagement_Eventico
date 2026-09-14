import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { FadeIn } from "@/components/ui/FadeIn";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { SERVICES } from "@/lib/data/services";
import { GALLERY } from "@/lib/data/gallery";
import { TESTIMONIALS } from "@/lib/data/testimonials";
import { ServiceCard } from "@/components/service-card/ServiceCard";
import { GalleryCard } from "@/components/gallery-card/GalleryCard";
import { TestimonialCard } from "@/components/testimonial-card/TestimonialCard";
import { WhatsAppLink } from "@/components/whatsapp-button/WhatsAppButton";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Eventico — Professional Event Planning in Qatar",
  description: "Premium event planning and organisation for cultural celebrations, community gatherings, family events, and special occasions in Doha, Qatar.",
  openGraph: {
    title: "Eventico — Professional Event Planning in Qatar",
    description: "Premium event planning and organisation for cultural celebrations, community gatherings, family events, and special occasions in Doha, Qatar.",
    images: ["/images/hero.jpg"],
  }
};

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="pt-12 lg:pt-16 pb-[100px] overflow-hidden">
        <div className="wrap grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
          <Stagger className="flex flex-col justify-center">
            <StaggerItem>
              <div className="eyebrow">Doha · Qatar</div>
            </StaggerItem>
            <StaggerItem>
              <h1 className="font-serif text-[40px] lg:text-[54px] leading-[1.1] font-medium mt-4 mb-5 text-ink">
                Creating Experiences.
                <br />
                Bringing People Together.
              </h1>
            </StaggerItem>
            <StaggerItem>
              <p className="text-text-soft text-[17px] max-w-[480px] mb-8 leading-relaxed">
                Professional event planning and organisation for cultural
                celebrations, community gatherings, family events and special
                occasions in Qatar.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="flex gap-4 flex-wrap">
                <Button href="/contact">Plan Your Event</Button>
                <Button href="/events" variant="outline">
                  Explore Our Events
                </Button>
              </div>
            </StaggerItem>
          </Stagger>
          <FadeIn direction="left" delay={0.2} className="arch relative aspect-[3/4] w-full">
            <Image src="/images/hero.jpg" alt="Eventico event" fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" />
          </FadeIn>
        </div>
      </section>

      {/* Who We Are */}
      <section className="bg-ivory py-[88px]">
        <FadeIn direction="up" className="wrap grid lg:grid-cols-2 gap-14 items-center">
          <div className="arch arch-outline relative aspect-square">
            <Image src="/images/teamwork1.jpg" alt="Eventico team at work" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div>
            <div className="eyebrow">Who we are</div>
            <h2 className="font-serif text-3xl font-medium my-3.5">
              Creating Meaningful Moments Through Events
            </h2>
            <p className="text-text-soft leading-relaxed mb-4">
              Eventico Management &amp; Organisation brings people together
              through thoughtfully planned and professionally organised
              events. From cultural celebrations and community gatherings to
              family entertainment and special occasions, we create
              experiences designed to connect people, celebrate traditions
              and create lasting memories.
            </p>
            <Link href="/about" className="text-sm font-semibold text-maroon">
              Learn more about us →
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Services */}
      <section className="py-[88px]">
        <div className="wrap">
          <FadeIn direction="up" className="section-head">
            <div className="eyebrow">What we do</div>
            <h2 className="font-serif text-3xl font-medium my-3">From Concept to Celebration</h2>
            <p className="text-text-soft">
              Six ways we bring people together in Qatar, each led by a
              dedicated planner from concept to close.
            </p>
          </FadeIn>
          <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {SERVICES.slice(0, 6).map((s) => (
              <StaggerItem key={s.slug}>
                <ServiceCard service={s} />
              </StaggerItem>
            ))}
          </Stagger>
          <div className="text-center mt-10">
            <Button href="/services" variant="outline">
              View All Services
            </Button>
          </div>
        </div>
      </section>

      {/* Why Eventico */}
      <section className="bg-ivory py-[88px]">
        <div className="wrap text-center">
          <div className="eyebrow">Why Eventico</div>
          <h2 className="font-serif text-3xl font-medium my-3 mb-10">
            More Than an Event. It&apos;s an Experience.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { t: "Creative Planning", d: "We transform ideas into engaging event experiences." },
              { t: "Professional Coordination", d: "We coordinate people, activities, vendors and event requirements." },
              { t: "Community Connection", d: "We create opportunities for families and communities to come together." },
              { t: "Memorable Experiences", d: "Every event is designed to leave guests with lasting memories." },
            ].map((item) => (
              <div key={item.t} className="card text-center">
                <div className="icon-arch mx-auto" />
                <h3 className="text-lg font-medium mb-2">{item.t}</h3>
                <p className="text-sm text-text-soft">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Event — August Fiesta */}
      <section className="py-[88px]">
        <div className="wrap grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="eyebrow">Featured Event</div>
            <h2 className="font-serif text-3xl font-medium my-3.5">August Fiesta 2026</h2>
            <p className="text-text-soft leading-relaxed mb-6">
              A community celebration organised by Eventico in Al Wakra,
              bringing together more than 400 families and over 700 people
              for an evening of culture, entertainment, food, shopping and
              family activities.
            </p>
            <div className="flex gap-10 mb-7">
              <Stat value="700+" label="Attendees" />
              <Stat value="400+" label="Families" />
            </div>
            <Button href="/events">Read the Full Story</Button>
          </div>
          <div className="arch arch-outline relative aspect-[4/3]">
            <Image src="/images/birthday1.jpg" alt="Family event activities" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="bg-ivory py-[88px]">
        <div className="wrap text-center">
          <div className="eyebrow">Partners</div>
          <h2 className="font-serif text-[30px] font-medium my-3.5">
            Together, We Make Events Happen
          </h2>
          <p className="text-text-soft max-w-xl mx-auto">
            Successful events are built through strong partnerships. Eventico
            works with sponsors, vendors, volunteers, performers and media
            partners to bring every event together smoothly.
          </p>
          <div className="flex justify-center gap-8 mt-9 flex-wrap font-serif text-base text-text-soft">
            <span>Sponsors</span>
            <span>·</span>
            <span>Vendors</span>
            <span>·</span>
            <span>Media Partners</span>
            <span>·</span>
            <span>Community Partners</span>
          </div>
        </div>
      </section>

      {/* Gallery preview */}
      <section className="py-[88px]">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">A glimpse</div>
            <h2 className="font-serif text-3xl font-medium my-3">Moments We&apos;ve Created</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4.5">
            {GALLERY.slice(0, 6).map((item) => (
              <GalleryCard key={item.id} item={item} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Button href="/gallery" variant="outline">
              View Full Gallery
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-ivory py-[100px]">
        <div className="wrap grid lg:grid-cols-2 gap-14 items-center">
          <FadeIn direction="right">
            <div className="eyebrow mb-2">Testimonials</div>
            <h2 className="font-serif text-[38px] font-medium leading-tight mb-5 text-ink">
              What Client Says
            </h2>
            <p className="text-text-soft leading-relaxed max-w-md">
              We&apos;ve received fantastic feedback from our clients! They&apos;ve praised
              the quality and professionalism of our services. Our clients say
              we&apos;ve met their needs and helped them achieve success. We prioritize
              building long-term relationships with our clients and their
              satisfaction is our top priority.
            </p>
          </FadeIn>
          
          <FadeIn direction="left">
            <div className="bg-ink p-10 md:p-12 rounded-[4px] relative shadow-2xl transition-transform duration-500 hover:-translate-y-2">
              <div className="text-gold text-xl tracking-widest mb-6">★★★★★</div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-ivory font-semibold text-xl mb-1">Sameer &amp; Huda Ansari</h4>
                  <p className="text-stone text-sm">Bride &amp; Groom</p>
                </div>
                <div className="text-gold opacity-80 text-6xl font-serif leading-none rotate-180">
                  &ldquo;
                </div>
              </div>
              <p className="text-ivory/90 italic leading-relaxed text-[15px]">
                &quot;A very huge shoutout to the team for organizing our ceremony so beautifully. They took care of every minor detail, and the ambiance was so magical. If you&apos;re really looking for premium event planners in Doha, Eventico is the name you can trust.&quot;
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink text-ivory text-center py-[90px]">
        <div className="wrap max-w-xl">
          <div className="arch-mark border-gold-light mb-5" />
          <h2 className="font-serif text-[34px] font-medium mb-4">
            Let&apos;s Create Your Next Unforgettable Event
          </h2>
          <p className="text-[#cfc4b6] mb-8">
            Have an event idea? Let&apos;s turn it into an experience — share
            the details and our team will respond within one business day.
          </p>
          <div className="flex justify-center gap-3.5 flex-wrap">
            <Button href="/contact">Plan Your Event</Button>
            <WhatsAppLink
              message="Hello Eventico, I would like to plan an event."
              className="btn border border-[#cfc4b6] text-white"
            >
              WhatsApp Us
            </WhatsAppLink>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-serif text-3xl text-maroon">{value}</div>
      <div className="text-xs text-text-soft uppercase tracking-wider">{label}</div>
    </div>
  );
}
