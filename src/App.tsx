// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { createGlobalStyle } from 'styled-components';
// import HomePage from './HomePage';
// import LoginPage from './LoginPage';

// // Global styling
// const GlobalStyle = createGlobalStyle`
//   * {
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
//     font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
//   }

//   body {
//     background-color: #f5f7fa;
//     color: #2c3e50;
//     line-height: 1.5;
//   }
// `;

// const App: React.FC = () => {
//   return (
//     <Router>
//       <GlobalStyle />
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<LoginPage />} />
//         {/* Add more routes as needed */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import UserDashboard from "./UserDashboard";
import ApplicationStatusPage from "./ApplicationStatusPage";
import FormPage from "./Formpage"; // Your existing form page
import VerifierDashboard from "./VerifierDashboard";
import AdminDashboard from "./AdminDashboard";

// Global styling
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  }
  
  body {
    background-color: #f5f7fa;
    color: #2c3e50;
    line-height: 1.5;
  }
`;

// Protected route wrapper component
const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({
  element,
}) => {
  const isAuthenticated = !!localStorage.getItem("email");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{element}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<UserDashboard />} />}
        />
        <Route
          path="/check-status"
          element={<ProtectedRoute element={<ApplicationStatusPage />} />}
        />
        <Route
          path="/form"
          element={<ProtectedRoute element={<FormPage />} />}
        />
        <Route
          path="/verifier"
          element={<ProtectedRoute element={<VerifierDashboard />} />}
        />
        <Route
          path="/admin"
          element={<ProtectedRoute element={<AdminDashboard />} />}
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
