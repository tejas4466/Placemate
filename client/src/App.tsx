import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import About from './pages/About';
// import Companies from './Companies';
// import Jobs from './Jobs';
// import Feedback from './Feedback';
// import ApplicantLogin from './ApplicantLogin';
// import CompanyLogin from './CompanyLogin';
// import AdminLogin from './AdminLogin';
// import ApplicantRegistration from './ApplicantRegistration';
// import CompanyRegistration from './CompanyRegistration';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
