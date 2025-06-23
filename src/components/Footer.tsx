import { Link } from "wouter";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Heart,
  ChevronRight,
  Leaf
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-primary/5 pt-16 pb-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-primary/5 -mb-32 -mr-32"></div>
      <div className="absolute top-1/2 left-0 w-32 h-32 rounded-full bg-secondary/5 -ml-16"></div>
      
      {/* Newsletter section */}
      {/* <div className="container mx-auto px-4 mb-16">
        <div className="bg-primary rounded-2xl px-6 py-8 md:p-10 shadow-lg relative overflow-hidden">
          <div className="absolute -top-6 -right-6 text-white/20 transform rotate-45">
            <Leaf size={80} />
          </div>
          <div className="absolute -bottom-6 -left-6 text-white/10 transform -rotate-12">
            <Leaf size={60} />
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
            <div>
              <h3 className="text-white font-heading text-2xl md:text-3xl font-bold mb-3">Join our green community</h3>
              <p className="text-white/80 max-w-md">Subscribe to our newsletter for plant care tips, special offers and new arrivals.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <Button className="bg-secondary hover:bg-secondary-dark text-white rounded-full shadow-md">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div> */}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-10">
          <div>
            <div className="font-heading font-bold text-2xl mb-6 flex items-center text-primary-dark">
              <div className="bg-primary w-10 h-10 rounded-full flex items-center justify-center text-white mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M21.88 2.15c-.02-.14-.12-.24-.26-.26-.16-.02-.32-.02-.48 0-1.16.1-2.3.35-3.36.72-2.19.77-4.19 2.08-5.85 3.74-1.32 1.32-2.42 2.93-2.92 4.57-.22.7-.31 1.45-.31 2.19 0 3.11 1.73 5.94 4.44 7.35-1.44-2.56-1.96-5.68-.59-8.38.86-1.7 2.72-2.73 4.56-3.31 1.89-.59 3.92-.63 5.87-.33v.01c.31.05.38.43.12.58-2.45 1.37-4.47 3.32-5.63 5.78-1.09 2.31-1.37 5.3.18 7.44.1.14.29.17.44.08.03-.02.05-.04.08-.06 5.33-4.5 7.72-11.69 3.71-19.1z"/>
                  <path d="M10.24 8.11c-.01-.16-.15-.28-.31-.27-1.71.19-3.03 1.66-3.03 3.39 0 .26.03.52.09.77.03.14.17.22.31.19.14-.03.22-.17.19-.31-.05-.21-.07-.42-.07-.64 0-1.38 1.05-2.55 2.43-2.71.14-.02.25-.15.23-.29.31-2.86-.16-5.94-2.63-8.09-.12-.1-.3-.09-.4.03-.11.12-.1.3.03.4 2.19 1.91 2.61 4.65 2.34 7.28-2.29.41-3.88 2.56-3.63 4.93.08.86.4 1.67.9 2.35.08.12.25.15.37.07.12-.08.15-.25.07-.37-.43-.59-.71-1.31-.79-2.07-.2-1.95 1-3.76 2.9-4.17z"/>
                </svg>
              </div>
              <span>Dr.Plant</span>
            </div>
            <p className="text-gray-600 mb-6">Your partner in plant health and happiness. Helping plants thrive since 2024.</p>
            <div className="flex space-x-3">
              <a href="https://www.facebook.com/profile.php?id=61577252039023" className="bg-gray-100 hover:bg-primary hover:text-white text-gray-600 p-2.5 rounded-full transition-colors">
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com/_drplant_?igsh=bTd1MXc2d3QwajFy" className="bg-gray-100 hover:bg-primary hover:text-white text-gray-600 p-2.5 rounded-full transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6 text-gray-800">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-500 hover:text-primary transition-colors flex items-center group">
                  <ChevronRight className="h-4 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-300" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-500 hover:text-primary transition-colors flex items-center group">
                  <ChevronRight className="h-4 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-300" />
                  <span>Shop Plants</span>
                </Link>
              </li>
              <li>
                <Link href="/diagnosis" className="text-gray-500 hover:text-primary transition-colors flex items-center group">
                  <ChevronRight className="h-4 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-300" />
                  <span>Plant Diagnosis</span>
                </Link>
              </li>
              <li>
                <Link href="/care-tips" className="text-gray-500 hover:text-primary transition-colors flex items-center group">
                  <ChevronRight className="h-4 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-300" />
                  <span>Care Tips</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-500 hover:text-primary transition-colors flex items-center group">
                  <ChevronRight className="h-4 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-300" />
                  <span>About Us</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6 text-gray-800">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-500 hover:text-primary transition-colors flex items-center group">
                  <ChevronRight className="h-4 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-300" />
                  <span>Contact Us</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-primary transition-colors flex items-center group">
                  <ChevronRight className="h-4 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-300" />
                  <span>Shipping Policy</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-primary transition-colors flex items-center group">
                  <ChevronRight className="h-4 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-300" />
                  <span>Returns & Refunds</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-primary transition-colors flex items-center group">
                  <ChevronRight className="h-4 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-300" />
                  <span>FAQs</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-primary transition-colors flex items-center group">
                  <ChevronRight className="h-4 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-300" />
                  <span>Privacy Policy</span>
                </a>
              </li>
            </ul>
          </div>
          

        </div>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">© 2024 Dr.Plant. All rights reserved.</p>
          <div className="flex items-center text-gray-500 text-sm">
            <span>Made with</span>
            <Heart size={14} className="mx-1 text-secondary" />
            <span>for plant lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
