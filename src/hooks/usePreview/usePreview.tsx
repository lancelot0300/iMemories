import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { FileType, SelectedElements } from "../../types";
import CreateModal from "../../components/CreateModal/CreateModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  CloseModal,
  Loader,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "../../components/ContextComponents/PreviewContextOption/preview.styles";
import useRefresh from "../useRefresh/useRefresh";

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
  const refresh = useRefresh();
  const selectedElement = element ? element : (selectedFiles[0] as FileType);
  const wasError = useRef(false);

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
  const handleError = async (
    event: React.SyntheticEvent<HTMLImageElement | HTMLVideoElement>
  ) => {
    if (wasError.current === true) return;
    const imgElement = event.target as HTMLImageElement | HTMLVideoElement;
    try {
      const response = await refresh();

      if (response) {
        const selectedElementId = selectedElement?.fileDetails?.id;
        if (selectedElementId) {
          imgElement.src = `${process.env.REACT_APP_API_URL}/file/preview/${selectedElementId}`;
        }
      }
    } catch (error) {
      console.error("Error while refreshing:", error);
    } finally {
      setIsLoading(false);
      wasError.current = true;
    }
  };

  useEffect(() => {
    return () => {
      wasError.current = false;
    };
  }, [isOpened]);

  const createPreview = (file: FileType) => {
    const URL = `${process.env.REACT_APP_API_URL}/file/preview/${file.fileDetails.id}`;

    if (isVideo(file)) {
      return <video src={URL} controls onError={handleError} />;
    } else if (isImage(file)) {
      return (
        <>
          {isLoading && <Loader />}

          <img
            src={URL}
            alt={file.fileDetails.name}
            style={{ display: isLoading ? "none" : "block" }}
            onLoad={() => setIsLoading(false)}
            onError={handleError}
          />
        </>
      );
    } else {
      return <p>Preview not available</p>;
    }
  };

  const renderPreview = () => {
    if (!isOpened) return null;

    return (
      <>
        <CreateModal
          isOpened={isOpened}
          setIsOpened={setIsOpenedContext || setIsOpened}
        >
          <ModalContent>
            <ModalHeader>
              <CloseModal onClick={() => setIsOpened(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </CloseModal>
            </ModalHeader>
            <ModalBody>{createPreview(selectedElement)}</ModalBody>
          </ModalContent>
        </CreateModal>
      </>
    );
  };

  return { renderPreview, setIsOpened, handleOpen, canBePreview };
}

export default usePreview;
