import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useDispatch, useSelector } from 'react-redux';
import { selectFile, loadFileContent } from '../src/features/fileSelect/fileSelectSlice';
import axios from 'axios';

const FileSelectDropdown = () => {
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState([]);
  const selectedFile = useSelector((state) => state.fileSelect.selectedFile);

  useEffect(() => {
    // Fetch the list of files from the Flask server API
    axios.get('http://127.0.0.1:3001/api/files')
      .then((response) => {
        setFileList(response.data.map((fileName) => ({ name: fileName })));
      })
      .catch((error) => console.error('Error fetching files:', error));
  }, []); // Run once when the component mounts
  
  console.log(fileList)

  const handleFileChange = (selectedFile) => {
    console.log('Selected File:', selectedFile);
    // Fetch the content of the selected file from the Flask server
    axios.get(`http://127.0.0.1:3001/api/files/${selectedFile.name}`, { responseType: 'text' })
      .then((response) => {
        console.log('File Content:', response.data);
        dispatch(selectFile(selectedFile.name));
        dispatch(loadFileContent(response.data));
      })
      .catch((error) => console.error('Error fetching file content:', error));
  };

  console.log('Render FileSelectDropdown');


  return (
    <Select value={selectedFile} onValueChange={(value) => handleFileChange({ name: value })}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a file">
          {/* Customize the displayed value based on the selected file */}
          {selectedFile ? selectedFile.name : 'Select a file'}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Files</SelectLabel>
          {fileList.map((file) => (
            <SelectItem key={file.name} value={file.name}>
              {file.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default FileSelectDropdown;