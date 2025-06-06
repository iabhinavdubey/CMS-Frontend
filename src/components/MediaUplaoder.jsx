import React, { useState } from 'react';

const MediaUploader = () => {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Handle file input change
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    processFiles(files);
  };

  // Handle drag events
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
    processFiles(files);
  };

  // Process new files
  const processFiles = (files) => {
    const newMedia = files.map(file => ({
      file,
      url: URL.createObjectURL(file),
      type: file.type.startsWith('image') ? 'image' : 'video',
    }));

    setMediaFiles(prev => [...prev, ...newMedia]);
  };

  // Remove file from list
  const removeMedia = (index) => {
    const updated = [...mediaFiles];
    updated.splice(index, 1);
    setMediaFiles(updated);
  };

  // Simulate upload to backend
  const uploadToBackend = () => {
    if (mediaFiles.length === 0) return;

    setUploading(true);

    // Simulated upload delay
    setTimeout(() => {
      console.log("Uploading files...", mediaFiles);
      alert("Files uploaded successfully (simulated)");
      setUploading(false);
    }, 2000);
  };

  return (
    <div className="p-6">
      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-colors ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
      >
        <p className="text-gray-600">Drag & drop media here or</p>
        <label
          htmlFor="media-upload"
          className="cursor-pointer text-blue-500 underline mt-2 inline-block"
        >
          Select Files
        </label>
        <input
          id="media-upload"
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Upload Button */}
      <div className="mb-6">
        <button
          onClick={uploadToBackend}
          disabled={uploading || mediaFiles.length === 0}
          className={`bg-green-500 text-white px-4 py-2 rounded-md ${
            uploading || mediaFiles.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {uploading ? 'Uploading...' : 'Upload to Server'}
        </button>
      </div>

      {/* Media Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mediaFiles.map((media, index) => (
          <div
            key={index}
            className="bg-white border rounded-lg overflow-hidden shadow-md relative"
          >
            {media.type === 'image' ? (
              <img
                src={media.url}
                alt="Uploaded media"
                className="w-full h-48 object-cover"
              />
            ) : (
              <video
                controls
                className="w-full h-48 object-cover"
                src={media.url}
              />
            )}
            <div className="p-4">
              <p className="text-sm text-gray-600 truncate">{media.file.name}</p>
            </div>
            <button
              onClick={() => removeMedia(index)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaUploader;