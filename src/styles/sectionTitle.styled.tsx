import styled from "styled-components";

export const SectionTitleStyles = styled.div`
  text-align: left;
  h4 {
    font-weight: bold;
    position: relative;
    &::after {
      position: absolute;
      bottom: -10px;
      left: 0;
      content: "";
      border-bottom: 5px solid #ee3524;
      width: 100px;
    }
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 60px;
  border-bottom: 1px solid #e5e5e5;
`;

export const ModalHeader = styled.div`
  text-align: center;
  padding: 10px 0;
  border-bottom: 2px solid #ee3524;
  position: relative;
  h5 {
    font-size: 28px;
    font-weight: bold;
  }
  svg {
    cursor: pointer;
    position: absolute;
    top: -20px;
    right: -20px;
    content: "";
    width: 24px;
    height: 24px;
  }
`;

export const DeleteModalHeader = styled.div`
  text-align: left;
  border: none;
  outline: none;
  svg {
    cursor: pointer;
    position: absolute;
    top: -20px;
    right: -20px;
    content: "";
    width: 24px;
    height: 24px;
  }
  h5 {
    padding-bottom: 10px;
  }
`;


