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
        <div>
            <input type="number" placeholder="File Code" value={filecode} onChange={(e) => setFilecode(e.target.value)} />
            <button onClick={() => handleDownload(filecode)}>Download</button>
        </div>
    );
};

export default FileItem;