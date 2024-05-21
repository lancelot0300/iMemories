import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

function useContext() {

    const [isOpened, setIsOpened] = useState(false);
    const contextMenuRefs = useRef<HTMLDivElement | null>(null);

    const posX = useRef(0);
    const posY = useRef(0);

    useLayoutEffect(() => {
      if(!contextMenuRefs.current) return;
      if(!isOpened) return;

      const contextMenu = contextMenuRefs.current;

      console.log(window.innerWidth, posX.current + contextMenu.offsetWidth)
      if(posX.current + contextMenu.offsetWidth > window.innerWidth) {
        posX.current = posX.current - contextMenu.offsetWidth;
        contextMenu.style.left = `${posX.current}px`;
      }

      if(posY.current + contextMenu.offsetHeight > window.innerHeight) {
        posY.current = posY.current - contextMenu.offsetHeight;
        contextMenu.style.top = `${posY.current}px`;
      }

    },[isOpened])

    const handleOpenContext = (e: React.MouseEvent<HTMLDivElement>, isOpen: boolean) => {
        e.preventDefault();
        setIsOpened(isOpen);
        if(isOpen) {
          posX.current = e.clientX;
          posY.current = e.clientY
        }
        else {
            posX.current = 0;
            posY.current = 0;
            }
      };


      return { handleOpenContext, isOpened, posY, posX, setIsOpened, contextMenuRefs}
}

export default useContext