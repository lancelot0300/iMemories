import React from "react";
import { ContextOption } from "../../FileElement/fileElement.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useUpload from "../../../hooks/useUpload/useUpload";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

type Props = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

function UploadContextOption({setIsOpened}: Props) {
  const { createModal, setIsOpenedModal } = useUpload(setIsOpened);

  const handleOptionClick = () => {
    setIsOpenedModal(true);
  }

  return (
    <>
      <ContextOption onClick={handleOptionClick}>
        <FontAwesomeIcon icon={faUpload} />
        <span>Upload</span>
      </ContextOption>
      {createModal()}
    </>
  );
}

export default UploadContextOption;
