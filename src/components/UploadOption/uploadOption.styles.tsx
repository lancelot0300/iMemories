import styled from "styled-components";

export const UploadModal = styled.div`
    min-width: 300px;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    color: #212121;
`;

export const UploadForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const UploadFormTitle = styled.h1`
    font-size: 20px;
    color: #212121;
`;

export const UploadFormInput = styled.input`
    display: none;
`;

export const UploadFormButton = styled.button`
    padding: 10px;
    background-color: #212121;
    color: #fff;
    border: none;
    cursor: pointer;
`;

export const UploadCustomButton = styled.label`
    padding: 10px;
    background-color: #212121;
    color: #fff;
    border: none;
    cursor: pointer;
`;
