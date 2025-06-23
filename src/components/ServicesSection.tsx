import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ServicesSection = () => {
  const services = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9zM5.6 10.25c0 1.38 1.12 2.5 2.5 2.5.53 0 1.01-.16 1.42-.44l-.02.19c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5l-.02-.19c.4.28.89.44 1.42.44 1.38 0 2.5-1.12 2.5-2.5 0-1-.59-1.85-1.43-2.25.84-.4 1.43-1.25 1.43-2.25 0-1.38-1.12-2.5-2.5-2.5-.53 0-1.01.16-1.42.44l.02-.19C14.5 2.12 13.38 1 12 1S9.5 2.12 9.5 3.5l.02.19c-.4-.28-.89-.44-1.42-.44-1.38 0-2.5 1.12-2.5 2.5 0 1 .59 1.85 1.43 2.25-.84.4-1.43 1.25-1.43 2.25zM12 5.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5S9.5 9.38 9.5 8s1.12-2.5 2.5-2.5zM3 13c0 4.97 4.03 9 9 9 0-4.97-4.03-9-9-9z"/>
        </svg>
      ),
      title: "Plant Diagnosis",
      description: "Upload a photo and get instant AI diagnosis of plant issues and treatment recommendations.",
      link: "/diagnosis"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M11.23 6c-1.66 0-3.22.66-4.36 1.73C6.54 6.73 5.61 6 4.5 6 3.12 6 2 7.12 2 8.5c0 1.21.84 2.23 1.97 2.5C3.68 11.83 3.5 12.79 3.5 13.8c0 2.47 1.49 4.58 3.59 5.4C8.26 20.8 10.09 22 12.15 22c2.88 0 5.35-1.75 6.35-4.24 2.3-.66 4-2.75 4-5.26 0-3.04-2.46-5.5-5.5-5.5-1.06 0-2.04.39-2.85.9-.65-1.08-1.83-1.9-3.26-1.9zm-.73 11.39c-.39 0-.7-.31-.7-.7 0-.39.31-.7.7-.7.39 0 .7.31.7.7 0 .39-.31.7-.7.7zm8.75-3.67c-.22.37-.44.72-.7 1.03-.16.19-.34.38-.54.54-.24.18-.6.01-.6-.31v-2.98c0-.33.36-.51.6-.32.71.57 1.28 1.26 1.67 2.05.09.19.08.42-.03.59zm-5.77 5.03c-.47.47-1.1.73-1.77.73s-1.3-.26-1.77-.73c-.1-.1-.1-.26 0-.36s.26-.1.36 0c.75.75 2.07.75 2.82 0 .1-.1.26-.1.36 0 .1.1.1.26 0 .36z"/>
        </svg>
      ),
      title: "Care Tips",
      description: "Customized care instructions for all types of plants with seasonal adjustments.",
      link: "/care-tips"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
        </svg>
      ),
      title: "Online Shopping",
      description: "Browse and purchase plants, supplies, and accessories with fast, secure delivery.",
      link: "/shop"
    }
  ];

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-primary/5"></div>
        <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-secondary/5"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl font-bold text-primary mb-2">Our Services</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">Explore our range of plant services designed to help you grow and maintain beautiful, healthy plants.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-16 h-16 mb-6 text-primary bg-primary/10 rounded-lg p-3 flex items-center justify-center">
                {service.icon}
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3 text-gray-800">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              
              <div className="inline-block">
                <Button 
                  variant="ghost" 
                  className="p-0 text-primary hover:text-primary-dark hover:bg-transparent font-medium group flex items-center"
                  asChild
                >
                  <Link href={service.link}>
                    <span className="flex items-center">
                      {service.title === "Online Shopping" ? "Shop Now" : "Learn More"}
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            className="bg-gradient-to-r from-[#EBB461] to-[#FA8966] hover:bg-gradient-to-r hover:from-[#FA8966] hover:to-[#EBB461] text-white font-medium py-2 px-6 rounded-full transition-transform hover:-translate-y-1"
            asChild
          >
            <Link href="/shop">
              Explore All Services
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
