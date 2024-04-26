import styled from "styled-components";



export const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: var(--appHeight);
`;

export const FolderGridContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: left;
    align-items: flex-start;
    align-content: flex-start;
    gap: 20px;
    padding: 20px;
    width: 100%;
    height: 100%;
`;

