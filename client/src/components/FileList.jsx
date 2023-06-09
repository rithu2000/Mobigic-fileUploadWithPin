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
    <div className='mt-10'>
      <label class="block mb-2 text-lg font-medium text-gray-900 " for="file_input">File List</label>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                File Name
              </th>
              <th scope="col" class="px-6 py-3">
                File Code
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {files.length > 0 && files.map((file) => (
              <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {file.originalname}
                </th>
                <td class="px-6 py-4">
                  {file.code}
                </td>
                <td class="px-6 py-4">
                  <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => handleDelete(file._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileList;