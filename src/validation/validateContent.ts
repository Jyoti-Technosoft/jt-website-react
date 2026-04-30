import { homePageContentSchema } from "./contentSchemas";
import { homeContent } from "../content/homeContent";

/**
 * Validates the home page content against the schema
 * @returns {isValid: boolean, errors: string[], data?: z.infer<typeof homePageContentSchema>}
 */
export const validateHomePageContent = () => {
  try {
    const result = homePageContentSchema.safeParse(homeContent);
    
    if (result.success) {
      console.log("✅ Home page content validation passed");
      return {
        isValid: true,
        errors: [],
        data: result.data,
      };
    } else {
      console.error("❌ Home page content validation failed:");
      const errors = result.error.issues.map((issue) => {
        const path = issue.path.join(".");
        return `${path}: ${issue.message}`;
      });
      
      console.error("Validation errors:", errors);
      return {
        isValid: false,
        errors,
      };
    }
  } catch (error) {
    console.error("❌ Unexpected error during validation:", error);
    return {
      isValid: false,
      errors: ["Unexpected validation error"],
    };
  }
};

/**
 * Development-time validation helper
 * Call this in development mode to validate content at build time
 */
export const devValidation = () => {
  if (process.env.NODE_ENV === "development") {
    const validation = validateHomePageContent();
    
    if (!validation.isValid) {
      console.group("🔍 Content Validation Issues");
      validation.errors.forEach((error) => {
        console.error(`❌ ${error}`);
      });
      console.groupEnd();
      
      // In development, you might want to throw an error to catch issues early
      throw new Error("Content validation failed. Check console for details.");
    }
  }
};

export default validateHomePageContent;
