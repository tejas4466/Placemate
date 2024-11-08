import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound'; 
import Feedback from './pages/Feedback';
import ApplicantRegistration from './pages/ApplicantRegistration';
import CompanyRegistration from './pages/CompanyRegistration';
import Companies from './pages/Companies';
import Jobs from './pages/Jobs';
import PrivateRoute from './components/PrivateRoute';
import Account from './pages/Account';
import JobRegistration from './pages/JobRegistration';
import CompanyReport from './pages/CompanyReport';
import JobReport from './pages/JobReport';
import JobApplicationsReport from './pages/JobApplicationsReport';
import JobDetails from './pages/JobDetails';
import ApplicantAppliedJobs from './pages/ApplicantAppliedJobs';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/feedback" element={<Feedback/>} />
          <Route path="/register/applicant" element={<ApplicantRegistration/>} />
          <Route path="/register/company" element={<CompanyRegistration/>} />
          <Route path="/companies" element={<Companies/>} />
          <Route path="/jobs" element={<Jobs/>} />
          <Route path="/register/job" element={<PrivateRoute><JobRegistration/></PrivateRoute>} />
          <Route path="/company-report" element={<PrivateRoute><CompanyReport/></PrivateRoute>} />
          <Route path="/job-application-report" element={<PrivateRoute><JobApplicationsReport/></PrivateRoute>} />
          <Route path="/job-report" element={<PrivateRoute><JobReport/></PrivateRoute>} />
          <Route path="/account" element={<PrivateRoute><Account/></PrivateRoute>}/>   
          <Route path="/applied-jobs" element={<PrivateRoute><ApplicantAppliedJobs/></PrivateRoute>} />
          {/* <Route path="/feedback-report" element={<PrivateRoute><FeedbackReport/></PrivateRoute>} /> */}
          <Route path="/jobdetails/:id" element={<JobDetails/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
