// route.ts
import express, { Request, Response } from 'express';
import { registerApplicant } from '../controllers/action';
import { upload } from '../middlewares/multer';

const router = express.Router();

// Configure route to register an applicant with both image and resume uploads
router.post('/register/applicant', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'resume', maxCount: 1 }
]), registerApplicant);


export default router;
