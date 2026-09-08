export interface HomeHeroCta {
  label: string;
  href: string;
  helperText?: string;
}

export interface HomeHeroCallout {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
}

export interface HomeHeroPreviewCard {
  title: string;
  label: string;
  imageSrc: string;
}

export interface HomeHeroVideoPreview {
  src: string;
  poster: string;
  label: string;
  caption: string;
  thumbnails: HomeHeroPreviewCard[];
}

export interface ClientLogo {
  name: string;
  logo: string;
  alt: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}

export interface ClientTestimonials {
  title: string;
  description: string;
  logos: ClientLogo[];
  testimonials: Testimonial[];
}

export interface HomeHeroContent {
  badge: string;
  title: string;
  description: string;
  trustIndicators: string[];
  secondaryCta: HomeHeroCta;
  staticPreviewCards: HomeHeroPreviewCard[];
  videoPreview: HomeHeroVideoPreview;
}

export interface MetricItem {
  label: string;
  value: string;
  supportingText?: string;
}

export interface OfferItem {
  id: number;
  title: string;
  description: string;
  imageSrc?: string;
  imageSrc1?: string;
}

export interface SectionIntroContent {
  title: string;
  description: string;
}

export interface ProcessStep {
  id: number;
  title: string;
  eyebrow: string;
  details: string;
  imageSrc: string;
}

export interface BuiltProject {
  id: number;
  title: string;
  imageSrc: string;
}

export interface IndustryExpertiseItem {
  image: string;
  title: string;
  description: string;
  expertise: string[];
  projects: string[];
  featured?: boolean;
  category?: "industry" | "capability";
}

export interface HomePageContent {
  hero: HomeHeroContent;
  industryExpertise: IndustryExpertiseItem[];
  clientTestimonials: ClientTestimonials;
  metrics: MetricItem[];
  weOffer: SectionIntroContent & {
    data: OfferItem[];
  };
  howWeWork: {
    title: string;
    description: string;
    data: ProcessStep[];
  };
  weveBuilt: {
    title: string;
    description: string;
    ctaLabel: string;
    data: BuiltProject[];
  };
}
