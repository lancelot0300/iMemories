import React, { forwardRef } from 'react'
import { Item, SelectedElements } from '../../types'
import { FolderTypeElementContainer, Icon, Name } from './folderTypeElement.styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faFolder } from '@fortawesome/free-regular-svg-icons'

interface IProps {
  element: Item
  setSelectedElements: React.Dispatch<React.SetStateAction<SelectedElements[]>>;
  selectedElements: SelectedElements[];
}

const FolderTypeElement = forwardRef<HTMLDivElement, IProps>(({element, setSelectedElements, selectedElements}, ref) => {
  const icon = element.isFolder ? <FontAwesomeIcon icon={faFolder} size='2x' /> : <FontAwesomeIcon icon={faFile} size='2x' />
  const isSelected = selectedElements.some((el) => el.itemData.id === element.id);


  const selectSingleElement = () => {
    setSelectedElements((prev) => {

      if (prev.some((el) => el.itemData.id === element.id) && prev.length === 1) {
        return [];
      }

      const newElement = { itemData: element};
      return [newElement];
    });
  }

  const selectMultipleElements = () => {
    setSelectedElements((prev) => {

      if (prev.some((el) => el.itemData.id === element.id)) {
        return prev.filter((el) => el.itemData.id !== element.id);
      }

      const newElement = { itemData: element};
      return [...prev, newElement];
    });
  }

  const handleActiveElementClick = (e: React.MouseEvent<HTMLDivElement>) => {

    if (e.ctrlKey) {
      selectMultipleElements();
    } else {
      selectSingleElement();
    }
    
  };


  return (
    <FolderTypeElementContainer onClick={handleActiveElementClick} ref={ref} $isSelected={isSelected}>
      <Icon>{icon}</Icon>
      <Name>{element.fileDetails.name}</Name>
    </FolderTypeElementContainer>
  )
})

export default FolderTypeElement