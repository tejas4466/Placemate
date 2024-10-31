// import express, { Request, Response, NextFunction } from 'express';

// const router = express.Router();

// // Middleware for role-based access control
// // function authMiddleware(role: string) {
// //   return (req: Request, res: Response, next: NextFunction) => {
// //     const user = req.session?.user; // Assuming user info is stored in session

// //     if (!user) {
// //       return res.status(401).json({ message: 'Unauthorized' });
// //     }

// //     if (role && user.role !== role) {
// //       return res.status(403).json({ message: 'Forbidden: Access denied' });
// //     }

// //     next();
// //   };
// // }


// // All Companies - Accessible to everyone
// router.get('/companies', (req: Request, res: Response) => {
//   // Fetch and return companies from the database
//   res.send('All Companies');
// });

// // All Jobs - Accessible to everyone
// router.get('/jobs', (req: Request, res: Response) => {
//   // Fetch and return jobs from the database
//   res.send('All Jobs');
// });

// // Login Routes - Separate login routes for different roles
// router.post('/login/applicant', (req: Request, res: Response) => {
//   // Applicant login logic
//   res.send('Applicant Login');
// });

// router.post('/login/company', (req: Request, res: Response) => {
//   // Company login logic
//   res.send('Company Login');
// });

// router.post('/login/admin', (req: Request, res: Response) => {
//   // Admin login logic
//   res.send('Admin Login');
// });

// // Registration Routes - Separate registration routes for applicant and company
// router.post('/register/applicant', (req: Request, res: Response) => {
//   // Applicant registration logic
//   res.send('Applicant Registration');
// });

// router.post('/register/company', (req: Request, res: Response) => {
//   // Company registration logic
//   res.send('Company Registration');
// });

// // Routes for adding companies and jobs - Only accessible to admin and company roles
// router.post('/add-company', authMiddleware('admin'), (req: Request, res: Response) => {
//   // Logic to add a company
//   res.send('Add Company');
// });

// router.post('/add-job', authMiddleware('company'), (req: Request, res: Response) => {
//   // Logic to add a job
//   res.send('Add Job');
// });

// // Admin Reports - Only accessible to admin
// router.get('/admin/company-report', authMiddleware('admin'), (req: Request, res: Response) => {
//   // Logic to display company report
//   res.send('Company Report');
// });

// router.get('/admin/applicant-report', authMiddleware('admin'), (req: Request, res: Response) => {
//   // Logic to display applicant report
//   res.send('Applicant Report');
// });

// router.get('/admin/feedback-report', authMiddleware('admin'), (req: Request, res: Response) => {
//   // Logic to display feedback report
//   res.send('Feedback Report');
// });

// router.get('/applicant/:id/details', authMiddleware('admin'), (req: Request, res: Response) => {
//   // Logic to view details of a specific applicant
//   res.send('Applicant Details');
// });

// // Company Job Report - Only accessible to company
// router.get('/company/job-report', authMiddleware('company'), (req: Request, res: Response) => {
//   // Logic to view company's job report
//   res.send('Job Report');
// });

// // Applicant Applied Jobs - Only accessible to applicant
// router.get('/applicant/applied-jobs', authMiddleware('applicant'), (req: Request, res: Response) => {
//   // Logic to display applied jobs for the applicant
//   res.send('Applied Jobs');
// });

// export default router;
