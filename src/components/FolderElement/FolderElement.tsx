import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { ActiveFiles, ContextRef, Folder, Item } from "../../types";
import { FolderElementContainer, Icon, Name } from "./folderElement.styles";
import { useAppSelector } from "../../state/store"
import ContextMenu from "../ContextMenu/ContextMenu";
import { faFolder } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  element: Folder;
  clearDrag: () => void;
}

const FolderElement = forwardRef<ActiveFiles | null, IProps>(
  ({ element, clearDrag }, ref) => {
    const fileElementRef = useRef<HTMLDivElement>(null);
    const contextMenuRef = useRef<ContextRef>();

    
    const {selectedFiles} = useAppSelector((state) => state.files, (prev, next) => {
      const wasSelected = prev.selectedFiles.some((el) => el.id === element.id);
      const isSelected = next.selectedFiles.some((el) => el.id === element.id);
      return wasSelected === isSelected;
    });

    const {copyFiles} = useAppSelector((state) => state.files, (prev, next) => {
      const wasSelected = prev.copyFiles.some((el) => el.id === element.id);
      const isSelected = next.copyFiles.some((el) => el.id === element.id);
      return wasSelected === isSelected;
    });


    // const {setActiveElement, isActive, isCopy, setActiveOnRightClick} = useFolder({element, selectedFolders, copyFolders});
   

    // useImperativeHandle(ref, () => ({
    //   element: fileElementRef.current as HTMLDivElement,
    //   item: element
    // }));

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
      // setActiveElement(event);
    };


    const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      clearDrag();
      // setActiveOnRightClick(e);
      contextMenuRef.current?.handleOpenContext(e, true);
    };





    return (
      <>
       {console.log("render file")}
        <FolderElementContainer
          ref={fileElementRef}
          onClick={handleClick}
          onContextMenu={handleRightClick}
          // $isSelected={isActive}
          // $isCopy={isCopy}
        >
          <Icon><img width={45} height={45} src={""} draggable='false' alt="" /></Icon>
          <Name>{element.folderDetails.name}</Name>
        </FolderElementContainer>
        <ContextMenu element="Folder" ref={contextMenuRef} />
      </>
    );
  }
);


export default FolderElement;