import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Star, Shield } from "lucide-react";


const Hero = () => {
  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-primary/5 to-transparent overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-16 right-16 w-64 h-64 rounded-full bg-secondary/5"></div>
        <div className="absolute bottom-16 left-16 w-72 h-72 rounded-full bg-primary/5"></div>
        <div className="absolute top-1/3 left-1/4 w-12 h-12 rounded-full bg-primary/10"></div>
        <div className="absolute bottom-1/4 right-1/3 w-8 h-8 rounded-full bg-secondary/10"></div>

        {/* Leaf shapes */}
        <div className="absolute -top-10 -right-10 text-primary/10 opacity-20 transform rotate-45">
          <svg width="200" height="200" viewBox="0 0 200 200" fill="currentColor">
            <path d="M170.5,29.5C152.8,11.8,128.2,3,100,3C71.8,3,47.2,11.8,29.5,29.5C11.8,47.2,3,71.8,3,100c0,28.2,8.8,52.8,26.5,70.5
              C47.2,188.2,71.8,197,100,197c28.2,0,52.8-8.8,70.5-26.5c17.7-17.7,26.5-42.3,26.5-70.5C197,71.8,188.2,47.2,170.5,29.5z M100,177
              c-42.4,0-77-34.6-77-77c0-42.4,34.6-77,77-77c42.4,0,77,34.6,77,77C177,142.4,142.4,177,100,177z"/>
          </svg>
        </div>
        <div className="absolute -bottom-16 -left-10 text-primary/10 opacity-20 transform -rotate-12">
          <svg width="200" height="200" viewBox="0 0 200 200" fill="currentColor">
            <path d="M170.5,29.5C152.8,11.8,128.2,3,100,3C71.8,3,47.2,11.8,29.5,29.5C11.8,47.2,3,71.8,3,100c0,28.2,8.8,52.8,26.5,70.5
              C47.2,188.2,71.8,197,100,197c28.2,0,52.8-8.8,70.5-26.5c17.7-17.7,26.5-42.3,26.5-70.5C197,71.8,188.2,47.2,170.5,29.5z M100,177
              c-42.4,0-77-34.6-77-77c0-42.4,34.6-77,77-77c42.4,0,77,34.6,77,77C177,142.4,142.4,177,100,177z"/>
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0 md:pr-8">
            <div className="inline-block text-xs font-semibold bg-secondary/10 text-secondary px-3 py-1 rounded-full mb-4">
              Your Plant Health Partner
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-800 leading-tight">
              Revitalize Your <span className="text-primary relative">Plants
                <span className="absolute bottom-1 left-0 w-full h-2 bg-primary/20 -z-10 rounded"></span>
              </span> With Expert Care
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-xl">
              Your one-stop destination for healthy plants, expert diagnoses, and personalized plant care solutions.
            </p>
            
            <div className="flex flex-wrap mb-8 gap-4">
              <div className="flex items-center bg-white py-2 px-4 rounded-full shadow-sm">
                <Heart className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm">Plant Lovers</span>
              </div>
              <div className="flex items-center bg-white py-2 px-4 rounded-full shadow-sm">
                <Star className="h-4 w-4 text-secondary mr-2" />
                <span className="text-sm">Premium Quality</span>
              </div>
              <div className="flex items-center bg-white py-2 px-4 rounded-full shadow-sm">
                <Shield className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm">Expert Care</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                className="bg-primary hover:bg-primary-dark text-white font-medium rounded-full transition-all duration-300 hover:-translate-y-1 shadow-md"
                asChild
              >
                <Link href="/shop">
                  Shop Plants
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                className="text-primary border-primary hover:bg-primary/5 transition-colors font-medium rounded-full"
                asChild
              >
                <Link href="/diagnosis">
                  <span className="flex items-center">
                    Diagnose Plant
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="relative z-10">
              <div className="absolute -top-4 -right-4 bg-white p-4 rounded-lg shadow-lg z-20">
                <div className="bg-primary/10 rounded-lg p-2">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                    <path d="M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9zM5.6 10.25c0 1.38 1.12 2.5 2.5 2.5.53 0 1.01-.16 1.42-.44l-.02.19c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5l-.02-.19c.4.28.89.44 1.42.44 1.38 0 2.5-1.12 2.5-2.5 0-1-.59-1.85-1.43-2.25.84-.4 1.43-1.25 1.43-2.25 0-1.38-1.12-2.5-2.5-2.5-.53 0-1.01.16-1.42.44l.02-.19C14.5 2.12 13.38 1 12 1S9.5 2.12 9.5 3.5l.02.19c-.4-.28-.89-.44-1.42-.44-1.38 0-2.5 1.12-2.5 2.5 0 1 .59 1.85 1.43 2.25-.84.4-1.43 1.25-1.43 2.25zM12 5.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5S9.5 9.38 9.5 8s1.12-2.5 2.5-2.5zM3 13c0 4.97 4.03 9 9 9 0-4.97-4.03-9-9-9z"/>
                  </svg>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1530968464165-7a1861cbaf9f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80" 
                  alt="Beautiful plant arrangement" 
                  className="w-full h-auto object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                    <h3 className="font-bold text-primary text-lg">Plant Health Diagnosis</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Upload a photo and get instant diagnosis & care tips
                    </p>
                    <Button  
                      size="sm" 
                      className="w-full bg-gradient-to-r from-[#EBB461] to-[#FA8966] hover:bg-gradient-to-r hover:from-[#FA8966] hover:to-[#EBB461] text-white font-medium py-2 px-6 rounded-full transition-transform hover:-translate-y-1 "
                      asChild
                    >
                      <Link href="/diagnosis">
                        Try Now
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white p-3 rounded-lg shadow-lg z-20">
                <div className="bg-secondary/10 rounded-lg p-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-secondary">
                    <path d="M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9zM5.6 10.25c0 1.38 1.12 2.5 2.5 2.5.53 0 1.01-.16 1.42-.44l-.02.19c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5l-.02-.19c.4.28.89.44 1.42.44 1.38 0 2.5-1.12 2.5-2.5 0-1-.59-1.85-1.43-2.25.84-.4 1.43-1.25 1.43-2.25 0-1.38-1.12-2.5-2.5-2.5-.53 0-1.01.16-1.42.44l.02-.19C14.5 2.12 13.38 1 12 1S9.5 2.12 9.5 3.5l.02.19c-.4-.28-.89-.44-1.42-.44-1.38 0-2.5 1.12-2.5 2.5 0 1 .59 1.85 1.43 2.25-.84.4-1.43 1.25-1.43 2.25zM12 5.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5S9.5 9.38 9.5 8s1.12-2.5 2.5-2.5zM3 13c0 4.97 4.03 9 9 9 0-4.97-4.03-9-9-9z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </section>
  );
};

export default Hero;
