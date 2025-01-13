import styled from "styled-components";

const Button = styled.button`
  background-color: #0099cc; /* Update background color */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  margin-top: 7px;
  font-size: 1rem;

  &:hover {
    background-color: #0073a6; /* Update hover color */
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
