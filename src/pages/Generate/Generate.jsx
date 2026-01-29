import React, { useState } from 'react';
import { Upload, FileText, X } from 'lucide-react';

export default function Generate() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([
    { id: 1, name: 'Book one.pdf', size: '10 MB', progress: 78 },
    { id: 2, name: 'Book one.pdf', size: '10 MB', progress: 78 }
  ]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const newFiles = files.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      size: formatFileSize(file.size),
      progress: Math.floor(Math.random() * 100)
    }));
    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i)) + ' ' + sizes[i];
  };

  const removeFile = (id) => {
    setUploadedFiles(uploadedFiles.filter(file => file.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Upload Your Learning Material
        </h1>
        <p className="text-gray-600 text-sm">
          Upload books, PDFs or documents and we'll convert them into a full interactive course.
        </p>
      </div>

      {/* Drag and Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-12 mb-8 text-center transition-all ${
          isDragging
            ? 'border-purple-500 bg-purple-50'
            : 'border-purple-300 bg-white'
        }`}
      >
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <Upload className="w-8 h-8 text-purple-600" />
          </div>
          
          <p className="text-gray-700 mb-1">
            Drag & drop your files here
          </p>
          <p className="text-gray-500 text-sm mb-2">
            or click to{' '}
            <label className="text-purple-600 cursor-pointer hover:underline">
              browse
              <input
                type="file"
                multiple
                onChange={handleFileInput}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
              />
            </label>
          </p>
          <p className="text-gray-400 text-xs mt-2">
            Supported formats (files below
          </p>
          <p className="text-gray-400 text-xs">
            size .DOCX, TXT)
          </p>
        </div>
      </div>

      {/* Uploaded Material Section */}
      {uploadedFiles.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Uploaded Material
          </h2>
          
          <div className="space-y-3 mb-6">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                      <FileText className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-sm">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">{file.size}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(file.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={18} />
                  </button>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
                      style={{ width: `${file.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700 min-w-[3rem] text-right">
                    {file.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Generate Course Button */}
          <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity">
            Generate Course
          </button>
        </div>
      )}
    </div>
  );
}