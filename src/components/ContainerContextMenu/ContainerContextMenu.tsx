import React, { forwardRef, useImperativeHandle } from "react";
import CreateModal from "../CreateModal/CreateModal";
import { ContextWrapper } from "../FileElement/fileElement.styles";
import useContext from "../../hooks/useContext/useContext";
import CreateFolderOption from "../ContextComponents/CreateFolderOption/CreateFolderOption";
import UploadContextOption from "../ContextComponents/UploadContextOption/UploadContextOption";

const ContainerContextMenu = forwardRef(({}, ref) => {
  const { handleOpenContext, isOpened, posY, posX, setIsOpened } = useContext();

  useImperativeHandle(ref, () => ({
    handleOpenContext,
  }));

  return (
    <CreateModal isOpened={isOpened} setIsOpened={setIsOpened} withoutOverlay>
      <ContextWrapper $posX={posX.current} $posY={posY.current}>
        <CreateFolderOption />
        <li>Paste</li>
        <UploadContextOption />
      </ContextWrapper>
    </CreateModal>
  );
});

export default ContainerContextMenu;
