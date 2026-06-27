"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import {
  ArrowUpRight,
  BadgeCheck,
  Droplets,
  Gauge,
  LifeBuoy,
  MapPin,
  MessageSquareText,
  Phone,
  SearchCheck,
  Sparkles,
  TestTube2,
  Waves,
  Zap,
} from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const assets = (name: string) => `${basePath}/assets/${name}`;

const facebookUrl = "https://www.facebook.com/profile.php?id=61566973957416";
const phoneDisplay = "0498 084 872";
const phoneHref = "tel:+61498084872";
const serviceArea = "Perth WA";
const mapsQuery = encodeURIComponent("JR Contracting Perth WA pool professionals");
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
const mapEmbedUrl = "https://maps.google.com/maps?q=Perth%20WA&z=11&output=embed";

const services = [
  {
    icon: Gauge,
    title: "Pre-concrete pressure testing",
    body: "Pressure testing before concrete work so pool pipework can be checked before the job becomes expensive to reopen.",
  },
  {
    icon: Sparkles,
    title: "Post-concrete pool cleans",
    body: "After-build cleaning for pools affected by concrete works, dust, residue and cloudy water after surrounding works are complete.",
  },
  {
    icon: TestTube2,
    title: "Pool water testing",
    body: "Pool-to-phone testing for PH, total chlorine, free chlorine, CYA and calcium hardness levels.",
  },
  {
    icon: SearchCheck,
    title: "Leak detection",
    body: "Practical leak checks for pools that are losing water, behaving strangely or need a clear next step before repairs.",
  },
  {
    icon: Droplets,
    title: "Green pool recovery",
    body: "Help for green, cloudy or neglected pools that need a controlled clean-up and water balance process.",
  },
  {
    icon: Zap,
    title: "Pool lighting & upgrades",
    body: "Lighting, monitoring and customisation support for pools that need better visibility, finish or day-to-day control.",
  },
];

const proofPoints = [
  "Pool-first service list from JR Contracting, covering pressure tests, cleans, testing, leaks, green pools and lighting.",
  "Facebook media shows pressure testing, concrete-work pool preparation and before/after post-concrete cleaning content.",
  "Phone-first contact route for Perth homeowners, builders and pool owners who need a clear service conversation.",
  "Useful for pre-build checks, after-works recovery and ongoing water quality issues around Perth homes.",
];

const gallery = [
  {
    src: "fb-pressure-testing.jpg",
    title: "Perth pool pressure testing",
    alt: "JR Contracting Facebook video thumbnail for Perth pool pressure testing",
    source: "Pressure-test service media",
  },
  {
    src: "fb-pre-concrete-pool.jpg",
    title: "Before concrete work",
    alt: "Pool shown before concrete work in a JR Contracting Facebook video thumbnail",
    source: "Pre-concrete pool check",
  },
  {
    src: "fb-post-concrete-clean.jpg",
    title: "Post-concrete clean-up",
    alt: "Before and after pool cleaning shown in a JR Contracting Facebook video thumbnail",
    source: "After-works pool clean",
  },
  {
    src: "hero-pool-service.png",
    title: "Pool service-ready water",
    alt: "Clean backyard pool with service equipment beside the water",
    source: "Clear-water service focus",
  },
];

const faqs = [
  ["Do they handle pools before concrete work?", "Yes. JR lists pre-concrete pressure testing for pools that need pipework checked before surrounding works continue."],
  ["Can JR help after concrete has been done?", "Yes. Post-concrete pool cleaning is one of the core service lanes for pools affected by dust, residue and cloudy water."],
  ["Can customers ask about pool chemistry?", "Yes. JR lists pool-to-phone support for PH, TC, FC, CYA and calcium hardness levels."],
  ["What should I send before calling?", "Share the suburb, what work is booked or recently finished, and whether the issue is pressure, cleaning, leaking, green water or lighting."],
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      className="group w-full rounded-xl border border-slate-900/10 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-600/35"
      onClick={() => setOpen((current) => !current)}
      type="button"
    >
      <span className="flex items-center justify-between gap-4 text-base font-black text-slate-950 sm:text-lg">
        {q}
        <ArrowUpRight className={`shrink-0 text-cyan-700 transition ${open ? "-rotate-45" : ""}`} size={20} />
      </span>
      {open ? <span className="mt-4 block text-[15px] leading-7 text-slate-600 sm:text-base">{a}</span> : null}
    </button>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.25 10.44 22v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.47h-1.25c-1.24 0-1.63.78-1.63 1.57v1.89h2.77l-.44 2.91h-2.33V22C18.34 21.25 22 17.08 22 12.06z" />
    </svg>
  );
}

