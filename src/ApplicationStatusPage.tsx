import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

// Types
interface Application {
  id: number;
  name: string;
  amount: number;
  reason: string;
  tenure: number;
  employment_status: boolean;
  address: string;
  createdAt: string;
  application_status: "PENDING" | "VERIFIED" | "APPROVED" | "REJECTED";
  rejected_by?: "VERIFIER" | "ADMIN";
}

interface ApiApplication {
  id: number;
  name: string;
  amount: number;
  reason: string;
  tenure: number;
  employment_status: boolean;
  address: string;
  createdAt: string;
  application_status: string;
}

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: #f5f7fa;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Header = styled.header`
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.2rem 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: #2c3e50;

  span {
    color: #3498db;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #3498db;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const PageTitle = styled.h1`
  margin: 0 0 2rem 0;
  color: #2c3e50;
  font-size: 2rem;
  text-align: center;
`;

const ApplicationsContainer = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  padding: 2.5rem;
  margin-bottom: 2rem;
`;

const ApplicationCard = styled.div`
  border: 1px solid #e6e9ed;
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 2rem;
  transition: all 0.3s ease;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ApplicationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e6e9ed;
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
`;

const ApplicationID = styled.div`
  font-weight: 700;
  color: #2c3e50;
  font-size: 1.2rem;
`;

const ApplicationDate = styled.div`
  font-size: 0.95rem;
  color: #7f8c8d;
`;

const ApplicationDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const DetailItem = styled.div`
  margin-bottom: 1.2rem;
`;

const DetailLabel = styled.div`
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const DetailValue = styled.div`
  font-weight: 500;
  color: #2c3e50;
  font-size: 1.1rem;
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 600;

  background-color: ${(props) => {
    switch (props.status) {
      case "PENDING":
        return "#fff8e1";
      case "VERIFIED":
        return "#e3f2fd";
      case "APPROVED":
        return "#e8f5e9";
      case "REJECTED":
        return "#ffebee";
      default:
        return "#f1f1f1";
    }
  }};

  color: ${(props) => {
    switch (props.status) {
      case "PENDING":
        return "#f57c00";
      case "VERIFIED":
        return "#1976d2";
      case "APPROVED":
        return "#2e7d32";
      case "REJECTED":
        return "#c62828";
      default:
        return "#757575";
    }
  }};
`;

const StatusMessage = styled.div<{ status: string }>`
  margin-top: 0.8rem;
  font-size: 0.95rem;
  line-height: 1.5;
  color: ${(props) => {
    switch (props.status) {
      case "PENDING":
        return "#f57c00";
      case "VERIFIED":
        return "#1976d2";
      case "APPROVED":
        return "#2e7d32";
      case "REJECTED":
        return "#c62828";
      default:
        return "#757575";
    }
  }};
`;

const StatusTimeline = styled.div`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px dashed #e6e9ed;
`;

const TimelineTitle = styled.h3`
  font-size: 1.1rem;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const TimelineStep = styled.div<{
  active: boolean;
  completed?: boolean;
  rejected?: boolean;
}>`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  opacity: ${(props) => (props.active ? 1 : 0.5)};
`;

const TimelineIcon = styled.div<{
  active: boolean;
  completed?: boolean;
  rejected?: boolean;
}>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => {
    if (props.rejected) return "#e74c3c";
    if (props.completed) return "#2ecc71";
    return props.active ? "#3498db" : "#e0e0e0";
  }};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  font-size: 0.8rem;
  font-weight: bold;
`;

const TimelineConnector = styled.div`
  width: 2px;
  height: 25px;
  background-color: #e0e0e0;
  margin-left: 14px;
  margin-top: -5px;
  margin-bottom: 10px;
`;

const TimelineContent = styled.div`
  flex: 1;
`;

const TimelineLabel = styled.div`
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.2rem;
`;

const TimelineDescription = styled.div`
  font-size: 0.85rem;
  color: #7f8c8d;
`;

const RejectionInfo = styled.div`
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #e74c3c;
  font-style: italic;
`;

const NoApplications = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  color: #7f8c8d;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const EmptyIcon = styled.div`
  width: 100px;
  height: 100px;
  background-color: #f5f7fa;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;

  svg {
    width: 50px;
    height: 50px;
  }
