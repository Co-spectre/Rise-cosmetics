
import "./App.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AdvancedCartProvider } from "@/contexts/AdvancedCartContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { SearchProvider } from "@/contexts/SearchContext";
import { AnalyticsProvider } from "@/contexts/AnalyticsContext";
import { SEOMarketingProvider } from "@/contexts/SEOMarketingContext";
import { InventoryProvider } from "@/contexts/InventoryContext";
import { SecurityProvider } from "@/contexts/SecurityContext";
import { OrderManagementProvider } from "@/contexts/OrderManagementContext";
import { ProductManagementProvider } from "@/contexts/ProductManagementContext";
import PageTransition from "@/components/PageTransition";
import Index from "./pages/Index";
import About from "./pages/About";
import Products from "./pages/Products";
import Collections from "./pages/Collections";
import AesopInspiredProduct from "./pages/AesopInspiredProduct";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import Checkout from "./pages/Checkout";
import Auth from "./pages/Auth";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import FeatureStatus from "./pages/FeatureStatus";
import AdminDashboard from "./pages/AdminDashboard";
import ProductManagement from "./pages/ProductManagement";
import UserManagement from "./pages/UserManagement";
import NotFound from "./pages/NotFound";
import AdminDebug from "./components/AdminDebug";

const queryClient = new QueryClient();


const AppRoutes = () => (
  <>
    <Routes>
      <Route path="/" element={<PageTransition><Index /></PageTransition>} />
      <Route path="/products" element={<PageTransition><Products /></PageTransition>} />
      <Route path="/shop" element={<PageTransition><Products /></PageTransition>} />
      <Route path="/collections" element={<PageTransition><Collections /></PageTransition>} />
      <Route path="/product/:id" element={<PageTransition><AesopInspiredProduct /></PageTransition>} />
      <Route path="/about" element={<PageTransition><About /></PageTransition>} />
      <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
      <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
      <Route path="/favorites" element={<PageTransition><Favorites /></PageTransition>} />
      <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
      <Route path="/auth" element={<PageTransition><Auth /></PageTransition>} />
      <Route path="/login" element={<PageTransition><Auth /></PageTransition>} />
      <Route path="/register" element={<PageTransition><Auth /></PageTransition>} />
      <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
      <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
      <Route path="/features" element={<PageTransition><FeatureStatus /></PageTransition>} />
      <Route path="/status" element={<PageTransition><FeatureStatus /></PageTransition>} />
      <Route path="/admin" element={<PageTransition><AdminDashboard /></PageTransition>} />
      <Route path="/admin/dashboard" element={<PageTransition><AdminDashboard /></PageTransition>} />
      <Route path="/admin/orders" element={<PageTransition><AdminDashboard /></PageTransition>} />
      <Route path="/admin/products" element={<PageTransition><ProductManagement /></PageTransition>} />
      <Route path="/admin/users" element={<PageTransition><UserManagement /></PageTransition>} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
    </Routes>
    <AdminDebug />
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <SecurityProvider>
          <AnalyticsProvider>
            <SEOMarketingProvider>
              <SearchProvider>
                <InventoryProvider>
                  <OrderManagementProvider>
                    <ProductManagementProvider>
                      <CartProvider>
                        <AdvancedCartProvider>
                          <WishlistProvider>
                            <NotificationProvider>
                              <Toaster />
                              <Sonner />
                              <BrowserRouter basename="/Rise-cosmetics">
                                <AppRoutes />
                              </BrowserRouter>
                            </NotificationProvider>
                          </WishlistProvider>
                        </AdvancedCartProvider>
                      </CartProvider>
                    </ProductManagementProvider>
                  </OrderManagementProvider>
                </InventoryProvider>
              </SearchProvider>
            </SEOMarketingProvider>
          </AnalyticsProvider>
        </SecurityProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
