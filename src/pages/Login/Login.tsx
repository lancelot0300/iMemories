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

interface ILoginFormValues {
  Username: string;
  Password: string;
}

function Login() {
  const schema = yup.object().shape({
    Username: yup.string().min(5).required("Login is required"),
    Password: yup.string().min(5).required("Password is required"),
  });

  const onSubmit = async ({ Username, Password }: ILoginFormValues) => {
    alert(`Email: ${Username}, Password: ${Password}`);
  };

  const {
    values,
    errors,
    touched,
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
            <StyledField id="Username" name="Username" placeholder="Username" value={values.Username} onChange={handleChange}/>
            <ErrorMessage $isError={!!errors.Username}>
              {touched.Username ? errors.Username : ""}
            </ErrorMessage>
          </InputWrapper>

          <InputWrapper>
            <StyledField id="Password" name="Password" placeholder="Password" value={values.Password} onChange={handleChange}/>
            <ErrorMessage $isError={!!errors.Password && !!touched.Password}>
              {touched.Password ? errors.Password : ""}
            </ErrorMessage>
          </InputWrapper>

          <Button type="submit">Submit</Button>
        </form>
      </FormWrapper>
    </LoginContainer>
  );
}

export default Login;
