// route.ts
import express from 'express';
import {
   registerApplicant,
    registerCompany,
    listCompanies,
    loginApplicant,
    loginCompany,
    loginAdmin,
    registerJob,
    listJobs,
  } from '../controllers/action';
import { upload } from '../middlewares/multer';

const router = express.Router();

// Route to register an applicant with both image and resume uploads
router.post('/register/applicant', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'resume', maxCount: 1 }
]), registerApplicant);

router.post('/register/company', upload.single('image'), registerCompany);
router.get('/companies',listCompanies);
router.post('/login/applicant',loginApplicant); 
router.post('/login/company',loginCompany); 
router.post('/login/admin',loginAdmin); 
router.post('/register/job',registerJob); 
router.get('/jobs',listJobs);


export default router;
