
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  background-color: #f0f4f8;
  background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  overflow-x: hidden;
`;

const Header = styled.header`
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 1.2rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  color: #2c3e50;
  
  span {
    color: #3498db;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background-color: #3498db;
      border-radius: 2px;
      transform: scaleX(0.8);
    }
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  background-color: #f8fafc;
  padding: 0.7rem 1.5rem;
  border-radius: 50px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
`;

const UserAvatar = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: #3498db;
  background-image: linear-gradient(45deg, #3498db, #2980b9);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  box-shadow: 0 3px 6px rgba(52, 152, 219, 0.3);
`;

const UserEmail = styled.div`
  font-size: 1rem;
  color: #4a5568;
  font-weight: 500;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.2s ease;
  
  &:hover {
    color: #c0392b;
    transform: translateX(2px);
  }
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const WelcomeBar = styled.div`
  background-color: #ffffff;
  padding: 2rem 3rem;
  margin-bottom: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  position: relative;
  width: 100%;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    right: 0;
    height: 5px;
    background-image: linear-gradient(to right, #3498db, #27ae60);
    border-radius: 5px;
  }
`;

const WelcomeTitle = styled.h1`
  margin: 0;
  color: #2c3e50;
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
`;

const WelcomeSubtitle = styled.p`
  margin: 0;
  color: #64748b;
  font-size: 1.1rem;
  max-width: 600px;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100vw;
  gap: 2rem;
  padding: 2rem;
  box-sizing: border-box;
  height: calc(100vh - 180px);
  
  @media (max-width: 1024px) {
    flex-direction: column;
    height: auto;
  }
`;

const OptionCard = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  position: relative;
  overflow: hidden;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  min-height: 100%;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1);
    z-index: 10;
  }
`;

const OptionHeader = styled.div<{ bgColor: string }>`
  background-color: ${props => props.bgColor};
  background-image: ${props => `linear-gradient(135deg, ${props.bgColor} 0%, ${props.bgColor}dd 100%)`};
  padding: 3rem 2rem;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  ${OptionCard}:hover &::before {
    opacity: 1;
  }
`;

const OptionIcon = styled.div`
  font-size: 4.5rem;
  margin-bottom: 1.5rem;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transform: scale(1);
  transition: transform 0.3s ease;
  
  ${OptionCard}:hover & {
    transform: scale(1.1);
  }
`;

const OptionTitle = styled.h2`
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const OptionContent = styled.div`
  padding: 2.5rem 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  background-color: #ffffff;
`;

const OptionDescription = styled.p`
  color: #4a5568;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.7;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
`;

const ButtonContainer = styled.div`
  margin-top: auto;
  padding-top: 2rem;
  position: relative;
  z-index: 5;
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 0.9rem 2.2rem;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  background-color: ${props => props.primary ? '#3498db' : '#f0f7ff'};
  color: ${props => props.primary ? '#ffffff' : '#3498db'};
  
  &:hover {
    background-color: ${props => props.primary ? '#2980b9' : '#e1f0ff'};
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const Footer = styled.footer`
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('email') || '';

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
    navigate('/form');
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
          <WelcomeSubtitle>
            Manage your loan applications and check their status in real-time
          </WelcomeSubtitle>
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
                Track whether they are pending, verified, approved or rejected.
              </OptionDescription>
              <ButtonContainer>
                <Button primary onClick={handleViewApplications}>
                  View Applications
                </Button>
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