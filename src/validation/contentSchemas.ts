import { z } from "zod";

// Base schemas
const baseContentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

// CTA Schema
const ctaSchema = z.object({
  label: z.string().min(1, "CTA label is required"),
  href: z.string().min(1, "CTA href is required"),
  helperText: z.string().optional(),
});

// Client Logo Schema
const clientLogoSchema = z.object({
  name: z.string().min(1, "Client name is required"),
  logo: z.string().min(1, "Logo path is required"),
  alt: z.string().min(1, "Alt text is required"),
});

// Testimonial Schema
const testimonialSchema = z.object({
  quote: z.string().min(1, "Quote is required"),
  author: z.string().min(1, "Author is required"),
  role: z.string().min(1, "Role is required"),
  company: z.string().min(1, "Company is required"),
  avatar: z.string().min(1, "Avatar path is required"),
});

// Client Testimonials Schema
const clientTestimonialsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  logos: z.array(clientLogoSchema).min(1, "At least one client logo is required"),
  testimonials: z.array(testimonialSchema).min(1, "At least one testimonial is required"),
});

// Hero Content Schema
const heroContentSchema = z.object({
  badge: z.string().min(1, "Badge is required"),
  title: z.string().min(1, "Hero title is required"),
  description: z.string().min(1, "Hero description is required"),
  trustIndicators: z.array(z.string()).min(1, "At least one trust indicator is required"),
  primaryCta: ctaSchema,
  secondaryCta: ctaSchema,
  staticPreviewCards: z.array(z.object({
    title: z.string().min(1, "Card title is required"),
    label: z.string().min(1, "Card label is required"),
    imageSrc: z.string().min(1, "Image source is required"),
  })),
  videoPreview: z.object({
    src: z.string().min(1, "Video source is required"),
    poster: z.string().min(1, "Poster image is required"),
    label: z.string().min(1, "Video label is required"),
    caption: z.string().min(1, "Video caption is required"),
    thumbnails: z.array(z.object({
      title: z.string().min(1, "Thumbnail title is required"),
      label: z.string().min(1, "Thumbnail label is required"),
      imageSrc: z.string().min(1, "Thumbnail image is required"),
    })),
  }),
});

// Offer Item Schema
const offerItemSchema = z.object({
  id: z.number().positive("ID must be positive"),
  title: z.string().min(1, "Offer title is required"),
  description: z.string().min(1, "Offer description is required"),
  imageSrc: z.string().optional(),
  imageSrc1: z.string().optional(),
}).refine((data) => data.imageSrc || data.imageSrc1, {
  message: "At least one image (imageSrc or imageSrc1) is required",
  path: ["image"],
});

// Section Content Schema
const sectionContentSchema = z.object({
  title: z.string().min(1, "Section title is required"),
  description: z.string().min(1, "Section description is required"),
});

// Metric Item Schema
const metricItemSchema = z.object({
  label: z.string().min(1, "Metric label is required"),
  value: z.string().min(1, "Metric value is required"),
  supportingText: z.string().optional(),
});

// Process Step Schema
const processStepSchema = z.object({
  id: z.number().positive("ID must be positive"),
  title: z.string().min(1, "Step title is required"),
  description: z.string().min(1, "Step description is required"),
  icon: z.string().optional(),
});

// Built Project Schema
const builtProjectSchema = z.object({
  id: z.number().positive("ID must be positive"),
  title: z.string().min(1, "Project title is required"),
  imageSrc: z.string().min(1, "Project image is required"),
});

// Home Page Content Schema
const homePageContentSchema = z.object({
  hero: heroContentSchema,
  clientTestimonials: clientTestimonialsSchema,
  metrics: z.array(metricItemSchema).min(1, "At least one metric is required"),
  weOffer: sectionContentSchema.extend({
    data: z.array(offerItemSchema).min(1, "At least one offer item is required"),
  }),
  howWeWork: z.object({
    title: z.string().min(1, "How we work title is required"),
    description: z.string().min(1, "How we work description is required"),
    data: z.array(processStepSchema).min(1, "At least one process step is required"),
  }),
  weveBuilt: z.object({
    title: z.string().min(1, "We've built title is required"),
    description: z.string().min(1, "We've built description is required"),
    data: z.array(builtProjectSchema).min(1, "At least one built project is required"),
  }),
});

export {
  baseContentSchema,
  ctaSchema,
  clientLogoSchema,
  testimonialSchema,
  clientTestimonialsSchema,
  heroContentSchema,
  offerItemSchema,
  sectionContentSchema,
  metricItemSchema,
  processStepSchema,
  builtProjectSchema,
  homePageContentSchema,
};

export type HomePageContentValidation = z.infer<typeof homePageContentSchema>;
