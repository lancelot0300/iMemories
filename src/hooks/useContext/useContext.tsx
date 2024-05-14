import React, { useRef, useState } from 'react'

function useContext() {

    const [isOpened, setIsOpened] = useState(false);


    const posX = useRef("0");
    const posY = useRef("0");

    const handleOpenContext = (e: React.MouseEvent<HTMLDivElement>, isOpen: boolean) => {
        e.preventDefault();
        setIsOpened(isOpen);
        if(isOpen) {
          posX.current = e.clientX.toString();
          posY.current = e.clientY.toString();
        }
        else {
            posX.current = "0";
            posY.current = "0";
            }
      };


      return { handleOpenContext, isOpened, posY, posX, setIsOpened}
}

export default useContext