import React from 'react'
import { ContextOption } from '../../FileElement/fileElement.styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faScissors } from '@fortawesome/free-solid-svg-icons'
import { setLastCommand } from '../../../state/features/files/filesSlice'
import { useAppDispatch, useAppSelector } from '../../../state/store'

type Props = {
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}


function CutContextOption({setIsOpened}: Props) {

    
  const { selectedFiles } = useAppSelector((state) => state.files);
  const dispatch = useAppDispatch();

  
  const handleCutClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    setIsOpened && setIsOpened(false);
    if(selectedFiles.length === 0) return
    dispatch(setLastCommand({files: selectedFiles, command: "cut"}))
}


    return (
      <ContextOption onClick={handleCutClick}><FontAwesomeIcon icon={faScissors} /> <span>Cut</span></ContextOption>
    )
}

export default CutContextOption