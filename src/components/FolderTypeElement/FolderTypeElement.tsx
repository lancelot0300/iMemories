import React, { forwardRef, useRef, useState } from "react";
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

interface IProps {
  element: Item;
  setSelectedElements: React.Dispatch<React.SetStateAction<SelectedElements>>;
  selectedElements: SelectedElements;
}

const FolderTypeElement = forwardRef<HTMLDivElement, IProps>(
  ({ element, setSelectedElements, selectedElements }, ref) => {
    const [isOpened, setIsOpened] = useState(false);

    const posX = useRef("0");
    const posY = useRef("0");

    const icon = element.isFolder ? (
      <FontAwesomeIcon icon={faFolder} size="2x" />
    ) : (
      <FontAwesomeIcon icon={faFile} size="2x" />
    );
    const isSelected = selectedElements.some((el) => el.id === element.id);

    const selectSingleElement = () => {
      if (isSelected && selectedElements.length === 1) {
        return setSelectedElements([]);
      }
      setSelectedElements([element]);
    };

    const selectMultipleElements = () => {
      setSelectedElements((prev) => {
        if (prev.some((el) => el.id === element.id)) {
          return prev.filter((el) => el.id !== element.id);
        }

        return [...prev, element];
      });
    };

    const handleActiveElementClick = (e: React.MouseEvent<HTMLDivElement>) => {
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

    return (
      <>
        <FolderTypeElementContainer
          onClick={handleActiveElementClick}
          onContextMenu={handleRightClick}
          ref={ref}
          $isSelected={isSelected}>
          <Icon>{icon}</Icon>
          <Name>{element.fileDetails.name}</Name>
        </FolderTypeElementContainer>
       <CreateModal isOpened={isOpened} setIsOpened={setIsOpened} withoutOverlay>
          <ContextWrapper $posX={posX.current} $posY={posY.current}>
              <ul style={{listStyle: "none"}}>
                <li>copy</li>
                <li>del</li>
              </ul>
          </ContextWrapper>
       </CreateModal>
      </>
    );
  }
);

export default FolderTypeElement;


