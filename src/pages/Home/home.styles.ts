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
    min-height: calc(100vh - 100px);
    border: 2px dashed var(--background-color);
`;


type ContainerProps = {
  $isDragging?: boolean;
}
export const HomeContainer = styled.div<ContainerProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: var(--appHeight);
    cursor: ${({ $isDragging }) => $isDragging ? 'crosshair' : 'default'};


    &.dragging ${FolderGridContainer} {
      border: 2px dashed #212121;
    }
`;


