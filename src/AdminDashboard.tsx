import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

// Types
interface Application {
  id: number;
  name: string;
  email: string;
  amount: number;
  tenure: number;
  employment_status: boolean;
  reason: string;
  address: string;
  application_status: string;
  createdAt: string;
}

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  background-color: #f0f4f8;
  background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  align-items: center;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
`;

const DashboardContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  box-sizing: border-box;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 1.5rem 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
  width: 100%;
`;

const Title = styled.h1`
  color: #2c3e50;
  font-size: 2rem;
  margin: 0;
  font-weight: 700;
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

const UserEmail = styled.span`
  font-size: 1rem;
  color: #4a5568;
  font-weight: 500;
`;

const LogoutButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
  box-shadow: 0 4px 6px rgba(231, 76, 60, 0.2);

  &:hover {
    background-color: #c0392b;
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(231, 76, 60, 0.3);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const MainHeading = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  width: 100%;
`;

const HeadingTitle = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-weight: 700;
`;

const HeadingSubtitle = styled.p`
  color: #64748b;
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
`;

const ApplicationsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  background-color: #ffffff;
  padding: 1.2rem 2rem;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  width: 100%;
`;

const ApplicationsTitle = styled.h2`
  margin: 0;
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: 600;
`;

const ApplicationsCount = styled.span`
  font-size: 1.1rem;
  color: #7f8c8d;
  background-color: #f8fafc;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-weight: 500;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ApplicationsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  width: 100%;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.3s, box-shadow 0.3s;
  width: 100%;
  max-width: 900px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid #ecf0f1;
`;

const CardTitle = styled.h3`
  color: #2c3e50;
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 0.4rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  background-color: ${(props) => {
    switch (props.status) {
      case "PENDING":
        return "#f39c12";
      case "VERIFIED":
        return "#27ae60";
      case "APPROVED":
        return "#3498db";
      case "REJECTED":
        return "#e74c3c";
      default:
        return "#95a5a6";
    }
  }};
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const DetailsItem = styled.div`
  background-color: #f8fafc;
  padding: 1rem;
  border-radius: 8px;
`;

const DetailsLabel = styled.p`
  font-size: 0.8rem;
  color: #7f8c8d;
  margin: 0 0 0.3rem 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const DetailsValue = styled.p`
  font-size: 1.1rem;
  color: #2c3e50;
  font-weight: 500;
  margin: 0;
`;

const DetailsFull = styled.div`
  background-color: #f8fafc;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
`;

const ActionButton = styled.button<{ color: string }>`
  padding: 0.7rem 1.5rem;
  background-color: ${(props) => props.color};
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
    transform: none;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
`;

const EmptyStateIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  color: #bdc3c7;
`;

const EmptyStateText = styled.p`
  font-size: 1.3rem;
  color: #7f8c8d;
  margin: 0;
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #3498db;
  font-size: 1.3rem;
  width: 100%;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;
  gap: 0.3rem;
  width: 100%;
