import { PropsWithChildren } from 'react'
import { RightOptionsWrapper } from '../NavBar/navBar.styles'

function RightSideMenu({children}: PropsWithChildren) {
  return (
    <RightOptionsWrapper>
        {children}
    </RightOptionsWrapper>
  )
}

export default RightSideMenu