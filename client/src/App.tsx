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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
