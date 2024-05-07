import { useRef, useState } from "react";
import { ActiveFiles, SelectedElements } from "../../types";

type Props = {
    containerRef: React.MutableRefObject<HTMLDivElement | null>
}

function useSelection({containerRef} : Props) {

    const [selectedElements, setSelectedElements] = useState<SelectedElements>([]);
    const allFilesRefs = useRef<(ActiveFiles)[]>([]);

  
    const draggingRef = useRef(false);
    const isClicked = useRef(false);
    const startPosRef = useRef({ x: 0, y: 0 });
    const endPosRef = useRef({ x: 0, y: 0 });
    const selectDiv = useRef<HTMLDivElement | null>(null);

    const createSelection = (x: number, y: number, width: number, height: number) => {
        if (!containerRef.current) return;

        if (!selectDiv.current) {
            selectDiv.current = document.createElement('div');
            containerRef.current.appendChild(selectDiv.current);
        }

        selectDiv.current.style.display = 'block';
        selectDiv.current.style.width = `${width}px`;
        selectDiv.current.style.height = `${height}px`;
        selectDiv.current.style.position = 'absolute';
        selectDiv.current.style.top = `${y}px`;
        selectDiv.current.style.left = `${x}px`;
        selectDiv.current.style.border = '1px solid black';
        selectDiv.current.style.backgroundColor = 'rgba(255,255,255,0.05)';
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (allFilesRefs.current.some((el) => el.ref?.contains(e.target as Node))) return;
        startPosRef.current = { x: e.clientX, y: e.clientY };
        endPosRef.current = { x: e.clientX, y: e.clientY };
        isClicked.current = true;
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (isClicked.current === false) return;
        if (Math.min(startPosRef.current.x, endPosRef.current.x) > 1000 && Math.min(startPosRef.current.y, endPosRef.current.y) > 1000) {
            draggingRef.current = true;
        }
        endPosRef.current = { x: e.clientX, y: e.clientY };
        createSelection(
            Math.min(startPosRef.current.x, endPosRef.current.x),
            Math.min(startPosRef.current.y, endPosRef.current.y),
            Math.abs(startPosRef.current.x - endPosRef.current.x),
            Math.abs(startPosRef.current.y - endPosRef.current.y)
        );
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        isClicked.current = false;

        if (!selectDiv.current) return false;
      
            selectDiv.current.remove();
            selectDiv.current = null;

            if (!containerRef.current) return;

            const selectedItems = allFilesRefs.current.filter((el) => {
                if (!el || !el.ref) return false;
                const rect = el.ref.getBoundingClientRect();
                return (
                    rect.x < Math.max(startPosRef.current.x, endPosRef.current.x) &&
                    rect.x + rect.width > Math.min(startPosRef.current.x, endPosRef.current.x) &&
                    rect.y < Math.max(startPosRef.current.y, endPosRef.current.y) &&
                    rect.y + rect.height > Math.min(startPosRef.current.y, endPosRef.current.y)
                );
            }).map(el => el.item);

            if (selectedItems.length !== 0) {
                setSelectedElements(selectedItems);
            }
            draggingRef.current = false;
        
    };

    const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
        if (allFilesRefs.current.some((el) => el.ref?.contains(e.target as Node))) return;
        if (endPosRef.current.x === startPosRef.current.x && endPosRef.current.y === startPosRef.current.y) {
            draggingRef.current = false;
            if (!containerRef.current || selectedElements.length === 0) return;
            setSelectedElements([]);
        }
    }

    const handleMouseLeave = () => {
        draggingRef.current = false;
        selectDiv.current?.remove();
        selectDiv.current = null;
        isClicked.current = false
    }

    return {handleMouseUp, handleMouseMove, handleMouseDown, handleClickOutside, handleMouseLeave, draggingRef, selectedElements, setSelectedElements, allFilesRefs}

}

export default useSelection