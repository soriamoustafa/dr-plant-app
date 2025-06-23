import { useState, useEffect, useRef } from "react";
import { getCart, updateQuantity, removeFromCart as removeItem } from "@/api/cartApi";

import { Link } from "wouter";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const sidebarRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    useEffect(() => {
  const fetchCart = async () => {
    try {
      const cart = await getCart();
      setCartItems(cart.items || []);
    } catch (error) {
      console.error("Failed to load cart", error);
    }
  };

  if (isOpen) fetchCart();
}, [isOpen]);

    
    
    const handleEscape = (event: KeyboardEvent) => {
      if (isOpen && event.key === "Escape") {
        onClose();
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    
    // Prevent body scrolling when sidebar is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);


  const updateCartItemQuantity = async (id: number, quantity: number) => {
  try {
    const change = quantity - (cartItems.find(item => item.id === id)?.quantity || 0);
    await updateQuantity(id, change);
    const updatedCart = await getCart();
    setCartItems(updatedCart.items || []);
  } catch (error) {
    console.error("Failed to update quantity", error);
  }
};

  
  const handleQuantityChange = (id: number, change: number) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change);
      updateCartItemQuantity(id, newQuantity);
    }
  };
  
const handleRemoveItem = async (id: number) => {
  try {
    await removeItem(id);
    const updatedCart = await getCart();
    setCartItems(updatedCart.items || []);
  } catch (error) {
    console.error("Failed to remove item", error);
  }
};

const calculateTotal = () => {
  return cartItems.reduce((total, item) => {
    const price = item.salePrice ?? item.price;
    return total + price * item.quantity;
  }, 0);
};

  
  const subtotal = calculateTotal();
  const shipping = cartItems.length > 0 ? 5.99 : 0;
  const total = subtotal + shipping;
  
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div
            ref={sidebarRef}
            className={`absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-lg transform h-full overflow-y-auto transition-transform duration-300 ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="font-heading font-semibold text-xl">Your Cart</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X size={20} />
              </Button>
            </div>
            
            {cartItems.length === 0 ? (
              <div className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                <p className="text-neutral-dark mb-6">Looks like you haven't added any plants to your cart yet.</p>
                <Link href="/shop">
                  <Button
                    className="bg-gradient-to-r from-[#FF9800] to-[#FFA726] hover:bg-gradient-to-r hover:from-[#F57C00] hover:to-[#FF9800] text-white font-medium rounded-full transition-transform hover:-translate-y-1"
                    onClick={onClose}
                  >
                    Start Shopping
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <div className="p-4 divide-y">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center py-4">
                      <img 
                        src={item.item.pictureUrl} 
                        alt={item.name} 
                        className="w-20 h-20 object-cover rounded" 
                      />
                      <div className="ml-4 flex-grow">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-neutral-dark">
                          {item.salePrice ? (
                            <>
                              <span className="text-primary-dark font-medium">${item.salePrice}</span>
                              <span className="text-xs line-through ml-2">${item.price}</span>
                            </>
                          ) : (
                            <span className="text-primary-dark font-medium">${item.price}</span>
                          )}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="w-8 h-8 rounded-full p-0"
                          onClick={() => handleQuantityChange(item.id, -1)}
                        >
                          <Minus size={16} />
                        </Button>
                        <span className="mx-2">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="w-8 h-8 rounded-full p-0"
                          onClick={() => handleQuantityChange(item.id, 1)}
                        >
                          <Plus size={16} />
                        </Button>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="ml-4 text-neutral-dark hover:text-red-500"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash2 size={20} />
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 border-t">
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span className="font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Shipping</span>
                    <span className="font-bold">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-4 pt-2 border-t">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-primary-dark">${total.toFixed(2)}</span>
                  </div>
                  
                  <Link href="/checkout">
                    <Button 
                      className="w-full bg-gradient-to-r from-[#FF9800] to-[#FFA726] hover:bg-gradient-to-r hover:from-[#F57C00] hover:to-[#FF9800] text-white font-medium py-3 px-6 rounded-lg transition-transform hover:-translate-y-1"
                      onClick={onClose}
                    >
                      Proceed to Checkout
                    </Button>
                  </Link>
                  
                  <div className="mt-4 text-center">
                    <Link href="/shop">
                      <a 
                        className="text-primary-dark hover:text-primary font-medium"
                        onClick={onClose}
                      >
                        Continue Shopping
                      </a>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CartSidebar;
