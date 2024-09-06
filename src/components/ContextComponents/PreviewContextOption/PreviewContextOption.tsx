import React from 'react'
import {  useAppSelector } from '../../../state/store';
import { ContextOption } from '../../FileElement/fileElement.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CreateModal from '../../CreateModal/CreateModal';
import styled from 'styled-components';
import { faEye, faTimes } from '@fortawesome/free-solid-svg-icons';


type Props = {
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}

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
width: fit-content;
  img {
    object-fit: cover;
  }
`;

function PreviewContextOption({ setIsOpened }: Props) {

  const { selectedFiles } = useAppSelector((state) => state.files);
  const selectedElementId = selectedFiles[0].fileDetails?.id;
  const photoURL = `${process.env.REACT_APP_API_URL}/file/preview/${selectedElementId}`;

  const [isOpenedModal, setIsOpenedModal] = React.useState(false);


  const handleOpenClick = () => {
    setIsOpenedModal(true);
  }
  const handleCloseClick = () => {
    setIsOpened(false);
  }

  if(selectedFiles.length !== 1)  return  null;

  return (
    <>
      <ContextOption onClick={handleOpenClick}><FontAwesomeIcon icon={faEye} />  <span>Preview</span></ContextOption>
      <CreateModal isOpened={isOpenedModal} setIsOpened={handleCloseClick}>
        <ModalContent>
          <ModalHeader>
            <span>Preview</span>
            <CloseModal onClick={handleCloseClick}>
              <FontAwesomeIcon icon={faTimes} />
            </CloseModal>
          </ModalHeader>
          <ModalBody>
            <img src={photoURL} alt="" />
          </ModalBody>
        </ModalContent>
      </CreateModal>
    </>
  )
}

export default PreviewContextOption