`;

const PaginationButton = styled.button<{ active?: boolean }>`
  padding: 0.5rem 1rem;
  background-color: ${(props) => (props.active ? "#3498db" : "white")};
  color: ${(props) => (props.active ? "white" : "#2c3e50")};
  border: 1px solid ${(props) => (props.active ? "#3498db" : "#dcdfe6")};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: ${(props) => (props.active ? "600" : "normal")};

  &:hover {
    background-color: ${(props) => (props.active ? "#3498db" : "#f8f9fa")};
    border-color: ${(props) => (props.active ? "#3498db" : "#3498db")};
  }

  &:disabled {
    background-color: #f8f9fa;
    color: #bdc3c7;
    border-color: #dcdfe6;
    cursor: not-allowed;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(3px);
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 2.5rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

const ModalTitle = styled.h3`
  color: #2c3e50;
  font-size: 1.8rem;
  margin-top: 0;
  margin-bottom: 1.5rem;
`;

const ModalButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const AdminDashboard: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [processingId, setProcessingId] = useState<number | null>(null);

  const userEmail = localStorage.getItem("email") || "";

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://visible-hyacinth-deepanshu123-f5df37d1.koyeb.app/applications/admin`
      );
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const openStatusModal = (application: Application, status: string) => {
    setSelectedApplication(application);
    setSelectedStatus(status);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedApplication(null);
    setSelectedStatus("");
  };

  const updateApplicationStatus = async () => {
    if (!selectedApplication) return;

    setProcessingId(selectedApplication.id);

    try {
      await axios.put(
        `https://visible-hyacinth-deepanshu123-f5df37d1.koyeb.app/applications/admin/update-status/${selectedApplication.id}`,
        {
          status: selectedStatus,
          adminEmail: userEmail,
        }
      );

      // Update local state
      setApplications((prevApplications) =>
        prevApplications.map((app) =>
          app.id === selectedApplication.id
            ? { ...app, application_status: selectedStatus }
            : app
        )
      );

      closeModal();
    } catch (error) {
      console.error("Error updating application status:", error);
    } finally {
      setProcessingId(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    window.location.href = "/";
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentApplications = applications.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(applications.length / itemsPerPage);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  return (
    <PageContainer>
      <DashboardContainer>
        <Header>
          <Title>Admin Portal</Title>
          <UserInfo>
            <UserEmail>{userEmail}</UserEmail>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </UserInfo>
        </Header>

        <MainHeading>
          <HeadingTitle>Loan Application Approval</HeadingTitle>
          <HeadingSubtitle>
            Review verified loan applications and make final approval decisions
          </HeadingSubtitle>
        </MainHeading>

        <ApplicationsHeader>
          <ApplicationsTitle>Verified Applications</ApplicationsTitle>
          <ApplicationsCount>
            {applications.length} application
            {applications.length !== 1 ? "s" : ""} found
          </ApplicationsCount>
        </ApplicationsHeader>

        <ContentWrapper>
          {loading ? (
            <LoadingSpinner>Loading applications...</LoadingSpinner>
          ) : applications.length === 0 ? (
            <EmptyState>
              <EmptyStateIcon>📋</EmptyStateIcon>
              <EmptyStateText>
                No verified applications pending approval
              </EmptyStateText>
            </EmptyState>
          ) : (
            <>
              <ApplicationsGrid>
                {currentApplications.map((application) => (
                  <Card key={application.id}>
                    <CardHeader>
                      <CardTitle>{application.name}</CardTitle>
                      <StatusBadge status={application.application_status}>
                        {application.application_status}
                      </StatusBadge>
                    </CardHeader>
                    <CardContent>
                      <DetailsItem>
                        <DetailsLabel>Application ID</DetailsLabel>
                        <DetailsValue>#{application.id}</DetailsValue>
                      </DetailsItem>
                      <DetailsItem>
                        <DetailsLabel>Email</DetailsLabel>
                        <DetailsValue>{application.email}</DetailsValue>
                      </DetailsItem>
                      <DetailsItem>
                        <DetailsLabel>Loan Amount</DetailsLabel>
                        <DetailsValue>
                          {formatCurrency(application.amount)}
                        </DetailsValue>
                      </DetailsItem>
                      <DetailsItem>
                        <DetailsLabel>Tenure</DetailsLabel>
                        <DetailsValue>{application.tenure} months</DetailsValue>
                      </DetailsItem>
                      <DetailsItem>
                        <DetailsLabel>Employment Status</DetailsLabel>
                        <DetailsValue>
                          {application.employment_status
                            ? "Employed"
                            : "Unemployed"}
                        </DetailsValue>
                      </DetailsItem>
                      <DetailsItem>
                        <DetailsLabel>Submitted On</DetailsLabel>
                        <DetailsValue>
                          {formatDate(application.createdAt)}
                        </DetailsValue>
                      </DetailsItem>
                    </CardContent>
                    <DetailsFull>
                      <DetailsLabel>Reason for Loan</DetailsLabel>
                      <DetailsValue>{application.reason}</DetailsValue>
                    </DetailsFull>
                    <DetailsFull>
                      <DetailsLabel>Employment Address</DetailsLabel>
                      <DetailsValue>{application.address}</DetailsValue>
                    </DetailsFull>
                    {application.application_status === "VERIFIED" && (
                      <ButtonGroup>
                        <ActionButton
                          color="#e74c3c"
                          onClick={() =>
                            openStatusModal(application, "REJECTED")
                          }
                          disabled={processingId === application.id}
                        >
                          Reject
                        </ActionButton>
                        <ActionButton
                          color="#3498db"
                          onClick={() =>
                            openStatusModal(application, "APPROVED")
                          }
                          disabled={processingId === application.id}
                        >
                          Approve
                        </ActionButton>
                      </ButtonGroup>
                    )}
                  </Card>
                ))}
              </ApplicationsGrid>

              {totalPages > 1 && (
                <Pagination>
                  <PaginationButton
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </PaginationButton>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <PaginationButton
                        key={page}
                        active={page === currentPage}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </PaginationButton>
                    )
                  )}

                  <PaginationButton
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </PaginationButton>
                </Pagination>
              )}
            </>
          )}
        </ContentWrapper>

        {showModal && selectedApplication && (
          <ModalOverlay>
            <ModalContent>
              <ModalTitle>
                {selectedStatus === "APPROVED"
                  ? "Approve Application"
                  : "Reject Application"}
              </ModalTitle>
              <p>
                Are you sure you want to
                <strong>
                  {selectedStatus === "APPROVED" ? " approve " : " reject "}
                </strong>
                the loan application from{" "}
                <strong>{selectedApplication.name}</strong>?
              </p>
              {selectedStatus === "REJECTED" && (
                <p style={{ marginTop: "1rem", color: "#e74c3c" }}>
                  This action will reject the application and inform the
                  applicant.
                </p>
              )}
              {selectedStatus === "APPROVED" && (
                <p style={{ marginTop: "1rem", color: "#3498db" }}>
                  This action will approve the loan application and initiate the
                  funding process.
                </p>
              )}
              <ModalButtonGroup>
                <ActionButton color="#7f8c8d" onClick={closeModal}>
                  Cancel
                </ActionButton>
                <ActionButton
                  color={selectedStatus === "APPROVED" ? "#3498db" : "#e74c3c"}
                  onClick={updateApplicationStatus}
                >
                  Confirm
                </ActionButton>
              </ModalButtonGroup>
            </ModalContent>
          </ModalOverlay>
        )}
      </DashboardContainer>
    </PageContainer>
  );
};

export default AdminDashboard;
