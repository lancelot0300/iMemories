import { useEffect, useState, useRef, ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { addFileStatus, updateFileStatus } from "../../state/features/requests/requestsSlice";
import CreateModal from "../../components/CreateModal/CreateModal";
import { UploadCustomButton, UploadFormButton, UploadFormInput, UploadFormTitle, UploadModal } from "./useUpload.styles";
import { getActualPath, setPathAsync } from "../../state/features/path/pathSlice";
import useAxiosPrivate from "../useAxiosPrivate/useAxiosPrivate";


function useUpload(setIsOpened? : (value: boolean) => void) {
  const dispatch = useAppDispatch();
  const [files, setFiles] = useState<FileList | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const { data } = useAppSelector((state) => state.path);
  const actualPath = useAppSelector((state) => getActualPath(state.path));
  const axiosPrivate = useAxiosPrivate();
  // const uploadFiles = async (files: FileList | null) => {
  //   if (!files) {
  //     alert("Select a file to upload");
  //     return;
  //   }

  //   const apiUrl = `${process.env.REACT_APP_API_URL}/file/${data?.id}`;
  //   const uploadPromises = Array.from(files).map((file) => {
  //     const formData = new FormData();
  //     formData.append("fileData", file);

  //     const fileId = `${file.name}-${Date.now()}`;
  //     dispatch(
  //       addFileStatus({
  //         index: fileId,
  //         fileName: file.name,
  //         progress: "0%",
  //         status: "Uploading",
  //       })
  //     );

  //     return axiosPrivate
  //       .post(apiUrl, formData, {
  //         headers: { "Content-Type": "multipart/form-data" },
  //         withCredentials: true,
  //         onUploadProgress: (progressEvent) => {
  //           if (progressEvent && progressEvent.total) {
  //             const percent = (progressEvent.loaded / progressEvent.total) * 100;
  //             dispatch(
  //               updateFileStatus({
  //                 index: fileId,
  //                 fileName: file.name,
  //                 progress: `${Math.round(percent)}%`,
  //                 status: percent === 100 ? "Finished" : "Uploading",
  //               })
  //             );
  //           }
  //         },
  //       })
  //       .catch(() => {
  //         dispatch(
  //           updateFileStatus({
  //             index: fileId,
  //             fileName: file.name,
  //             progress: "Failed",
  //             status: "Error",
  //           })
  //         );
  //       });
  //   });

  //   try {
  //     await Promise.all(uploadPromises);
  //     dispatch(setPathAsync(actualPath.path));
  //   } catch (error) {
  //     console.error("Error uploading files:", error);
  //   }
  // };

  const uploadFilesAsChunks = async (files: FileList | null) => {

    const apiUrl = `${process.env.REACT_APP_API_URL}/file/${data?.id}`;

    if (!files) {
      alert("Select a file to upload");
      return;
    }

    const file = files[0];
    const chunkSize = 1024 * 1024 * 2; // 2MB
    const numberOfChunks = Math.ceil(file.size / chunkSize);
    const totalSize = file.size;
    const fileId = `${file.name}-${Date.now()}`;


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

      return axiosPrivate
        .post(apiUrl, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
          onUploadProgress: (progressEvent) => {
            if (progressEvent && progressEvent.total) {
              const progress = (chunkIndex * chunkSize + progressEvent.loaded) / totalSize;
              dispatch(
                updateFileStatus({
                  index: fileId,
                  fileName: file.name + " - chunk " + chunkIndex,
                  progress: `${Math.round(progress * 100)}%`,
                  status: progress >= 1 ? "Finished" : "Uploading",
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
    };

    for (let i = 0; i < numberOfChunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      await uploadChunk(start, end);
    }

    dispatch(setPathAsync(actualPath.path));
  };
  


    

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFiles(event.target.files);
  };

  const handleCloseClick = () => {
    setIsOpenedModal(false);
    setIsOpened && setIsOpened(false);
  }

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

  const uploadFiles = (files: FileList | null) => {}

  useEffect(() => {
    if (!isOpenedModal && files) {
      setFiles(null);
    }
  }, [isOpenedModal, files]);

  const createModal = () => (
    <CreateModal isOpened={isOpenedModal} setIsOpened={handleCloseClick}>
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

  return { uploadFiles, createModal, setIsOpenedModal, uploadFilesAsChunks };
}

export default useUpload;
