import React, { forwardRef, useImperativeHandle } from "react";
import CreateModal from "../CreateModal/CreateModal";
import { ContextWrapper } from "../FileElement/fileElement.styles";
import DeleteContextOption from "../DeleteContextOption/DeleteContextOption";
import CopyContextOption from "../CopyContextOption/CopyContextOption";
import DownloadContextOption from "../DownloadContextOption/DownloadContextOption";
import useContext from "../../hooks/useContext/useContext";

const ContextMenu = forwardRef(({}, ref) => {
  const { handleOpenContext, isOpened, posY, posX, setIsOpened } = useContext();

  useImperativeHandle(ref, () => ({
    handleOpenContext,
  }));

  return (
    <CreateModal isOpened={isOpened} setIsOpened={setIsOpened} withoutOverlay>
      <ContextWrapper $posX={posX.current} $posY={posY.current}>
        <DeleteContextOption setIsOpened={setIsOpened} />
        <CopyContextOption setIsOpened={setIsOpened} />
        <DownloadContextOption setIsOpened={setIsOpened} />
      </ContextWrapper>
    </CreateModal>
  );
});

export default ContextMenu;
