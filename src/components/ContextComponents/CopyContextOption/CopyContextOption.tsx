import React from 'react'
import useCopy from '../../../hooks/useCopy/useCopy'
import { ContextOption } from '../../FileElement/fileElement.styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-regular-svg-icons'

type Props = {
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}


function CopyContextOption({setIsOpened}: Props) {
    const {handleCopyClick} = useCopy(setIsOpened)

    return (
      <ContextOption onClick={handleCopyClick}><FontAwesomeIcon icon={faCopy} />  <span>Copy</span></ContextOption>
    )
}

export default CopyContextOption