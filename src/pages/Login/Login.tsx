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
import { useAppDispatch } from "../../hooks/stateHook/useStateHook";
import { loginSuccess } from "../../state/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      const login = await axios.post(process.env.REACT_APP_API_URL + "/user/login", {
        Username,
        Password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      localStorage.setItem("user", JSON.stringify(login.data));
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
      Username: "",
      Password: "",
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
            <StyledField id="Username" name="Username" placeholder="Username" value={values.Username} onChange={handleChange} $isError={!!errors.Username || status}/>
            <ErrorMessage $isError={!!errors.Username}>
              {touched.Username ? errors.Username : ""}
            </ErrorMessage>
          </InputWrapper>

          <InputWrapper>
            <StyledField type="password" id="Password" name="Password" placeholder="Password" value={values.Password} onChange={handleChange} $isError={!!errors.Password || status} />
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
