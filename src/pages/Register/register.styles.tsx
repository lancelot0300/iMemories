import styled from "styled-components";

export const LoginContainer = styled.div`
  height: 100vh;
  background: url("./images/background.jpg") no-repeat center center/cover;
`;

export const FormWrapper = styled.div`
  width: 400px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  @media (max-width: 600px) {
    width: 90%;
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
  width: 100%;
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
  padding: 5px;
  border-radius: 5px;
  border: ${(props) => (props.$isError ? "2px solid red" : "1px solid #ccc")};
  &::placeholder {
    text-align: center;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
`;
