import React, { forwardRef, useEffect, useRef } from 'react'
import { Item } from '../../intefaces'
import { FolderTypeElementContainer, Icon, Name } from './folderTypeElement.styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faFolder } from '@fortawesome/free-regular-svg-icons'

interface IProps {
  element: Item
  activeFolderRef: React.MutableRefObject<HTMLDivElement | null>;
  setSelectedElement: React.Dispatch<React.SetStateAction<Item | null>>;
}

const FolderTypeElement = forwardRef<HTMLDivElement, IProps>(({ element, activeFolderRef, setSelectedElement }: IProps, ref) => {
  
  const icon = element.isFolder ? <FontAwesomeIcon icon={faFolder} size='2x' /> : <FontAwesomeIcon icon={faFile} size='2x' />

  const shortName = (name: string) => {
    if(name.length > 10) {
      return name.slice(0, 10) + "..."
    }
    return name
  }

    const handleActiveElementClick = (e: React.MouseEvent<HTMLDivElement>) => {

      if(e.currentTarget === activeFolderRef.current) {
          setSelectedElement(null);
          activeFolderRef.current.style.backgroundColor = "";
          activeFolderRef.current = null;
          return;
      }

      if (activeFolderRef.current) {
          activeFolderRef.current.style.backgroundColor = "";
      }
      
      e.currentTarget.style.backgroundColor = "#bbb9b9";
      activeFolderRef.current = e.currentTarget;
      setSelectedElement(element);
  };


  return (
    <FolderTypeElementContainer  onClick={handleActiveElementClick}  ref={ref}>
      <Icon>{icon}</Icon>
      <Name>{shortName(element.fileDetails.name)}</Name>
    </FolderTypeElementContainer>
  )
})

export default FolderTypeElement