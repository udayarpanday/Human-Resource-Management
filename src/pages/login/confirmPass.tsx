import React, { useEffect } from "react";

import {
  HomePageContainer,
  LoginFooter,
  LoginHeader,
  LoginContainer,
  LogoContainer,
} from "./Login.styled";
import Logo from "../../images/Infinite.svg";

import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";

import { LoginInputFieldStyles } from "../../components/inputFields/InputFields.styled";
import { PrimaryButton } from "../../components/buttons/Buttons.styled";
import { IoIosLock } from "react-icons/io";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updatePassword } from "../profile/selector";
import {
  profileDetailsAsync,
  UpdatePasswordDetailsAsync,
} from "../profile/reducer";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type RecoveryForm = {
  password: string;
  confirmPassword: string;
};

const ConfirmPass = () => {
  let history = useHistory();

  const schema = yup.object().shape({
    password: yup
      .string()
      .min(6)
      .max(20)
      .required("Please enter your password."),

    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RecoveryForm>({
    resolver: yupResolver(schema),
  });

  const submitForm = (data: RecoveryForm) => {
    const UserPassword = data.password;
    const ConfirmPassword = data.confirmPassword;

    if (UserPassword === ConfirmPassword) {
      dispatch(
        UpdatePasswordDetailsAsync({ password: UserPassword, id: passwordId })
      ).then(() => {
        toast.success("Sucessfully changed password");
        setTimeout(() => {
          history.push("/");
        }, 1000);
      });
    } else {
      console.log("Error");
    }
  };

  const passwordId = useAppSelector(updatePassword);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(profileDetailsAsync());
  }, []);

  return (
    <>
      <ToastContainer autoClose={2000} />
      <HomePageContainer>
        <LogoContainer>
          <img src={Logo} alt="HR Logo" />
        </LogoContainer>
        <LoginHeader>
          <form onSubmit={handleSubmit(submitForm)}>
            <h3>Confirm your Password</h3>
            <LoginContainer>
              <LoginInputFieldStyles>
                <label>Enter your new Password</label>
                <input
                  type="password"
                  {...register("password")}
                  placeholder="Password"
                ></input>
                <p>{errors.password?.message}</p>
                <IoIosLock />
              </LoginInputFieldStyles>

              <LoginInputFieldStyles>
                <label>Confirm your New Password</label>
                <input
                  type="password"
                  {...register("confirmPassword")}
                  placeholder="New Password"
                ></input>
                <p>{errors.confirmPassword?.message}</p>
                <IoIosLock />
              </LoginInputFieldStyles>
            </LoginContainer>
            <LoginFooter>
              <Link to="/">Back To login</Link>
              <PrimaryButton>
                <button>Submit</button>
              </PrimaryButton>
            </LoginFooter>
          </form>
        </LoginHeader>
      </HomePageContainer>
    </>
  );
};

export default ConfirmPass;
