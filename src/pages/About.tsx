import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Leaf, BookOpen, ShoppingBag } from "lucide-react";
const About = () => {
  return (
    <div className="relative overflow-hidden">      
      <section className="py-16 bg-neutral-light">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img 
                src="https://images.unsplash.com/photo-1559749284-7a6971fd798e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600" 
                alt="People caring for plants" 
                className="rounded-lg shadow-lg w-full h-auto object-cover" 
              />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h1 className="font-heading text-3xl font-bold mb-4 text-primary">About Dr.Plant</h1>
              <p className="mb-4">
                Dr. Plant is an all-in-one plant care platform designed to help you diagnose plant diseases, care for your plants, and shop for essential plant products — all in one place.
              </p>
              <p className="mb-6">
                Whether you're a beginner gardener or an experienced plant lover, Dr. Plant makes plant care easier, smarter, and more accessible.
              </p>
              <Link href="/">
                <Button className="bg-gradient-to-r from-[#EBB461] to-[#FA8966] hover:bg-gradient-to-r hover:from-[#FA8966] hover:to-[#EBB461] text-white font-medium py-2 px-6 rounded-full transition-transform hover:-translate-y-1">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-10 text-primary">Our Mission</h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="relative border-l-4 border-primary-light pl-8 pb-6">
              <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary-light"></div>
              <h3 className="font-heading font-semibold text-xl mb-2 text-gray-700">We created Dr. Plant with one simple goal:</h3>
              <p className="text-gray-600 mb-4 ">
                To make plant care smarter and more convenient for everyone.
              </p>
            </div>
            
            <div className="relative border-l-4 border-primary-light pl-8 pb-9">
              <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary-light"></div>
              <h3 className="font-heading font-semibold text-xl mb-2 text-gray-700">We combine the power of AI diagnosis, expert care tips, and a curated store to help users:</h3>
              <ul style={{listStyleType:"circle"}}>
                <li className="text-gray-600 mb-4" >
                  Detect plant diseases early
                </li>
                <li className="text-gray-600 mb-4" >
                  Understand what's affecting their plants
                </li>
                <li className="text-gray-600 mb-4" >
                  Learn how to treat or prevent those problems
                </li>
                <li className="text-gray-600 mb-4" >
                  Buy trusted products for better plant health
                </li>
              </ul>
            </div>
            
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-neutral-light">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-10 text-primary-dark">Key Features</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="images/features@2.png" 
                alt="." 
                className="w-65 h-64 object-cover block mx-auto" 
              />
              <div className="p-6">
                <h3 className="font-heading font-semibold text-xl mb-1">Plant Disease Detection</h3>
                <p className="text-neutral-dark text-sm">
                  Just upload a photo of your plant — our AI will identify any visible disease and give you a short description and care advice.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="images/nn.png" 
                alt=".." 
                className="w-65 h-64 object-cover block mx-auto" 
              />
              <div className="p-6">
                <h3 className="font-heading font-semibold text-xl mb-1">Smart Care Tips</h3>
                <p className="text-neutral-dark text-sm">
                  Get clear and simple tips to care for your specific plant and avoid common issues in the future.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="images/shop.png" 
                alt=".." 
                className="w-65 h-64 object-cover block mx-auto" 
              />
              <div className="p-6">
                <h3 className="font-heading font-semibold text-xl mb-1">Plant Essentials Store</h3>
                <p className="text-neutral-dark text-sm">
                  Shop for fertilizers, soil, tools, and more — everything your plants need, delivered to your door.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-primary/5"></div>
        <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-secondary/5"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl font-bold text-primary mb-2">Our Vision</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">We're on a mission to make plant care smarter, greener, and more fun.In the future, we plan to add:</p>
        </div>
        
<div className="grid md:grid-cols-3 gap-6">
  <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
    <div className="w-16 h-16 mb-6 text-primary bg-primary/10 rounded-lg p-3 flex items-center justify-center">
      <Leaf className="w-8 h-8 " />
    </div>
    <h3 className="font-heading font-semibold text-xl mb-3 text-gray-800">Plant Health Tracking</h3>
    <p className="text-gray-600 mb-6">Track your plant’s health over time and detect potential diseases early.</p>
  </div>

  <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
    <div className="w-16 h-16 mb-6 text-primary bg-primary/10 rounded-lg p-3 flex items-center justify-center">
      <BookOpen className="w-8 h-8" />
    </div>
    <h3 className="font-heading font-semibold text-xl mb-3 text-gray-800">Care Library</h3>
    <p className="text-gray-600 mb-6">Explore a full library of care tips tailored to a wide variety of plant species.</p>
  </div>

  <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
    <div className="w-16 h-16 mb-6 text-primary bg-primary/10 rounded-lg p-3 flex items-center justify-center">
      <ShoppingBag className="w-8 h-8" />
    </div>
    <h3 className="font-heading font-semibold text-xl mb-3 text-gray-800">Eco-Friendly Products</h3>
    <p className="text-gray-600 mb-6">Discover curated, eco-conscious products to support your plant care journey.</p>
  </div>
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

    <section className="py-16 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-primary/5"></div>
        <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-secondary/5"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl font-bold text-primary mb-2">Thank You for Growing with Us!</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">At Dr. Plant, we believe every plant deserves the best care — and we’re here to help you every step of the way. Have questions or suggestions? Visit our Contact page and let us know!
          </p>
        </div>

      </div>
    </section>

    </div>
  );
};

export default About;