export default function Page() {
  const main = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -72]);
  const beamY = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const [service, setService] = useState("Pre-concrete pressure testing");
  const [suburb, setSuburb] = useState("");
  const [details, setDetails] = useState("");

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, syncTouch: false });
    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".service-card", {
        y: 44,
        opacity: 0,
        duration: 0.8,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: { trigger: ".services-grid", start: "top 74%" },
      });
      const galleryTrack = document.querySelector<HTMLElement>(".gallery-track");
      const galleryMedia = gsap.matchMedia();
      galleryMedia.add("(min-width: 768px)", () => {
        if (!galleryTrack) return;
        const overflow = () => Math.max(0, galleryTrack.scrollWidth - window.innerWidth + 96);
        gsap.to(galleryTrack, {
          x: () => -overflow(),
          ease: "none",
          scrollTrigger: {
            trigger: ".gallery-stage",
            start: "top top",
            end: () => `+=${Math.max(1100, overflow() + 520)}`,
            scrub: 0.85,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });
      gsap.to(".signal-line", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: ".proof-section", start: "top 70%", end: "bottom 40%", scrub: true },
      });
      return () => galleryMedia.revert();
    }, main);
    return () => ctx.revert();
  }, []);

  const smsBody = encodeURIComponent(
    `Hi JR Contracting, I need help with ${service}${suburb ? ` in ${suburb}` : ""}.${details ? ` Details: ${details}` : ""}`,
  );
  const smsHref = `sms:+61498084872?&body=${smsBody}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "JR Contracting",
    image: assets("jr-logo.jpg"),
    telephone: "+61498084872",
    areaServed: "Perth WA",
    url: "https://deanooooooooo.github.io/jr-contracting-perth/",
    sameAs: [facebookUrl],
    description:
      "JR Contracting provides pool pressure testing, post-concrete pool cleaning, water testing, leak detection and pool service support in Perth WA.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Perth",
      addressRegion: "WA",
      addressCountry: "AU",
    },
  };

  return (
    <main ref={main} className="min-h-screen overflow-hidden text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/12 bg-[#031218]/80 text-white backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-8">
          <a href="#top" className="flex min-w-0 items-center gap-3">
            <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-cyan-200/25 bg-cyan-100">
              <Image src={assets("jr-logo.jpg")} alt="JR Contracting logo" fill sizes="56px" className="object-cover" priority />
            </span>
            <span className="min-w-0">
              <span className="block text-lg font-black leading-tight">JR Contracting</span>
              <span className="block text-sm font-semibold text-white/70">Perth pool professionals</span>
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-black lg:flex">
            <a href="#services" className="transition hover:text-cyan-200">Services</a>
            <a href="#gallery" className="transition hover:text-cyan-200">Media</a>
            <a href="#proof" className="transition hover:text-cyan-200">Proof</a>
            <a href="#contact" className="transition hover:text-cyan-200">Contact</a>
          </nav>
          <a href={phoneHref} className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-xl bg-cyan-200 px-4 py-3 text-sm font-black text-slate-950 shadow-[0_14px_50px_rgba(103,232,249,0.22)] transition hover:bg-white sm:px-5">
            <Phone size={18} />
            <span className="hidden sm:inline">{phoneDisplay}</span>
          </a>
        </div>
      </header>

      <section id="top" className="relative flex min-h-screen items-center overflow-hidden bg-[#031218] px-4 pb-16 pt-28 text-white sm:px-8 lg:pt-24">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src={assets("hero-pool-service.png")} alt="Clean pool with service equipment beside the water" fill priority sizes="100vw" className="object-cover opacity-72" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_58%,rgba(6,182,212,0.18),transparent_34%),linear-gradient(90deg,rgba(2,14,20,0.98)_0%,rgba(2,14,20,0.76)_42%,rgba(2,14,20,0.24)_100%)]" />
        </motion.div>
        <motion.div style={{ y: beamY }} className="pointer-events-none absolute -left-28 top-10 h-[36rem] w-[36rem] rounded-full border border-cyan-200/12" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-8 lg:grid-cols-[0.98fr_0.86fr] xl:gap-12">
          <Reveal>
            <div className="mb-6 inline-flex flex-wrap items-center gap-2 rounded-full border border-cyan-200/25 bg-cyan-200/10 px-4 py-2 text-sm font-black text-cyan-100">
              <Waves size={18} /> Perth pool pressure testing, cleans & leak checks
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-[1] tracking-normal sm:text-6xl lg:text-[4.6rem] xl:text-[4.85rem]">
              Pool help before the concrete goes in and after the dust settles.
            </h1>
            <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-white/78 sm:text-xl">
              JR Contracting helps Perth pool owners and builders with pressure testing, post-concrete cleaning, water checks, leak detection and green pool recovery.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={phoneHref} className="inline-flex min-h-14 items-center gap-2 rounded-xl bg-cyan-200 px-6 py-4 text-base font-black text-slate-950 shadow-[0_22px_80px_rgba(103,232,249,0.24)] transition hover:bg-white">
                <Phone size={20} /> Call {phoneDisplay}
              </a>
              <a href="#contact" className="inline-flex min-h-14 items-center gap-2 rounded-xl border border-white/18 bg-white/10 px-6 py-4 text-base font-black text-white backdrop-blur-xl transition hover:bg-white hover:text-slate-950">
                <MessageSquareText size={20} /> Send a pool brief
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <form
              className="w-full max-w-xl rounded-2xl border border-white/16 bg-white/[0.09] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.44)] backdrop-blur-2xl sm:p-6 lg:justify-self-end"
              onSubmit={(event) => {
                event.preventDefault();
                window.location.href = smsHref;
              }}
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-black uppercase text-cyan-100">Pool enquiry</p>
                  <h2 className="mt-2 text-3xl font-black leading-tight text-white">Tell JR what needs checking.</h2>
                </div>
                <LifeBuoy className="shrink-0 text-cyan-200" size={34} />
              </div>
              <label className="block text-sm font-black text-white/82" htmlFor="service">Service needed</label>
              <select id="service" value={service} onChange={(event) => setService(event.target.value)} className="mt-2 min-h-[52px] w-full rounded-xl border border-white/12 bg-white px-4 py-3 text-base font-bold text-slate-950 outline-none focus:border-cyan-300">
                {services.map((item) => <option key={item.title}>{item.title}</option>)}
              </select>
              <label className="mt-4 block text-sm font-black text-white/82" htmlFor="suburb">Suburb or area</label>
              <input id="suburb" value={suburb} onChange={(event) => setSuburb(event.target.value)} className="mt-2 min-h-[52px] w-full rounded-xl border border-white/12 bg-white px-4 py-3 text-base font-bold text-slate-950 outline-none focus:border-cyan-300" placeholder="e.g. Joondalup, Canning Vale, Rockingham" />
              <label className="mt-4 block text-sm font-black text-white/82" htmlFor="details">What is happening?</label>
              <textarea id="details" value={details} onChange={(event) => setDetails(event.target.value)} className="mt-2 min-h-28 w-full resize-none rounded-xl border border-white/12 bg-white px-4 py-3 text-base font-bold leading-7 text-slate-950 outline-none focus:border-cyan-300" placeholder="Pressure test before concrete, cloudy water after works, possible leak, green pool..." />
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Button type="submit" className="min-h-14 rounded-xl bg-cyan-200 text-base text-slate-950 hover:bg-white">
                  Text the brief
                </Button>
                <a href={phoneHref} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border border-white/16 bg-white/10 px-5 py-3 text-base font-black text-white transition hover:bg-white hover:text-slate-950">
                  <Phone size={18} /> Call instead
                </a>
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      <section className="relative z-10 mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:px-8 md:grid-cols-3">
        {[
          ["Before concrete", "Pressure testing before the surrounds go in, so buried issues are easier to catch."],
          ["After works", "Post-concrete pool cleaning for dust, residue and cloudy water after trades finish."],
          ["Direct help", "Call or text the brief straight to JR with the suburb, service and issue."],
        ].map(([title, body]) => (
          <article key={title} className="rounded-2xl border border-slate-900/8 bg-white p-6 shadow-[0_22px_70px_rgba(15,23,42,0.08)]">
            <strong className="block text-2xl font-black text-cyan-800">{title}</strong>
            <span className="mt-3 block text-base font-bold leading-7 text-slate-600">{body}</span>
          </article>
        ))}
      </section>

      <section id="services" className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-8">
        <Reveal className="max-w-3xl">
          <p className="mb-3 text-sm font-black uppercase text-cyan-700">Pool services</p>
          <h2 className="text-4xl font-black leading-none sm:text-6xl">Focused pool help for the moments that matter.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            The service mix is practical: test before concrete, clean after works, check the water, find the leak, recover the pool, then keep the setup easier to manage.
          </p>
        </Reveal>
        <div className="services-grid mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <motion.article key={item.title} className="service-card group min-h-[270px] rounded-2xl border border-slate-900/10 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.07)]" whileHover={{ y: -8, scale: 1.012 }} transition={{ type: "spring", stiffness: 220, damping: 20 }}>
                <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-100 text-cyan-800 transition group-hover:bg-cyan-700 group-hover:text-white">
                  <Icon size={28} />
                </div>
                <h3 className="text-2xl font-black">{item.title}</h3>
                <p className="mt-4 text-base leading-7 text-slate-600">{item.body}</p>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section id="gallery" className="gallery-stage overflow-hidden bg-[#031218] py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <Reveal>
            <p className="mb-3 text-sm font-black uppercase text-cyan-200">Pool service media</p>
            <h2 className="max-w-4xl text-4xl font-black leading-none sm:text-6xl">Pressure testing, pool preparation and clean-up visuals.</h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/68">
              See the sort of pool situations JR is set up for: pressure checks, pre-concrete preparation, after-works cleaning and clear-water service.
            </p>
          </Reveal>
        </div>
        <div className="gallery-track mx-auto mt-12 grid w-full max-w-7xl grid-cols-1 gap-4 px-4 sm:px-8 md:flex md:w-[112rem] md:max-w-none">
          {gallery.map((item) => (
            <motion.figure key={item.src} className="relative h-[72vh] max-h-[620px] min-h-[430px] w-full shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:min-h-[540px] md:h-[600px] md:w-[430px]" whileHover={{ y: -10, scale: 1.018 }}>
              <Image src={assets(item.src)} alt={item.alt} fill sizes="(min-width: 768px) 430px, 100vw" loading="eager" className="object-cover" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-5">
                <span className="block text-xl font-black">{item.title}</span>
                <span className="mt-1 block text-sm font-bold text-white/64">{item.source}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      <section id="proof" className="proof-section relative bg-white px-4 py-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.74fr_1fr]">
          <Reveal>
            <p className="mb-3 text-sm font-black uppercase text-cyan-700">Why call JR</p>
            <h2 className="text-4xl font-black leading-none sm:text-6xl">Useful when timing, water and hidden pipework matter.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Pool work often needs the right step before the next trade arrives. JR’s public service list is built around those decision points: test, clean, balance, detect and recover.
            </p>
          </Reveal>
          <div className="space-y-5">
            {proofPoints.map((item, index) => (
              <Reveal key={item} delay={index * 0.05}>
                <div className="rounded-2xl border border-slate-900/10 bg-slate-50 p-5">
                  <div className="signal-line mb-4 h-px origin-left scale-x-0 bg-gradient-to-r from-cyan-500 to-blue-600" />
                  <p className="m-0 flex gap-3 text-lg font-black leading-8 text-slate-800"><BadgeCheck className="mt-1 shrink-0 text-cyan-700" />{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-24 sm:px-8 lg:grid-cols-[1fr_0.86fr]">
        <Reveal>
          <p className="mb-3 text-sm font-black uppercase text-cyan-700">Common questions</p>
          <h2 className="text-4xl font-black leading-none sm:text-6xl">Straight answers before you call.</h2>
        </Reveal>
        <div className="space-y-3">
          {faqs.map(([q, a]) => <FAQItem key={q} q={q} a={a} />)}
        </div>
      </section>

      <section id="contact" className="relative bg-[#031218] px-4 py-24 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="mb-3 text-sm font-black uppercase text-cyan-200">Perth pool support</p>
            <h2 className="text-4xl font-black leading-none sm:text-6xl">Call or text JR before the next pool step.</h2>
            <p className="mt-6 text-lg leading-8 text-white/70">
              Share the suburb, the pool issue and whether concrete or cleaning work is already booked. JR can then point the conversation at the right service.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={phoneHref} className="inline-flex min-h-14 items-center gap-2 rounded-xl bg-cyan-200 px-6 py-4 text-base font-black text-slate-950 transition hover:bg-white">
                <Phone size={20} /> {phoneDisplay}
              </a>
              <a href={facebookUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-14 items-center gap-2 rounded-xl border border-white/14 bg-white/10 px-6 py-4 text-base font-black text-white transition hover:bg-white hover:text-slate-950">
                <FacebookIcon /> Facebook
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-2xl border border-white/12 bg-white/8 shadow-[0_24px_90px_rgba(0,0,0,0.34)]">
              <iframe title="Perth WA service area map" src={mapEmbedUrl} width="100%" height="420" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-[420px] w-full border-0" />
              <div className="grid gap-4 p-6 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <p className="text-xl font-black">JR Contracting, Perth WA</p>
                  <p className="mt-2 text-base leading-7 text-white/64">Pool pressure testing, post-concrete cleans, water checks and leak detection around Perth.</p>
                </div>
                <a href={mapsUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-200">
                  <MapPin size={18} /> Open map
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="bg-[#020b0f] px-4 py-10 text-white sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-cyan-100">
              <Image src={assets("jr-logo.jpg")} alt="JR Contracting logo" fill sizes="56px" className="object-cover" />
            </span>
            <div>
              <p className="text-lg font-black">JR Contracting</p>
              <p className="text-base text-white/60">Perth pool pressure testing, cleans and leak checks</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={phoneHref} aria-label="Call JR Contracting" className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-200 text-slate-950 transition hover:bg-white"><Phone size={20} /></a>
            <a href={`sms:+61498084872?&body=${encodeURIComponent("Hi JR Contracting, I need help with my pool in Perth.")}`} aria-label="Text JR Contracting" className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/12 bg-white/10 text-white transition hover:bg-white hover:text-slate-950"><MessageSquareText size={20} /></a>
            <a href={facebookUrl} target="_blank" rel="noreferrer" aria-label="JR Contracting on Facebook" className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/12 bg-white/10 text-white transition hover:bg-white hover:text-slate-950"><FacebookIcon /></a>
            <a href={mapsUrl} target="_blank" rel="noreferrer" aria-label="Search JR Contracting on Google Maps" className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/12 bg-white/10 text-white transition hover:bg-white hover:text-slate-950"><MapPin size={20} /></a>
          </div>
        </div>
      </footer>
    </main>
  );
}
