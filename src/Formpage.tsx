// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import axios from "axios";

// // Styled Components
// const FormContainer = styled.div`
//   width: 100%;
//   max-width: 600px;
//   margin: 0 auto;
//   padding: 20px;
//   border-radius: 5px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//   background-color: white;
// `;

// const Title = styled.h1`
//   text-align: center;
//   margin-bottom: 20px;
//   font-size: 24px;
//   font-weight: 600;
// `;

// const FormGroup = styled.div`
//   margin-bottom: 15px;
// `;

// const Label = styled.label`
//   display: block;
//   margin-bottom: 5px;
//   font-size: 14px;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 10px;
//   border: 1px solid #ddd;
//   border-radius: 4px;
//   font-size: 14px;
//   box-sizing: border-box;
// `;

// const TextArea = styled.textarea`
//   width: 100%;
//   padding: 10px;
//   border: 1px solid #ddd;
//   border-radius: 4px;
//   font-size: 14px;
//   box-sizing: border-box;
//   min-height: 80px;
//   resize: vertical;
// `;

// const CheckboxContainer = styled.div`
//   display: flex;
//   align-items: flex-start;
//   margin-bottom: 10px;
// `;

// const CheckboxInput = styled.input`
//   margin-right: 10px;
//   margin-top: 4px;
// `;

// const CheckboxLabel = styled.label`
//   font-size: 14px;
//   line-height: 1.4;
// `;

// const SubmitButton = styled.button<{ disabled: boolean }>`
//   background-color: ${(props) => (props.disabled ? "#cccccc" : "#006400")};
//   color: white;
//   padding: 10px 15px;
//   border: none;
//   border-radius: 4px;
//   cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
//   font-size: 16px;
//   width: 100%;

//   &:hover {
//     background-color: ${(props) => (props.disabled ? "#cccccc" : "#004d00")};
//   }
// `;

// const Row = styled.div`
//   display: flex;
//   gap: 20px;

//   @media (max-width: 768px) {
//     flex-direction: column;
//   }
// `;

// const ChartContainer = styled.div`
//   margin: 20px 0;
//   border: 1px solid #ddd;
//   padding: 10px;
//   border-radius: 4px;
// `;

// interface FormData {
//   fullName: string;
//   amount: string;
//   loanTenure: string;
//   employmentStatus: string;
//   reason: string;
//   employmentAddress1: string;
//   employmentAddress2: string;
//   email: string;
//   termsChecked: boolean;
//   creditInfoChecked: boolean;
// }

// const LoanApplicationForm: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     fullName: "",
//     amount: "",
//     loanTenure: "",
//     employmentStatus: "",
//     reason: "",
//     employmentAddress1: "",
//     employmentAddress2: "",
//     email: "",
//     termsChecked: false,
//     creditInfoChecked: false,
//   });

//   const [loading, setLoading] = useState<boolean>(false);
//   const [submitted, setSubmitted] = useState<boolean>(false);

