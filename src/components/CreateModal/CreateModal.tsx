import React, { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { Overlay } from "./createModal.styles";

type CreateModalProps = {
  isOpened: boolean;
  setIsOpened: (value: boolean) => void;
  withoutOverlay?: boolean;
};

function CreateModal({
  children,
  isOpened,
  setIsOpened,
  withoutOverlay,
}: PropsWithChildren<CreateModalProps>) {
  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if(e.button !== 0) return;
    e.stopPropagation()
    setIsOpened(false);
  };

  if (!isOpened) return null;


    return createPortal(
      <>
        <Overlay $wihoutOverlay={withoutOverlay} onClick={handleClickOutside} />
        {children}
      </>,
      document.getElementById("modal-root") as HTMLElement
    );

}

export default CreateModal;
