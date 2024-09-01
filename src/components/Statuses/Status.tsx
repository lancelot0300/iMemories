import React from "react";
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
  const actualStatus = useAppSelector((state) =>
    getActualElement(state.activeRequests, request.index)
  );

  const dispatch = useAppDispatch();
  const handleCloseClick = (index: string) => {
    dispatch(removeFileStatus(index));
  };

  return (
    <>
      <StatusWrapper $status={actualStatus?.status}>
        <StatusFileName>{request.fileName}</StatusFileName>
        <p>{actualStatus?.progress}</p>
        <FontAwesomeIcon
          icon={faCircleXmark}
          onClick={() => handleCloseClick(request.index)}
          style={{ cursor: "pointer" }}
        />
      </StatusWrapper>
    </>
  );
}

export default Status;
