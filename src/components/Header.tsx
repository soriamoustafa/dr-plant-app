import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import axios from "axios";
import { useAuth } from "@/hooks/use-auth";
import { Menu, X, Search, ShoppingCart, User, LogOut, UserPlus } from "lucide-react";
import { useCartCount } from "@/context/CartContext";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";

const BASE_URL = "https://localhost:7019";

const getToken = () => localStorage.getItem("token");

const fetchCartItemsCount = async () => {
  try {
    const token = getToken();
    const basketId = localStorage.getItem("basketId");
    if (!basketId) return 0;

    const response = await axios.get(`${BASE_URL}/api/Basket?id=${basketId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const cart = response.data;
    return cart.items.reduce((total: number, item: any) => total + item.quantity, 0);
  } catch {
    return 0;
  }
};

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { cartCount, setCartCount } = useCartCount();
  const { user, logout } = useAuth();
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [, navigate] = useLocation();

  
  useEffect(() => {
    fetchCartItemsCount().then(setCartCount);
  }, [location]);

useEffect(() => {
  const header = document.getElementById("main-header");

  const handleScroll = () => {
    if (!header) return;

    if (window.scrollY > 50) {
      header.classList.remove("absolute");
      header.classList.add("sticky", "top-0", "bg-white", "shadow-md");
    } else {
      header.classList.add("absolute");
      header.classList.remove("sticky", "bg-white", "shadow-md");
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  const toggleMobileMenu = () => {setIsMobileMenuOpen(!isMobileMenuOpen);};

  const handleLogout = () => {logout();};


  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Shop", path: "/shop" },
    { title: "Plant Diagnosis", path: "/diagnosis" },
    { title: "Care Tips", path: "/care-tips" },
    { title: "About", path: "/about" }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchText)}`);
      setSearchText("");
      setShowSearch(false);
    }
  };

  return (
    <header id="main-header" className="absolute top-0 left-0 w-full  z-50 bg-transparent transition-colors duration-300 ">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div onClick={() => window.location.href = "/"} className="cursor-pointer text-primary font-heading font-bold text-2xl flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2">
                <path d="M21.88 2.15c-.02-.14-.12-.24-.26-.26-.16-.02-.32-.02-.48 0-1.16.1-2.3.35-3.36.72-2.19.77-4.19 2.08-5.85 3.74-1.32 1.32-2.42 2.93-2.92 4.57-.22.7-.31 1.45-.31 2.19 0 3.11 1.73 5.94 4.44 7.35-1.44-2.56-1.96-5.68-.59-8.38.86-1.7 2.72-2.73 4.56-3.31 1.89-.59 3.92-.63 5.87-.33v.01c.31.05.38.43.12.58-2.45 1.37-4.47 3.32-5.63 5.78-1.09 2.31-1.37 5.3.18 7.44.1.14.29.17.44.08.03-.02.05-.04.08-.06 5.33-4.5 7.72-11.69 3.71-19.1z"/>
                <path d="M10.24 8.11c-.01-.16-.15-.28-.31-.27-1.71.19-3.03 1.66-3.03 3.39 0 .26.03.52.09.77.03.14.17.22.31.19.14-.03.22-.17.19-.31-.05-.21-.07-.42-.07-.64 0-1.38 1.05-2.55 2.43-2.71.14-.02.25-.15.23-.29.31-2.86-.16-5.94-2.63-8.09-.12-.1-.3-.09-.4.03-.11.12-.1.3.03.4 2.19 1.91 2.61 4.65 2.34 7.28-2.29.41-3.88 2.56-3.63 4.93.08.86.4 1.67.9 2.35.08.12.25.15.37.07.12-.08.15-.25.07-.37-.43-.59-.71-1.31-.79-2.07-.2-1.95 1-3.76 2.9-4.17z"/>
              </svg>
              <span>Dr.Plant</span>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <div key={link.path} className="inline-block">
                <Link href={link.path}>
                  <span className={`cursor-pointer text-gray-400 hover:text-primary font-medium ${
                    location === link.path ? "text-primary font-semibold" : ""
                  }`}>
                    {link.title}
                  </span>
                </Link>
              </div>
            ))}
          </nav>
          
          <div className="flex items-center gap-4">
            <button className="text-neutral-400 hover:text-primary transition-colors" onClick={() => setShowSearch(!showSearch)}>
              <Search size={20} />
            </button>
            {showSearch && (
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search products..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border border-neutral-300 px-2 py-1 rounded"
          />
          <button
            type="submit"
            className="text-sm bg-primary text-white px-3 py-1 rounded"
          >
            Go
          </button>
        </form>
      )}
            <div className="relative">
              <Link href="/cart">
                <span className="cursor-pointer  text-neutral-400 hover:text-primary transition-colors relative inline-block">
                  <ShoppingCart size={20} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                      {cartCount}
                    </span>
                  )}
                </span>
              </Link>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-neutral-700 hover:text-primary transition-colors focus:outline-none">
                  {user ? (
                    <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    {user?.displayName?.substring(0, 1)?.toUpperCase() ?? ''}
                    </div>
                  ) : (
                    <User size={20} />
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {user ? (
                  <>
                    <DropdownMenuLabel>
                      <div className="flex flex-col">
                        <span className="font-medium">{user.displayName}</span>
                        <span className="text-xs text-gray-500">{user.email}</span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/auth" className="cursor-pointer w-full">
                        <User className="mr-2 h-4 w-4" />
                        <span>Log in</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/auth?tab=register" className="cursor-pointer w-full">
                        <UserPlus className="mr-2 h-4 w-4" />
                        <span>Register</span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <button 
              className="md:hidden text-neutral-700 hover:text-primary transition-colors focus:outline-none"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-lg shadow-md p-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <div key={link.path} className="block">
                  <Link href={link.path}>
                    <span 
                      className={`cursor-pointer block text-neutral-700 hover:text-primary font-medium ${
                        location === link.path ? "text-primary font-semibold" : ""
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.title}
                    </span>
                  </Link>
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
