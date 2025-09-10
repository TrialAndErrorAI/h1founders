/// <reference types="vite/client" />

declare const __APP_VERSION__: string

// reCAPTCHA v3 global
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}
