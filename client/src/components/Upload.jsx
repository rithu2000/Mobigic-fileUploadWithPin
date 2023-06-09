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
      <div className='m-16'>
          <label class="block mb-2 text-lg font-medium text-gray-900 " for="file_input">Upload file</label>
        <form className='flex' onSubmit={handleUpload}>
          <input class="block w-96 text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" onChange={handleFileChange} />
          <button className='mt-2 ml-4 border border-solid w-28 h-10 rounded-lg bg-gray-700 text-white' type="submit">Upload</button>
        </form>
          <p class="mt-1 text-sm text-gray-500 " id="file_input_help">SVG, PNG, JPG or GIF.</p>
        <FileList files={files} setFiles={setFiles} />
      </div>
  );
};

export default Upload;