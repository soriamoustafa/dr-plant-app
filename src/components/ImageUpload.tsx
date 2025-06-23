import { useRef } from "react";
import { Upload, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  image: File | null;
  preview: string | null;
  onImageChange: (file: File | null) => void;
}

const ImageUpload = ({ image, preview, onImageChange }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageChange(e.target.files[0]);
    }
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageChange(e.dataTransfer.files[0]);
    }
  };
  
  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };
  
  const handleTakePhoto = () => {
    alert("Camera functionality would open your device camera");
  };

  return (
    <div 
      className="flex flex-col items-center justify-center border-2 border-dashed border-neutral-200 rounded-lg p-8 mb-6"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />
      
      {preview ? (
        <div className="mb-4 w-full max-w-xs">
          <img 
            src={preview} 
            alt="Plant preview" 
            className="w-full h-auto rounded-lg shadow-md" 
          />
        </div>
      ) : (
        <div className="w-24 h-24 mb-4">
          <Upload className="w-full h-full text-neutral-300" />
        </div>
      )}
      
      <p className="text-neutral-dark mb-4">
        {image ? image.name : "Drag and drop your plant image here"}
      </p>
      
      <div className="flex space-x-4">
        <Button 
          variant="outline"
          onClick={handleChooseFile}
        >
          Choose File
        </Button>
        <Button 
          className="bg-primary text-white"
          onClick={handleTakePhoto}
        >
          <Camera className="mr-2 h-4 w-4" />
          Take Photo
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
