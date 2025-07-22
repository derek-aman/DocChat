import React from 'react';
import { LuUpload } from "react-icons/lu";

const FileUploadComponent = () => {
  const handleFileUploadButtonClick = async () => {
    const el = document.createElement('input');
    el.setAttribute('type', 'file');
    el.setAttribute('accept', 'application/pdf');

    el.addEventListener('change', async (ev) => {
      const file = el.files?.item(0);
      if (!file) return;

      const formData = new FormData();
      formData.append('pdf', file);

      try {
        const res = await fetch('http://localhost:8000/upload/pdf/', {
          method: 'POST',
          body: formData
        });
        if (!res.ok) throw new Error(`Upload failed: ${res.statusText}`);
        const data = await res.json();
        console.log('Upload successful:', data);
      } catch (err) {
        console.error('Upload error:', err);
      }
    });

    el.click();
  };

  return (
    
    <div className=" bg-slate-900  text-white  rounded-lg br-4 ">
      
       
        <button onClick={handleFileUploadButtonClick}>
     <LuUpload />
    </button>
          
        </div>
        
       
          
        
      
     
    
  );
};

export default FileUploadComponent;
