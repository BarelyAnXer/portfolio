import React, { useState } from 'react';

const SingleSelectMediaDisplay = () => {
  const [blob, setBlob] = useState(null);
  const [file, setFile] = useState(null);

  const onMediaChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fileType = file.type;

      if (fileType.startsWith('image/') || fileType.startsWith('video/')) {
        setBlob(URL.createObjectURL(file));
        setFile(file);
      } else {
        console.error('Unsupported file type');
      }
    }
  };

  const displayMedia = () => {
    if (file.type.startsWith('image/')) {
      return <img src={blob} alt="preview" />;
    } else if (file.type.startsWith('video/')) {
      return (
        <>
          <p>why is this display</p>
          <video controls width="300" height="200">
            <source src={blob} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </>
      );
    }
  };

  return (
    <div>
      <input type="file" accept="image/*,video/*" onChange={onMediaChange} className="filetype" />
      {blob && displayMedia()}
    </div>
  );
};

export default SingleSelectMediaDisplay;
