import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
const Home = () => {

  return (
    <div className="relative overflow-hidden">      
      <Hero />
      <WhyChooseUs /> 
      <div className="my-16 relative">
        <div className="h-px bg-neutral-200 relative">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary">
              <path d="M21.88 2.15c-.02-.14-.12-.24-.26-.26-.16-.02-.32-.02-.48 0-1.16.1-2.3.35-3.36.72-2.19.77-4.19 2.08-5.85 3.74-1.32 1.32-2.42 2.93-2.92 4.57-.22.7-.31 1.45-.31 2.19 0 3.11 1.73 5.94 4.44 7.35-1.44-2.56-1.96-5.68-.59-8.38.86-1.7 2.72-2.73 4.56-3.31 1.89-.59 3.92-.63 5.87-.33v.01c.31.05.38.43.12.58-2.45 1.37-4.47 3.32-5.63 5.78-1.09 2.31-1.37 5.3.18 7.44.1.14.29.17.44.08.03-.02.05-.04.08-.06 5.33-4.5 7.72-11.69 3.71-19.1z"/>
            </svg>
          </div>
        </div>
      </div>
      <AboutSection />
      <div className="my-16 relative">
        <div className="h-px bg-neutral-200 relative">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary">
              <path d="M21.88 2.15c-.02-.14-.12-.24-.26-.26-.16-.02-.32-.02-.48 0-1.16.1-2.3.35-3.36.72-2.19.77-4.19 2.08-5.85 3.74-1.32 1.32-2.42 2.93-2.92 4.57-.22.7-.31 1.45-.31 2.19 0 3.11 1.73 5.94 4.44 7.35-1.44-2.56-1.96-5.68-.59-8.38.86-1.7 2.72-2.73 4.56-3.31 1.89-.59 3.92-.63 5.87-.33v.01c.31.05.38.43.12.58-2.45 1.37-4.47 3.32-5.63 5.78-1.09 2.31-1.37 5.3.18 7.44.1.14.29.17.44.08.03-.02.05-.04.08-.06 5.33-4.5 7.72-11.69 3.71-19.1z"/>
            </svg>
          </div>
        </div>
      </div>
      <ServicesSection />
    </div>
  );
};

export default Home;
