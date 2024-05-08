import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Item, SelectedElements } from "../../types";
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

interface IProps {
  element: Item;
  draggingRef: React.MutableRefObject<boolean>;
  draggable?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const FolderTypeElement = forwardRef<HTMLDivElement, IProps>(
  ({ element }, ref) => {
    const [isOpened, setIsOpened] = useState(false);

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
      
      if(isSelected && selectedFiles.length === 1) {
        dispatch(selectFiles([]))
      }
      else {
        dispatch(selectFiles([element]))
      }
 
    };

    const selectMultipleElements = () => {
      if (isSelected) {
        dispatch(removeFile(element));
      } else {
        dispatch(addFile(element));
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
      {console.log("FolderTypeElement")}
        <FolderTypeElementContainer
          onClick={handleClick}
          onContextMenu={handleRightClick}
          ref={ref}
          $isSelected={isSelected}>
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


