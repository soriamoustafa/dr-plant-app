import { Route, Switch } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// Pages
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import Diagnosis from "@/pages/Diagnosis";
import CareTips from "@/pages/CareTips";
import About from "@/pages/About";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import ProductDetail from "@/pages/ProductDetail";
import PaymentPage from "@/pages/PaymentPage";
import MyOrders from "@/pages/MyOrders";
import SearchResults from "@/pages/SearchResults";
import { CartCountProvider } from "@/context/CartContext"

// Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ProtectedRoute } from "@/lib/protected-route";

const stripePromise = loadStripe("pk_test_51PoSPwD8mdzzhwvBig7NYxKkaO9mHfRpngG9nuScvEx71O4vu1oXNQbS6kU0p9S5iZBFim19krKbQmHY24F7qC5000pNsYAYfJ");

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/shop" component={Shop} />
      <Route path="/shop/:id" component={ProductDetail} />
      <Route path="/search" component={SearchResults} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/diagnosis" component={Diagnosis} />
      <Route path="/care-tips" component={CareTips} />
      <Route path="/about" component={About} />
      <Route path="/cart" component={Cart} />
      <ProtectedRoute path="/checkout" component={Checkout} />
      <Route path="/payment" component={PaymentPage} />
      <Route path="/MyOrders" component={MyOrders} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    
    <Elements stripe={stripePromise}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartCountProvider>
          <div className="flex flex-col min-h-screen bg-neutral-light">
            <Header />
            <main className="flex-grow">
              <Router />
            </main>
            <Footer />
            <Toaster />
          </div>
        </CartCountProvider>
      </AuthProvider>
    </QueryClientProvider>
    </Elements>
  );
}

export default App;
