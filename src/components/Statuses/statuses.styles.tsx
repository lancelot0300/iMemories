import { styled } from "styled-components";

type StatusProps = {
    $status: "Uploading" | "Error" | "Finished";
}

export const Status = styled.div<StatusProps>`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    width: 300px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    background-color: rgba(17, 25, 40, 0.75);
    border-radius: 12px;
    border: 1px solid ${({ $status }) => $status === "Finished" ? "green" : $status === "Error" ? "red" : "blue"};
    pointer-events: all;
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
    pointer-events: none;
`;

export const StatusFileName = styled.p`
    white-space: nowrap;
    width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
`;