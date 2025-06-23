import { useState, useEffect } from "react";
import axios from "axios";
import ImageUpload from "@/components/ImageUpload";
import DiagnosisResult from "@/components/DiagnosisResult";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

type PlantDiagnosis = {
  name: string | null;
  discreption: string;
  careTips: string;
  image: string;
};



const Diagnosis = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [diagnosisResult, setDiagnosisResult] = useState<PlantDiagnosis | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const API_URL = "https://localhost:7019/api/PlantDiseases/predict";
  const token = localStorage.getItem("token");
  const isLoggedIn = Boolean(token);


  
  const handleImageChange = (file: File | null) => {
    setImage(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };
  
  const handleSubmit = async () => {
    if (!image) {
      toast({
        title: "Image required",
        description: "Please upload an image of your plant for diagnosis.",
        variant: "destructive",
      });
      return;
    }

    if (!isLoggedIn) {
      toast({
        title: "Unauthorized",
        description: "You need to login before analyzing the plant.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }
    
    const formData = new FormData();
    formData.append("file", image);
    formData.append("plantName", "Unknown plant"); 

    try {
      setLoading(true);
      const response = await axios.post<PlantDiagnosis>(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setDiagnosisResult(response.data);

      toast({
        title: "Plant diagnosis complete",
        description: "We've analyzed your plant and provided recommendations.",
      });
    } catch (error: any) {
      toast({
        title: "Diagnosis failed",
        description: error?.response?.data?.message || error.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleReset = () => {
    setImage(null);
    setPreview(null);
    setDiagnosisResult(null);
  };

  return (
    <div className="relative overflow-hidden">
        <section className="py-16 bg-neutral-light">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl font-bold text-center mb-6 text-primary">Diagnose Your Plant's Health</h1>
          <p className="text-center mb-12 max-w-2xl mx-auto text-gray-600">
            Upload a photo of your plant and our AI-powered system will identify issues and provide care recommendations.
          </p>
          {!diagnosisResult ? (
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
              <ImageUpload image={image} preview={preview} onImageChange={handleImageChange}/>
              <div className="flex justify-center mt-6">
                <Button
                  className="bg-gradient-to-r from-[#EBB461] to-[#FA8966] hover:bg-gradient-to-r hover:from-[#FA8966] hover:to-[#EBB461] text-white font-medium py-2 px-6 rounded-full transition-transform hover:-translate-y-1"
                  disabled={!image || loading}
                  onClick={handleSubmit}>
                  {loading ? "Analyzing..." : "Analyze Plant"}
                </Button>
              </div>
            </div>
          ) : (
            <>
              <DiagnosisResult diagnosis={diagnosisResult} />
              <div className="flex justify-center mt-6">
                <Button
                  className="bg-gradient-to-r from-[#EBB461] to-[#FA8966] hover:bg-gradient-to-r hover:from-[#FA8966] hover:to-[#EBB461] text-white font-medium py-2 px-6 rounded-full transition-transform hover:-translate-y-1"
                  onClick={handleReset}
                >
                  Diagnose Another Plant
                </Button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Diagnosis;
