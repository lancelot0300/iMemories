import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FileType, SelectedElements } from "../../types";
import CreateModal from "../../components/CreateModal/CreateModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import useAxiosPrivate from "../useAxiosPrivate/useAxiosPrivate";
import {
  CloseModal,
  Loader,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "../../components/ContextComponents/PreviewContextOption/preview.styles";

type UsePreviewProps = {
  setIsOpenedContext?: Dispatch<SetStateAction<boolean>>;
  selectedFiles: SelectedElements;
  element?: FileType;
};

function usePreview({
  setIsOpenedContext,
  selectedFiles,
  element,
}: UsePreviewProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

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

  const handleImageError = (event: any) => {
    const imgElement = event.target;

    imgElement.src = `${process.env.REACT_APP_API_URL}/file/preview/${
      element?.fileDetails.id
    }?${Date.now()}`;

    const request = axiosPrivate.get(
      `${process.env.REACT_APP_API_URL}/file/preview/${
        element?.fileDetails.id
      }?${Date.now()}`,
      {
        withCredentials: true,
      }
    );

    request.then(() => {
      imgElement.src = `${process.env.REACT_APP_API_URL}/file/preview/${
        element?.fileDetails.id
      }?${Date.now()}`;
    });
  };

  const createPreview = (file: FileType) => {
    const selectedFile = element || (selectedFiles[0] as FileType);
    const selectedElementId =
    selectedFile.fileDetails.id || selectedFile.fileDetails?.id;
    const URL = `${process.env.REACT_APP_API_URL}/file/preview/${selectedElementId}`;

    if (!selectedElementId) return null;

    if (isVideo(file)) {
      return <video src={URL} controls onError={handleImageError} />;
    } else if (isImage(file)) {
      return (
        <>
          {isLoading && <Loader />}

          <img
            src={URL}
            alt={file.fileDetails.name}
            style={{ display: isLoading ? "none" : "block" }}
            onLoad={() => setIsLoading(false)}
            onError={handleImageError}
          />
        </>
      );
    } else {
      return <p>Preview not available</p>;
    }
  };

  useEffect(() => {
    return () => {
      setIsLoading(true);
    };
  }, [selectedFiles]);

  const renderPreview = () => {
    if (!isOpened) return null;

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
              {createPreview(element || (selectedFiles[0] as FileType))}
            </ModalBody>
          </ModalContent>
        </CreateModal>
        {console.log(selectedFiles)}
      </>
    );
  };

  return { renderPreview, handleOpen, canBePreview };
}

export default usePreview;
