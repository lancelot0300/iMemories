import styled from "styled-components";

export const LoginContainer = styled.div`
  height: 100svh;
  min-height: 650px;
  background: url("./images/background.jpg") no-repeat center center/cover;

`;

export const FormWrapper = styled.div`
  position: relative;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  padding: 20px;

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Button = styled.button`
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #6c2d27;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #8a3d36;
  }

  &:active {
    background-color: #6c2d27;
  }
`;
export const StyledField = styled.input<{ $isError?: boolean }>`
  width: 100%;
  max-width: 400px;
  padding: 5px;
  border-radius: 5px;
  border: ${(props) => (props.$isError ? "2px solid red" : "1px solid #ccc")};

  &::placeholder {
    text-align: center;
    color: #ccc;
  }
`;

export const RegisterInfo = styled.p`
  color: #fff;
  font-size: 1.5rem;
  text-align: center;
  margin-top: 10px;
  cursor: pointer;
  a {
    color: white;
  }
`;

export const Header = styled.h1`
  color: #6c2d27;
  font-size: 4rem;
  text-align: center;
  margin: 40px 0 0;
`;

export const RememberMe = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #fff;
  font-size: 2rem;
  margin-top: 10px;
  cursor: pointer;

  input {
    cursor: pointer;
    scale: 1.5;
  }
`;

export const Logo = styled.img`
  position: absolute;
  border-radius: 50%;
  opacity: 0.9;
  filter: drop-shadow(0 0 10px #000);
  z-index: 1;
  width: 150px;
  height: 150px;
  top: -95px;
`;

export const InformationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;
  align-items: center;
  justify-content: center;
  gap: 110px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;

  @media (max-width: 450px) {
    flex-direction: column;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }

  @media (max-width: 1024px) {
    gap: 50px;
  }

    @media (max-height: 600px) {
    transform: translateX(-50%);
    top: 100px;
    left: 50%;
  }
`;

export const AboutUs = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  font-size: 1.5rem;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  text-align: justify;
  padding: 20px;
  color: #000;
  font-size: 16px;

  h1 {
    color: #6c2d27;
    font-size: 2.5rem;
    text-align: center;
    margin: 10px 0;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;
