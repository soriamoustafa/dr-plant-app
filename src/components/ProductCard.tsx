import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useCartCount } from "@/context/CartContext";
import { addToCart, fetchCartItemsCount } from "@/api/cartApi";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  salePrice: number | null;
  pictureUrl: string;
  isOnSale: boolean;
  categoryId: number;
  inStock: boolean;
  isFeatured: boolean;
};


interface ProductCardProps {
  product: Product;
  onCartUpdate: (totalItems: number) => void;
}


const ProductCard = ({ product, onCartUpdate }: ProductCardProps) => {  
  const { setCartCount } = useCartCount();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

const item = {
    productId: product.id, 
    quantity: 1
};

  
    try {
    const updatedCart = await addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      pictureUrl: product.pictureUrl,
      quantity: 1,
    });
const count = await fetchCartItemsCount();
setCartCount(count);

  } catch (err:any) {
      console.error("Error adding to cart:", err?.response?.data);
      console.log("Full error response:", JSON.stringify(err?.response?.data, null, 2));
    alert("Failed to add item to cart.");
  }
  };

  return (
    <div className="group bg-white rounded-xl shadow-[0_5px_7px_rgba(0,0,0,0.3)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md border border-gray-100">
      <Link href={`/shop/${product.id}`} className="block relative">
        <div className="relative overflow-hidden">
          <img 
            src={product.pictureUrl} 
            alt={product.name} 
            className="w-full h-60 object-cover transform transition-transform duration-500 group-hover:scale-105" 
          />
          
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex flex-col gap-2">
              <Button 
                className="bg-white text-primary hover:bg-primary hover:text-white transition-colors rounded-full flex items-center shadow-md"
                onClick={handleAddToCart}
                size="sm"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Quick Add
              </Button>
              
              <Button 
                className="bg-gradient-to-r from-[#EBB461] to-[#FA8966] hover:bg-gradient-to-r hover:from-[#FA8966] hover:to-[#EBB461] text-white font-medium py-2 px-6 rounded-full transition-transform hover:-translate-y-1"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.location.href = `/shop/${product.id}`;
                }}
                size="sm"
              >
                View Details
              </Button>
            </div>
          </div>
          
          {product.isOnSale && (
            <div className="absolute top-3 left-3 bg-secondary text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
              SALE
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <Link href={`/shop/${product.id}`} className="hover:text-primary transition-colors">
            <h3 className="font-heading font-semibold text-gray-800">{product.name}</h3>
          </Link>
          <div className="text-right">
            {product.isOnSale && product.salePrice ? (
              <div>
                <span className="font-heading font-bold text-primary">${product.price.toFixed(2)}</span>
                <span className="text-xs line-through text-gray-500 ml-1">${product.salePrice.toFixed(2)}</span>
              </div>
            ) : (
              <span className="font-heading font-bold text-primary">${product.price.toFixed(2)}</span>
            )}
          </div>
        </div>
        
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex gap-2">
          <Button 
            className="flex-1 bg-gradient-to-r from-[#EBB461] to-[#FA8966] hover:bg-gradient-to-r hover:from-[#FA8966] hover:to-[#EBB461] text-white font-medium py-2 px-6 rounded-full transition-transform hover:-translate-y-1s"
            onClick={handleAddToCart}
            size="sm"
          >
            Add to Cart
          </Button>
          
          <Button 
            variant="outline"
            className="border-primary text-primary hover:bg-primary/5 rounded-full transition-colors"
            size="sm"
            asChild
          >
            <Link href={`/shop/${product.id}`}>Details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
