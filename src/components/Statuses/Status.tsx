import React, { useEffect } from "react";
import { StatusFileName, StatusWrapper } from "./statuses.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../state/store";
import {
  getActualElement,
  removeFileStatus,
} from "../../state/features/requests/requestsSlice";

type Props = {
  request: {
    fileName: string;
    progress: string;
    index: string;
  };
};

function Status({ request }: Props) {

  const actualStatus = useAppSelector((state) => getActualElement(state.activeRequests, request.index));
  const dispatch = useAppDispatch();
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (actualStatus?.status === "Finished" || actualStatus?.status === "Error") {
      setTimeout(() => {
        dispatch(removeFileStatus(request.index));
      }, 6000);
    }

    return () => {
      if (actualStatus?.status === "Finished" || actualStatus?.status === "Error") {
        wrapperRef.current?.classList.add("fade-out");
      }
    };
  }, [actualStatus?.status, dispatch, request.index]);

  const handleCloseClick = (index: string) => {
    dispatch(removeFileStatus(index));
  };

  return (
      <StatusWrapper $status={actualStatus?.status} ref={wrapperRef}>
        <StatusFileName>{request.fileName}</StatusFileName>
        <p>{actualStatus?.progress}</p>
        <FontAwesomeIcon
          icon={faCircleXmark}
          onClick={() => handleCloseClick(request.index)}
          style={{ cursor: "pointer" }}
        />
      </StatusWrapper>
  );
}

export default Status;
