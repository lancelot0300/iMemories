import React, { createRef, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { ActiveFiles, Item, SelectedElements } from "../../types";
import {
  ContextWrapper,
  FolderTypeElementContainer,
  Icon,
  Name,
} from "./folderTypeElement.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faFolder } from "@fortawesome/free-regular-svg-icons";
import CreateModal from "../CreateModal/CreateModal";
import { useAppDispatch, useAppSelector } from "../../hooks/stateHook/useStateHook";
import { addFile, removeFile, selectFiles } from "../../state/features/filesManager/filesSlice";
import { all } from "axios";

interface IProps {
  element: Item;
  draggingRef: React.MutableRefObject<boolean>;
  allFilesRefs: React.MutableRefObject<ActiveFiles[]>;
}

const FolderTypeElement = forwardRef<ActiveFiles, IProps>(
  ({ element, allFilesRefs }, ref) => {
    const [isOpened, setIsOpened] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const folderElement = createRef<HTMLDivElement>();

    const setActive = ( isActive : boolean) => {
      setIsActive(isActive);
    }

    useImperativeHandle(ref, () => ({
      element: folderElement,
      item: element,
      setActive : setActive,
      isActive: isActive
    }));

    const { selectedFiles } = useAppSelector((state) => state.selectedFiles);
    const dispatch = useAppDispatch();

    const posX = useRef("0");
    const posY = useRef("0");

    const icon = element.isFolder ? (
      <FontAwesomeIcon icon={faFolder} size="2x" />
    ) : (
      <FontAwesomeIcon icon={faFile} size="2x" />
    );
    const isSelected = selectedFiles.some((el) => el.id === element.id);

    const selectSingleElement = () => {
      
     if(isActive && selectedFiles.length === 1) {

        allFilesRefs.current.forEach((el) => {
          el.setActive(false);
        });

        setIsActive(false)
        dispatch(removeFile(element));
      } else {

        allFilesRefs.current.forEach((el) => {
          el.setActive(false);
        });

        dispatch(selectFiles([element]));
        setIsActive(true)
      }
 
    };

    const selectMultipleElements = () => {
      if(isActive) {
        setIsActive(false)
        dispatch(removeFile(element));
      } else {
        dispatch(addFile(element));
        setIsActive(true)
      }
    };

    const setActiveElement = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.ctrlKey) {
        selectMultipleElements();
      } else {
        selectSingleElement();
      }
    };

    const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsOpened(true)
      posX.current = e.clientX.toString()
      posY.current = e.clientY.toString()
    };

    const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      console.log("double click")
    }

    const lastTimeClick = useRef(0);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      console.log("click")
      const clickTime = new Date().getTime();
      const timeSinceLastClick = clickTime - lastTimeClick.current;

      if (timeSinceLastClick < 300) {
        return handleDoubleClick(event);
      }
      
      lastTimeClick.current = clickTime;

      setActiveElement(event);
    };

    return (
      <>
        <FolderTypeElementContainer 
          ref={folderElement}
          onClick={handleClick}
          onContextMenu={handleRightClick}
          $isSelected={isActive}>
          <Icon>{icon}</Icon>
          <Name>{element.fileDetails.name}</Name>
        </FolderTypeElementContainer>
        <CreateModal isOpened={isOpened} setIsOpened={setIsOpened} withoutOverlay >
            <ContextWrapper $posX={posX.current} $posY={posY.current}>
                
            </ContextWrapper>
        </CreateModal>
      </>
    );
  }
);

export default FolderTypeElement;