//   // Get email from localStorage on component mount
//   useEffect(() => {
//     const storedEmail = localStorage.getItem("email");
//     if (storedEmail) {
//       setFormData((prevData) => ({
//         ...prevData,
//         email: storedEmail,
//       }));
//     }
//   }, []);

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, checked } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: checked,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.termsChecked || !formData.creditInfoChecked) {
//       return;
//     }

//     setLoading(true);

//     try {
//       // Get email from localStorage if not already in form data
//       const email = formData.email || localStorage.getItem("email");

//       if (!email) {
//         throw new Error("No email found. Please login first.");
//       }

//       const response = await axios.post("http://localhost:3000/apply", {
//         ...formData,
//         email,
//       });

//       console.log("Form submitted successfully:", response.data);
//       setSubmitted(true);
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (submitted) {
//     return (
//       <FormContainer>
//         <Title>Thank you for your application!</Title>
//         <p>
//           Your loan application has been submitted successfully. We will review
//           your application and get back to you soon.
//         </p>
//       </FormContainer>
//     );
//   }

//   return (
//     <FormContainer>
//       <Title>APPLY FOR A LOAN</Title>
//       <form onSubmit={handleSubmit}>
//         <Row>
//           <FormGroup>
//             <Label>Full name as it appears on bank account</Label>
//             <Input
//               type="text"
//               name="fullName"
//               value={formData.fullName}
//               onChange={handleInputChange}
//               placeholder="Full name as it appears on bank account"
//               required
//             />
//           </FormGroup>
//           <FormGroup>
//             <Label>How much do you need?</Label>
//             <Input
//               type="number"
//               name="amount"
//               value={formData.amount}
//               onChange={handleInputChange}
//               placeholder="How much do you need?"
//               required
//             />
//           </FormGroup>
//         </Row>

//         <Row>
//           <FormGroup>
//             <Label>Loan tenure (in months)</Label>
//             <Input
//               type="number"
//               name="loanTenure"
//               value={formData.loanTenure}
//               onChange={handleInputChange}
//               placeholder="Loan tenure (in months)"
//               required
//             />
//           </FormGroup>
//           <FormGroup>
//             <Label>Employment status</Label>
//             <Input
//               type="text"
//               name="employmentStatus"
//               value={formData.employmentStatus}
//               onChange={handleInputChange}
//               placeholder="Employment status"
//               required
//             />
//           </FormGroup>
//         </Row>

//         <Row>
//           <FormGroup>
//             <Label>Reason for loan</Label>
//             <TextArea
//               name="reason"
//               value={formData.reason}
//               onChange={handleInputChange}
//               placeholder="Reason for loan"
//               required
//             />
//           </FormGroup>
//           <div>
//             <FormGroup>
//               <Label>Employment address</Label>
//               <Input
//                 type="text"
//                 name="employmentAddress1"
//                 value={formData.employmentAddress1}
//                 onChange={handleInputChange}
//                 placeholder="Employment address"
//                 required
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label>Employment address</Label>
//               <Input
//                 type="text"
//                 name="employmentAddress2"
//                 value={formData.employmentAddress2}
//                 onChange={handleInputChange}
//                 placeholder="Employment address"
//               />
//             </FormGroup>
//           </div>
//         </Row>

//         <ChartContainer>
//           <div>Chart</div>
//           {/* A placeholder for the chart, you'll need to implement the actual chart component */}
//         </ChartContainer>

//         <CheckboxContainer>
//           <CheckboxInput
//             type="checkbox"
//             name="termsChecked"
//             checked={formData.termsChecked}
//             onChange={handleCheckboxChange}
//             id="terms"
//           />
//           <CheckboxLabel htmlFor="terms">
//             I have read the important information and accept that by completing
//             the application I will be bound by the terms
//           </CheckboxLabel>
//         </CheckboxContainer>

//         <CheckboxContainer>
//           <CheckboxInput
//             type="checkbox"
//             name="creditInfoChecked"
//             checked={formData.creditInfoChecked}
//             onChange={handleCheckboxChange}
//             id="creditInfo"
//           />
//           <CheckboxLabel htmlFor="creditInfo">
//             Any personal and credit information obtained may be disclosed from
//             time to time to other lenders, credit bureaus or other credit
//             reporting agencies
//           </CheckboxLabel>
//         </CheckboxContainer>

//         <SubmitButton
//           type="submit"
//           disabled={
//             !formData.termsChecked || !formData.creditInfoChecked || loading
//           }
//         >
//           {loading ? "Submitting..." : "Submit"}
//         </SubmitButton>
//       </form>
//     </FormContainer>
//   );
// };

// export default LoanApplicationForm;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  background-color: white;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  font-weight: 600;
  color: #2c3e50;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f0f0f0;
`;

const FormGroup = styled.div`
  margin-bottom: 1.2rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: #2c3e50;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  font-size: 1rem;
  box-sizing: border-box;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  font-size: 1rem;
  box-sizing: border-box;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 6px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f8f9fa;
  }
`;

const CheckboxInput = styled.input`
  margin-right: 12px;
  margin-top: 4px;
  transform: scale(1.2);
`;

const CheckboxLabel = styled.label`
  font-size: 0.95rem;
  line-height: 1.5;
  color: #2c3e50;
`;

const SubmitButton = styled.button<{ disabled: boolean }>`
  background-color: ${(props) => (props.disabled ? "#a0aec0" : "#3498db")};
  color: white;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 30px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-size: 1.1rem;
  font-weight: 600;
  width: 100%;
  margin-top: 1rem;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#a0aec0" : "#2980b9")};
    transform: ${(props) => (props.disabled ? "none" : "translateY(-2px)")};
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SuccessContainer = styled.div`
  text-align: center;
  padding: 2rem;
`;

const SuccessMessage = styled.p`
  margin: 1.5rem 0;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #2c3e50;
`;

const ReturnButton = styled.button`
  background-color: #3498db;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 1rem;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
  }
`;

const Footer = styled.footer`
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 1.5rem;
  text-align: center;
  width: 100%;
`;

interface FormData {
  fullName: string;
  amount: string;
  loanTenure: string;
  employmentStatus: string;
  reason: string;
  employmentAddress1: string;
  employmentAddress2: string;
  email: string;
  termsChecked: boolean;
  creditInfoChecked: boolean;
}

const LoanApplicationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    amount: "",
    loanTenure: "",
    employmentStatus: "",
    reason: "",
    employmentAddress1: "",
    employmentAddress2: "",
    email: "",
    termsChecked: false,
    creditInfoChecked: false,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const navigate = useNavigate();

  // Get email from localStorage on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setFormData((prevData) => ({
        ...prevData,
        email: storedEmail,
      }));
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.termsChecked || !formData.creditInfoChecked) {
      return;
    }

    setLoading(true);

    try {
      // Get email from localStorage if not already in form data
      const email = formData.email || localStorage.getItem("email");

      if (!email) {
        throw new Error("No email found. Please login first.");
      }

      const response = await axios.post("http://localhost:3000/apply", {
        ...formData,
        email,
      });

      console.log("Form submitted successfully:", response.data);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  if (submitted) {
    return (
      <PageContainer>
        <Header>
          <Logo>
            Loan<span>System</span>
          </Logo>
          <BackButton onClick={handleBackToDashboard}>← Back to Dashboard</BackButton>
        </Header>
        <MainContent>
          <FormContainer>
            <Title>Application Submitted!</Title>
            <SuccessContainer>
              <div>✅</div>
              <SuccessMessage>
                Your loan application has been submitted successfully. We will review
                your application and get back to you soon.
              </SuccessMessage>
              <ReturnButton onClick={handleBackToDashboard}>
                Return to Dashboard
              </ReturnButton>
            </SuccessContainer>
          </FormContainer>
        </MainContent>
        <Footer>
          &copy; {new Date().getFullYear()} Loan System. All rights reserved.
        </Footer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header>
        <Logo>
          Loan<span>System</span>
        </Logo>
        <BackButton onClick={handleBackToDashboard}>← Back to Dashboard</BackButton>
      </Header>
      <MainContent>
        <FormContainer>
          <Title>APPLY FOR A LOAN</Title>
          <form onSubmit={handleSubmit}>
            <Row>
              <FormGroup>
                <Label>Full name (as it appears on bank account)</Label>
                <Input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>How much do you need?</Label>
                <Input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="Enter amount in dollars"
                  required
                />
              </FormGroup>
            </Row>

            <Row>
              <FormGroup>
                <Label>Loan tenure (in months)</Label>
                <Input
                  type="number"
                  name="loanTenure"
                  value={formData.loanTenure}
                  onChange={handleInputChange}
                  placeholder="Enter number of months"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Employment status</Label>
                <Input
                  type="text"
                  name="employmentStatus"
                  value={formData.employmentStatus}
                  onChange={handleInputChange}
                  placeholder="E.g., Employed, Self-employed"
                  required
                />
              </FormGroup>
            </Row>

            <FormGroup>
              <Label>Reason for loan</Label>
              <TextArea
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                placeholder="Please describe why you need this loan"
                required
              />
            </FormGroup>

            <Row>
              <FormGroup>
                <Label>Employment address (Line 1)</Label>
                <Input
                  type="text"
                  name="employmentAddress1"
                  value={formData.employmentAddress1}
                  onChange={handleInputChange}
                  placeholder="Street address"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Employment address (Line 2)</Label>
                <Input
                  type="text"
                  name="employmentAddress2"
                  value={formData.employmentAddress2}
                  onChange={handleInputChange}
                  placeholder="Apt, Suite, Building (optional)"
                />
              </FormGroup>
            </Row>

            <CheckboxContainer>
              <CheckboxInput
                type="checkbox"
                name="termsChecked"
                checked={formData.termsChecked}
                onChange={handleCheckboxChange}
                id="terms"
              />
              <CheckboxLabel htmlFor="terms">
                I have read the important information and accept that by completing
                the application I will be bound by the terms
              </CheckboxLabel>
            </CheckboxContainer>

            <CheckboxContainer>
              <CheckboxInput
                type="checkbox"
                name="creditInfoChecked"
                checked={formData.creditInfoChecked}
                onChange={handleCheckboxChange}
                id="creditInfo"
              />
              <CheckboxLabel htmlFor="creditInfo">
                Any personal and credit information obtained may be disclosed from
                time to time to other lenders, credit bureaus or other credit
                reporting agencies
              </CheckboxLabel>
            </CheckboxContainer>

            <SubmitButton
              type="submit"
              disabled={
                !formData.termsChecked || !formData.creditInfoChecked || loading
              }
            >
              {loading ? "Submitting..." : "Submit Application"}
            </SubmitButton>
          </form>
        </FormContainer>
      </MainContent>
      <Footer>
        &copy; {new Date().getFullYear()} Loan System. All rights reserved.
      </Footer>
    </PageContainer>
  );
};

export default LoanApplicationForm;
