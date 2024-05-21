import React, { forwardRef, useImperativeHandle } from "react";
import CreateModal from "../../CreateModal/CreateModal";
import { ContextWrapper } from "../../FileElement/fileElement.styles";
import useContext from "../../../hooks/useContext/useContext";

const ContainerContextMenu = forwardRef(({}, ref) => {
  const { handleOpenContext, isOpened, posY, posX, setIsOpened } = useContext();

  useImperativeHandle(ref, () => ({
    handleOpenContext,
  }));

  return (
    <CreateModal isOpened={isOpened} setIsOpened={setIsOpened} withoutOverlay>
      <ContextWrapper $posX={posX.current} $posY={posY.current}>
        <li>Create Folder</li>
        <li>Paste</li>
        <li>Upload</li>
      </ContextWrapper>
    </CreateModal>
  );
});

export default ContainerContextMenu;
