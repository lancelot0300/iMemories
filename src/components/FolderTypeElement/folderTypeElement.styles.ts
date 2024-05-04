import styled from 'styled-components';

export const Icon = styled.div`
    flex-shrink: 0;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
`;
export const Name = styled.span`
    font-size: 12px;
    font-weight: 500;
    color: #fff;
    text-align: center;
    user-select: none;
    white-space: pre-wrap;
    width: 80px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
`

type FolderTypeProps = {
    $isSelected: boolean;
}

export const FolderTypeElementContainer = styled.div<FolderTypeProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border-radius: 5px;
    width: 100px;
    cursor: pointer;
    transition: background-color 0.2s;
    background-color: ${({ $isSelected }) => $isSelected ? '#a5a5a5' : ''};

        &.active {
            ${Icon}, ${Name} {
                color: #000; 
            }
        }

    &:hover {
        background-color: ${({ $isSelected }) => $isSelected ? '#a5a5a5' : '#414141'};
    }

    ${Icon}, ${Name} {
        color: ${({ $isSelected }) => $isSelected ? '#000' : '#fff'};
    }

    &:active {
        background-color: #bbb9b9;
    }


`;



