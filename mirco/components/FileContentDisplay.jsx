import React from 'react';
import { useSelector } from 'react-redux';

const FileContentDisplay = () => {
  const selectedFile = useSelector((state) => state.fileSelect.selectedFile);
  const fileContent = useSelector((state) => state.fileSelect.fileContent);

  return (
    <div>
      {selectedFile && (
        <div>
          <h2>Selected File: {selectedFile}</h2>
          <pre>{fileContent}</pre>
        </div>
      )}
      {!selectedFile && <p>No file selected</p>}
    </div>
  );
};

export default FileContentDisplay;
