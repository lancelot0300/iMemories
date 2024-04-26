import styled from 'styled-components';

export const NavBarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: #212121;
    color: #fff;
    height: var(--navBarHeight);
`;

export const NavBarItem = styled.div`
    cursor: pointer;
    padding: 10px;
    user-select: none;

    &:hover {
        background-color: #424242;
    }
`;

export const RightOptionsWrapper = styled.div`
    display: flex;
    gap: 20px;
`;

export const LeftOptionsWrapper = styled.div`
    display: flex;
    gap: 20px;
`;