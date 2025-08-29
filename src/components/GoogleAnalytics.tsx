// src/components/GoogleAnalytics.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GA_TRACKING_ID = "G-RK1NJ8MX0G";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const GoogleAnalytics = () => {
  const location = useLocation();
  useEffect(() => {
    if (typeof window.gtag === "function") {
      // Enhanced page tracking with more parameters
      window.gtag("config", GA_TRACKING_ID, {
        page_path: location.pathname + location.search,
        page_title: document.title,
        page_location: window.location.href,
        send_page_view: true,
        anonymize_ip: true,
        allow_google_signals: true,
        allow_ad_personalization_signals: true,
      });
      
      // Log successful tracking
      console.log("GA4 Page View:", location.pathname + location.search);
    } else {
      console.warn("Google Analytics (gtag) not found on window");
    }
  }, [location]);

  return null;
};

// Enhanced e-commerce tracking functions
export const trackAddToCart = (item: any) => {
  if (typeof window.gtag === "function") {
    window.gtag("event", "add_to_cart", {
      currency: "INR",
      value: item.price,
      items: [{
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity,
        item_category: "Jewelry",
        item_brand: "HiddenHallo"
      }]
    });
    console.log("GA4 Add to Cart:", item.name);
  }
};

export const trackPurchase = (orderDetails: any, paymentInfo: any) => {
  if (typeof window.gtag === "function") {
    window.gtag("event", "purchase", {
      transaction_id: orderDetails.orderId,
      value: orderDetails.total,
      currency: "INR",
      tax: orderDetails.tax,
      shipping: orderDetails.shipping,
      items: orderDetails.items.map((item: any) => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity,
        item_category: "Jewelry",
        item_brand: "HiddenHallo"
      }))
    });
    console.log("GA4 Purchase:", orderDetails.orderId);
  }
};

export const trackViewItem = (product: any) => {
  if (typeof window.gtag === "function") {
    window.gtag("event", "view_item", {
      currency: "INR",
      value: product.price,
      items: [{
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        item_category: "Jewelry",
        item_brand: "HiddenHallo"
      }]
    });
    console.log("GA4 View Item:", product.name);
  }
};

export const trackBeginCheckout = (cartItems: any[], total: number) => {
  if (typeof window.gtag === "function") {
    window.gtag("event", "begin_checkout", {
      currency: "INR",
      value: total,
      items: cartItems.map((item: any) => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity,
        item_category: "Jewelry",
        item_brand: "HiddenHallo"
      }))
    });
    console.log("GA4 Begin Checkout:", total);
  }
};

// Test function to verify GA is working
export const testGoogleAnalytics = () => {
  if (typeof window.gtag === "function") {
    window.gtag("event", "test_event", {
      event_category: "test",
      event_label: "GA4 Test",
      value: 1
    });
    console.log("GA4 Test Event Sent");
    return true;
  } else {
    console.error("Google Analytics not loaded");
    return false;
  }
};

export default GoogleAnalytics;
