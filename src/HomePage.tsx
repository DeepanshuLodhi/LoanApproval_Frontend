// import React from "react";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";

// // Styled Components
// const PageContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   min-height: 100vh;
//   background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
// `;

// const Header = styled.header`
//   background-color: #ffffff;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   padding: 1.5rem 2rem;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const Logo = styled.div`
//   font-size: 1.8rem;
//   font-weight: 700;
//   color: #2c3e50;
//   display: flex;
//   align-items: center;

//   span {
//     color: #3498db;
//   }
// `;

// const MainContent = styled.main`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   padding: 2rem;
// `;

// const WelcomeSection = styled.div`
//   text-align: center;
//   max-width: 800px;
//   margin-bottom: 3rem;
// `;

// const Title = styled.h1`
//   font-size: 2.5rem;
//   color: #2c3e50;
//   margin-bottom: 1rem;
// `;

// const Subtitle = styled.p`
//   font-size: 1.2rem;
//   color: #7f8c8d;
//   line-height: 1.6;
// `;

// const CardsContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   gap: 2rem;
//   width: 100%;
//   max-width: 1200px;
// `;

// const Card = styled.div`
//   background-color: #ffffff;
//   border-radius: 12px;
//   box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
//   padding: 2rem;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 300px;
//   transition: transform 0.3s ease, box-shadow 0.3s ease;

//   &:hover {
//     transform: translateY(-10px);
//     box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
//   }
// `;

// const CardIcon = styled.div`
//   width: 80px;
//   height: 80px;
//   background-color: #f0f7ff;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-bottom: 1.5rem;
//   font-size: 2rem;
//   color: #3498db;
// `;

// const CardTitle = styled.h2`
//   font-size: 1.5rem;
//   color: #2c3e50;
//   margin-bottom: 1rem;
//   text-align: center;
// `;

// const CardDescription = styled.p`
//   font-size: 1rem;
//   color: #7f8c8d;
//   text-align: center;
//   margin-bottom: 1.5rem;
//   line-height: 1.5;
// `;

// const Button = styled.button<{ primary?: boolean }>`
//   padding: 0.8rem 1.8rem;
//   font-size: 1rem;
//   font-weight: 600;
//   border-radius: 30px;
//   cursor: pointer;
//   transition: all 0.3s ease;
//   border: none;

//   background-color: ${(props) => (props.primary ? "#3498db" : "#f0f7ff")};
//   color: ${(props) => (props.primary ? "#ffffff" : "#3498db")};

//   &:hover {
//     background-color: ${(props) => (props.primary ? "#2980b9" : "#e1f0ff")};
//     transform: translateY(-2px);
//   }

//   &:active {
//     transform: translateY(0px);
//   }
// `;

// const Footer = styled.footer`
//   background-color: #2c3e50;
//   color: #ecf0f1;
//   padding: 2rem;
//   text-align: center;
// `;

// const FooterContent = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
// `;

// const FooterLinks = styled.div`
//   display: flex;
//   justify-content: center;
//   gap: 2rem;
// `;

// const FooterLink = styled.a`
//   color: #ecf0f1;
//   text-decoration: none;
//   transition: color 0.3s ease;

//   &:hover {
//     color: #3498db;
//   }
// `;

// const Copyright = styled.p`
//   margin-top: 1rem;
//   color: #bdc3c7;
// `;

// const HomePage: React.FC = () => {
//   const navigate = useNavigate();

//   const handleRoleSelect = (role: string) => {
//     // Navigate to login page with role as a query parameter
//     navigate(`/login?role=${role}`);
//   };

//   return (
//     <PageContainer>
//       <Header>
//         <Logo>
//           Loan<span>System</span>
//         </Logo>
//         <Button>Contact Support</Button>
//       </Header>

//       <MainContent>
//         <WelcomeSection>
//           <Title>Welcome to the Loan Management System</Title>
//           <Subtitle>
//             Our platform provides a seamless experience for loan applications,
//             verification, and administration. Select your role below to access
//             the system.
//           </Subtitle>
//         </WelcomeSection>

//         <CardsContainer>
//           <Card>
//             <CardIcon>👤</CardIcon>
//             <CardTitle>User Access</CardTitle>
//             <CardDescription>
//               Apply for loans, track your applications, and manage your account.
//               Perfect for individual borrowers.
//             </CardDescription>
//             <Button primary onClick={() => handleRoleSelect("user")}>
//               Login as User
//             </Button>
//           </Card>

//           <Card>
//             <CardIcon>✓</CardIcon>
//             <CardTitle>Verifier Access</CardTitle>
//             <CardDescription>
//               Review and process loan applications, verify documents, and manage
//               applicant information.
//             </CardDescription>
//             <Button primary onClick={() => handleRoleSelect("verifier")}>
//               Login as Verifier
//             </Button>
//           </Card>

