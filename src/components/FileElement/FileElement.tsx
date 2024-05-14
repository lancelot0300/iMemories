import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faFolder } from "@fortawesome/free-regular-svg-icons";
import CreateModal from "../CreateModal/CreateModal";
import { ActiveFiles, ContextRef, Item } from "../../types";
import { ContextOption, ContextWrapper, FileElementContainer, Icon, Name } from "./fileElement.styles";
import useFile from "../../hooks/useFile/useFile";
import DownloadContextOption from "../DownloadContextOption/DownloadContextOption";
import DeleteContextOption from "../DeleteContextOption/DeleteContextOption";
import CopyContextOption from "../CopyContextOption/CopyContextOption";
import useContext from "../../hooks/useContext/useContext";
import { useAppSelector } from "../../hooks/stateHook/useStateHook";
import ContextMenu from "../ContextMenu/ContextMenu";

interface IProps {
  element: Item;
  draggingRef: React.MutableRefObject<boolean>;
  allFilesRefs: React.MutableRefObject<ActiveFiles[]>;
}

const FileElement = forwardRef<ActiveFiles, IProps>(
  ({ element }, ref) => {
    const fileElementRef = useRef<HTMLDivElement>(null);
    const contextMenuRef = useRef<ContextRef>();

    
    const {selectedFiles} = useAppSelector((state) => state.files, (prev, next) => {
      return (prev.selectedFiles.some((el) => el.id === element.id)) === next.selectedFiles.some((el) => el.id === element.id);
  });
    const {copyFiles} = useAppSelector((state) => state.files, (prev, next) => {
        return (prev.copyFiles.some((el) => el.id === element.id)) === next.copyFiles.some((el) => el.id === element.id);
    });

    const {setActiveElement, isActive, isCopy, setActiveOnRightClick} = useFile({element, selectedFiles, copyFiles});
   

    useImperativeHandle(ref, () => ({
      element: fileElementRef.current,
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

      setActiveOnRightClick(e);
      contextMenuRef.current?.handleOpenContext(e, true);
    };


    return (
      <>
      {console.log("FileElement Rendered " + element.fileDetails.name)}
        <FileElementContainer
          ref={fileElementRef}
          onClick={handleClick}
          onContextMenu={handleRightClick}
          $isSelected={isActive}
          $isCopy={isCopy}
        >
          <Icon><FontAwesomeIcon icon={faFile} size="2x" /></Icon>
          <Name>{element.fileDetails.name}</Name>
        </FileElementContainer>
        <ContextMenu  ref={contextMenuRef} />
      </>
    );
  }
);


export default FileElement;