`;

const EmptyText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  background-color: #3498db;
  color: white;
  font-size: 1rem;

  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 60px;
  height: 60px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #3498db;
  animation: spin 1s ease-in-out infinite;
  margin: 4rem auto;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  background-color: #ffebee;
  padding: 1.2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 500;
`;

const RefreshButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #3498db;
  cursor: pointer;
  font-size: 1rem;
  margin-left: auto;
  margin-bottom: 1.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;

  &:hover {
    background-color: #f0f7ff;
  }
`;

const Footer = styled.footer`
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 2rem;
  text-align: center;
  margin-top: auto;
  width: 100%;
`;

const ApplicationStatusPage: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    if (!userEmail) {
      navigate("/login");
      return;
    }

    fetchApplications();
  }, [navigate, userEmail]);

  const fetchApplications = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://loanapproval-backend.onrender.com/applications/${userEmail}`
      );
      // Temporarily transform the data to work with our enhanced status system
      // In production, the backend would return the correct format
      const transformedData = response.data.map((app: ApiApplication) => {
        // Map PENDING and VERIFIED statuses directly
        if (
          app.application_status === "PENDING" ||
          app.application_status === "VERIFIED"
        ) {
          return app as Application;
        }

        // If it's REJECTED, determine who rejected it (randomly for demo)
        if (app.application_status === "REJECTED") {
          return {
            ...app,
            rejected_by:
              Math.random() > 0.5 ? ("VERIFIER" as const) : ("ADMIN" as const),
          } as Application;
        }

        // If status is VERIFIED in your current system, randomly make some APPROVED for demo
        if (app.application_status === "VERIFIED" && Math.random() > 0.5) {
          return {
            ...app,
            application_status: "APPROVED" as const,
          } as Application;
        }

        return app as Application;
      });

      setApplications(transformedData);
    } catch (error: unknown) {
      console.error("Error fetching applications:", error);

      let errorMessage = "Failed to fetch applications. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  const handleApplyLoan = () => {
    navigate("/form");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusLabel = (status: string, rejectedBy?: string) => {
    switch (status) {
      case "PENDING":
        return "Pending Review";
      case "VERIFIED":
        return "Verified by Verifier";
      case "APPROVED":
        return "Approved by Admin";
      case "REJECTED":
        return rejectedBy === "VERIFIER"
          ? "Rejected by Verifier"
          : "Rejected by Admin";
      default:
        return status;
    }
  };

  const getStatusMessage = (status: string, rejectedBy?: string) => {
    switch (status) {
      case "PENDING":
        return "Your application is currently waiting for review by our verification team.";
      case "VERIFIED":
        return "Your application has been verified by our verification team. It is now awaiting final approval from an admin.";
      case "APPROVED":
        return "Congratulations! Your loan application has been verified by our team and approved by an admin. We will process the disbursement shortly.";
      case "REJECTED":
        if (rejectedBy === "VERIFIER") {
          return "We regret to inform you that your application did not pass our verification process. Please contact our support team for more details.";
        } else {
          return "We regret to inform you that your application was not approved by our admin team. Please contact our support team for more details.";
        }
      default:
        return "";
    }
  };

  const renderTimeline = (status: string, rejectedBy?: string) => {
    // Define our steps based on the application status
    const steps = [
      {
        id: "submitted",
        label: "Application Submitted",
        description: "Your loan application has been successfully submitted.",
        active: true,
        completed: true,
      },
      {
        id: "verification",
        label: "Verification Review",
        description: "Our verifier team reviews your application details.",
        active: true,
        completed: status !== "PENDING",
        rejected: status === "REJECTED" && rejectedBy === "VERIFIER",
      },
      {
        id: "admin",
        label: "Admin Approval",
        description: "Admin reviews verified applications for final approval.",
        active:
          status === "VERIFIED" ||
          status === "APPROVED" ||
          (status === "REJECTED" && rejectedBy === "ADMIN"),
        completed: status === "APPROVED",
        rejected: status === "REJECTED" && rejectedBy === "ADMIN",
      },
      {
        id: "disbursement",
        label: "Loan Disbursement",
        description: "Funds will be transferred to your account.",
        active: status === "APPROVED",
        completed: false,
      },
    ];

    return (
      <StatusTimeline>
        <TimelineTitle>Application Timeline</TimelineTitle>
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <TimelineStep active={step.active}>
              <TimelineIcon
                active={step.active}
                completed={step.completed}
                rejected={step.rejected}
              >
                {step.rejected ? "✕" : step.completed ? "✓" : index + 1}
              </TimelineIcon>
              <TimelineContent>
                <TimelineLabel>
                  {step.rejected
                    ? step.id === "verification"
                      ? "Rejected by Verifier"
                      : "Rejected by Admin"
                    : step.label}
                </TimelineLabel>
                <TimelineDescription>{step.description}</TimelineDescription>
                {step.rejected && (
                  <RejectionInfo>
                    {rejectedBy === "VERIFIER"
                      ? "Your application did not meet our verification criteria."
                      : "Your application did not receive admin approval."}
                  </RejectionInfo>
                )}
              </TimelineContent>
            </TimelineStep>
            {index < steps.length - 1 && step.active && !step.rejected && (
              <TimelineConnector />
            )}
          </React.Fragment>
        ))}
      </StatusTimeline>
    );
  };

  return (
    <PageContainer>
      <Header>
        <Logo>
          Loan<span>System</span>
        </Logo>
        <BackButton onClick={handleBackToDashboard}>
          ← Back to Dashboard
        </BackButton>
      </Header>

      <MainContent>
        <PageTitle>Your Application Status</PageTitle>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {applications.length > 0 ? (
              <ApplicationsContainer>
                <RefreshButton onClick={fetchApplications}>
                  🔄 Refresh Applications
                </RefreshButton>

                {applications.map((app) => (
                  <ApplicationCard key={app.id}>
                    <ApplicationHeader>
                      <ApplicationID>Application #{app.id}</ApplicationID>
                      <ApplicationDate>
                        Submitted on {formatDate(app.createdAt)}
                      </ApplicationDate>
                    </ApplicationHeader>

                    <ApplicationDetails>
                      <DetailItem>
                        <DetailLabel>Applicant Name</DetailLabel>
                        <DetailValue>{app.name}</DetailValue>
                      </DetailItem>

                      <DetailItem>
                        <DetailLabel>Loan Amount</DetailLabel>
                        <DetailValue>
                          ${app.amount.toLocaleString()}
                        </DetailValue>
                      </DetailItem>

                      <DetailItem>
                        <DetailLabel>Tenure</DetailLabel>
                        <DetailValue>{app.tenure} months</DetailValue>
                      </DetailItem>

                      <DetailItem>
                        <DetailLabel>Current Status</DetailLabel>
                        <DetailValue>
                          <StatusBadge status={app.application_status}>
                            {getStatusLabel(
                              app.application_status,
                              app.rejected_by
                            )}
                          </StatusBadge>
                          <StatusMessage status={app.application_status}>
                            {getStatusMessage(
                              app.application_status,
                              app.rejected_by
                            )}
                          </StatusMessage>
                        </DetailValue>
                      </DetailItem>

                      <DetailItem>
                        <DetailLabel>Purpose</DetailLabel>
                        <DetailValue>{app.reason}</DetailValue>
                      </DetailItem>

                      <DetailItem>
                        <DetailLabel>Employment</DetailLabel>
                        <DetailValue>
                          {app.employment_status ? "Employed" : "Not Employed"}
                        </DetailValue>
                      </DetailItem>
                    </ApplicationDetails>

                    {renderTimeline(app.application_status, app.rejected_by)}
                  </ApplicationCard>
                ))}
              </ApplicationsContainer>
            ) : (
              <NoApplications>
                <EmptyIcon>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                      stroke="#7f8c8d"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 7L12 13L21 7"
                      stroke="#7f8c8d"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </EmptyIcon>
                <EmptyText>
                  You haven't submitted any loan applications yet.
                </EmptyText>
                <Button onClick={handleApplyLoan}>Apply for a Loan</Button>
              </NoApplications>
            )}
          </>
        )}
      </MainContent>

      <Footer>
        &copy; {new Date().getFullYear()} Loan System. All rights reserved.
      </Footer>
    </PageContainer>
  );
};

export default ApplicationStatusPage;
