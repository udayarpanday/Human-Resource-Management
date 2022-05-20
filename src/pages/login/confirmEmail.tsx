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
import { FaUserCircle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { profileDetails } from "../profile/selector";
import { profileDetailsAsync,updatePasswordId } from "../profile/reducer";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type RecoveryForm = {
  emailAddress: string;
};

const Forget = () => {
  let history = useHistory();

  const schema = yup.object().shape({
    emailAddress: yup
      .string()
      .email("Please enter a registered email")
      .required("Please enter your email address"),

  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecoveryForm>({
    resolver: yupResolver(schema),
  });

  const submitForm = (data: RecoveryForm) => {
    const UserEmail = data.emailAddress;

    const user = profileData.find((element: any) => {


      if (element.EmailAddress === UserEmail) {
        dispatch(updatePasswordId(element.id))

        return (
          element.EmailAddress)
      }

    });
    if (user) {
      toast.success("Sucessfully changed email")
      history.push("/password/confirm");
    } else {
      toast.warn("Your email is not validate")
    }
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
          <img src={Logo} alt="HR Logo" />
        </LogoContainer>
        <LoginHeader>
          <form onSubmit={handleSubmit(submitForm)}>
            <h3>Forget Email</h3>
            <LoginContainer>

              <LoginInputFieldStyles>
                <label>Enter your recovery email </label>
                <input
                  type="text"
                  {...register("emailAddress")}
                  placeholder="Email Address"
                ></input>
                <p>{errors.emailAddress?.message}</p>
                <FaUserCircle />
              </LoginInputFieldStyles>

            </LoginContainer>
            <LoginFooter>
              <Link to="/">Back to Login</Link>
              <PrimaryButton>
                <button>Next</button>
              </PrimaryButton>
            </LoginFooter>
          </form>
        </LoginHeader>
      </HomePageContainer>
    </>
  );
};

export default Forget;
