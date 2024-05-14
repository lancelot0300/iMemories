import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/stateHook/useStateHook';
import useDownload from '../../hooks/useDownload/useDownload';
import { ActiveFiles } from '../../types';
import { NavBarItem } from '../NavBar/navBar.styles';



function DownloadOption() {

  const {handleDownloadClick} = useDownload()

  return (
    <>
      <NavBarItem onClick={() => handleDownloadClick()}>Download</NavBarItem>
    </>
  )
}

export default DownloadOption