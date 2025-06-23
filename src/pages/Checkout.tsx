import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, CheckCircle, Wallet } from "lucide-react";
import { getCart, clearCart } from "@/api/cartApi";

const BASE_URL="https://localhost:7019"
const getBasketId = ()=> localStorage.getItem("basketId");
const getToken = ()=> localStorage.getItem("token");


const checkoutSchema = z.object({
  fullName: z.string().min(3, { message: "Full name must be at least 3 characters" }),
  address: z.string().min(5, { message: "Please enter a valid address" }),
  city: z.string().min(2, { message: "Please enter a valid city" }),
  country: z.string().min(2, { message: "Please enter a valid country" }),
  paymentMethod: z.enum(["credit", "paypal","cash"]),
  deliveryMethodId: z.string().min(1, { message: "Please select a delivery method" }),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;


const Checkout = () => {
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [selectedDeliveryCost, setSelectedDeliveryCost]= useState(0)
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      address: "",
      city: "",
      country: "",
      paymentMethod: "credit",
      deliveryMethodId:"",
    },
  });

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cart = await getCart();
        setCartItems(cart.items || []);
      } catch (error) {
        console.error("Failed to load cart", error);
      }
    };
      const fetchAddress = async () => {
      try {
        const token = getToken();
        const response = await axios.get(`${BASE_URL}/api/Account/address`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const address = response.data;
        form.reset({
          fullName: `${address.firstName || ""} ${address.lastName || ""}`.trim(),
          address: address.street || "",
          city: address.city || "",
          country: address.country || "",
          paymentMethod: "credit",
          deliveryMethodId: "",
        });
      } catch (err) {
        console.log("No saved address found");
      }
    };
    fetchCartItems();
    fetchAddress();
  }, []);

  const calculateTotal = () => {
    if (!Array.isArray(cartItems)) return 0;
    return cartItems.reduce((total, item) => {
      const price = item.salePrice ?? item.price;
      return total + price * item.quantity;
    }, 0);
  };

  const subtotal = calculateTotal();
  const total=subtotal + selectedDeliveryCost;
  
//   const saveAddress = async (data: CheckoutFormValues) => {
//   try {
//     const token = getToken();
//     if (!token) throw new Error("Token not found");

//     const addressData = {
//       firstName: data.fullName.split(" ")[0],
//       lastName: data.fullName.split(" ").slice(1).join(" ") || "User",
//       street: data.address,
//       city: data.city,
//       country: data.country,
//     };


//     await axios.put(`${BASE_URL}/api/Account/address`, addressData, {
//       headers: { Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
      
//     });

