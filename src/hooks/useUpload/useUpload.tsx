import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../state/store"
import {
  addFileStatus,
  updateFileStatus,
} from "../../state/features/requests/requestsSlice";
import axios from "axios";
import CreateModal from "../../components/CreateModal/CreateModal";
import { UploadModal } from "../../components/UploadOption/uploadOption.styles";
import { UploadCustomButton, UploadFormButton, UploadFormInput, UploadFormTitle } from "./useUpload.styles";
import { useQueryClient } from "@tanstack/react-query";
import { getActualPath, setPathAsync, setPath } from "../../state/features/path/pathSlice";
import { Response } from "../../types";

function useUpload() {
  // const  actualPath  = useAppSelector((state) => getActualPath(state.path));
  const dispatch = useAppDispatch();
  const [files, setFiles] = useState<FileList | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isOpened, setIsOpened] = useState(false);
  const { data } = useAppSelector((state) => state.path);
  const actualPath = useAppSelector((state) => getActualPath(state.path));

  const uploadFiles = async (files: FileList | null) => {
    if (!files) {
      alert("Select a file to upload");
      return;
    }
  
    const apiUrl = `${process.env.REACT_APP_API_URL}/file/${data?.id}`;
    const uploadPromises: Promise<any>[] = [];
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("fileData", file);
  
      const fileId = `${file.name}-${Date.now()}`;
      dispatch(
        addFileStatus({
          index: fileId,
          fileName: file.name,
          progress: "0%",
          status: "Uploading",
        })
      );
  
      const uploadPromise = axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
        onUploadProgress: (progressEvent) => {
          if (progressEvent && progressEvent.total) {
            const percent = (progressEvent.loaded / progressEvent.total) * 100;

            if(percent === 100) {
              dispatch(
                updateFileStatus({
                  index: fileId,
                  fileName: file.name,
                  progress: "100%",
                  status: "Finished",
                })
              );
            }
            else {
              dispatch(
                updateFileStatus({
                  index: fileId,
                  fileName: file.name,
                  progress: `${Math.round(percent)}%`,
                  status: "Uploading",
                })
              );
            }

           
          }
        },
      }).catch(() => {
        dispatch(
          updateFileStatus({
            index: fileId,
            fileName: file.name,
            progress: "Failed",
            status: "Error",
          })
        );
      });
  
      uploadPromises.push(uploadPromise);
    }
  
    try {
      await Promise.all(uploadPromises);
      if(!data?.id) return;
      dispatch(setPathAsync(actualPath.path));
    } catch (error) {
      console.error("Error uploading files:", error);}
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
