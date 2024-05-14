import React, { useRef } from "react";
import { ActiveFiles } from "../../types";
import { useAppDispatch } from "../stateHook/useStateHook";
import { addFiles, selectFiles } from "../../state/features/files/filesSlice";
import { isClickedContainer } from "../../utils/homeUtils";


type Props = {
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
  allFilesRefs: React.MutableRefObject<ActiveFiles[]>;
};

function useSelection({ containerRef, allFilesRefs }: Props) {
  const dispatch = useAppDispatch();

  const draggingRef = useRef(false);
  let { current: isClickedFlag } = useRef(false);
  let { current: startPos } = useRef<{ x: number; y: number } | null>(null);
  let { current: endPos } = useRef<{ x: number; y: number } | null>(null);
  let { current: selectDiv } = useRef<HTMLDivElement | null>(null);

  const { current: allFiles } = allFilesRefs;
  let { current: dragging } = draggingRef;


  const createSelection = (
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    const div = selectDiv || document.createElement("div");
    const style = div.style;

    style.display = "block";
    style.width = `${width}px`;
    style.height = `${height}px`;
    style.position = "fixed";
    style.top = `${y}px`;
    style.left = `${x}px`;
    style.border = "1px solid black";
    style.backgroundColor = "rgba(255,255,255,0.05)";

    if (!selectDiv) {
      containerRef.current?.appendChild(div);
      selectDiv = div;
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isClickedContainer( containerRef, e)) return;
    if (dragging) return;
    if(e.button !== 0) return;

    console.log("mouse down");
    startPos = { x: e.clientX, y: e.clientY };
    endPos = { x: e.clientX, y: e.clientY };
    isClickedFlag = true;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isClickedFlag || !startPos) return;
    const { clientX: mouseX, clientY: mouseY } = e;

    endPos = { x: e.clientX, y: e.clientY };

    if (startPos.x > endPos.x) endPos.x += 1;
    if (startPos.y > endPos.y) endPos.y += 1;

    const selectedItems = allFiles.filter((el) => {
      if (!el || !el.element) return false;
      if (!startPos || !endPos) return false;
      const rect = el.element.getBoundingClientRect();
      return (
        rect.x < Math.max(startPos.x, endPos.x) &&
        rect.x + rect.width > Math.min(startPos.x, endPos.x) &&
        rect.y < Math.max(startPos.y, endPos.y) &&
        rect.y + rect.height > Math.min(startPos.y, endPos.y)
      );
    });

    selectedItems.forEach((el) => {
      if (el?.element) {
        el.element.style.backgroundColor = "rgba(255,255,255,0.1)";
      }
    });

    allFiles.forEach((el) => {
      if (el?.element && !selectedItems.includes(el)) {
        el.element.style.backgroundColor = "";
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

  const clearDrag = () => {

    allFiles.forEach((el) => {
      if (el?.element) {
        el.element.style.backgroundColor = "";
      }
    });

    dragging = false;
    isClickedFlag = false;
    selectDiv?.remove();
    selectDiv = null;
}

  const handleClick = (e?: React.MouseEvent<HTMLDivElement>) => {
    if (!isClickedContainer( containerRef ,e)) return;
    if(!dragging && !isClickedFlag) return;

    clearDrag();

    const selectedItems: ActiveFiles[] = allFiles.filter((el) => {
      if (!el || !el.element) return false;
      if (!startPos || !endPos) return false;
      const rect = el.element.getBoundingClientRect();
      return (
        rect.x < Math.max(startPos.x, endPos.x) &&
        rect.x + rect.width > Math.min(startPos.x, endPos.x) &&
        rect.y < Math.max(startPos.y, endPos.y) &&
        rect.y + rect.height > Math.min(startPos.y, endPos.y)
      );
    });

    if(e?.ctrlKey) {
      return dispatch(addFiles(selectedItems.map((el) => el.item)));
    }
    
    dispatch(selectFiles(selectedItems.map((el) => el.item)));
  };


  const handleMouseLeave = () => {
    if (!isClickedFlag) return;
    if (!dragging) return;
    window.addEventListener("mouseup", () => handleClick(), { once: true });
  };

  return {
    handleMouseMove,
    handleMouseDown,
    handleMouseLeave,
    handleClick,
    draggingRef,
    allFilesRefs,
  };
}

export default useSelection;
