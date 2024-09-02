import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { ActiveFiles, ContextRef, Folder, Item } from "../../types";
import { FolderElementContainer, Icon, Name } from "./folderElement.styles";
import { useAppDispatch, useAppSelector } from "../../state/store"
import ContextMenu from "../ContextMenu/ContextMenu";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import useFile from "../../hooks/useFile/useFile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setPath } from "../../state/features/path/pathSlice";

interface IProps {
  element: Folder;
  clearDrag: () => void;
}

const FolderElement = forwardRef<ActiveFiles | null, IProps>(
  ({ element, clearDrag }, ref) => {
    const fileElementRef = useRef<HTMLDivElement>(null);
    const contextMenuRef = useRef<ContextRef>();
    const dispatch = useAppDispatch();

    
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


    const {setActiveElement, isActive, isCopy, setActiveOnRightClick} = useFile({element, selectedFiles, copyFiles});
   

    useImperativeHandle(ref, () => ({
      element: fileElementRef.current as HTMLDivElement,
      item: element
    }));

    const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if(!element.folderDetails) return;
      dispatch(setPath({path: element.folderDetails.id, name: element.folderDetails.name}));
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
        <FolderElementContainer
          ref={fileElementRef}
          onClick={handleClick}
          onContextMenu={handleRightClick}
          $isSelected={isActive}
          $isCopy={isCopy}
        >
          <Icon><FontAwesomeIcon size="3x" color="#8ec8f3" icon={faFolder} /></Icon>
          <Name>{element.folderDetails.name}</Name>
        </FolderElementContainer>
        <ContextMenu element="Folder" ref={contextMenuRef} />
      </>
    );
  }
);


export default FolderElement;
