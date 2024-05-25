import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { ActiveFiles, ContextRef, Item } from "../../types";
import { FileElementContainer, Icon, Name } from "./fileElement.styles";
import useFile from "../../hooks/useFile/useFile";
import { useAppSelector } from "../../hooks/stateHook/useStateHook";
import FileContextMenu from "../ContextComponents/FileContextMenu/FileContextMenu";
import { renderIcon } from "../../utils/iconsUtils";

interface IProps {
  element: Item;
  clearDrag: () => void;
}

const FileElement = forwardRef<ActiveFiles, IProps>(
  ({ element, clearDrag }, ref) => {
    const fileElementRef = useRef<HTMLDivElement>(null);
    const contextMenuRef = useRef<ContextRef>();

    
    const {selectedFiles} = useAppSelector((state) => state.files, (prev, next) => {
      const wasSelected = prev.selectedFiles.some((el) => el.id === element.id);
      const isSelected = next.selectedFiles.some((el) => el.id === element.id);
      return wasSelected === isSelected && (!isSelected || !wasSelected);
    });

    const {copyFiles} = useAppSelector((state) => state.files, (prev, next) => {
      const wasSelected = prev.copyFiles.some((el) => el.id === element.id);
      const isSelected = next.copyFiles.some((el) => el.id === element.id);
      return wasSelected === isSelected ;
    });


    const {setActiveElement, isActive, isCopy, setActiveOnRightClick} = useFile({element, selectedFiles, copyFiles});
   

    useImperativeHandle(ref, () => ({
      element: fileElementRef.current as HTMLDivElement,
      item: element
    }));

    const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      console.log("double click");
    };

    const lastTimeClick = useRef(0);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      const clickTime = new Date().getTime();
      const timeSinceLastClick = clickTime - lastTimeClick.current;

      if (timeSinceLastClick < 300) {
        return handleDoubleClick(event);
      }

      lastTimeClick.current = clickTime;
      setActiveElement(event);
    };


    const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      clearDrag();
      setActiveOnRightClick(e);
      contextMenuRef.current?.handleOpenContext(e, true);
    };



    return (
      <>
      {console.log(selectedFiles)}
        <FileElementContainer
          ref={fileElementRef}
          onClick={handleClick}
          onContextMenu={handleRightClick}
          $isSelected={isActive}
          $isCopy={isCopy}
        >
          <Icon><img width={45} height={45} src={renderIcon(element.fileDetails.extension)} draggable='false' alt="" /></Icon>
          <Name>{element.fileDetails.name}</Name>
        </FileElementContainer>
        <FileContextMenu  ref={contextMenuRef} />
      </>
    );
  }
);


export default FileElement;