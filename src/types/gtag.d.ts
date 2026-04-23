// Google Analytics gtag type declarations

declare global {
  interface Window {
    gtag: (command: string, eventName: string, eventParams?: Record<string, unknown>) => void;
    dataLayer: any[];
  }
}

export {};
