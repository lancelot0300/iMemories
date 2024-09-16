import { useEffect, useState, useRef, ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../state/store";
import {
  addFileStatus,
  updateFileStatus,
} from "../../state/features/requests/requestsSlice";
import CreateModal from "../../components/CreateModal/CreateModal";
import {
  UploadCustomButton,
  UploadFormButton,
  UploadFormInput,
  UploadFormTitle,
  UploadModal,
} from "./useUpload.styles";
import {
  refreshPathAsync,
} from "../../state/features/path/pathSlice";
import useAxiosPrivate from "../useAxiosPrivate/useAxiosPrivate";
import { AxiosError } from "axios";

function useUpload(setIsOpened?: (value: boolean) => void) {
  const dispatch = useAppDispatch();
  const [files, setFiles] = useState<FileList | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const { data } = useAppSelector((state) => state.path);
  const axiosPrivate = useAxiosPrivate();

  const uploadFilesAsChunks = async (files: FileList | null) => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/file/chunk`;

    if (!files) {
      alert("Select a file to upload");
      return;
    }
    const uploadPromises = Array.from(files).map( async (file) => {
    const chunkSize = 1024 * 1024 *  1 ;
    const numberOfChunks = Math.ceil(file.size / chunkSize);
    const totalSize = file.size;
    const fileId =  crypto.randomUUID();

    dispatch(
      addFileStatus({
        index: fileId,
        fileName: file.name,
        progress: "0%",
        status: "Uploading",
      })
    );

    const uploadChunk = async (start: number, end: number) => {
      const chunk = file.slice(start, end);
      const chunkIndex = start / chunkSize;
      const formData = new FormData();
      formData.append("fileData", chunk);
      formData.append("chunkIndex", chunkIndex.toString());
      formData.append("totalChunks", numberOfChunks.toString());
      formData.append("fileName", file.name);
      formData.append("fileId", fileId);
      formData.append("folderId", data.id);
      let hasRetried = 0;

      const sendRequest = async () => {
        try {
          await axiosPrivate.post(apiUrl, formData, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
            timeout: 15000,
            onUploadProgress: (progressEvent) => {
              if (progressEvent && progressEvent.total) {
                const progress =
                  (chunkIndex * chunkSize + progressEvent.loaded) / totalSize;
                dispatch(
                  updateFileStatus({
                    index: fileId,
                    progress: `${(progress * 100).toFixed(0)}%`,
                    status: progress >= 1 ? "Uploaded" : "Uploading",
                  })
                );
              }
            },
          });
        } catch (e) {
          const error = e as AxiosError;
          if (hasRetried < 2) {
            hasRetried++;
            await sendRequest();
          } else {
            throw error;
          }
        }
      };

      try {
        await sendRequest();
      } catch (error) {
        dispatch(
          updateFileStatus({
            index: fileId,
            progress: "Failed",
            status: "Error",
          })
        );
        throw error;
      }
    };

    for (let i = 0; i < numberOfChunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, file.size);

      try {
        await uploadChunk(start, end);
      } catch (error) {
        console.error("Error uploading file:", error);
        break;
      }
    }
  })

  try {
        await Promise.all(uploadPromises);
        dispatch(refreshPathAsync(data.id));
      } catch (error) {
        console.error("Error uploading files:", error);
      }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFiles(event.target.files);
  };

  const handleCloseClick = () => {
    setIsOpenedModal(false);
    setIsOpened && setIsOpened(false);
  };

  const handleUploadClick = () => {
    if (files) {
      uploadFilesAsChunks(files);
      handleCloseClick();
    } else {
      alert("Select a file to upload");
    }
  };

  const handleCustomButtonClick = () => {
    inputRef.current?.click();
  };

  const uploadFiles = (files: FileList | null) => {};

  useEffect(() => {
    if (!isOpenedModal && files) {
      setFiles(null);
    }
  }, [isOpenedModal, files]);

  const createModal = () => {

    if(!isOpenedModal) return null;

    return (
      <CreateModal isOpened={isOpenedModal} setIsOpened={handleCloseClick}>
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
  }

  return { uploadFiles, createModal, setIsOpenedModal, uploadFilesAsChunks };
}

export default useUpload;
