import type {
  BuiltProject,
  HomePageContent,
  MetricItem,
  OfferItem,
  ProcessStep,
} from "../types/content";
import "../validation/validateContent";
import rawData from "../jt-website.json";

const toString = (value: unknown, fallback = ""): string =>
  typeof value === "string" ? value : fallback;

const toStringArray = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];

const toOfferItems = (value: unknown): OfferItem[] =>
  Array.isArray(value)
    ? value.map((item, index) => {
        const entry = (item ?? {}) as Record<string, unknown>;
        return {
          id: typeof entry.id === "number" ? entry.id : index + 1,
          title: toString(entry.title, "Service"),
          description: toString(entry.description),
          imageSrc: toString(entry.imageSrc) || undefined,
          imageSrc1: toString(entry.imageSrc1) || undefined,
        };
      })
    : [];

const toMetrics = (value: unknown): MetricItem[] =>
  Array.isArray(value)
    ? value.map((item) => {
        const entry = (item ?? {}) as Record<string, unknown>;
        return {
          value: toString(entry.title, "0"),
          label: toString(entry.description, "Metric"),
          supportingText: toString(entry.supportingText),
        };
      })
    : [];

const toProcessSteps = (value: unknown): ProcessStep[] =>
  Array.isArray(value)
    ? value
        .map((item, index) => {
          const entry = (item ?? {}) as Record<string, unknown>;
          const details = toString(entry.details || entry.description2);

          if (!details) {
            return null;
          }

          return {
            id: typeof entry.id === "number" ? entry.id : index + 1,
            title: toString(entry.title, `Step ${index + 1}`),
            eyebrow: toString(entry.eyebrow || entry.description1),
            details,
            imageSrc: toString(entry.imageSrc),
          };
        })
        .filter((item): item is ProcessStep => item !== null)
    : [];

const toBuiltProjects = (value: unknown): BuiltProject[] =>
  Array.isArray(value)
    ? value.map((item, index) => {
        const entry = (item ?? {}) as Record<string, unknown>;
        return {
          id: typeof entry.id === "number" ? entry.id : index + 1,
          title: toString(entry.title, `Project ${index + 1}`),
          imageSrc: toString(entry.imageSrc),
        };
      })
    : [];

const home = (rawData.home ?? {}) as Record<string, unknown>;
const meetSection = (home.meetSection ?? {}) as Record<string, unknown>;
const whyUs = (home.WhyUs ?? {}) as Record<string, unknown>;
const weOffer = (home.WeOffer ?? {}) as Record<string, unknown>;
const howWeWork = (home.HowWeWork ?? {}) as Record<string, unknown>;
const weveBuilt = (home.WeveBuilt ?? {}) as Record<string, unknown>;

export const homeContent: HomePageContent = {
  hero: {
    badge: toString(meetSection.badge, "Product engineering for ambitious teams"),
    title: toString(
      meetSection.title,
      "We build revenue-ready web, mobile and AI products for growing businesses."
    ),
    description: toString(
      meetSection.description,
      "From product strategy to launch, we design and deliver digital experiences that help teams move faster, convert better, and scale with confidence."
    ),
    trustIndicators: toStringArray(meetSection.trustIndicators),
    secondaryCta: {
      label: toString(meetSection.secondaryCtaLabel, "Explore Our Portfolio"),
      href: toString(meetSection.secondaryCtaHref, "/our-work"),
    },
    staticPreviewCards: [
      {
        title: "Praksis",
        label: "AI learning platform",
        imageSrc: "/assets/images/portfolio/praksis-mockup.png",
      },
      {
        title: "SiteSync",
        label: "Construction product",
        imageSrc: "/assets/images/portfolio/sitesync-mockup.png",
      },
      {
        title: "Yacht Brochure",
        label: "Brochure workflow",
        imageSrc: "/assets/images/portfolio/yatch-brochure-mockup.png",
      },
    ],
    videoPreview: {
      src: "/assets/JT-website-video.mp4",
      poster: "/assets/images/portfolio/jt-website-mockup.png",
      label: "Project reel",
      caption: "Use motion only inside the product stage so the hero stays clear and conversion-focused.",
      thumbnails: [
        {
          title: "D3 Showcase",
          label: "Analytics dashboard",
          imageSrc: "/assets/images/portfolio/d3-showcase-mockup.png",
        },
        {
          title: "Property Vista",
          label: "Real-estate platform",
          imageSrc: "/assets/images/portfolio/pvista-mockup.png",
        },
        {
          title: "SiteSync",
          label: "Mobile operations",
          imageSrc: "/assets/images/portfolio/sitesync-mockup.png",
        },
      ],
    },
  },
  clientTestimonials: (() => {
    const clientTestimonials = (home.clientTestimonials ?? {}) as Record<string, unknown>;
    
    return {
      title: toString(clientTestimonials.title, "Trusted by Leading Teams"),
      description: toString(clientTestimonials.description, "Partnering with innovative companies to deliver exceptional digital experiences"),
      logos: Array.isArray(clientTestimonials.logos) 
        ? clientTestimonials.logos.map((logo, index) => {
            const logoData = (logo ?? {}) as Record<string, unknown>;
            return {
              name: toString(logoData.name, `Client ${index + 1}`),
              logo: toString(logoData.logo, ""),
              alt: toString(logoData.alt, `${toString(logoData.name, `Client ${index + 1}`)} logo`),
            };
          })
        : [],
      testimonials: Array.isArray(clientTestimonials.testimonials)
        ? clientTestimonials.testimonials.map((testimonial, index) => {
            const testimonialData = (testimonial ?? {}) as Record<string, unknown>;
            return {
              quote: toString(testimonialData.quote, "Excellent service and delivery."),
              author: toString(testimonialData.author, `Client ${index + 1}`),
              role: toString(testimonialData.role, "Client"),
              company: toString(testimonialData.company, "Company"),
              avatar: toString(testimonialData.avatar, `https://via.placeholder.com/56x56/1f5795/ffffff?text=${toString(testimonialData.author, `C${index + 1}`).substring(0, 2).toUpperCase()}`),
            };
          })
        : [],
    };
  })(),
  metrics: toMetrics(whyUs.data),
  weOffer: {
    title: toString(weOffer.title, "What We Offer"),
    description: toString(
      weOffer.description,
      "Cross-functional delivery teams for product design, engineering, and intelligent automation."
    ),
    data: toOfferItems(weOffer.data),
  },
  howWeWork: {
    title: toString(howWeWork.title, "How We Work"),
    description: toString(
      howWeWork.description,
      "A clear, collaborative delivery rhythm that keeps scope, speed, and quality aligned."
    ),
    data: toProcessSteps(howWeWork.data),
  },
  weveBuilt: {
    title: toString(weveBuilt.title, "What We've Built"),
    description: toString(weveBuilt.description || weveBuilt.description1),
    ctaLabel: toString(weveBuilt.ctaLabel || weveBuilt.description2, "See Projects"),
    data: toBuiltProjects(weveBuilt.data),
  },
};
