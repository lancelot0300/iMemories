import { styled } from "styled-components";

export const Status = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #292929;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    width: 300px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    `;

export const StatusesWrapper = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: flex-end;
    gap: 10px;
    z-index: 100;
    width: 300px;
`;

export const StatusFileName = styled.p`
    white-space: nowrap;
    width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
`;