//           <Card>
//             <CardIcon>⚙️</CardIcon>
//             <CardTitle>Admin Access</CardTitle>
//             <CardDescription>
//               Manage system settings, user accounts, verification teams, and
//               view comprehensive reports.
//             </CardDescription>
//             <Button primary onClick={() => handleRoleSelect("admin")}>
//               Login as Admin
//             </Button>
//           </Card>
//         </CardsContainer>
//       </MainContent>

//       <Footer>
//         <FooterContent>
//           <FooterLinks>
//             <FooterLink href="#">About Us</FooterLink>
//             <FooterLink href="#">Privacy Policy</FooterLink>
//             <FooterLink href="#">Terms of Service</FooterLink>
//             <FooterLink href="#">FAQ</FooterLink>
//             <FooterLink href="#">Contact</FooterLink>
//           </FooterLinks>
//           <Copyright>
//             &copy; {new Date().getFullYear()} Loan System. All rights reserved.
//           </Copyright>
//         </FooterContent>
//       </Footer>
//     </PageContainer>
//   );
// };

// export default HomePage;

import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  overflow-x: hidden;
`;

const Header = styled.header`
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1.5rem 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  display: flex;
  align-items: center;

  span {
    color: #3498db;
    margin-left: 4px;
  }
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  width: 100%;
`;

const WelcomeSection = styled.div`
  text-align: center;
  max-width: 800px;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1);
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  color: #34495e;
  line-height: 1.7;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2.5rem;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 320px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const CardIcon = styled.div`
  width: 90px;
  height: 90px;
  background-color: #f0f7ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.8rem;
  font-size: 2.5rem;
  color: #3498db;
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.2);
`;

const CardTitle = styled.h2`
  font-size: 1.6rem;
  color: #2c3e50;
  margin-bottom: 1.2rem;
  text-align: center;
`;

const CardDescription = styled.p`
  font-size: 1.1rem;
  color: #7f8c8d;
  text-align: center;
  margin-bottom: 2rem;
  line-height: 1.6;
  flex-grow: 1;
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  box-shadow: ${(props) => (props.primary ? "0 4px 15px rgba(52, 152, 219, 0.3)" : "none")};

  background-color: ${(props) => (props.primary ? "#3498db" : "#f0f7ff")};
  color: ${(props) => (props.primary ? "#ffffff" : "#3498db")};

  &:hover {
    background-color: ${(props) => (props.primary ? "#2980b9" : "#e1f0ff")};
    transform: translateY(-3px);
    box-shadow: ${(props) => (props.primary ? "0 6px 20px rgba(52, 152, 219, 0.4)" : "0 4px 10px rgba(52, 152, 219, 0.1)")};
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const Footer = styled.footer`
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 2.5rem;
  text-align: center;
  width: 100%;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  flex-wrap: wrap;
`;

const FooterLink = styled.a`
  color: #ecf0f1;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 1.05rem;

  &:hover {
    color: #3498db;
  }
`;

const Copyright = styled.p`
  margin-top: 1.5rem;
  color: #bdc3c7;
  font-size: 1rem;
`;

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: string) => {
    // Navigate to login page with role as a query parameter
    navigate(`/login?role=${role}`);
  };

  return (
    <PageContainer>
      <Header>
        <Logo>
          Loan<span>System</span>
        </Logo>
        <Button>Contact Support</Button>
      </Header>

      <MainContent>
        <WelcomeSection>
          <Title>Welcome to the Loan Management System</Title>
          <Subtitle>
            Our platform provides a seamless experience for loan applications,
            verification, and administration. Select your role below to access
            the system.
          </Subtitle>
        </WelcomeSection>

        <CardsContainer>
          <Card>
            <CardIcon>👤</CardIcon>
            <CardTitle>User Access</CardTitle>
            <CardDescription>
              Apply for loans, track your applications, and manage your account.
              Perfect for individual borrowers.
            </CardDescription>
            <Button primary onClick={() => handleRoleSelect("user")}>
              Login as User
            </Button>
          </Card>

          <Card>
            <CardIcon>✓</CardIcon>
            <CardTitle>Verifier Access</CardTitle>
            <CardDescription>
              Review and process loan applications, verify documents, and manage
              applicant information.
            </CardDescription>
            <Button primary onClick={() => handleRoleSelect("verifier")}>
              Login as Verifier
            </Button>
          </Card>

          <Card>
            <CardIcon>⚙️</CardIcon>
            <CardTitle>Admin Access</CardTitle>
            <CardDescription>
              Manage system settings, user accounts, verification teams, and
              view comprehensive reports.
            </CardDescription>
            <Button primary onClick={() => handleRoleSelect("admin")}>
              Login as Admin
            </Button>
          </Card>
        </CardsContainer>
      </MainContent>

      <Footer>
        <FooterContent>
          <FooterLinks>
            <FooterLink href="#">About Us</FooterLink>
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Terms of Service</FooterLink>
            <FooterLink href="#">FAQ</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
          </FooterLinks>
          <Copyright>
            &copy; {new Date().getFullYear()} Loan System. All rights reserved.
          </Copyright>
        </FooterContent>
      </Footer>
    </PageContainer>
  );
};

export default HomePage;