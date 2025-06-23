import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/components/ProductCard";
import CategoryPill from "@/components/CategoryPill";
import Pagination from "@/components/Pagination";


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


type Category = {
  id: number;
  name: string;
};

type Brand = {
  id: number;
  name: string;
};


const Shop = () => {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  const [currentCategory, setCurrentCategory] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const [currentBrand, setCurrentBrand] = useState<number | null>(null);
  const [loadingBrand, setLoadingBrand] = useState(true);
  const [brand, setBrand] = useState<Brand[] | null>(null);



  const BASE_URL="https://localhost:7019"

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const response = await axios.get(`${BASE_URL}/api/Products/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoadingBrand(true);
        const response = await axios.get(`${BASE_URL}/api/Products/brands`);
        setBrand(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoadingBrand(false);
      }
    };
    fetchBrands();
  }, []);
  



  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);

        const params: any = {
          PageSize: productsPerPage,
          PageIndex: currentPage,
        };

        if (currentCategory !== null) {
          params.CategoryId = currentCategory;
        }
        if (currentBrand !== null) {
          params.BrandId = currentBrand;
        }


        const response = await axios.get(`${BASE_URL}/api/Products`, { params });

        setProducts(response.data.data); 
        setTotalProducts(response.data.count);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, [currentCategory,currentBrand,currentPage]);

  const totalPages = Math.ceil(totalProducts / productsPerPage);
  
  
  const handleCategoryChange = (categoryId: number | null) => {
    setCurrentCategory(categoryId);
    setCurrentPage(1);
  };
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative overflow-hidden">
      <div className="relative w-full h-[650px] shadow-[0_10px_30px_rgba(0,0,0,0.5)] bg-cover bg-center" style={{ backgroundImage: "url('/images/shop.jpg')" }}>
        <div className="absolute inset-0 bg-black  bg-opacity-40 flex items-center justify-end pr-40 ">
          <div className="text-start text-white w-[450px] h-[350px] ">
            <h1 className="text-6xl font-bold mb-8">Welcome to Dr.Plant Shop!</h1>
            <p className="text-2xl">find everything your plants need to thrive ! from seeds to soil, we've got you covered.</p>
          </div>
        </div>
      </div>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">             
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            <div className="lg:col-span-1 border-r-[2px] p-6 border-r-gray-200 ">
              <div className="sticky top-24 space-y-8">
                <div>
                  <h2 className="font-bold text-2xl mb-4 text-primary">Categories</h2>
                  <div className="flex flex-col gap-2">
                    <CategoryPill 
                      title="All Plants" 
                      active={currentCategory === null} 
                      onClick={() => handleCategoryChange(null)} 
                    />
                    {loadingCategories ? (
                      Array(5).fill(0).map((_, index) => (
                        <div key={index} className="h-10 w-full bg-gray-200 animate-pulse "></div>
                      ))
                      ) : (
                        categories?.map(category => (
                          <CategoryPill 
                            key={category.id} 
                            title={category.name} 
                            active={currentCategory === category.id} 
                            onClick={() => handleCategoryChange(category.id)} 
                          />
                        ))
                    )}
                  </div>
                </div>
                  {/* brands */}
                  <div>
                    <h2 className="font-bold text-primary text-2xl mb-4">Brands</h2>
                    <div className="flex flex-col gap-2">
                      <CategoryPill 
                        title="All Brands" 
                        active={currentBrand === null} 
                        onClick={() => setCurrentBrand(null)} 
                      />
                      {loadingBrand ? (
                        Array(5).fill(0).map((_, index) => (
                          <div key={index} className="h-10 w-full bg-gray-200 animate-pulse rounded-full"></div>
                        ))
                      ) : (
                        brand?.map(brand => (
                          <CategoryPill 
                            key={brand.id} 
                            title={brand.name} 
                            active={currentBrand === brand.id} 
                            onClick={() => setCurrentBrand(brand.id)} 
                          />
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {loadingProducts ? (
                    Array(productsPerPage).fill(0).map((_, index) => (
                      <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="h-64 bg-gray-200 animate-pulse"></div>
                        <div className="p-4">
                          <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded animate-pulse mb-4"></div>
                          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      </div>
                    ))
                  ) : products?.length ? (
                    products.map(product => (
                      <ProductCard key={product.id} product={product} onCartUpdate={setCartCount} />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-10">
                      <p className="text-lg text-gray-500">No products found in this category.</p>
                    </div>
                  )}
                </div>

                {totalPages > 1 && (
                  <div className="mt-10">
                    <Pagination 
                      currentPage={currentPage} 
                      totalPages={totalPages} 
                      onPageChange={handlePageChange} 
                    />
                  </div>
                )}
              </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
