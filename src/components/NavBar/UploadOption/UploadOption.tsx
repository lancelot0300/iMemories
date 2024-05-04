import { useEffect, useRef, useState } from "react";
import { NavBarItem } from "../navBar.styles";
import CreateModal from "../../CreateModal/CreateModal";
import {  UploadFormButton, UploadFormInput, UploadFormTitle, UploadModal, UploadCustomButton } from "./uploadOption.styles";
import useUploadFiles from "../../../hooks/uploadHook/useUploadFiles";



function UploadOption() {
  const [isOpened, setIsOpened] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { uploadFiles } = useUploadFiles();

  const handleOpenModal = () => {
    setIsOpened(true);
  }
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.files) {
      setFiles(event.target.files);
    }
  }

  const handleUploadClick = () => {
    if(files) {
      console.log("Uploading: ", files)
    }
    else {
      alert("Select a file to upload")
    }


    uploadFiles(files);
  }

  const handleCustomButtonClick = () => {
    if(inputRef.current) {
      inputRef.current.click();
    }   
  }

  useEffect(() => {
    if(!isOpened && files ) {
      setFiles(null);
    }
  }, [isOpened])

  return (
    <>
    {console.log(files)}
      <NavBarItem onClick={handleOpenModal}>Upload</NavBarItem>
      <CreateModal isOpened={isOpened} setIsOpened={setIsOpened}>
        <UploadModal>
              <UploadFormTitle>Upload File</UploadFormTitle>
              <UploadCustomButton onClick={handleCustomButtonClick}>Choose File</UploadCustomButton>
              <UploadFormInput ref={inputRef} type="file" multiple onChange={handleInputChange} />
              {files && <b>{files.length} file(s) selected</b>}
              <UploadFormButton type="button" onClick={handleUploadClick}>Upload</UploadFormButton>
        </UploadModal>
      </CreateModal>
    </>
  );
}

export default UploadOption;
