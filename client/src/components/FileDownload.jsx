import { useState } from 'react';
import { downloadFile } from '../axios/axios';

const FileDownload = () => {
    const [code, setCode] = useState('');
    const [downloadUrl, setDownloadUrl] = useState('');
    const [error, setError] = useState('');

    const handleDownload = async () => {
        try {
            const response = await downloadFile(code)
            setDownloadUrl(response.downloadUrl);
            setError('');
        } catch (error) {
            console.error(error);
            setError('File not found');
            setDownloadUrl('');
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter 6-digit code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
            <button onClick={handleDownload}>Download File</button>
            {error && <p>{error}</p>}
            {downloadUrl && (
                <a href={downloadUrl} download>
                    Click here to download
                </a>
            )}
        </div>
    );
};

export default FileDownload;
