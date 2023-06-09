import { Router } from "express";
import { upload } from "../middleware/multer.js";
import { uploadFile } from "../controllers/uploadController.js";
import { authenticateUser } from '../middleware/authenticateUser.js'
import { registerUser, loginUser, removeFile, downloadFile, getFilesByUser } from '../controllers/controller.js'

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/upload', authenticateUser, upload.single('file'), uploadFile);
router.get('/files', authenticateUser, getFilesByUser);
router.delete('/files/:fileId', authenticateUser, removeFile);
router.get('/download/:code', authenticateUser, downloadFile);

export default router;