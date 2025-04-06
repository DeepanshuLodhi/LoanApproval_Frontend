import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f7fa;
`;

const Header = styled.header`
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  
  span {
    color: #3498db;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #3498db;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
`;

const UserEmail = styled.div`
  font-size: 0.9rem;
  color: #7f8c8d;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const WelcomeBar = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const WelcomeTitle = styled.h1`
  margin: 0;
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
`;

const WelcomeSubtitle = styled.p`
  margin: 0;
  color: #7f8c8d;
  font-size: 1rem;
`;

const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const OptionCard = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const OptionHeader = styled.div<{ bgColor: string }>`
  background-color: ${props => props.bgColor};
  padding: 2rem;
  color: white;
  text-align: center;
`;

const OptionIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const OptionTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
`;

const OptionContent = styled.div`
  padding: 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
`;

const OptionDescription = styled.p`
  color: #7f8c8d;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const ButtonContainer = styled.div`
  margin-top: auto;
  padding-top: 1rem;
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  width: 80%;
  
  background-color: ${props => props.primary ? '#3498db' : '#f0f7ff'};
  color: ${props => props.primary ? '#ffffff' : '#3498db'};
  
  &:hover {
    background-color: ${props => props.primary ? '#2980b9' : '#e1f0ff'};
  }
`;

const Footer = styled.footer`
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 1.5rem;
  text-align: center;
  margin-top: auto;
`;

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('email') || '';
  
  // Get user first name initial for avatar
  const getInitial = () => {
    if (!userEmail) return '?';
    return userEmail.charAt(0).toUpperCase();
  };
  
  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    navigate('/');
  };
  
  const handleViewApplications = () => {
    navigate('/check-status');
  };
  
  const handleApplyLoan = () => {
    navigate('/form');  // Navigate to your existing FormPage.tsx
  };
  
  return (
    <PageContainer>
      <Header>
        <Logo>
          Loan<span>System</span>
        </Logo>
        <UserInfo>
          <UserAvatar>{getInitial()}</UserAvatar>
          <UserEmail>{userEmail}</UserEmail>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </UserInfo>
      </Header>
      
      <MainContent>
        <WelcomeBar>
          <WelcomeTitle>Welcome to your Dashboard</WelcomeTitle>
          <WelcomeSubtitle>Manage your loan applications and check their status</WelcomeSubtitle>
        </WelcomeBar>
        
        <OptionsContainer>
          <OptionCard>
            <OptionHeader bgColor="#3498db">
              <OptionIcon>📋</OptionIcon>
              <OptionTitle>Check Application Status</OptionTitle>
            </OptionHeader>
            <OptionContent>
              <OptionDescription>
                View all your loan applications and check their current status.
                Track whether they are pending, verified, or rejected.
              </OptionDescription>
              <ButtonContainer>
                <Button primary onClick={handleViewApplications}>View Applications</Button>
              </ButtonContainer>
            </OptionContent>
          </OptionCard>
          
          <OptionCard>
            <OptionHeader bgColor="#27ae60">
              <OptionIcon>💰</OptionIcon>
              <OptionTitle>Apply for Loan</OptionTitle>
            </OptionHeader>
            <OptionContent>
              <OptionDescription>
                Submit a new loan application by filling out our application form.
                Provide the necessary details for a quick review process.
              </OptionDescription>
              <ButtonContainer>
                <Button primary onClick={handleApplyLoan}>Apply Now</Button>
              </ButtonContainer>
            </OptionContent>
          </OptionCard>
        </OptionsContainer>
      </MainContent>
      
      <Footer>
        &copy; {new Date().getFullYear()} Loan System. All rights reserved.
      </Footer>
    </PageContainer>
  );
};

export default UserDashboard;