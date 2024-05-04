import styled from "styled-components";

export const FolderGridContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: left;
    align-items: flex-start;
    align-content: flex-start;
    gap: 20px;
    margin: 20px;
    width: calc(100% - 40px);
    height: 100%;
    border: 2px dashed var(--background-color);

`;



export const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: var(--appHeight);

    &.dragging ${FolderGridContainer} {
      border: 2px dashed #212121;
    }
`;

