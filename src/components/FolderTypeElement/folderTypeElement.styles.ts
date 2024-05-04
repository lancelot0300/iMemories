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
export const FolderTypeElementContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border-radius: 5px;
    width: 100px;
    cursor: pointer;
    transition: background-color 0.2s;

    &.active {
        ${Icon}, ${Name} {
            color: #000; 
        }
    }

    &:hover {
        background-color: #414141;
    }

    &.active {
        background-color: #a5a5a5;
    }

    &:active {
        background-color: #bbb9b9;
    }


`;



