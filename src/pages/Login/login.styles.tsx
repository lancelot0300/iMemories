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
    max-width: 300px;
    padding: 5px;
    border-radius: 5px;
    border: ${(props) => (props.$isError ? "2px solid red" : "1px solid #ccc")};

`