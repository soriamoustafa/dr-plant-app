import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const BASE_URL = "https://localhost:7019";
const getToken = () => localStorage.getItem("token");

const MyOrders = () => {
  const { data: orders = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["myOrders"],
    queryFn: async () => {
      const token = getToken();
      console.log("TOKEN:", token);
      const response = await axios.get(`${BASE_URL}/api/Orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-10 text-lg">Loading your orders...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-600 font-medium">
        Failed to load orders. Please try again later.
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      <section className="py-16 bg-neutral-light">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl font-bold text-center mb-6 text-primary-dark">My Orders</h1>

          {orders.length === 0 ? (
            <p className="text-center text-lg text-neutral-dark">You haven’t placed any orders yet.</p>
          ) : (
            <div className="grid gap-6">
              {orders.map((order: any) => (
                <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-primary-dark">Order #{order.id}</h2>
                      <p className="text-sm text-neutral-dark">Date: {new Date(order.orderDate).toLocaleString()}</p>
                      <p className="text-sm text-neutral-dark">Status: {order.status}</p>
                    </div>
                    <CheckCircle className="text-green-500 w-8 h-8" />
                  </div>

                  <div className="border-t pt-4">
                    {order.orderItems.map((item: any) => (
                      <div key={item.productId} className="flex justify-between items-center py-2">
                        <div className="flex items-center">
                          <img src={item.pictureUrl} alt={item.productName} className="w-12 h-12 rounded mr-3" />
                          <div>
                            <p className="text-sm font-medium">{item.productName}</p>
                            <p className="text-xs text-neutral-dark">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="text-sm font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="text-right mt-4">
                    <span className="font-bold text-primary-dark">
                      Total: ${(order.total).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MyOrders;
