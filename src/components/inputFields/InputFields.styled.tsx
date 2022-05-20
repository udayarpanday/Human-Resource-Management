import styled from "styled-components";
import { device } from "../../styles/Breakpoints";

export const LoginInputFieldStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 20px;
  position: relative;

  label {
    width: 100%;
    padding-bottom: 10px;
  }

  input {
    width: 100%;
    height: 40px;
    padding: 0 45px;
    outline: none;
    border-radius: none;
  }
  svg {
    color: #000;
    position: absolute;
    height: 24px;
    width: 25px;
    top: 37px;
    left: 15px;
  }
`;

export const ProfileInputFieldStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 20px;
  position: relative;

  label {
    width: 100%;
    padding-bottom: 10px;
    color: #686868;
  }

  input,
  select {
    width: 100%;
    height: 40px;
    padding: 0 10px;
    outline: none;
    border: 1px solid #ced4da;
    border-radius: 3px;
  }
  p {
    color: red;
  }
`;
export const MultiSelectFieldStyles = styled.div`
  label {
    width: 100%;
    color: #686868;
  }
  input {
    height: 30px;
  }
  p {
    color: red;
  }
`;
export const MultiStyles = styled.div`
  padding-top: 10px;
`;

export const EmployeeInputFieldStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  label {
    width: 100%;
    padding-bottom: 10px;
    color: #686868;
  }
  input,
  select {
    height: 40px;
    padding: 0 10px;
    outline: none;
    border: 1px solid #ced4da;
    border-radius: 3px;
  }
  p {
    color: red;
  }
  @media ${device.tablet} {
    :first-of-type {
      padding-bottom: 10px;
    }
  }
`;

export const ModalInputFieldStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 30px;
  padding-bottom: 20px;
  label {
    color: #686868;
    font-weight: 500;
  }
  div {
    :first-of-type {
      width: 150px;
    }
  }
  input,
  select {
    padding: 10px 25px;
    width: 285px;
    height: 40px;
    outline: none;
    border: 1px solid #ced4da;
    border-radius: 3px;
  }
  p {
    color: red;
  }
`;

export const DateInputFieldStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-right: 30px;
  padding-bottom: 20px;
  position: relative;
  label {
    color: #686868;
    font-weight: 500;
    width: 100%;
    padding-bottom: 10px;
  }
  input {
    padding: 10px 25px;
    width: 285px;
    height: 40px;
    outline: none;
    border: 1px solid #ced4da;
    border-radius: 3px;
  }
  p {
    color: red;
  }
`;

export const ModalTextAreaStyles = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 30px;
  padding-bottom: 20px;
  div {
    :first-of-type {
      width: 150px;
    }
    width: calc(100% - 150px);
  }
  label {
    color: #686868;
    font-weight: 500;
  }
  input {
    padding: 10px 25px;
    width: 320px;
    height: 40px;
    outline: none;
    border: 1px solid #ced4da;
    border-radius: 3px;
  }
  textarea {
    width: 748px;
    outline: none;
    resize: none;
    border: 1px solid #ced4da;
    border-radius: 3px;
    height: 184px;
    padding: 10px 20px;
  }
  p {
    color: red;
  }
`;
