import { link } from "fs";
import { Link } from "wouter";

const CareTips = () => {
const careTips = [
  { id: 1, title: "Water Regularly", content: "Water your plants regularly to keep them healthy.", imageUrl: "/images/R.jpeg", link:"https://energypedia.info/wiki/Water_Use_in_Agriculture" },
  { id: 2, title: "Provide Sunlight", content: "Ensure your plants get enough sunlight.", imageUrl: "/images/young-plant-growth-sunlight-sustainable-development_875825-138720.jpg" , link:"https://extension.psu.edu/planting-in-sun-or-shade" },
  { id: 3, title: "Use Fertilizer", content: "Use a suitable fertilizer to promote plant growth.", imageUrl: "/images/R (1).jpeg", link:"https://extension.unr.edu/publication.aspx?PubID=3167" },
];



  return (
    <div className="relative overflow-hidden">
      <section className="py-16 bg-neutral-light">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl font-bold text-center mb-6 text-primary">Plant Care Tips</h1>
          <p className="text-center mb-12 max-w-2xl mx-auto text-gray-600">Discover expert advice to keep your plants thriving year-round.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {
              careTips?.map(tip => (
                <div key={tip.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <img 
                    src={tip.imageUrl} 
                    alt={tip.title} 
                    className="w-full h-48 object-cover" 
                  />
                  <div className="p-6">
                    <h3 className="font-heading font-semibold text-xl mb-3 text-primary">{tip.title}</h3>
                    <p className="mb-4 text-gray-600">{tip.content}</p>
                    <a href={tip.link} className="text-primary-dark hover:text-primary font-medium" target="_blank">    
                    Read More →
                    </a>
                  </div>
                </div>
              ))
            }
          </div>
          
          <div className="mt-16">
            <h2 className="font-heading text-2xl font-bold text-center mb-8 text-primary">Seasonal Care Guide</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-heading font-semibold text-xl mb-4 text-primary">Spring & Summer Care</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-600">Increase watering frequency as temperatures rise</p>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-600">Apply fertilizer every 4-6 weeks during growing season</p>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-600">Monitor for pests that thrive in warm weather</p>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-600">Regularly prune to encourage new growth</p>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-heading font-semibold text-xl mb-4 text-primary">Fall & Winter Care</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-600">Reduce watering as growth slows down</p>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-600">Move plants away from cold drafts and windows</p>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-600">Stop fertilizing until spring</p>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-600">Consider using a humidifier for tropical plants</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-10">
            <a 
              href="https://costafarms.com/blogs/get-growing/plant-care-tips" 
              className="bg-gradient-to-r from-[#EBB461] to-[#FA8966] hover:bg-gradient-to-r hover:from-[#FA8966] hover:to-[#EBB461] text-white font-medium py-2 px-6 rounded-full transition-transform hover:-translate-y-1"
            >
              View All Articles
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareTips;
