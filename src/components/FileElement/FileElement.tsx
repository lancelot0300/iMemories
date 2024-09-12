import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { ActiveFiles, ContextRef, FileType } from "../../types";
import { FileElementContainer, Icon, Name } from "./fileElement.styles";
import useFile from "../../hooks/useFile/useFile";
import { useAppSelector } from "../../state/store";
import ContextMenu from "../ContextMenu/ContextMenu";
import { renderIcon } from "../../utils/iconsUtils";
import InfoText from "../InfoText/InfoText";
import { InfoElement } from "../InfoText/infoText.styles";
import { getDateString, returnSize } from "../../utils/homeUtils";
import usePreview from "../../hooks/usePreview/usePreview";

interface IProps {
  element: FileType;
  clearDrag: () => void;
}

type InfoTextRef = {
  showInfo: (element: HTMLElement) => void;
  hideInfo: () => void;
};

const FileElement = forwardRef<ActiveFiles | null, IProps>(
  ({ element, clearDrag }, ref) => {

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

    const { storageFiles } = useAppSelector(
      (state) => state.files,
      (prev, next) => {
        const wasSelected = prev.storageFiles.some(
          (el) => el.id === element.id
        );
        const isSelected = next.storageFiles.some((el) => el.id === element.id);
        return wasSelected === isSelected;
      }
    );

    const fileElementRef = useRef<HTMLDivElement>(null);
    const contextMenuRef = useRef<ContextRef>(null);
    const infoTextRef = useRef<InfoTextRef>(null);
    const lastClickTime = useRef(0);

    const { setActiveElement, isActive, isCopy, setActiveOnRightClick } = useFile({
      element,
      selectedFiles,
      storageFiles,
    });

    const { renderPreview, handleOpen } = usePreview({ selectedFiles, element });

    useImperativeHandle(ref, () => ({
      element: fileElementRef.current as HTMLDivElement,
      item: element,
    }));

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      const currentClickTime = Date.now();
      if (currentClickTime - lastClickTime.current < 300) {
        handleOpen(true); 
      } else {
        setActiveElement(event);
      }
      lastClickTime.current = currentClickTime;
    };

    const handleRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      clearDrag();
      setActiveOnRightClick();
      contextMenuRef.current?.handleOpenContext(event, true);
    };

    const handleMouseEnter = () => {
      if (fileElementRef.current) infoTextRef.current?.showInfo(fileElementRef.current);
    };

    return (
      <>
        <FileElementContainer
          ref={fileElementRef}
          onClick={handleClick}
          onContextMenu={handleRightClick}
          $isSelected={isActive}
          $isCopy={isCopy}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => infoTextRef.current?.hideInfo()}
        >
          <Icon>
            <img
              width={50}
              height={50}
              src={renderIcon(element.fileDetails.extension)}
              alt=""
              draggable="false"
            />
          </Icon>
          <Name>{element.fileDetails.name}</Name>
          <InfoText ref={infoTextRef}>
            <InfoElement>Name: {element.fileDetails.name}</InfoElement>
            <InfoElement>Size: {returnSize(element.fileDetails.size)}</InfoElement>
            <InfoElement>Created: {getDateString(element.fileDetails.createdDate)} UTC</InfoElement>
          </InfoText>
        </FileElementContainer>
        <ContextMenu element="File" ref={contextMenuRef} />
        {renderPreview()}
      </>
    );
  }
);

export default FileElement;
