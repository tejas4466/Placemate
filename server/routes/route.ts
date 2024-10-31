// route.ts
import express, { Request, Response } from 'express';
import { registerApplicant } from '../controllers/action';
// import { upload } from '../middlewares/multer';

const router = express.Router();

// Route to register an applicant
router.post('/register/applicant',registerApplicant);

export default router;
