import React, {  useEffect, useRef } from "react";
import { ActiveFiles } from "../../types";
import { useAppDispatch, useAppSelector } from "../stateHook/useStateHook";
import { selectFiles } from "../../state/features/filesManager/filesSlice";

type Props = {
    containerRef: React.MutableRefObject<HTMLDivElement | null>
}

function useSelection({containerRef} : Props) {
    const { selectedFiles } = useAppSelector((state) => state.selectedFiles);
    const dispatch = useAppDispatch();
    const allFilesRefs = useRef<(ActiveFiles)[]>([]);
  
    const draggingRef = useRef(false);
    let {current: isClickedFlag} = useRef(false);
    let {current: startPos} = useRef<{ x: number; y: number } | null>(null);
    let {current: endPos } = useRef<{ x: number; y: number } | null>(null);
    let {current: selectDiv} = useRef<HTMLDivElement | null>(null);

    const { current: allFiles } = allFilesRefs;
    let { current: dragging } = draggingRef;
    
    const isClickedContainer = (e?: React.MouseEvent<HTMLDivElement>) => {
        if(e?.target === undefined) return true;
        return e?.target === containerRef.current || e?.target === containerRef.current?.firstChild;
    }

    const isFolderTypeChild = (e?: React.MouseEvent<HTMLDivElement>) => {
        return allFilesRefs.current.some((el) => el.ref?.contains(e?.target as Node));
    }

    const createSelection = (x: number, y: number, width: number, height: number) => {
        const div = selectDiv || document.createElement('div');
        const style = div.style;
    
        style.display = 'block';
        style.width = `${width}px`;
        style.height = `${height}px`;
        style.position = 'absolute';
        style.top = `${y}px`;
        style.left = `${x}px`;
        style.border = '1px solid black';
        style.backgroundColor = 'rgba(255,255,255,0.05)';
    
        if (!selectDiv) {
            containerRef.current?.appendChild(div);
            selectDiv = div;
        }
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if(!isClickedContainer(e)) return;
        if(dragging) return;

        console.log("mouse down")
        startPos = { x: e.clientX, y: e.clientY };
        endPos = { x: e.clientX, y: e.clientY };
        isClickedFlag = true;
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isClickedFlag || !startPos) return;
        const { clientX: mouseX, clientY: mouseY } = e;
        
        endPos = { x: e.clientX, y: e.clientY };


        if(startPos.x > endPos.x) endPos.x += 1;
        if(startPos.y > endPos.y) endPos.y += 1;


        const selectedItems = allFiles.filter((el) => {
            if (!el || !el.ref) return false;
            const rect = el.ref.getBoundingClientRect();
            if(!startPos || !endPos) return false;
            return (
                rect.x < Math.max(startPos.x, endPos.x) &&
                rect.x + rect.width > Math.min(startPos.x, endPos.x) &&
                rect.y < Math.max(startPos.y, endPos.y) &&
                rect.y + rect.height > Math.min(startPos.y, endPos.y)
            );
        })
        
        selectedItems.forEach((el) => {
            if (el.ref) {
                el.ref.style.backgroundColor = 'rgba(255,255,255,0.1)';
            }
        });

        allFiles.forEach((el) => {
            if (el.ref && !selectedItems.includes(el)) {
                el.ref.style.backgroundColor = '';
            }
        });



        const deltaX = Math.abs(startPos.x - mouseX);
        const deltaY = Math.abs(startPos.y - mouseY);
    
        if (deltaX < 20 && deltaY < 20) {
            resetSelection();
            return;
        }

        if (!dragging) dragging = true;

        createSelection(
            Math.min(startPos.x, endPos.x),
            Math.min(startPos.y, endPos.y),
            Math.abs(startPos.x - endPos.x),
            Math.abs(startPos.y - endPos.y)
        );
    };

    const resetSelection = () => {
        selectDiv?.remove();
        selectDiv = null;
        dragging = false;
    };

    const handleMouseUp = () => {
        if (!isClickedFlag) return;

        console.log("mouse up")
        allFiles.forEach((el) => {
            if (el.ref) {
                el.ref.style.backgroundColor = '';
            }
        });

        isClickedFlag = false;
        dragging = false;
    
        selectDiv?.remove();
        selectDiv = null;
    };

    
    const handleClick = (e?: React.MouseEvent<HTMLDivElement>) => {
       
        if(!isClickedContainer(e)) return;
        console.log("click event")
        const selectedItems = allFiles.filter((el) => {
            if (!el || !el.ref) return false;
            const rect = el.ref.getBoundingClientRect();
            if(!startPos || !endPos) return false;
            return (
                rect.x < Math.max(startPos.x, endPos.x) &&
                rect.x + rect.width > Math.min(startPos.x, endPos.x) &&
                rect.y < Math.max(startPos.y, endPos.y) &&
                rect.y + rect.height > Math.min(startPos.y, endPos.y)
            );
        }).map(el => el.item);



       if(selectedItems.length === 0 && selectedFiles.length === 0) return
       dispatch(selectFiles(selectedItems));

    }

    const handleClickOutside = () => {

        if(!isClickedFlag) return;
        if(!dragging) return;

        handleMouseUp();
        handleClick();
    };



    const handleMouseLeave = () => {
        window.addEventListener('mouseup', handleClickOutside, {once: true});
    };


    return {handleMouseUp, handleMouseMove, handleMouseDown, handleMouseLeave, handleClick, draggingRef, allFilesRefs}

}

export default useSelection