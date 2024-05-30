import React from "react";
import { ContextOption } from "../../FileElement/fileElement.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useUpload from "../../../hooks/useUpload/useUpload";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

function UploadContextOption() {
  const { createModal, setIsOpened } = useUpload();

  return (
    <>
      <ContextOption onClick={() => setIsOpened(true)}>
        <FontAwesomeIcon icon={faUpload} />
        <span>Upload</span>
      </ContextOption>
      {createModal()}
    </>
  );
}

export default UploadContextOption;
