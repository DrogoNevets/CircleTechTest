import express from 'express';
import multer from 'multer';
import get from './get';
import post from './post';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/:convertedFile', get);
router.post('/', upload.single('toTransfer'), post);

export default router;