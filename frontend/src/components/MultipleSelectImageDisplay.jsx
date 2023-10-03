import React, { useState } from 'react';

const MultiSelectMediaDisplay = () => {
  const [blobs, setBlobs] = useState([]);
  const [files, setFiles] = useState([]);

  const onMediaChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFiles = Array.from(event.target.files);

      const validFiles = selectedFiles.filter((file) => {
        const fileType = file.type;
        return fileType.startsWith('image/') || fileType.startsWith('video/');
      });

      const newBlobs = validFiles.map((file) => URL.createObjectURL(file));

      setBlobs((prevBlobs) => [...prevBlobs, ...newBlobs]);
      setFiles((prevFiles) => [...prevFiles, ...validFiles]);
    }
  };

  const displayMedia = () => {
    return blobs.map((blob, index) => {
      const file = files[index];
      if (file.type.startsWith('image/')) {
        return <img key={index} src={blob} alt={`preview ${index}`} />;
      } else if (file.type.startsWith('video/')) {
        return (
          <div key={index}>
            <p>why is this display</p>
            <video controls width="300" height="200">
              <source src={blob} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      }
      return null;
    });
  };

  return (
    <div>
      <input type="file" accept="image/*,video/*" onChange={onMediaChange} className="filetype" multiple />
      {blobs.length > 0 && displayMedia()}
    </div>
  );
};

export default MultiSelectMediaDisplay;
