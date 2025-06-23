import { Award, Leaf, Truck } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Award className="text-white text-2xl" />,
      title: "Premium Plant Selection",
      description: "Carefully curated selection of high-quality plants for every space and environment."
    },
    {
      icon: <Leaf className="text-white text-2xl" />,
      title: "Plant Health Expertise",
      description: "Our AI-powered plant diagnostic tool helps identify and solve plant health problems."
    },
    {
      icon: <Truck className="text-white text-2xl" />,
      title: "Safe Delivery",
      description: "Plants packaged with care to ensure they arrive healthy and thriving at your doorstep."
    }
  ];

  return (
    <section className="py-16 bg-neutral-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/5 rounded-full -ml-12 -mb-12"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold text-primary mb-2">Why choose us?</h2>
          <div className="w-20 h-1 bg-secondary mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 group hover:border-primary/20"
            >
              <div className="w-16 h-16 mb-5 bg-primary rounded-full flex items-center justify-center group-hover:bg-primary-dark transition-colors">
                {feature.icon}
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
