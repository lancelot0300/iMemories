import styled from "styled-components"


export const LoginContainer = styled.div`
    height: 100vh;
`

export const FormWrapper = styled.div`
    width: 400px;
    height:400px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
`

export const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`

export const Button = styled.button`
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: var(--btn-color);
    color: #fff;
    cursor: pointer;
`
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

`

export const RegisterInfo = styled.p`
    color: #fff;
    font-size: 1.5rem;
    text-align: center;
    margin-top: 10px;
    cursor: pointer;
    a {
        color:  white;
    }
`

export const Header = styled.h1`
    color: #fff;
    font-size: 3rem;
    text-align: center;
    margin-bottom: 20px;
`