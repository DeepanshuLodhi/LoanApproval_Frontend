import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

// Types
interface LoginFormData {
  email: string;
  password: string;
}

// Role configuration
interface RoleConfig {
  title: string;
  description: string;
  icon: string;
  bgColor: string;
  redirectPath: string;
}

const roleConfigs: Record<string, RoleConfig> = {
  user: {
    title: "User Login",
    description:
      "Access your account to apply for loans and track your applications",
    icon: "👤",
    bgColor: "#3498db",
    redirectPath: "/dashboard",
  },
  verifier: {
    title: "Verifier Login",
    description:
      "Access the verification portal to review and process loan applications",
    icon: "✓",
    bgColor: "#27ae60",
    redirectPath: "/dashboard/verifier", // Updated path
  },
  admin: {
    title: "Admin Login",
    description: "Access the administration panel to manage the system",
    icon: "⚙️",
    bgColor: "#e74c3c",
    redirectPath: "/dashboard/admin", // Updated path
  },
};

// Styled Components
const PageContainer = styled.div<{ bgColor: string }>`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    ${(props) => props.bgColor}40 0%,
    #f5f7fa 100%
  );
`;

const LeftPanel = styled.div<{ bgColor: string }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.bgColor};
  color: white;
  padding: 3rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem;
`;

const IconContainer = styled.div`
  font-size: 6rem;
  margin-bottom: 2rem;
`;

const WelcomeText = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const WelcomeDescription = styled.p`
  font-size: 1.2rem;
  text-align: center;
  max-width: 500px;
  line-height: 1.6;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
`;

const FormTitle = styled.h2`
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #3498db;
    outline: none;
  }
`;

const Button = styled.button<{ bgColor: string }>`
  padding: 0.8rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background-color: ${(props) => props.bgColor};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background-color: ${(props) => props.bgColor}dd;
  }

  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  background-color: #ffecec;
  color: #e74c3c;
  padding: 0.8rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
`;

const BackButton = styled.button`
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  background: none;
  border: none;
  font-size: 1rem;
  color: #2c3e50;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    color: #3498db;
  }
`;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get role from query parameters
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get("role") || "user";

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const config =
    roleConfigs[role as keyof typeof roleConfigs] || roleConfigs.user;

  useEffect(() => {
    // Reset form when role changes
    setFormData({ email: "", password: "" });
    setError(null);
  }, [role]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Get the current role from URL query parameters
      const userRole = role || "user";

      // Send login request with email, password and role
      const response = await axios.post(
        `https://visible-hyacinth-deepanshu123-f5df37d1.koyeb.app/login`,
        {
          email: formData.email,
          password: formData.password,
          role: userRole, // Send the role to the backend
        }
      );

      console.log("Login successful:", response.data);

      // Store user data in localStorage
      localStorage.setItem("email", formData.email);
      localStorage.setItem("userRole", userRole);
      localStorage.setItem("userId", response.data.id);

      // Redirect based on role
      if (userRole === "verifier") {
        navigate("/verifier");
      } else if (userRole === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to login. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer bgColor={config.bgColor}>
      <BackButton onClick={() => navigate("/")}>← Back to Home</BackButton>

      <LeftPanel bgColor={config.bgColor}>
        <IconContainer>{config.icon}</IconContainer>
        <WelcomeText>{config.title}</WelcomeText>
        <WelcomeDescription>{config.description}</WelcomeDescription>
      </LeftPanel>

      <RightPanel>
        <FormContainer>
          <FormTitle>{config.title}</FormTitle>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="email">Email Address</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </FormGroup>

            <Button type="submit" disabled={loading} bgColor={config.bgColor}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Form>
        </FormContainer>
      </RightPanel>
    </PageContainer>
  );
};

export default LoginPage;
