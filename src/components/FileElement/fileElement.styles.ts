import styled from 'styled-components';

export const Icon = styled.div`
    flex-shrink: 0;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;

    img {
        user-select: none;
    }
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
    $isCopy?: boolean;
}

export const FileElementContainer = styled.div<FolderTypeProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border-radius: 5px;
    width: 100px;
    cursor: pointer;
    transition: background-color 0.2s;
    background-color: ${({ $isSelected }) => $isSelected ? 'rgba(255,255,255,0.15)' : 'var(--background-color)'};
    opacity: ${({ $isCopy }) => $isCopy ? '0.5' : '1'};

        &.active {
            ${Icon}, ${Name} {
                color: #000; 
            }
        }

    &:hover {
        background-color: ${({ $isSelected }) => $isSelected ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)'};
    }
       
    &.hoverActive {
        background-color: rgba(255,255,255,0.1);
    }
`;

type ContextWrapperProps = {
    $posX: number
    $posY: number
}

export const ContextWrapper = styled.div<ContextWrapperProps>`
    display: flex;
    flex-direction: column;
    gap: 5px;
    position: fixed;
    left: ${({ $posX }) => $posX + "px" || "50%"};
    top: ${({ $posY }) => $posY + "px" || "50%"};
    ${({ $posY, $posX }) => $posY && $posX ? "" : "transform: translate(-50%, -50%)"};
    min-width: 150px;
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    background-color: rgba(17, 25, 40, 0.75);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.125);
    padding: 5px;
`
export const ContextOption = styled.div`
    display:flex;
    flex-direction:row;
    gap:15px;
    padding: 6px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s;
    user-select: none;
    align-items: center;

    &:hover {
        background: rgba(75, 75, 75, 0.46);
        
    }
`
