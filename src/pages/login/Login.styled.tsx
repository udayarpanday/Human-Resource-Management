import styled from "styled-components";
import { device } from "../../styles/Breakpoints";

export const HomePageContainer = styled.div`
  background-color: #2b2b2b;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  
  flex-direction: column;
`;

export const LoginHeader = styled.div`
  height: 350px;
  width: 480px;
  border: 1px solid #ffffff;
  h3 {
    background-color: #2b2b2b;
    padding: 0 10px;
    width: fit-content;
    margin-left: 30px;
    margin-top: -20px;
  }
  @media ${device.mobileL} {
    height: 365px;
    width: 80%;
    h3{
      margin-left: 15px;
    }
  }
  p{
    color: red;
  }
`;

export const LoginContainer = styled.div`
  padding: 40px;
  @media ${device.mobileL} {
    padding: 25px;
  }
`;

export const LogoContainer = styled.div`
  padding-bottom: 70px;
  @media ${device.mobileL} {
    padding-bottom: 50px;
    img{
      width: 250px;
      object-fit: contain;

    }
    
  }
`;

export const LoginFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 40px 0;
  @media ${device.mobileL} {
    a {
      padding-top: 20px;
    }
    flex-direction: column-reverse;
  }
  a {
    color: #ffffff;
    font-weight: 100;
    text-decoration: underline;
  }
`;
