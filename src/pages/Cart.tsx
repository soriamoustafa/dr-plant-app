import { useEffect, useState } from "react";
import { getCart, removeFromCart, updateQuantity, clearCart } from "@/api/cartApi";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useCartCount } from "@/context/CartContext";
import { fetchCartItemsCount } from "@/api/cartApi";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";


type CartItem = {
  productId: number;
  name: string;
  price: number;
  salePrice?: number | null;
  quantity: number;
  pictureUrl: string;
};


const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
const { setCartCount } = useCartCount();

  
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cart = await getCart();
        const mappedItems = (cart.items || []).map((item: any) => ({
        productId: item.id,
        name: item.productName,
        price: item.price,
        salePrice: item.salePrice ?? null,
        quantity: item.quantity,
        pictureUrl: item.pictureUrl,
    }));
        setCartItems(cart.items || []);
        const count = cart.items.reduce((sum: number, item: any) => sum + item.quantity, 0);
        setCartCount(count);
      } catch (error) {
        console.error("Failed to load cart", error);
      }
    };
    fetchCart();
  }, []);
  
  const handleRemoveItem = async (id: number) => {
    try {
      await removeFromCart(id);
      const updatedCart = await getCart();

      const mappedItems = (updatedCart.items || []).map((item: any) => ({
        productId: item.id,
        name: item.productName,
        price: item.price,
        salePrice: item.salePrice ?? null,
        quantity: item.quantity,
        pictureUrl: item.pictureUrl,
      }));

      setCartItems(mappedItems);
      const count = await fetchCartItemsCount();
setCartCount(count);

    } catch (error) {
      console.error("Failed to remove item from cart", error);
    }
  };


  const handleQuantityChange = async (productId: number, change: number) => {
    try {
      await updateQuantity(productId, change);
      const updatedCart = await getCart();

      const mappedItems = (updatedCart.items || []).map((item: any) => ({
        productId: item.id,
        name: item.productName,
        price: item.price,
        salePrice: item.salePrice ?? null,
        quantity: item.quantity,
        pictureUrl: item.pictureUrl,
      }));

      setCartItems(mappedItems);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
   
  const handleClearCart = async () => {
  await clearCart();
  setCartItems([]);
  const count = await fetchCartItemsCount();
  setCartCount(count);
};


  
  const calculateTotal = (items: CartItem[]) => {
    console.log("items from cart:", items);
    if (!Array.isArray(items)) return 0;
    return items.reduce((total, item) => {
    const price = item.salePrice ?? item.price;
    return total + price * item.quantity;
  }, 0);
};


  const subtotal = calculateTotal(cartItems);
  const shipping = cartItems.length > 0 ? 5.99 : 0;
  const total = subtotal + shipping;

  return (
    <div className="relative overflow-hidden">
      <section className="py-16 bg-neutral-light">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl font-bold text-center mb-6 text-primary-dark">Your Cart</h1>
          
          {cartItems.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-2xl mx-auto">
              <div className="flex justify-center mb-4">
                <ShoppingBag size={64} className="text-neutral-300" />
              </div>
              <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
              <p className="text-neutral-dark mb-6">Looks like you haven't added any plants to your cart yet.</p>
              <Link href="/shop">
                <Button className="bg-gradient-to-r from-[#EBB461] to-[#FA8966] hover:bg-gradient-to-r hover:from-[#FA8966] hover:to-[#EBB461] text-white font-medium py-2 px-6 rounded-full transition-transform hover:-translate-y-1">
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6 border-b">
                    <h2 className="font-heading font-semibold text-xl">Shopping Cart ({cartItems.length} items)</h2>
                  </div>
                  
                  <div className="divide-y">
                    {cartItems.map(item => (
                      <div key={item.productId} className="flex items-center p-6">
                        <img 
                          src={item.pictureUrl} 
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
                          <button 
                            className="w-8 h-8 flex items-center justify-center border rounded-full text-neutral-dark hover:border-primary-dark hover:text-primary-dark transition-colors"
                            onClick={() => handleQuantityChange(item.productId, -1)}
                          >
                            <Minus size={16} />
                          </button>

                          <span className="mx-2">{item.quantity}</span>

                          <button 
                            className="w-8 h-8 flex items-center justify-center border rounded-full text-neutral-dark hover:border-primary-dark hover:text-primary-dark transition-colors"
                            onClick={() => handleQuantityChange(item.productId, 1)}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button 
                          className="ml-4 text-neutral-dark hover:text-red-500 transition-colors" onClick={() => handleRemoveItem(item.productId)}
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    ))}
                    
                  </div>
                  
                </div>
                <button className="w-80  mt-4 block  bg-gradient-to-r from-[#EBB461] to-[#FA8966] hover:bg-gradient-to-r hover:from-[#FA8966] hover:to-[#EBB461] text-white font-medium py-2 px-6 rounded-full transition-transform hover:-translate-y-1" onClick={handleClearCart}>
                            Clear All
                          </button>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="font-heading font-semibold text-xl mb-4 pb-4 border-b">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="font-medium">${shipping.toFixed(2)}</span>
                    </div>
                    <div className="pt-3 border-t flex justify-between">
                      <span className="font-bold">Total</span>
                      <span className="font-bold text-primary-dark">${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="mt-4 text-center ">
                  <Link href="/checkout">
                    <Button className="bg-gradient-to-r from-[#EBB461] to-[#FA8966] hover:bg-gradient-to-r hover:from-[#FA8966] hover:to-[#EBB461] text-white font-medium py-2 px-6 rounded-full transition-transform hover:-translate-y-1">
                      Proceed to Checkout
                    </Button>
                  </Link>
                  </div>
                  <div className="mt-4 text-center ">
                    <Link href="/shop">
                      <Button className="bg-gradient-to-r from-[#EBB461] to-[#FA8966] hover:bg-gradient-to-r hover:from-[#FA8966] hover:to-[#EBB461] text-white font-medium py-2 px-6 rounded-full transition-transform hover:-translate-y-1">
                        Continue Shopping
                      </Button>
                    </Link>
                    
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Cart;
