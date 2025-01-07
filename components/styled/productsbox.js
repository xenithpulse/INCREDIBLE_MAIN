import styled from "styled-components";

export const ProductWrapper = styled.div`
  position: relative;
  width: 100%; /* Each product wrapper will take 35% of the row width */
  height: 450px;
  aspect-ratio: 3 / 4;
  background: white;
  overflow: hidden;
  box-shadow: 0;
  transform: scale(1);
  transition: box-shadow 0.3s, transform 0.3s ease-in-out;
  margin: 0 5px; /* Adds a margin of 10px on the left and right to ensure equal spacing */

  &:hover {
    transform: scale(1.02);
    box-shadow: 5px 10px 20px rgba(0, 0, 0, 0.2);
  }

  /* Adjust layout on small screens */
  @media (max-width: 768px) {
    width: 350px; /* Ensuring that two product wrappers fit in a row */
    margin: 18px; /* Same left-right margin on small screens */
    height: 280px;
  }

  @media (max-width: 480px) {
    width: 100%; /* Keeps two products in a row for small devices */
    height: 250px;
    margin: 15px; /* Same margin for small screens */
  }
`;

export const Top = styled.div`
  height: 80%;
  width: 100%;
  background: url(${props => props.$imageUrl}) no-repeat center center;
  background-size: cover;
  position: relative;
  cursor: pointer;

  @media (max-width: 768px) {
    height: 80%; /* Adjust for smaller screens */
  }
`;

 export const Bottom = styled.div`
  width: 200%;
  height: 100px;
  transition: transform 0.5s;
  display: flex;
  position: relative;

  &.clicked {
    transform: translateX(-50%);
  }

  .left, .right {
    width: 52%;
    height: 100%;
    position: relative;
  }

  .left {
    background: #f4f4f4;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;

    .details {
      padding: 0px;
      width: calc(70% - 1px);

      h1 {
        font-size: 16px;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: -10px;
        margin-left: -3px;


        @media (max-width: 768px) {
          font-size: 14px; /* Tablet size */
        }

        @media (max-width: 480px) {
          font-size: 10px; /* Small devices */
        }
      }

      p {
        font-size: 14px;
        margin-bottom: -2px;
        color: black;
        margin-left: -3px;
        font-weight: bold;

        @media (max-width: 768px) {
          font-size: 12px; /* Tablet size */
        }

        @media (max-width: 480px) {
          font-size: 10px; /* Small devices */
        }
      }

      .discount {
        font-size: 12px;
        color: green;

        span {
          text-decoration: line-through;
          font-size: 14px;
          margin-right: 8px;
          margin-left: -3px;


          @media (max-width: 768px) {
            font-size: 12px; /* Tablet size */
          }

          @media (max-width: 480px) {
            font-size: 10px; /* Small devices */
          }
        }

        .discount-percentage {
          background-color: green;
          text-decoration: none;
          color: white;
          padding: 2px 5px;
          border-radius: 8px;
          font-size: 8px;
          margin-left: 5px;

          @media (max-width: 768px) {
            font-size: 7px; /* Tablet size */
          }

          @media (max-width: 480px) {
            font-size: 5px; /* Small devices */
          }
        }

        @media (max-width: 768px) {
          font-size: 11px; /* Tablet size */
        }

        @media (max-width: 480px) {
          font-size: 9px; /* Small devices */
        }
      }
    }

    .buy {
      width: calc(30% - 2px);
      height: 100%;
      background: #f1f1f1;
      transition: background 0.5s;
      border-left: solid thin rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;


      &:hover {
        background: #A6CDDE;
      }

      svg {
        font-size: 30px;
        margin-left: -15%;
        color: #000;
        margin-top: -15px; /* Adjust spacing for smaller devices */


        @media (max-width: 768px) {
          font-size: 25px; /* Tablet size */
          margin-bottom: 50%; /* Adjust spacing for smaller devices */
        }

        @media (max-width: 480px) {
          font-size: 24px; /* Small devices */
          margin-bottom: 60%; /* Adjust spacing for very small devices */
        }
      }
    }
  }
`;


export const Inside = styled.div`
  z-index: 9;
  background: #000;
  width: 140px;
  height: 140px;
  position: absolute;
  top: -90px;
  right: -90px;
  border-radius: 0px 0px 200px 200px;
  transition: all 0.5s, border-radius 2s, top 1s;
  overflow: hidden;

  .icon {
    position: absolute;
    right: 95px;
    top: 95px;
    color: white;
    opacity: 1;
    transition: opacity 0.5s;
  }

  &:hover {
    width: 100%;
    right: 0;
    top: 0;
    border-radius: 0;
    height: 80%;

    .icon {
      opacity: 100%;
      right: 15px;
      top: 15px;
    }

    .contents {
      opacity: 1;
      transform: scale(1) translateY(0);
      text-align: center;
    }
  }

  .contents {
    opacity: 0;
    transform: scale(0.5) translateY(-200%);
    transition: opacity 0.2s, transform 0.8s;
            
    table {
      width: 100%;
    }

    h1 {
      color: white;

      @media (max-width: 768px) {
        font-size: 9.5px; /* Adjust text size for small screens */
      }
    }

    p, table {
      color: white;

      @media (max-width: 768px) {
        font-size: 9px; /* Adjust text size for small screens */
      }

      p {
        font-size: 13px;

        @media (max-width: 768px) {
          font-size: 10px; /* Adjust text size for small screens */
        }
      }
    }
  }
`;

export const WhiteBox = styled.div`
  background-color: #fff;
  padding: 10px;
  position: relative;
  height: 190px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;

  img {
    width: 100%;
    object-fit: cover;
    transition: opacity 0.3s ease-in-out;
    cursor: pointer;

    @media (max-width: 768px) {
      height: 150px; /* Adjust image height for small screens */
    }
  }
`;
