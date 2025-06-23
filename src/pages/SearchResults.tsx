import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import axios from "axios";
import { Loader2 } from "lucide-react";

const BASE_URL = "https://localhost:7019";
const getToken = () => localStorage.getItem("token");

const SearchResults = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [params] = useLocation();

    const searchQuery = new URLSearchParams(window.location.search).get("query");

    useEffect(() => {
        const fetchProducts = async () => {
        setLoading(true);
        try {
            const token = getToken();
            const response = await axios.get(`${BASE_URL}/api/Products`, {
            params: {
                PageSize: 20,
                PageIndex: 1,
                Search: searchQuery,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setProducts(response.data.data || []);

    } catch (error) {
    console.error("Search error:", error);
    } finally {
    setLoading(false);
    }
    };

    if (searchQuery) {
        fetchProducts();
    }
    }, [searchQuery]);
    return (
        <div className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-4 text-primary-dark">Search Results</h1>

        {loading ? (
            <div className="flex justify-center items-center py-10">
            <Loader2 className="animate-spin w-6 h-6 text-primary" />
            </div>
        ) : products.length === 0 ? (
            <p className="text-neutral-dark text-center">No products found.</p>
        ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((product: any) => (
                <div key={product.id} className="bg-white shadow rounded p-4">
                <img src={product.pictureUrl} alt={product.name} className="w-full h-40 object-cover mb-2" />
                <h2 className="text-sm font-semibold">{product.name}</h2>
                <p className="text-sm text-neutral-dark">${product.price}</p>
                </div>
            ))}
            </div>
        )}
        </div>
    );
};

export default SearchResults;
