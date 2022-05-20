import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap');

*{
    box-sizing:border-box;
}

body {
    font-size: 16px;
    color: black;
    font-family: 'Manrope', sans-serif;
    padding: 0px;
    margin: 0px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  ul,
  li,
  p {
    padding: 0;
    margin: 0;
  }
  
  h1 {
    font-size: 36px;
    font-weight: 600;
  }
  
  h2 {
    font-size: 30px;
    font-weight: 500;
  }
  
  h3 {
    font-size: 28px;
    font-weight: 400;
  }
  
  h4 {
    font-size: 24px;
    font-weight: bold;
  }
  
  h5 {
    font-size: 18px;
    font-weight: bold;
  }
  h6{
    font-size: 16px;
    font-weight: bold;
  }
  
  ul li {
    text-decoration: none;
    list-style: none;
    font-weight: 400;
    font-size: 14px;
    cursor: pointer;
  }

  label{
    font-size: 18px;
    font-weight: 500;
  }
  
  a {
    text-decoration: none;
    color: #1c1c1c;
    font-weight: 400;
  }
  
  img {
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
       object-fit: cover;
  }
  
  p {
    font-size: 14px;
  }

  button{
    font-size: 18px;
  }

  input,select,textarea{
    font-family: 'Manrope', sans-serif !important;
    font-size: 16px;
    ::placeholder{
      color: #CACACA;
    }
  }

`;

export default GlobalStyles;