//     toast({
//       title: "Address Saved",
//       description: "Your shipping address has been saved successfully.",
//       variant: "success",
//     });
//   } catch (error: any) {
//     toast({
//       title: "Save Failed",
//       description: error?.response?.data?.message || error.message || "Failed to save address.",
//       variant: "destructive",
//     });
//   }
// };


  
  const createOrderMutation = useMutation({
    mutationFn: async (data: CheckoutFormValues) => {    
    const token = getToken();
    const basketId =getBasketId();
    if (!basketId || !token){
      throw new Error ("Basket id or token not found")
    }
    
    
    const orderData = {
      basketId,
      deliveryMethodId :parseInt(data.deliveryMethodId),
      shippingAddress: {
        firstName: data.fullName.split(" ")[0],
        lastName: data.fullName.split(" ").slice(1).join(" ") || "User",
        street: data.address,
        city: data.city,
        country: data.country,
      },
    };  
    const response = await axios.post(`${BASE_URL}/api/Orders`, orderData, {
        headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        },
      });
      return response.data;
    },
    onSuccess: async (data) => {
      setOrderId(data.id);
      setOrderComplete(true);
      const basketId = getBasketId();
      clearCart();
      try {
        const token = getToken();
        const response = await axios.post(`${BASE_URL}/api/Payment/${getBasketId()}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
  const clientSecret = response.data.clientSecret;
  navigate(`/payment?clientSecret=${clientSecret}&orderId=${data.id}`);
} catch (error: any) {
  console.error("Payment API Error:", error?.response?.data || error.message);
  toast({
    title: "Payment Error",
    description: error?.response?.data?.message || "Something went wrong while initiating payment.",
    variant: "destructive",
  });
}


      toast({
        title:"order placed successfuly!",
        description:`your order #${data.id} has been received`,
        variant:"success"
      })
},
    onError: (error: any) => {
  console.error("Full server error response:", error?.response?.data);
  toast({
    title: "Failed to place order",
    description: error?.response?.data?.message || error.message || "Something went wrong with your order.",
    variant: "destructive",
  });
}

  });

  const {data: deliveryMethods=[], isLoading:deliveryLoading}=useQuery({
    queryKey:["deliveryMethods"],
    queryFn:async ()=>{
      const token = getToken();
      const response= await axios.get(`${BASE_URL}/api/Orders/deliveryMethods`,{
        headers:{Authorization:`Bearer ${token}`},
      });
      return response.data;
    },
  })


  
  const onSubmit = (data: CheckoutFormValues) => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "You cannot checkout with an empty cart.",
        variant: "destructive",
      });
      navigate("/shop");
      return;
    }
    
    createOrderMutation.mutate(data);
  };
  

  if (orderComplete) {
    return (
      <div className="relative overflow-hidden">
        <section className="py-16 bg-neutral-light">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
              <div className="mb-6 flex justify-center">
                <CheckCircle size={64} className="text-green-500" />
              </div>
              <h1 className="font-heading text-3xl font-bold mb-4 text-primary-dark">Order Confirmed!</h1>
              <p className="mb-2">Thank you for your purchase. Your order #{orderId} has been received.</p>
              <p className="mb-6">We'll send you an email confirmation shortly.</p>
              
              <Button 
                className="bg-gradient-to-r from-[#EBB461] to-[#FA8966] hover:bg-gradient-to-r hover:from-[#FA8966] hover:to-[#EBB461] text-white font-medium py-2 px-6 rounded-full transition-transform hover:-translate-y-1"
                onClick={() => navigate("/shop")}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }
  
  return (
    <div className="relative overflow-hidden">      
      <section className="py-16 bg-neutral-light">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl font-bold text-center mb-6 text-primary-dark">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="font-heading font-semibold text-xl mb-6 pb-4 border-b">Shipping Information</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main St" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="City" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>country</FormLabel>
                            <FormControl>
                              <Input placeholder="country" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="mt-8">
                      <h2 className="font-heading font-semibold text-xl mb-6 pb-4 border-b">Payment Method</h2>
                      
                      <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-3"
                              >
                                {/* <div className="flex items-center space-x-2 border p-4 rounded-md cursor-pointer hover:border-primary">
                                  <RadioGroupItem value="credit" id="credit" />
                                  <FormLabel htmlFor="credit" className="flex-1 cursor-pointer">
                                    <div className="flex items-center">
                                      <CreditCard className="mr-2 h-5 w-5" />
                                      <span>Credit / Debit Card</span>
                                    </div>
                                  </FormLabel>
                                </div> */}
                                
                                <div className="flex items-center space-x-2 border p-4 rounded-md cursor-pointer hover:border-primary">
                                  <RadioGroupItem value="cash" id="cash" />
                                  <FormLabel htmlFor="cash" className="flex-1 cursor-pointer">
                                    <div className="flex items-center">
                                    <Wallet className="mr-2 h-5 w-5" />

                                      <span>Cash On Delivery</span>
                                    </div>
                                  </FormLabel>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    <FormField
                      control={form.control}
                      name="deliveryMethodId"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                                                <h2 className="font-heading font-semibold text-xl mb-4 pb-5 pt-4 border-b">Delivery Method</h2>
                          <FormControl>
                            <RadioGroup 
                              onValueChange={(value)=>{field.onChange(value);
                                const selectedMethod= deliveryMethods.find((method:any)=>method.id.toString()===value);
                                if (selectedMethod){
                                  setSelectedDeliveryCost(selectedMethod.cost);
                                }
                              }}
                              defaultValue={field.value} className=" space-y-4">
                              {deliveryMethods.map((method:any) => (
                                <div key={method.id} className="flex items-center space-x-2 border p-3 rounded-md cursor-pointer hover:border-primary">
                                  <RadioGroupItem value={method.id.toString()} id={`delivery-${method.id}`} />
                                  <FormLabel htmlFor={`delivery-${method.id}`} className="flex-1 cursor-pointer">
                                    <div className="flex justify-between">
                                      <span>{method.shortName}-{method.description}</span>
                                      <span className="text-sm text-neutral-dark">${method.cost}</span>
                                    </div>
                                    <div className="text=xs text-neutral-dark italic">{method.deliveryTime}</div>
                                  </FormLabel>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    </div>
                    {/* <Button 
  type="button"
  onClick={() => saveAddress(form.getValues())}
  className="w-full bg-blue-600 text-white font-medium py-2 px-6 rounded-full hover:bg-blue-700 transition-transform hover:-translate-y-1"
>
  Save Address
                    </Button> */}
                    
                    <div className="pt-4 hidden md:block">
                      <Button 
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#EBB461] to-[#FA8966] hover:bg-gradient-to-r hover:from-[#FA8966] hover:to-[#EBB461] text-white font-medium py-2 px-6 rounded-full transition-transform hover:-translate-y-1"
                        disabled={createOrderMutation.isPending}
                      >
                        {createOrderMutation.isPending ? "Processing..." : "Place Order"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="font-heading font-semibold text-xl mb-4 pb-4 border-b">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between">
                      <div className="flex">
                        <div className="w-10 h-10 rounded overflow-hidden mr-3">
                          <img src={item.pictureUrl} alt={item.productName} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{item.productName}</p>
                          <p className="text-xs text-neutral-dark">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="text-sm">
                        ${((item.salePrice || item.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3 mb-6 pt-4 border-t">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-medium">${selectedDeliveryCost}</span>
                  </div>
                  <div className="pt-3 border-t flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-primary-dark">${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="md:hidden">
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#EBB461] to-[#FA8966] hover:bg-gradient-to-r hover:from-[#FA8966] hover:to-[#EBB461] text-white font-medium py-2 px-6 rounded-full transition-transform hover:-translate-y-1"
                    disabled={createOrderMutation.isPending}
                    onClick={form.handleSubmit(onSubmit)}
                  >
                    {createOrderMutation.isPending ? "Processing..." : "Place Order"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
