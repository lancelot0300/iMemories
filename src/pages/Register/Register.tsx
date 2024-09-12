import * as yup from "yup";
import { useFormik } from "formik";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useAppDispatch } from "../../state/store";
import { loginSuccess } from "../../state/features/auth/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Header,
  Logo,
  RegisterInfo,
  FormWrapper,
  LoginContainer,
  InputWrapper,
  Button,
  StyledField,
  InformationWrapper,
} from "../Login/login.styles";

type ILoginFormValues = {
  Email: string;
  Username: string;
  Password: string;
  ConfirmPassword: string;
};

type IError = {
  description: string;
};

function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    Email: yup.string().email().required("Email is required"),
    Username: yup.string().min(5).required("Login is required"),
    Password: yup.string().min(5).required("Password is required"),
    ConfirmPassword: yup
      .string()
      .oneOf([yup.ref("Password")], "Passwords must match"),
  });

  const onSubmit = async ({ Username, Password, Email }: ILoginFormValues) => {
    try {
      const register = await axios.post(
        process.env.REACT_APP_API_URL + "/user/register",
        {
          Username,
          Password,
          Email,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(loginSuccess(register.data));

      const sessionExpiry = new Date(new Date().getTime() + 30 * 60000);
      localStorage.setItem("sessionTill", sessionExpiry.toString());

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
      Email: "",
      Username: "",
      Password: "",
      ConfirmPassword: "",
    },
    onSubmit,
    validationSchema: schema,
  });

  return (
    <LoginContainer>
      <InformationWrapper>
        <FormWrapper>
          <Logo src="./images/logo-color.svg" alt="logo" />
          <Header> Register </Header>
          <form onSubmit={handleSubmit} title="Login">
            <InputWrapper>
              <StyledField
                id="Email"
                name="Email"
                type="email"
                placeholder="Email"
                value={values.Email}
                onChange={handleChange}
                $isError={!!errors.Email || status}
              />
              <ErrorMessage $isError={!!errors.Email}>
                {touched.Email ? errors.Email : ""}
              </ErrorMessage>
            </InputWrapper>

            <InputWrapper>
              <StyledField
                id="Username"
                name="Username"
                placeholder="Username"
                value={values.Username}
                onChange={handleChange}
                $isError={!!errors.Username || status}
              />
              <ErrorMessage $isError={!!errors.Username}>
                {touched.Username ? errors.Username : ""}
              </ErrorMessage>
            </InputWrapper>

            <InputWrapper>
              <StyledField
                type="password"
                id="Password"
                name="Password"
                placeholder="Password"
                value={values.Password}
                onChange={handleChange}
                $isError={!!errors.Password || status}
              />
              <ErrorMessage $isError={!!errors.Password && !!touched.Password}>
                {touched.Password ? errors.Password : ""}
              </ErrorMessage>
            </InputWrapper>

            <InputWrapper>
              <StyledField
                type="password"
                id="ConfirmPassword"
                name="ConfirmPassword"
                placeholder="Confirm Password"
                value={values.ConfirmPassword}
                onChange={handleChange}
                $isError={!!errors.ConfirmPassword || status}
              />
              <ErrorMessage $isError={!!errors.Password && !!touched.Password}>
                {touched.ConfirmPassword ? errors.ConfirmPassword : ""}
              </ErrorMessage>
            </InputWrapper>
            <ErrorMessage $isError={status}>{status}</ErrorMessage>

            <Button type="submit">Submit</Button>
          </form>
          <RegisterInfo onClick={() => navigate("/login")}>
            Already account? Log in!
          </RegisterInfo>
        </FormWrapper>
      </InformationWrapper>
    </LoginContainer>
  );
}

export default Register;
