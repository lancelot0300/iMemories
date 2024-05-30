import React, { useEffect, useState, useRef, ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { addFileStatus, updateFileStatus } from "../../state/features/requests/requestsSlice";
import axios from "axios";
import CreateModal from "../../components/CreateModal/CreateModal";
import { UploadModal } from "../../components/UploadOption/uploadOption.styles";
import { UploadCustomButton, UploadFormButton, UploadFormInput, UploadFormTitle } from "./useUpload.styles";
import { getActualPath, setPathAsync } from "../../state/features/path/pathSlice";

function useUpload() {
  const dispatch = useAppDispatch();
  const [files, setFiles] = useState<FileList | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpened, setIsOpened] = useState(false);
  const { data } = useAppSelector((state) => state.path);
  const actualPath = useAppSelector((state) => getActualPath(state.path));

  const uploadFiles = async (files: FileList | null) => {
    if (!files) {
      alert("Select a file to upload");
      return;
    }

    const apiUrl = `${process.env.REACT_APP_API_URL}/file/${data?.id}`;
    const uploadPromises = Array.from(files).map((file) => {
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

      return axios
        .post(apiUrl, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
          onUploadProgress: (progressEvent) => {
            if (progressEvent && progressEvent.total) {
              const percent = (progressEvent.loaded / progressEvent.total) * 100;
              dispatch(
                updateFileStatus({
                  index: fileId,
                  fileName: file.name,
                  progress: `${Math.round(percent)}%`,
                  status: percent === 100 ? "Finished" : "Uploading",
                })
              );
            }
          },
        })
        .catch(() => {
          dispatch(
            updateFileStatus({
              index: fileId,
              fileName: file.name,
              progress: "Failed",
              status: "Error",
            })
          );
        });
    });

    try {
      await Promise.all(uploadPromises);
      if (data?.id) {
        dispatch(setPathAsync(actualPath.path));
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFiles(event.target.files);
  };

  const handleUploadClick = () => {
    if (files) {
      uploadFiles(files);
    } else {
      alert("Select a file to upload");
    }
  };

  const handleCustomButtonClick = () => {
    inputRef.current?.click();
  };

  useEffect(() => {
    if (!isOpened && files) {
      setFiles(null);
    }
  }, [isOpened, files]);

  const createModal = () => (
    <CreateModal isOpened={isOpened} setIsOpened={setIsOpened}>
      <UploadModal>
        <UploadFormTitle>Upload File</UploadFormTitle>
        <UploadCustomButton onClick={handleCustomButtonClick}>
          Choose File
        </UploadCustomButton>
        <UploadFormInput ref={inputRef} type="file" multiple onChange={handleInputChange} />
        {files && <b>{files.length} file(s) selected</b>}
        <UploadFormButton type="button" onClick={handleUploadClick}>
          Upload
        </UploadFormButton>
      </UploadModal>
    </CreateModal>
  );

  return { uploadFiles, createModal, setIsOpened };
}

export default useUpload;
