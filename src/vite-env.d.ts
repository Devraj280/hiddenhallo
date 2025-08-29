/// <reference types="vite/client" />

// Minimal typing for the Google Analytics gtag function on window
interface Window {
  gtag?: (...args: any[]) => void;
}
