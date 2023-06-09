import { useState } from "react";
import { downloadFile } from "../axios/axios";

const FileItem = () => {
    const [filecode, setFilecode] = useState()
    console.log(filecode);

    const handleDownload = async (filecode) => {
        try {
            const response = await downloadFile(filecode)
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', response.originalname);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="m-16">
            <label class="block mb-2 text-lg font-medium text-gray-900 " for="file_input">File Download</label>
            <div class="mb-6 flex">
                <input type="number" placeholder="Enter 6 digit code" value={filecode} onChange={(e) => setFilecode(e.target.value)} class="w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                <button className='ml-5 border border-solid w-28 h-10 rounded-lg bg-gray-700 text-white' onClick={() => handleDownload(filecode)}>Download</button>
            </div>
        </div>
    );
};

export default FileItem;