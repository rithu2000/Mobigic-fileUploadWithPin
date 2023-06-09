import { fileModel } from '../model/fileModel.js';
import { generateUniqueCode } from '../utils/generateCode.js';

export const uploadFile = async (req, res) => {
    const { userId } = req.user;
    const { originalname, path } = req.file;

    try {
        const code = generateUniqueCode();

        const newFile = await new fileModel({
            originalname,
            code,
            path,
            user: userId,
        }).save();

        res.status(200).json({ message: 'File uploaded successfully', newFile });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error uploading file' });
    }
};