# LoanSystem Frontend

A React+TypeScript frontend for the LoanSystem application with role-based dashboards.

## Overview

The LoanSystem frontend provides three separate role-based dashboards:

1. **User Dashboard**: Submit loan applications and track application status
2. **Verifier Dashboard**: Review and verify/reject applications 
3. **Admin Dashboard**: Make final approval/rejection decisions

## Tech Stack

- React.js with TypeScript
- React Router for navigation
- Axios for API requests
- Context API/Redux for state management
- CSS/styled-components for styling

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/loan-system-frontend.git
   cd loan-system-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   
   Create a `.env` file:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start development server**
   ```bash
   npm start
   ```
   
   The app will open at `http://localhost:3000`

## Features

### User Dashboard
- User registration and login
- Loan application submission
- Real-time status tracking

### Verifier Dashboard
- Application review interface
- Verification workflow
- Notes and feedback system

### Admin Dashboard
- Final approval/rejection
- User and verifier management
- System metrics

## Main Dependencies

- React: ^18.2.0
- React Router DOM: ^6.8.0
- TypeScript: ^4.9.5
- Axios: ^1.3.0
- Formik: ^2.2.9
- Yup: ^1.0.0
- Styled-components: ^5.3.6

## License

MIT License
