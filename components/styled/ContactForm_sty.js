import styled from 'styled-components';
import { FaWhatsapp } from "react-icons/fa";


export const ContactSection = styled.section`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 0 20px;
  background-color: black;
  min-height: 100vh;
  border-bottom: 1px solid #eee;
  width: 100%;
  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
  }

`;



export const ContactForm = styled.form`
  width: 100%;
  max-width: 1200px;
  border-right: 0.5px solid #00BFFF;
  padding: 30px;
  font-family: 'Montserrat';
  border-radius: 0px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  background: linear-gradient(
    225deg,
    rgba(0, 0, 0, 0.3) 60%,
    rgba(206, 32, 249, 0.4),
    rgba(82, 0, 255, 0.4)
  );
  background-size: 400% 400%; /* Important: Make background larger */
  animation: gradientMovement 16s ease-in-out infinite; /* Removed 'forwards' */

  @keyframes gradientMovement {
    0% { background-position: 0% 50%; }
    25% { background-position: 50% 100%; }
    50% { background-position: 100% 50%; }
    75% { background-position: 50% 0%; }
    100% { background-position: 0% 50%; } /* Same as 0% */
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;



export const FormGroupContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Two columns for large screens, adjust to fit */
  gap: 20px; /* Space between columns and rows */

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Single column for smaller screens */
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 1.1rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: white;
  font-size: 1rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
    background-color: #444;
  }

  @media (max-width: 768px) {
    width: 90%;
    padding: 10px;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: white;
  font-size: 1rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
    background-color: #444;
  }
  @media (max-width: 768px) {
    width: 90%;
    padding: 10px;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: white;
  font-size: 1rem;
  box-sizing: border-box;
  min-height: 150px;
  resize: vertical;

  &:focus {
    outline: none;
    background-color: #444;
  }
  @media (max-width: 768px) {
    width: 90%;
    padding: 10px;
  }
`;

export const SubmitButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 15px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #45a049;
    transform: scale(1.05);
  }
  @media (max-width: 768px) {
    width: 90%;
    padding: 10px;
  }
`;

// Styled button
export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000; /* WhatsApp green color */
  color: white;
  border: 1px solid #eee;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  margin-top: 7px;
  width: 250px;
  font-size: 20px;
  gap: 10px; /* Space between text and icon */
  transition: background-color 0.3s ease, transform 0.2s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

// Component with WhatsApp logo and button
export const WhatsAppButton = () => {
  return (
    <Button>
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "inherit", textDecoration: "none", display: "flex", alignItems: "center" }}
      >
        <FaWhatsapp size={40} />
        Message Us
      </a>
    </Button>
  );
};

export const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
  font-size: 0.9rem;
  text-align: left;
`;
