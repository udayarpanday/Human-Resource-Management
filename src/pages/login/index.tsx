import React, { useEffect, useState } from "react";

import {
  HomePageContainer,
  LoginFooter,
  LoginHeader,
  LoginContainer,
  LogoContainer,
} from "./Login.styled";
import Logo from "../../images/Devfinity.svg";

import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";

import { LoginInputFieldStyles } from "../../components/inputFields/InputFields.styled";
import { PrimaryButton } from "../../components/buttons/Buttons.styled";
import { FaUserCircle } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { profileDetails } from "../profile/selector";
import { profileDetailsAsync } from "../profile/reducer";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type LoginForm = {
  emailAddress: string;
  password: string;
 
};

const Login = () => {
  let history = useHistory();

  const schema = yup.object().shape({
    emailAddress: yup
      .string()
      .email("Please enter a registered email")
      .required("Please enter your email address"),
    password: yup.string().required("Please enter your password."),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });

  const [loggedUser, setUser] = useState(null);
  const [error, setLoginError] = useState(false);

  const submitForm = (data: LoginForm) => {
    const UserEmail = data.emailAddress;
    const UserPassword = data.password;
    profileData.forEach((element: any) => {
      if (
        UserEmail === element.EmailAddress &&
        UserPassword === element.Password
      ) {
        localStorage.setItem("user", JSON.stringify(element));
        setUser(element);
        setLoginError(false);
        history.push("/dashboard");
        toast.success("Logged in");
      } else {
        console.log("Error");
        setLoginError(true);
      }
    });
  };

  const profileData = useAppSelector(profileDetails);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(profileDetailsAsync());
  }, []);

  return (
    <>
      <ToastContainer autoClose={2000} />
      <HomePageContainer>
        <LogoContainer>
          <img src={Logo} alt="Devfinity Logo" />
        </LogoContainer>
        <LoginHeader>
          <form onSubmit={handleSubmit(submitForm)}>
            <h3>Login</h3>
            <LoginContainer>
              <LoginInputFieldStyles>
                <label>Email Address</label>
                <input
                  type="text"
                  {...register("emailAddress")}
                  placeholder="Email Address"
                ></input>
                <p>{errors.emailAddress?.message}</p>
                <FaUserCircle />
              </LoginInputFieldStyles>
              <LoginInputFieldStyles>
                <label>Password</label>
                <input
                  type="password"
                  {...register("password")}
                  placeholder="Password"
                ></input>
                <p>{errors.password?.message}</p>
                <IoIosLock />
              </LoginInputFieldStyles>
              {error && !errors.password?.message ? (
                <>
                  <p>Please login with correct credentials</p>
                </>
              ) : (
                <></>
              )}
            </LoginContainer>
            <LoginFooter>
              <Link to="/login/recovery">Forgot Password?</Link>
              <PrimaryButton>
                <button>Login</button>
              </PrimaryButton>
            </LoginFooter>
          </form>
        </LoginHeader>
      </HomePageContainer>
    </>
  );
};

export default Login;
