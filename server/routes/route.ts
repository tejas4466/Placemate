// route.ts
import express, { Request, Response } from 'express';
import { registerApplicant, registerCompany,listCompanies} from '../controllers/action';
import { upload } from '../middlewares/multer';

const router = express.Router();

// Route to register an applicant with both image and resume uploads
router.post('/register/applicant', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'resume', maxCount: 1 }
]), registerApplicant);

// Route to register a company with image upload
router.post('/register/company', upload.single('image'), registerCompany);
router.get('/companies',listCompanies);

export default router;
