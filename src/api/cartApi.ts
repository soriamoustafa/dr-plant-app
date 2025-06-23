import axios from "axios";
const getToken=()=>localStorage.getItem("token");
const BASE_URL="https://localhost:7019"


export const addToCart = async (product: any, onCartUpdate?: (count: number) => void) => {
    const token = getToken();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    let basketId = `basket-${user.email}`;
    console.log("Saving basketId:", basketId);
    localStorage.setItem("basketId", basketId);
    console.log("Saved basketId:", localStorage.getItem("basketId"));
    
    let currentCart;
    try {
        currentCart = await getCart();
    } catch (e) {
        currentCart = {
            id: basketId,
            items: [],
        };
    }

    const existingItem = currentCart.items.find((item: any) => item.id === product.productId);
    if (existingItem) {
        existingItem.quantity += product.quantity || 1;
    } else {
        currentCart.items.push({
        id: product.productId,
        brand: "unknown",
        category: "general",
        pictureUrl: product.pictureUrl,
        price: product.price,
        productName: product.name,
        quantity: product.quantity || 1,
        });
    }

    const updatedCart = {
        id: basketId,
        items: currentCart.items,
        paymentIntentId: null,
        clientSecret: null,
        deliveryMethodId: null,
        shippingPrice: 0,
    };

    await axios.post(`${BASE_URL}/api/Basket`, updatedCart, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    if (onCartUpdate) {
    const totalCount = updatedCart.items.reduce((sum:any, item:any) => sum + item.quantity, 0);
    onCartUpdate(totalCount);
    }

    return updatedCart;
    };

export const getCart = async () => {
    const token = getToken();

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const basketId = `basket-${user.email}`;

    const response = await axios.get(`${BASE_URL}/api/Basket?id=${basketId}`, {
    headers: {
        Authorization: `Bearer ${token}`,
        Accept: "text/plain",
    },
    });

    return response.data;
};


export const removeFromCart = async (productId: number) => {
    const token = getToken();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const basketId = `basket-${user.email}`;

    if (!basketId) throw new Error("Basket ID not found");

    const currentCart = await getCart();

    const updatedItems = currentCart.items.filter((item: any) => item.id !== productId);

    const updatedCart = {
        id: basketId,
        items: updatedItems,
        paymentIntentId: null,
        clientSecret: null,
        deliveryMethodId: null,
        shippingPrice: 0,
    };

    await axios.post(`${BASE_URL}/api/Basket`, updatedCart, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};


export const updateQuantity = async (productId: number, change: number) => {
    const token = getToken();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const basketId = `basket-${user.email}`;


    if (!basketId) {
        throw new Error("Basket ID not found");
    }

    const currentCart = await getCart();

    const updatedItems = currentCart.items.map((item: any) => {
        if (item.id === productId) {
            const newQuantity = item.quantity + change;
            if (newQuantity <= 0) return null;
            return { ...item, quantity: newQuantity };
        }
        return item;
    }).filter(Boolean);

    const updatedCart = {
        id: basketId,
        items: updatedItems,
        paymentIntentId: null,
        clientSecret: null,
        deliveryMethodId: null,
        shippingPrice: 0,
    };

    await axios.post(`${BASE_URL}/api/Basket`, updatedCart, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const clearCart = async () => {
    const token = getToken();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const basketId = `basket-${user.email}`;


    if (!basketId) return;

    await axios.delete(`${BASE_URL}/api/Basket`, {
        params: { id: basketId },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    localStorage.removeItem("basketId"); 
};

export const fetchCartItemsCount = async (): Promise<number> => {
    const token = getToken();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const basketId = `basket-${user.email}`;

    if (!basketId) return 0;

    try {
        const response = await axios.get(`${BASE_URL}/api/Basket?id=${basketId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        const cart = response.data;
        return cart.items.reduce((total: number, item: any) => total + item.quantity, 0);
    } catch {
    return 0;
    }
};





