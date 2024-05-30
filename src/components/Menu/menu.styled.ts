import styled from "styled-components";

export const MenuWrapper = styled.div`
    height: 50px;
    background-color: var(--background-color);
    border-bottom: 1px solid rgba(255,255,255,0.1);
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 20px;
    color: var(--text-color);
    gap: 20px;
    position: sticky;
    top: 0;
z-index: 1000;
`;

export const Navigation = styled.div`
    display: flex;
    gap: 10px;
    cursor: pointer;
    color: var(--text-color);
`;

type NavigationOptionProps = {
    $disabled?: boolean;
}

export const NavigationOption = styled.div<NavigationOptionProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    transition: background-color 0.2s;
    &:hover {
        background-color: ${({ $disabled }) => $disabled ? 'transparent' : 'rgba(255,255,255,0.1)'};
    }
    color: ${({ $disabled }) => $disabled ? 'rgba(255,255,255,0.5)' : 'inherit'};
`;

export const CurrentPath = styled.span`
    font-size: 16px;
    font-weight: 500;
    margin-left: 20px;
    user-select: none;
    min-width: 200px;
    background-color: rgba(255,255,255,0.1);
    padding: 5px 10px;
    border-radius: 5px;
`;


export const MenuItem = styled.div`
    cursor: pointer;
    padding: 10px;
    user-select: none;

    &:hover {
        background-color: rgba(255,255,255,0.1);
    }
`;

export const PathSpan = styled.span`
    cursor: pointer;
    color: var(--text-color);
    user-select: none;

    &:hover {
        text-decoration: underline;
    }
`;