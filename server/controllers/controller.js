import bcrypt from 'bcrypt'
import { generateToken } from '../utils/jwt.js';
import { userModel } from '../model/userModel.js'
import { fileModel } from '../model/fileModel.js';

export async function registerUser(req, res) {
    try {
        const existingUser = await userModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username is already taken' });
        } else {
            const { username, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new userModel({
                username,
                password: hashedPassword,
            });
            await user.save();

            res.json({ message: 'User registered successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to register user' });
    }
}

export async function loginUser(req, res) {
    try {
        const { username, password } = req.body;

        const user = await userModel.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = generateToken(user._id);

        res.json({ token, message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to login' });
    }
}

export async function getUploadedFiles(req, res) {
    try {
        const { userId } = req.user;

        const user = await userModel.findById(userId);

        res.json({ uploadedFiles: user.uploadedFiles });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve uploaded files' });
    }
}

export const getFilesByUser = async (req, res) => {
    const { userId } = req.user;

    try {
        const files = await fileModel.find({ user: userId });

        res.status(200).json(files);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving files' });
    }
};

export async function removeFile(req, res) {
    try {
        const fileId = req.params.fileId;

        const file = await fileModel.findByIdAndDelete(fileId);

        res.json({ message: 'File removed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove file' });
    }
}

export const downloadFile = async (req, res) => {
    const { code } = req.params;

    try {
        const file = await fileModel.findOne({ code });
        console.log(file);

        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }
        res.status(200).json(file);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error downloading file' });
    }
};