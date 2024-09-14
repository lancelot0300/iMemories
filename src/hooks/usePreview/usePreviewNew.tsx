import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import CreateModal from "../../components/CreateModal/CreateModal";
import {
  CloseModal,
  Loader,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "../../components/ContextComponents/PreviewContextOption/preview.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FileType, SelectedElements } from "../../types";
import useAxiosPrivate from "../useAxiosPrivate/useAxiosPrivate";

type UsePreviewProps = {
  setIsOpenedContext?: Dispatch<SetStateAction<boolean>>;
  selectedFiles: SelectedElements;
  element?: FileType;
};

function usePreviewNew({
  setIsOpenedContext,
  selectedFiles,
  element,
}: UsePreviewProps) {
  const [loading, setLoading] = useState(true);
  const [isOpened, setIsOpened] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [fileToShow, setFileToShow] = useState<string | undefined>();
  const cacheRef = useRef<Map<string, string>>(new Map());

  useEffect(() => {
    if (isOpened) {
      const file = element || (selectedFiles[0] as FileType);
      loadImages(file);
    }
  }, [isOpened]);

  const isVideo = (file: FileType) => {
    return (
      file.fileDetails?.extension === ".mp4" ||
      file.fileDetails?.extension === ".webm" ||
      file.fileDetails?.extension === ".ogg"
    );
  };

  const isImage = (file: FileType) => {
    return (
      file.fileDetails?.extension === ".png" ||
      file.fileDetails?.extension === ".jpg" ||
      file.fileDetails?.extension === ".jpeg" ||
      file.fileDetails?.extension === ".gif"
    );
  };

  const canBePreview = (file: FileType) => {
    return isVideo(file) || isImage(file);
  };

  const handleOpen = (value: boolean) => {
    if (!canBePreview(element || (selectedFiles[0] as FileType))) return;

    setIsOpened(value);
  };

  const loadImages = async (file: FileType) => {
    const fileId = file.fileDetails?.id;

    if (cacheRef.current.has(fileId)) {
      setFileToShow(cacheRef.current.get(fileId)); 
      setLoading(false);
      return;
    }

    try {
      const response = await axiosPrivate.get(
        `/file/preview/${fileId}`,
        {
          responseType: "blob", 
        }
      );

      const reader = new FileReader();
      reader.readAsDataURL(response.data);
      reader.onloadend = () => {
        const result = reader.result as string;
        cacheRef.current.set(fileId, result); 
        setFileToShow(result);
        setLoading(false);
      };
    } catch (error) {
      console.error(error);
    }
  };

  const renderPreview = () => {
    const file = element || (selectedFiles[0] as FileType);
    if(!canBePreview(file) || !isOpened) return null
    return (
      <>
        <CreateModal
          isOpened={isOpened}
          setIsOpened={setIsOpenedContext || handleOpen}
        >
          <ModalContent>
            <ModalHeader>
              <CloseModal onClick={() => setIsOpened(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </CloseModal>
            </ModalHeader>
            <ModalBody>
                {loading ? (
                    <Loader/>
                ) : isImage(file) ? (
                    <img src={fileToShow} alt="preview" />
                ) : (
                    <video controls>
                        <source src={fileToShow} type="video/mp4" />
                    </video>
                )}
            </ModalBody>
          </ModalContent>
        </CreateModal>
      </>
    );
  };

  return {
    loading,
    renderPreview,
    handleOpen,
    canBePreview,
  };
}

export default usePreviewNew;
