import React from 'react'
import { ContextOption } from '../../FileElement/fileElement.styles'
import useDownload from '../../../hooks/useDownload/useDownload'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'

type Props = {
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}

function DownloadContextOption({setIsOpened}: Props) {
    const {handleDownloadClick} = useDownload(setIsOpened)

  return (
    <ContextOption onClick={handleDownloadClick}><FontAwesomeIcon icon={faDownload} /><span>Download</span></ContextOption>
  )
}

export default DownloadContextOption