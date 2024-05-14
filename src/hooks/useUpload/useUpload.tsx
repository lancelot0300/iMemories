import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../stateHook/useStateHook";
import {
  addFileStatus,
  updateFileStatus,
} from "../../state/features/requests/requestsSlice";
import axios from "axios";
import CreateModal from "../../components/CreateModal/CreateModal";
import { UploadModal } from "../../components/UploadOption/uploadOption.styles";
import { UploadCustomButton, UploadFormButton, UploadFormInput, UploadFormTitle } from "./useUpload.styles";

function useUpload() {
  const { path } = useAppSelector((state) => state.path);
  const dispatch = useAppDispatch();
  const [files, setFiles] = useState<FileList | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isOpened, setIsOpened] = useState(false);

  const uploadFiles = async (files: FileList | null) => {
    if (files) {
      const apiUrl = process.env.REACT_APP_API_URL + "/file/" + path;

      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        const file = files[i];
        formData.append("fileData", file);

        const fileId = `${file.name}-${Date.now()}`;
        dispatch(
          addFileStatus({
            index: fileId,
            fileName: file.name,
            status: "0%",
          })
        );

        axios.post(apiUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
          onUploadProgress(progressEvent) {
            if (progressEvent && progressEvent.total) {
              const procent =
                (progressEvent.loaded / progressEvent.total) * 100;
              dispatch(
                updateFileStatus({
                  index: fileId,
                  fileName: file.name,
                  status: procent.toFixed(0) + "%",
                })
              );
            }
          },
        });
      }
    } else {
      alert("Select a file to upload");
    }
  };

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
  }, [isOpened, files])

  const createModal = () => {
    return (
      <CreateModal isOpened={isOpened} setIsOpened={setIsOpened}>
        <UploadModal>
          <UploadFormTitle>Upload File</UploadFormTitle>
          <UploadCustomButton onClick={handleCustomButtonClick}>
            Choose File
          </UploadCustomButton>
          <UploadFormInput
            ref={inputRef}
            type="file"
            multiple
            onChange={handleInputChange}
          />
          {files && <b>{files.length} file(s) selected</b>}
          <UploadFormButton type="button" onClick={handleUploadClick}>
            Upload
          </UploadFormButton>
        </UploadModal>
      </CreateModal>
    );
  };

  return { uploadFiles, createModal, setIsOpened };
}

export default useUpload;
