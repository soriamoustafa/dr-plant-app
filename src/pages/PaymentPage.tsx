import { useSearchParams } from "wouter";
import { useStripe, useElements, CardElement, ElementsConsumer } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";

export default function PaymentPage() {
  const [params] = useSearchParams();
const clientSecret = params.get("clientSecret")!;
const orderId = params.get("orderId")!;


  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
      },
    });

    if (result.error) {
      console.error(result.error.message);
      alert("Payment Failed");
    } else {
      if (result.paymentIntent.status === "succeeded") {
        alert("Payment successful!");
        // navigate to success page or show message
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Enter Payment Details</h2>
      <form onSubmit={handleSubmit}>
        <CardElement className="p-4 border rounded mb-4" />
        <Button type="submit" disabled={!stripe}>
          Pay Now
        </Button>
      </form>
    </div>
  );
}
