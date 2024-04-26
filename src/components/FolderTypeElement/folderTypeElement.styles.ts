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
    height: 30px;
    user-select: none;
`
export const FolderTypeElementContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border-radius: 5px;
    width: 100px;
    height: 100px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #f9f9f9;
        ${Icon}, ${Name} {
            color: #000; 
        }
    }

    &:active {
        background-color: #bbb9b9;
    }


`;



