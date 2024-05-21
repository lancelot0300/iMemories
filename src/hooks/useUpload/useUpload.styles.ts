import styled from "styled-components";


export const UploadForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const UploadFormTitle = styled.h1`
    font-size: 20px;
    color: #fff;
`;

export const UploadFormInput = styled.input`
    display: none;
`;

export const UploadFormButton = styled.button`
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.1);
    color: #fff;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
`;

export const UploadCustomButton = styled.label`
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.1);
    color: #fff;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
`;
