import React, { forwardRef, useImperativeHandle } from "react";
import CreateModal from "../CreateModal/CreateModal";
import { ContextWrapper } from "../FileElement/fileElement.styles";
import DeleteContextOption from "../ContextComponents/DeleteContextOption/DeleteContextOption";
import CopyContextOption from "../ContextComponents/CopyContextOption/CopyContextOption";
import DownloadContextOption from "../ContextComponents/DownloadContextOption/DownloadContextOption";
import useContext from "../../hooks/useContext/useContext";
import CreateFolderOption from "../ContextComponents/CreateFolderOption/CreateFolderOption";
import PasteContextOption from "../ContextComponents/PasteContextOption/PasteContextOption";
import UploadContextOption from "../ContextComponents/UploadContextOption/UploadContextOption";

type Props = {
  element: "Home" | "Folder" | "File";
}

const ContextMenu = forwardRef(({ element }: Props, ref) => {
  const { handleOpenContext, isOpenedContext, posY, posX, setIsOpenedContex, contextMenuRefs } = useContext();

  useImperativeHandle(ref, () => ({
    handleOpenContext,
  }));

  const optionsConfig = {
    Home: [
      PasteContextOption,
      CreateFolderOption,
      UploadContextOption,
    ],
    Folder: [
      DeleteContextOption,
      CopyContextOption,
      DownloadContextOption,
      CreateFolderOption,
      PasteContextOption,
      UploadContextOption,
    ],
    File: [
      DeleteContextOption,
      CopyContextOption,
      DownloadContextOption,
    ]
  };

  const options = optionsConfig[element];

  return (
    <CreateModal isOpened={isOpenedContext} setIsOpened={setIsOpenedContex} withoutOverlay >
      <ContextWrapper $posX={posX.current} $posY={posY.current} ref={contextMenuRefs}>
        {options.map((OptionComponent, index) => (
          <OptionComponent key={index} setIsOpened={setIsOpenedContex} />
        ))}
      </ContextWrapper>
    </CreateModal>
  );
});

export default ContextMenu;
