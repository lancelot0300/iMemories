import React from 'react'
import useRename from '../../../hooks/useRename/useRename';
import { ContextOption } from '../../FileElement/fileElement.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

type Props = {
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  };
  

function RenameContextOption({ setIsOpened }: Props) {
    const {createModal, setIsOpenedModal, selectedFiles } = useRename(setIsOpened);

    const handleOptionClick = () => {
      setIsOpenedModal(true);
    }


    if(selectedFiles.length > 1) return null;

  
    return (
      <>   
          <ContextOption onClick={handleOptionClick}><FontAwesomeIcon icon={faPenToSquare} /><span>Rename</span></ContextOption>
          {createModal()}
      </>
    );
  }


export default RenameContextOption