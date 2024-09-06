import React from 'react'
import { ContextOption } from '../../FileElement/fileElement.styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaste } from '@fortawesome/free-regular-svg-icons'
import { useAppSelector } from '../../../state/store'


type Props = {
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}


function PasteContextOption({setIsOpened}: Props) {

  const {storageFiles, selectedFiles} = useAppSelector((state) => state.files)


  const handlePasteClick = () => {
    setIsOpened(false)
  }

    if(storageFiles.length === 0 || selectedFiles.length > 1 ) return null
    if( storageFiles[0].folderDetails?.id === (selectedFiles.length > 1 && selectedFiles[0].folderDetails?.id)) return null

    return (
      <ContextOption onClick={handlePasteClick}><FontAwesomeIcon icon={faPaste} />  <span>Paste</span></ContextOption>
    )
}

export default PasteContextOption

