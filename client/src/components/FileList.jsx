import { toast } from 'react-hot-toast';
import { removeFile } from '../axios/axios';

const FileList = ({ files, setFiles }) => {

  const handleDelete = async (fileId) => {
    try {
      const response = await removeFile(fileId)
      toast.success(response.message)
      setFiles((prevFiles) => prevFiles.filter((file) => file._id !== fileId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>File List</h2>
      <ul>
        {files.length > 0 && files.map((file) => (
          <li key={file.code}>
            {file.originalname} - {file.code} - <button onClick={() => handleDelete(file._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;