// Google Analytics gtag type declarations

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: {
        [key: string]: any;
        event_category?: string;
        event_label?: string;
        value?: number;
        non_interaction?: boolean;
        custom_map?: { [key: string]: string };
        send_to?: string;
        page_title?: string;
        page_location?: string;
        page_path?: string;
        content_group1?: string;
        content_group2?: string;
        content_group3?: string;
        content_group4?: string;
        content_group5?: string;
        custom_parameter?: { [key: string]: any };
        event_callback?: () => void;
        event_timeout?: number;
        transport_type?: 'beacon' | 'xhr' | 'image';
        hit_type?: 'pageview' | 'event' | 'transaction' | 'item' | 'social' | 'exception' | 'timing';
        event_action?: string;
        event_category?: string;
        event_label?: string;
        value?: number;
        currency?: string;
        transaction_id?: string;
        affiliation?: string;
        revenue?: number;
        tax?: number;
        shipping?: number;
        coupon?: string;
        items?: Array<{
          item_id?: string;
          item_name?: string;
          item_category?: string;
          item_category2?: string;
          item_category3?: string;
          item_category4?: string;
          item_category5?: string;
          item_brand?: string;
          item_variant?: string;
          price?: number;
          quantity?: number;
          coupon?: string;
          affiliation?: string;
          creative_name?: string;
          creative_slot?: string;
          location_id?: string;
          promotion_id?: string;
          promotion_name?: string;
        }>;
        social_network?: string;
        social_action?: string;
        social_target?: string;
        timing_category?: string;
        timing_var?: string;
        timing_value?: number;
        timing_label?: string;
        ex_description?: string;
        ex_fatal?: boolean;
        custom_map?: { [key: string]: string };
        send_to?: string;
        page_title?: string;
        page_location?: string;
        page_path?: string;
        content_group1?: string;
        content_group2?: string;
        content_group3?: string;
        content_group4?: string;
        content_group5?: string;
        custom_parameter?: { [key: string]: any };
        event_callback?: () => void;
        event_timeout?: number;
        transport_type?: 'beacon' | 'xhr' | 'image';
      }
    ) => void;
  }
}

// Make gtag available globally
declare const gtag: Window['gtag'];

export {};
