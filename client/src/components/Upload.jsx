import { useEffect, useState } from 'react';
import { getUploadedFiles, uploadFile } from '../axios/axios';
import { toast } from 'react-hot-toast';
import FileList from './FileList';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await uploadFile(formData);
      console.log(response.newFile, "9876545");
      setFiles((prevFiles) => [
        ...prevFiles,
        response.newFile,
      ]);

      const { code } = response.newFile;
      toast.success(`File uploaded with code: ${code}`)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await getUploadedFiles()
        setFiles(response);
      } catch (error) {
        console.error(error);

      }
    };
    fetchFiles();
  }, []);

  return (
    <div>
      <h2>Upload File</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      <FileList files={files} setFiles={setFiles} />
    </div>
  );
};

export default Upload;