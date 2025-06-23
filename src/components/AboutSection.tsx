import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-neutral-light">
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
            <h2 className="font-heading text-3xl font-bold mb-4 text-primary-dark">About</h2>
            <p className="mb-4">Dr.Plant is a passionate team of plant enthusiasts, botanists, and tech experts committed to improving plant health and customer knowledge.</p>
            <p className="mb-6">Our mission is to help users care for their plants with AI-powered disease detection and a platform for all agricultural needs.</p>
            <Link href="/about">
              <Button className="bg-gradient-to-r from-[#EBB461] to-[#FA8966] hover:bg-gradient-to-r hover:from-[#FA8966] hover:to-[#EBB461] text-white font-medium py-2 px-6 rounded-full transition-transform hover:-translate-y-1">
                Our Story
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
