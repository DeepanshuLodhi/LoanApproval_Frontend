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
const DashboardContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #2c3e50;
  font-size: 2rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserEmail = styled.span`
  font-size: 1rem;
  color: #7f8c8d;
`;

const LogoutButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c0392b;
  }
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 1px solid #ecf0f1;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 1rem 2rem;
  background: none;
  border: none;
  border-bottom: 3px solid
    ${(props) => (props.active ? "#27ae60" : "transparent")};
  color: ${(props) => (props.active ? "#27ae60" : "#7f8c8d")};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: #27ae60;
  }
`;

const ApplicationsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #ecf0f1;
`;

const CardTitle = styled.h3`
  color: #2c3e50;
  font-size: 1.2rem;
  font-weight: 600;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
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
`;

const CardContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const DetailsItem = styled.div``;

const DetailsLabel = styled.p`
  font-size: 0.8rem;
  color: #7f8c8d;
  margin-bottom: 0.3rem;
`;

const DetailsValue = styled.p`
  font-size: 1rem;
  color: #2c3e50;
  font-weight: 500;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const ActionButton = styled.button<{ color: string }>`
  padding: 0.5rem 1rem;
  background-color: ${(props) => props.color};
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const EmptyStateIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #bdc3c7;
`;

const EmptyStateText = styled.p`
  font-size: 1.2rem;
  color: #7f8c8d;
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 3rem;
  color: #27ae60;
  font-size: 1.2rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const PaginationButton = styled.button<{ active?: boolean }>`
  padding: 0.5rem 1rem;
  margin: 0 0.3rem;
  background-color: ${(props) => (props.active ? "#27ae60" : "white")};
  color: ${(props) => (props.active ? "white" : "#2c3e50")};
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${(props) => (props.active ? "#27ae60" : "#f8f9fa")};
  }

  &:disabled {
    background-color: #f8f9fa;
    color: #bdc3c7;
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
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

const ModalTitle = styled.h3`
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

const ModalButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const VerifierDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"all" | "pending">("all");
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
  }, [activeTab]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const endpoint =
        activeTab === "all"
          ? "http://localhost:3000/applications/verifier"
          : "http://localhost:3000/applications/verifier/pending";

      const response = await axios.get(endpoint);
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
        `http://localhost:3000/applications/verifier/update-status/${selectedApplication.id}`,
        {
          status: selectedStatus,
          verifierEmail: userEmail,
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
    <DashboardContainer>
      <Header>
        <Title>Verifier Dashboard</Title>
        <UserInfo>
          <UserEmail>{userEmail}</UserEmail>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </UserInfo>
      </Header>

      <TabContainer>
        <Tab active={activeTab === "all"} onClick={() => setActiveTab("all")}>
          All Applications
        </Tab>
        <Tab
          active={activeTab === "pending"}
          onClick={() => setActiveTab("pending")}
        >
          Pending Applications
        </Tab>
      </TabContainer>

      {loading ? (
        <LoadingSpinner>Loading applications...</LoadingSpinner>
      ) : applications.length === 0 ? (
        <EmptyState>
          <EmptyStateIcon>📝</EmptyStateIcon>
          <EmptyStateText>No applications found</EmptyStateText>
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
                <DetailsItem>
                  <DetailsLabel>Reason for Loan</DetailsLabel>
                  <DetailsValue>{application.reason}</DetailsValue>
                </DetailsItem>
                <DetailsItem
                  style={{ marginTop: "0.5rem", marginBottom: "1.5rem" }}
                >
                  <DetailsLabel>Employment Address</DetailsLabel>
                  <DetailsValue>{application.address}</DetailsValue>
                </DetailsItem>
                <ButtonGroup>
                  {application.application_status === "PENDING" && (
                    <>
                      <ActionButton
                        color="#e74c3c"
                        onClick={() => openStatusModal(application, "REJECTED")}
                        disabled={processingId === application.id}
                      >
                        Reject
                      </ActionButton>
                      <ActionButton
                        color="#27ae60"
                        onClick={() => openStatusModal(application, "VERIFIED")}
                        disabled={processingId === application.id}
                      >
                        Verify
                      </ActionButton>
                    </>
                  )}
                  {application.application_status === "VERIFIED" && (
                    <ActionButton
                      color="#e74c3c"
                      onClick={() => openStatusModal(application, "REJECTED")}
                      disabled={processingId === application.id}
                    >
                      Reject
                    </ActionButton>
                  )}
                  {application.application_status === "REJECTED" && (
                    <ActionButton
                      color="#27ae60"
                      onClick={() => openStatusModal(application, "VERIFIED")}
                      disabled={processingId === application.id}
                    >
                      Verify
                    </ActionButton>
                  )}
                </ButtonGroup>
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

      {showModal && selectedApplication && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>
              {selectedStatus === "VERIFIED"
                ? "Verify Application"
                : "Reject Application"}
            </ModalTitle>
            <p>
              Are you sure you want to
              <strong>
                {selectedStatus === "VERIFIED" ? " verify " : " reject "}
              </strong>
              the loan application from{" "}
              <strong>{selectedApplication.name}</strong>?
            </p>
            {selectedStatus === "REJECTED" && (
              <p style={{ marginTop: "1rem", color: "#e74c3c" }}>
                This action will mark the application as rejected.
              </p>
            )}
            {selectedStatus === "VERIFIED" && (
              <p style={{ marginTop: "1rem", color: "#27ae60" }}>
                This action will mark the application as verified and forward it
                to admin for final approval.
              </p>
            )}
            <ModalButtonGroup>
              <ActionButton color="#7f8c8d" onClick={closeModal}>
                Cancel
              </ActionButton>
              <ActionButton
                color={selectedStatus === "VERIFIED" ? "#27ae60" : "#e74c3c"}
                onClick={updateApplicationStatus}
              >
                Confirm
              </ActionButton>
            </ModalButtonGroup>
          </ModalContent>
        </ModalOverlay>
      )}
    </DashboardContainer>
  );
};

export default VerifierDashboard;
