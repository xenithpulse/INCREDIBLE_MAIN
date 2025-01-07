import styled from "styled-components";

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  margin-top: 7px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ReviewButton = () => {
  return (
    <Button>
      <a
        href="https://www.google.com/search?q=prodcust+inn&oq=prodcust+inn&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDI3NTdqMGoxqAIAsAIA&sourceid=chrome&ie=UTF-8#"
        target="_blank"
        rel="noopener noreferrer"
        style={{color: "inherit", textDecoration: "none" }}
      >
        Give us Review
      </a>
    </Button>
  );
};

export default ReviewButton;
