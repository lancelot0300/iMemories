import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { File, SelectedElements } from "../../types";
import CreateModal from "../../components/CreateModal/CreateModal";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ModalContent = styled.div`
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  color: black;
`;

const CloseModal = styled.div`
  cursor: pointer;
  font-size: 20px;
`;

const ModalBody = styled.div`
  min-width: 50vw;
  min-height: 30vh;
  max-height: 80vh;
  overflow: hidden;
  color: black;
  img {
    max-width: 100%;
    max-height: 100%;
  }
  video {
    width: 100%;
    max-width: 100%;
    max-height: 100%;
  }
`;

const Loader = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 40px;
    --g: radial-gradient(farthest-side,#0000 calc(95% - 3px),#000 calc(100% - 3px) 98%,#0000 101%) no-repeat;
    background: var(--g), var(--g), var(--g);
    background-size: 30px 30px;
    animation: l9 1s infinite alternate;
}
@keyframes l9 {
  0% {
    background-position: 0 50%, 50% 50%, 100% 50%;
  }
  20% {
    background-position: 0 0, 50% 50%, 100% 50%;
  }
  40% {
    background-position: 0 100%, 50% 0, 100% 50%;
  }
  60% {
    background-position: 0 50%, 50% 100%, 100% 0;
  }
  80% {
    background-position: 0 50%, 50% 50%, 100% 100%;
  }
  100% {
    background-position: 0 50%, 50% 50%, 100% 50%;
  }
`;

type UsePreviewProps = {
    setIsOpenedContext?: Dispatch<SetStateAction<boolean>>;
    selectedFiles: SelectedElements;
    element?: File;
};

function usePreview({ setIsOpenedContext, selectedFiles, element }: UsePreviewProps) {
    const [isOpened, setIsOpened] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const isVideo = (file: File) => {
        return (
            file.fileDetails?.extension === ".mp4" ||
            file.fileDetails?.extension === ".webm" ||
            file.fileDetails?.extension === ".ogg"
        );
    };

    const isImage = (file: File) => {
        return (
            file.fileDetails?.extension === ".png" ||
            file.fileDetails?.extension === ".jpg" ||
            file.fileDetails?.extension === ".jpeg" ||
            file.fileDetails?.extension === ".gif"
        );
    };

    const createPreview = (file: File) => {
        const selectedElementId = element?.fileDetails.id || selectedFiles[0]?.fileDetails?.id;
        const URL = `${process.env.REACT_APP_API_URL}/file/preview/${selectedElementId}`;

        if (!selectedElementId) return null;

        if (isVideo(file)) {
            return <video src={URL} controls />;
        } else if (isImage(file)) {
            return (
                <>
                    {isLoading && <Loader />}

                    <img
                        src={URL}
                        alt={file.fileDetails.name}
                        style={{ display: isLoading ? "none" : "block" }}
                        onLoad={() => setIsLoading(false)}
                        onError={() => setIsLoading(false)}
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
                    setIsOpened={setIsOpenedContext || setIsOpened}
                >
                    <ModalContent>
                        <ModalHeader>
                            <span>Preview</span>
                            <CloseModal onClick={() => setIsOpened(false)}>
                                <FontAwesomeIcon icon={faTimes} />
                            </CloseModal>
                        </ModalHeader>
                        <ModalBody>{createPreview(element || selectedFiles[0] as File)}</ModalBody>
                    </ModalContent>
                </CreateModal>
                {console.log(selectedFiles)}
            </>
        );
    };

    return { renderPreview, setIsOpened };
}

export default usePreview;
