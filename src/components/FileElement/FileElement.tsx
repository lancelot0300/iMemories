import React, {
  forwardRef,
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

import usePreview from "../../hooks/usePreview/usePreview";

interface IProps {
  element: File;
  clearDrag: () => void;
}

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
        const wasSelected = prev.storageFiles.some((el) => el.id === element.id);
        const isSelected = next.storageFiles.some((el) => el.id === element.id);
        return wasSelected === isSelected;
      }
    );

    useImperativeHandle(ref, () => ({
      element: fileElementRef.current as HTMLDivElement,
      item: element,
    }));


    const fileElementRef = useRef<HTMLDivElement>(null);
    const contextMenuRef = useRef<ContextRef>();
    const infoTextRef = useRef<any>(null);
    const { setActiveElement, isActive, isCopy, setActiveOnRightClick } =  useFile({ element, selectedFiles, storageFiles });
    const {renderPreview, setIsOpened} = usePreview({selectedFiles, element});



    const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      setIsOpened(true);
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
          <InfoElement>Size: {(element.fileDetails.size / 1000000).toFixed(2)} MB</InfoElement>
          <InfoElement>Created at: {getDateString(element.fileDetails.createdDate)}</InfoElement>
        </InfoText>
        </FileElementContainer>
        <ContextMenu element="File" ref={contextMenuRef} />
        {renderPreview()}
      </>
    );
  }
);

export default FileElement;
