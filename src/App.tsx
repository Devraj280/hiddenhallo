import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AuthProvider } from "./hooks/useAuth";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ThankYouPage from "./pages/ThankYouPage";
import FAQPage from "./pages/FAQPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import ShippingPolicyPage from "./pages/ShippingPolicyPage";  
import WishlistPage from "./pages/WishlistPage";
import CancellationRefundPage from "./pages/CancellationRefundPage";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";   // ✅ import your new Login page
import GoogleAnalytics from "./components/GoogleAnalytics";
import GoogleAnalyticsTest from "./components/GoogleAnalyticsTest";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <GoogleAnalytics />
              <Header />
              {process.env.NODE_ENV === 'development' && <GoogleAnalyticsTest />}
              <main>
                <Routes>
                  <Route path="/" element={<><Index /><Footer /></>} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/products/:id" element={<ProductDetailPage />} />
                  <Route path="/about" element={<><AboutPage /><Footer /></>} />
                  <Route path="/contact" element={<><ContactPage /><Footer /></>} />
                  <Route path="/contacts" element={<><ContactPage /><Footer /></>} />
                  <Route path="/faq" element={<><FAQPage /><Footer /></>} />
                  <Route path="/privacy" element={<><PrivacyPage /><Footer /></>} />
                  <Route path="/terms" element={<><TermsPage /><Footer /></>} />
                  <Route path="/ShippingPolicyPage" element={<><ShippingPolicyPage /><Footer /></>} />
                  <Route path="/CancellationRefundPage" element={<><CancellationRefundPage /><Footer /></>} />
                  <Route path="/auth" element={<><AuthPage /><Footer /></>} />
                  <Route path="/profile" element={<><ProfilePage /><Footer /></>} />
                  <Route path="/cart" element={<><CartPage /><Footer /></>} />
                  <Route path="/wishlist" element={<><WishlistPage /><Footer /></>} />
                  <Route path="/checkout" element={<><CheckoutPage /><Footer /></>} />
                  <Route path="/thank-you" element={<><ThankYouPage /><Footer /></>} />

                  {/* ✅ New Google Login Route */}
                  <Route path="/login" element={<><Login /><Footer /></>} />

                  <Route path="*" element={<><NotFound /><Footer /></>} />
                </Routes>
              </main>
            </BrowserRouter>
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
