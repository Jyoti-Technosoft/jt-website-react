import type {
  BuiltProject,
  HomePageContent,
  IndustryExpertiseItem,
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

const toIndustryExpertise = (value: unknown): IndustryExpertiseItem[] =>
  Array.isArray(value)
    ? value.map((item) => {
      const entry = (item ?? {}) as Record<string, unknown>;
      const category = entry.category === "capability" ? "capability" : "industry";

      return {
        image: toString(entry.image),
        title: toString(entry.title, "Industry expertise"),
        description: toString(entry.description),
        expertise: toStringArray(entry.expertise),
        projects: toStringArray(entry.projects),
        featured: entry.featured === true,
        category,
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
      "We Build Revenue-Ready Web, Mobile & AI Products That Drive Growth."
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
        imageSrc: "/assets/webp/images/portfolio/praksis-mockup.webp",
      },
      {
        title: "SiteSync",
        label: "Construction product",
        imageSrc: "/assets/webp/images/portfolio/SiteSync-mockup.webp",
      },
      {
        title: "Yacht Brochure",
        label: "Brochure workflow",
        imageSrc: "/assets/webp/images/portfolio/yatch-brochure-mockup.webp",
      },
    ],
    videoPreview: {
      src: "/assets/JT-website-video.mp4",
      poster: "/assets/webp/video-ai-asset-background.webp",
      label: "Project reel",
      caption: "Use motion only inside the product stage so the hero stays clear and conversion-focused.",
      thumbnails: [
        {
          title: "D3 Showcase",
          label: "Analytics dashboard",
          imageSrc: "/assets/webp/images/portfolio/d3-showcase-mockup.webp",
        },
        {
          title: "Property Vista",
          label: "Real-estate platform",
          imageSrc: "/assets/webp/images/portfolio/pvista-mockup.webp",
        },
        {
          title: "SiteSync",
          label: "Mobile operations",
          imageSrc: "/assets/webp/images/portfolio/SiteSync-mockup.webp",
        },
      ],
    },
  },
  industryExpertise: toIndustryExpertise(home.industryExpertise),
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
            avatar: toString(testimonialData.avatar, ""),
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
