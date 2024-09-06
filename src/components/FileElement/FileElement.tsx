import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { ActiveFiles, ContextRef, File } from "../../types";
import { FileElementContainer, Icon, Name } from "./fileElement.styles";
import useFile from "../../hooks/useFile/useFile";
import { useAppSelector } from "../../state/store";
import ContextMenu from "../ContextMenu/ContextMenu";
import { renderIcon } from "../../utils/iconsUtils";
import InfoText from "../InfoText/InfoText";
import { InfoElement } from "../InfoText/infoText.styles";
import { getDateString } from "../../utils/homeUtils";

interface IProps {
  element: File;
  clearDrag: () => void;
}

const FileElement = forwardRef<ActiveFiles | null, IProps>(
  ({ element, clearDrag }, ref) => {
    const fileElementRef = useRef<HTMLDivElement>(null);
    const contextMenuRef = useRef<ContextRef>();
    const infoTextRef = useRef<any>(null);

    const { selectedFiles } = useAppSelector(
      (state) => state.files,
      (prev, next) => {
        const wasSelected = prev.selectedFiles.some(
          (el) => el.id === element.id
        );
        const isSelected = next.selectedFiles.some(
          (el) => el.id === element.id
        );
        return wasSelected === isSelected;
      }
    );

    const { copyFiles } = useAppSelector(
      (state) => state.files,
      (prev, next) => {
        const wasSelected = prev.copyFiles.some((el) => el.id === element.id);
        const isSelected = next.copyFiles.some((el) => el.id === element.id);
        return wasSelected === isSelected;
      }
    );

    const { setActiveElement, isActive, isCopy, setActiveOnRightClick } =  useFile({ element, selectedFiles, copyFiles });

    useImperativeHandle(ref, () => ({
      element: fileElementRef.current as HTMLDivElement,
      item: element,
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
        <FileElementContainer
          ref={fileElementRef}
          onClick={handleClick}
          onContextMenu={handleRightClick}
          $isSelected={isActive}
          $isCopy={isCopy}
          onMouseEnter={(event) => infoTextRef.current?.showInfo(event)}
          onMouseLeave={() => infoTextRef.current?.hideInfo()}
        >
          <Icon>
            <img
              width={50}
              height={50}
              src={renderIcon(element.fileDetails.extension)}
              draggable="false"
              alt=""
            />
          </Icon>
          <Name>{element.fileDetails.name}</Name>
        <InfoText ref={infoTextRef}>
          <InfoElement>Name: {element.fileDetails.name}</InfoElement>
          <InfoElement>Size: {element.fileDetails.size}</InfoElement>
          <InfoElement>Created at: {getDateString(element.fileDetails.createdDate)}</InfoElement>
        </InfoText>
        </FileElementContainer>
        <ContextMenu element="File" ref={contextMenuRef} />
      </>
    );
  }
);

export default FileElement;
