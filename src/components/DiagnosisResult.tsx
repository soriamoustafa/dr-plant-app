import { Link } from "wouter";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type DiagnosisResultProps = {
  diagnosis: {
    name: string | null;
    discreption: string;
    careTips: string;
    image: string;
  };
};



const DiagnosisResult = ({ diagnosis }: DiagnosisResultProps) => {
  const suggestions = diagnosis.careTips?.split("\n").filter(Boolean) || [];
const [plantName, diseaseName] = diagnosis.name?.includes(" - ")? diagnosis.name.split(" - "): ["Unknown", "Unknown"];

  
  return (
    <div className="max-w-4xl mx-auto w-full">
      <h2 className="font-heading text-3xl font-bold text-center mb-6 text-primary">Here's What We Found!</h2>
      <p className="text-center text-xl font-bold text-gray-500">Your plant seems to have</p>
      <div className=" bg-white rounded-lg shadow-md overflow-hidden w-full max-w-4xl p-6 mx-auto">
        <div className=" p-6 w-full max-w-4xl p-6 mx-auto">
          <img 
            src={diagnosis.image || "https://images.unsplash.com/photo-1611042553365-9b153c713293?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=800"} 
            alt={diagnosis.name || "Plant image"} 
            className="w-1/2 rounded-lg mx-auto " 
          />
          <h1 className="font-heading font-bold text-xl mt-7 mb-2 text-primary text-center ">{diseaseName}</h1>
          <p className="text-gray-600 mb-5 mt-5 text-center text-xl max-w-3xl  ">
          {diseaseName ? (
            <>
              Your <span className=" font-heading text-orange-400 font-bold">{plantName}</span> plant shows signs of {diseaseName.toLowerCase()}. See our recommendations for treatment.
            </>
          ) : (
            "We've analyzed your plant and provided some care recommendations."
          )}
          </p>
          <p className="text-gray-600 mb-4 text-center text-xl">
            {diagnosis.discreption || "No description available."}
          </p>
        </div>  
        <div className="w-full bg-neutral-light p-6 mx-auto">      
          {/* {suggestions.length > 0 ? (
            <ul className="space-y-4 flex flex-row ">
              {suggestions.map((tip, index) => (
                <div className="bg-gray-400 mr-9 w-full ">
                <li key={index}>
                  <span className="text-primary mt-0.5 mx-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  <p className="text-sm text-neutral-dark">{tip}</p>
                </li>
                </div>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <AlertCircle className="text-primary-dark mb-4 h-12 w-12" />
              <p className="text-neutral-dark">
                We couldn't identify specific issues with your plant. For more accurate diagnosis, 
                try uploading a clearer image or focusing on any problematic areas.
              </p>
            </div>
          )} */}

      

      {suggestions.length>0 ? (
        <section className="py-16 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-primary/5"></div>
        <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-secondary/5"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl font-bold text-primary mb-2">Care Tips</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-xl mx-auto">Based on the diagnosis, here are some tips to help your plant recover quickly and stay healthy </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-3">
        {suggestions.map((tip, index) => (
        <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
        <div className="w-12 h-12 mx-auto mb-4 text-primary bg-green-100 rounded-full flex items-center justify-center  " >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <p className=" text-gray-600 font-bold text-center">{tip}</p>
        </div>
        ))}

        </div>
      </div>
      </section>
      ):(
        <div className="flex flex-col items-center justify-center p-6 text-center">
              <AlertCircle className="text-primary-dark mb-4 h-12 w-12" />
              <p className="text-neutral-dark">
                We couldn't identify specific issues with your plant. For more accurate diagnosis, 
                try uploading a clearer image or focusing on any problematic areas.
              </p>
            </div>
      )}
     


          
          <div className="mt-8">
            <Link href="/care-tips">
              <Button className="bg-gradient-to-r from-[#EBB461] to-[#FA8966] hover:bg-gradient-to-r hover:from-[#FA8966] hover:to-[#EBB461] text-white font-medium py-2 px-6 rounded-full transition-transform hover:-translate-y-1">
                View Care Tips
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisResult;
