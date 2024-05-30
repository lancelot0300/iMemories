import React from "react";
import {
  FormWrapper,
  LoginContainer,
  InputWrapper,
  Button,
  StyledField,
} from "./login.styles";
import * as yup from "yup";
import { useFormik } from "formik";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useAppDispatch, useAppSelector } from "../../state/store"
import { loginSuccess } from "../../state/features/auth/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type ILoginFormValues = {
  Username: string;
  Password: string;
}

type IError = {
  description: string;
}

function Login() {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const schema = yup.object().shape({
    Username: yup.string().min(5).required("Login is required"),
    Password: yup.string().min(5).required("Password is required"),
  });

  const onSubmit = async ({ Username, Password }: ILoginFormValues) => {
    try {
      const login = await axios.post(process.env.REACT_APP_API_URL + "/user/login",
       {
        Username,
        Password,
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        },

        
      });

      dispatch(loginSuccess(login.data));
      navigate("/");

    } catch (error) {
      if (axios.isAxiosError<IError>(error)) {
        if (error.response) {
          setStatus(error.response.data.description);
        }
      }
    }


  };

  const {
    values,
    errors,
    touched,
    status,
    setStatus,
    handleChange,
    handleSubmit,
  } = useFormik<ILoginFormValues>({
    initialValues: {
      Username: "masza221",
      Password: "test1234",
    },
    onSubmit,
    validationSchema: schema,
  });

  return (
    <LoginContainer>
      <FormWrapper>
        <h1>Log in</h1>
        <form onSubmit={handleSubmit} title="Login">
          <InputWrapper>
            <StyledField id="Username" name="Username" autoComplete="username" placeholder="Username" value={values.Username} onChange={handleChange} $isError={!!errors.Username || status}/>
            <ErrorMessage $isError={!!errors.Username}>
              {touched.Username ? errors.Username : ""}
            </ErrorMessage>
          </InputWrapper>

          <InputWrapper>
            <StyledField type="password" autoComplete="current-password" id="Password" name="Password" placeholder="Password" value={values.Password} onChange={handleChange} $isError={!!errors.Password || status} />
            <ErrorMessage $isError={!!errors.Password && !!touched.Password}>
              {touched.Password ? errors.Password : ""}
            </ErrorMessage>
          </InputWrapper>
          <ErrorMessage $isError={status}>{status}</ErrorMessage>

          <Button type="submit">Submit</Button>
        </form>
      </FormWrapper>
    </LoginContainer>
  );
}

export default Login;
