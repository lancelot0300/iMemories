import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { ActiveFiles, ContextRef, Folder, Item } from "../../types";
import { FolderElementContainer, Icon, Name } from "./folderElement.styles";
import { useAppDispatch, useAppSelector } from "../../state/store";
import ContextMenu from "../ContextMenu/ContextMenu";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import useFile from "../../hooks/useFile/useFile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setPath } from "../../state/features/path/pathSlice";
import InfoText from "../InfoText/InfoText";
import { InfoElement } from "../InfoText/infoText.styles";
import { getDateString } from "../../utils/homeUtils";
import { clearFiles } from "../../state/features/files/filesSlice";

interface IProps {
  element: Folder;
  clearDrag: () => void;
}

type Props = {
  children: React.ReactNode;
};

export const ResetComponent = ({ children }: Props) => {
  const resetEvents = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div onClick={resetEvents} onMouseEnter={resetEvents}>
      {children}
    </div>
  );
};

const FolderElement = forwardRef<ActiveFiles | null, IProps>(
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
    const contextMenuRef = useRef<ContextRef>();
    const infoTextRef = useRef<any>(null);
    const lastTimeClick = useRef(0);
    const dispatch = useAppDispatch();
    const { setActiveElement, isActive, isCopy, setActiveOnRightClick } =
      useFile({ element, selectedFiles, storageFiles });

    useImperativeHandle(ref, () => ({
      element: fileElementRef.current as HTMLDivElement,
      item: element,
    }));

    const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!element.folderDetails) return;
      dispatch(
        setPath({
          path: element.folderDetails.id,
          name: element.folderDetails.name,
        })
      );
      dispatch(clearFiles());
    };

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
          onMouseEnter={() => infoTextRef.current?.showInfo(fileElementRef.current)}
          onMouseLeave={() => infoTextRef.current?.hideInfo()}
        >
            <Icon>
              <FontAwesomeIcon size="3x" color="#8ec8f3" icon={faFolder} />
            </Icon>
            <Name>{element.folderDetails.name}</Name>
            <InfoText ref={infoTextRef}>
              <InfoElement>
                Created at:
                {getDateString(element.folderDetails.createdDate) + " UTC"}
              </InfoElement>
              {element.folderDetails.lastModifiedDate && (
                <InfoElement>
                  Updated at:
                  {getDateString(element.folderDetails.lastModifiedDate) +
                    " UTC"}
                </InfoElement>
              )}
            </InfoText>
        </FolderElementContainer>
        <ContextMenu element="Folder" ref={contextMenuRef} />
      </>
    );
  }
);

export default FolderElement;
