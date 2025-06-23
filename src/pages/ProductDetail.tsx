import { useParams, Link } from "wouter";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Truck, Shield, Award, Plus, Minus } from "lucide-react";
import { addToCart } from "@/api/cartApi";
import { fetchCartItemsCount } from "@/api/cartApi";
import { useCartCount } from "@/context/CartContext";


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

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { setCartCount } = useCartCount();

  
const BASE_URL="https://localhost:7019"

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/api/Products/${productId}`);
        setProduct(res.data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (!isNaN(productId)) {
      fetchProduct();
    } else {
      setError(true);
      setLoading(false);
    }
  }, [productId]);

  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  const handleAddToCart =async () =>{
    if (!product) return;
    addToCart({
      productId : product.id,
      name : product.name,
      price : product.price,
      pictureUrl:product.pictureUrl,
      quantity,
    });
    const count = await fetchCartItemsCount();
    setCartCount(count);
  }
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h1>
        <p className="text-gray-600 mb-6">There was a problem loading this product.</p>
        <Button asChild>
          <Link href="/shop">Back to Shop</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Button variant="ghost" className="p-0 flex items-center text-gray-600 hover:text-primary" asChild>
          <Link href="/shop">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Plants
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="relative">
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            <img 
              src={product.pictureUrl} 
              alt={product.name} 
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-10 flex items-start justify-end p-4">
            </div>
            
            {product.isOnSale && (
              <div className="absolute top-4 left-4 bg-secondary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                SALE
              </div>
            )}
          </div>
        </div>
        
        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            {product.isOnSale && product.salePrice ? (
              <div className="flex items-center">
                <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
                <span className="text-gray-500 line-through ml-2 text-lg">${product.salePrice.toFixed(2)}</span>
                <span className="ml-2 bg-secondary/10 text-secondary text-xs px-2 py-1 rounded-full font-medium">
                  SAVE ${(product.salePrice - product.price).toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
            )}
          </div>
          
          <p className="text-gray-600 mb-6">{product.description}</p>
          
          <div className="border-t border-b border-gray-200 py-4 mb-6">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center">
                <Truck className="h-5 w-5 text-primary mr-3" />
                <span className="text-gray-700">Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-primary mr-3" />
                <span className="text-gray-700">30-day growth guarantee</span>
              </div>
              <div className="flex items-center">
                <Award className="h-5 w-5 text-primary mr-3" />
                <span className="text-gray-700">Quality checked by plant experts</span>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium text-gray-800 mb-2">Quantity</h3>
            <div className="flex items-center">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-10 w-10" 
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="mx-4 font-medium text-gray-800 w-8 text-center">{quantity}</span>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-10 w-10" 
                onClick={incrementQuantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              variant="outline" 
              className="bg-primary text-white hover:bg-primary  font-medium py-6 rounded-lg flex-grow" onClick={handleAddToCart}
            >
              Add to cart
            </Button>
            <Button 
              variant="outline" 
              className="text-primary border-primary hover:bg-primary/5 transition-colors font-medium py-6 rounded-lg"
            >
              Buy Now
            </Button>
          </div>
          
          <div className="mt-8">
            <h3 className="font-medium text-gray-800 mb-2">Product Details</h3>
            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
              <ul className="space-y-2">
                <li><span className="font-medium">Light Needs:</span> {product.categoryId === 1 ? 'Medium to Bright Indirect' : 'Full Sun'}</li>
                <li><span className="font-medium">Size:</span> Medium</li>
                <li><span className="font-medium">Pet Friendly:</span> {product.id % 2 === 0 ? 'Yes' : 'No'}</li>
                <li><span className="font-medium">Difficulty:</span> {product.id % 3 === 0 ? 'Beginner' : 'Intermediate'}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}