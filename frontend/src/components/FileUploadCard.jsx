import { useState, useRef } from 'react';
import { Upload, File, X, Check, AlertCircle } from 'lucide-react';

const FileUploadCard = ({
  onFilesChange,
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024, // 10MB
  acceptedTypes = ['.pdf', '.doc', '.docx', '.txt'],
  title = "Upload Files",
  description = "Drag and drop files here or click to browse"
}) => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleDragOver = e => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = e => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = e => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(Array.from(e.dataTransfer.files));
  };

  const handleFileSelect = e => {
    processFiles(Array.from(e.target.files));
  };

  const processFiles = newFiles => {
    setError('');
    if (files.length + newFiles.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`);
      return;
    }

    const validFiles = [];
    newFiles.forEach(file => {
      const ext = '.' + file.name.split('.').pop().toLowerCase();
      if (!acceptedTypes.includes(ext)) {
        setError(`File type ${ext} not supported`);
        return;
      }
      if (file.size > maxSize) {
        setError(`File ${file.name} is too large (max ${formatFileSize(maxSize)})`);
        return;
      }
      validFiles.push({
        id: Date.now() + Math.random(),
        file,
        name: file.name,
        size: file.size,
        status: 'ready'
      });
    });

    const updated = [...files, ...validFiles];
    setFiles(updated);
    onFilesChange?.(updated);
  };

  const removeFile = id => {
    const updated = files.filter(f => f.id !== id);
    setFiles(updated);
    onFilesChange?.(updated);
  };

  const formatFileSize = bytes => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024, sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = name => {
    const ext = name.split('.').pop().toLowerCase();
    return ext === 'pdf' ? '📄' :
           (ext === 'doc' || ext === 'docx') ? '📝' :
           '📃';
  };

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
        setLoading(true);
        const res = await fetch('http://localhost:8000/upload/pdf/', {
          method: 'POST',
          body: formData
        });
        if (!res.ok) throw new Error(`Upload failed: ${res.statusText}`);
        const data = await res.json();
        console.log('Upload successful:', data);
      } catch (err) {
        console.error('Upload error:', err);
      } finally {
      setLoading(false); // stop loading
    }
    });

    el.click();
  };

  return (
    <div id="upload" className='w-full min-h-screen '>
      <div className='mx-12  bg-gradient-to-r from-[#1c1c1b] t0-[#e99b63] rounded-4xl '>
       <h1 className='font-["Neue Montreal"] mt-45 p-20  text-center text-[3vw] leading-[4.6vw] tracking-tight '>
          Got a PDF? Let's talk! Upload your file to begin chatting with it.
        </h1>
    <div className="   max-w-lg mx-auto bg-card rounded-2xl shadow-card border-[#f1ac7b] border border-border  overflow-hidden">
      
      
      {/* Header */}
      <div className="p-6  border-border">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>

      {/* Drag & Drop Area */}
      <div onDragOver={handleDragOver} className="p-6">
        
        <div
          className={`
            relative border-2 border-dashed border-[#f1ac7b] rounded-lg p-8 text-center cursor-pointer
            transition-all duration-300 hover:border-primary/50
            ${isDragging ? 'border-primary bg-primary/5 shadow-glow' : 'border-muted-foreground/30'}
            ${error ? 'border-destructive/50' : ''}
          `}
          
        >
          
          <div className="flex flex-col items-center space-y-3">
            <div onClick={handleFileUploadButtonClick} className={`
              
              
            `}>
              <Upload  className={`w-6 h-6 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">
                {isDragging ? 'Drop files here' : 'Click to upload'}
              </p>
              <p className="text-xs text-muted-foreground">
                
              </p>
            </div>
          </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center space-x-2 mt-3 p-3 bg-destructive/10 text-destructive rounded-lg">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        

        

        {/* Action Buttons */}
        <div onClick={handleFileUploadButtonClick} className="mt-4 pt-4 mx-40  my-10 border-border justify-center items-center cursor-pointer ">
           <div className='relative w-[95%] sm:w-48 h-10 bg-gradient-to-r from-[#f1ac7b] t0-[#e99b63] shadow-[0_0_15px_rgba(255,255,255,0.4)] rounded-full'>
                {loading ? (
      <span className="text-white">Uploading...</span> // can replace with spinner icon
    ) : (
      <div className='absolute inset-[3px] bg-black rounded-full flex items-center justify-center gap-1'>
        Upload PDF
      </div>
    )}
            </div>
         
        </div>
      </div>
    </div>
    </div>
  );
};

export default FileUploadCard;
