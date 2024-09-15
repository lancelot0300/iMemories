import React from "react";
import { ContextOption } from "../../FileElement/fileElement.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaste } from "@fortawesome/free-regular-svg-icons";
import { useAppSelector } from "../../../state/store";
import usePaste from "../../../hooks/usePaste/usePaste";

type Props = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

function PasteContextOption({ setIsOpened }: Props) {
  const { handlePasteClick, storageFiles, selectedFiles } = usePaste(setIsOpened);

  if (storageFiles.length === 0 || selectedFiles.length > 1) return null;

  const isSelectedThisFolder = selectedFiles.some((el) => el.id === storageFiles[0].id);
  if (isSelectedThisFolder) return null;



  return (
    <ContextOption onClick={handlePasteClick}>
      <FontAwesomeIcon icon={faPaste} /> <span>Paste</span>
    </ContextOption>
  );
}

export default PasteContextOption;
