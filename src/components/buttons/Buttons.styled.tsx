import styled from "styled-components";
import { device } from "../../styles/Breakpoints";

export const PrimaryButton = styled.div`
  button {
    background-color: ${({ theme }) => theme.colors.primaryRedColor};
    color: ${({ theme }) => theme.colors.primaryWhiteColor};
    border-radius: 50px;
    outline: none;
    width: 145px;
    height: 45px;
    cursor: pointer;
    border: none;
    @media ${device.mobileL} {
      width: 125px;
      height: 40px;
    }
  }
`;

export const SecondaryButton = styled.div`
  button {
    background-color: ${({ theme }) => theme.colors.secondaryBlackColor};
    color: ${({ theme }) => theme.colors.primaryWhiteColor};
    outline: none;
    border: none;
    width: 145px;
    height: 30px;
    cursor: pointer;
    font-size: 14px;
    border-radius: 2px;
  }
`;
export const ProfileButton = styled.div`
  text-align: right;
  border: none;

  button {
    background-color: ${({ theme }) => theme.colors.secondaryBlackColor};
    color: ${({ theme }) => theme.colors.primaryWhiteColor};
    border-radius: 50px;
    outline: none;
    width: 145px;
    height: 45px;
    cursor: pointer;
    border: none;
  }
`;

export const ReasonButton = styled.div`
  text-align: right;
  border: none;
  button {
    background-color: ${({ theme }) => theme.colors.primaryRedColor};
    color: ${({ theme }) => theme.colors.primaryWhiteColor};
    border-radius: 50px;
    outline: none;
    width: 145px;
    height: 45px;
    cursor: pointer;
    border: none;
  }
`;
export const ModalContainer = styled.div`
 padding: 15px;
`;
export const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  padding-top: 25px;
`;
export const ModalButton = styled.div`
  text-align: right;
  button {
    font-size: 14px;
    font-weight: bold;
    border: 1px solid #6A6A6A;
    width: 65px;
    height: 25px;
    border-radius: 30px;
    cursor: pointer;
    color: #6A6A6A;
    background-color: transparent;

    :first-of-type{
      margin-right:10px ;
    }
    :hover{
      border: 1px solid #FD0000;
      color: #FD0000;

    }
  }
`;
