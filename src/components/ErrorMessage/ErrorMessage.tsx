import React, { FC } from 'react'
import styled from 'styled-components'

interface IProps {
    children: string | undefined
    className?: string
    $isError?: boolean | undefined | ""
}

interface IInputErrorProps{
  $isError?: boolean | undefined | "";
}

const StyledErrorMessage = styled.span<IInputErrorProps>`
  font-size: small;
  font-weight: 300;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => (props.$isError ? "red" : "white")};
`;



const ErrorMessage:FC<IProps> = ({children, className, $isError}) => {

  if(!children) return null

  return (
    <StyledErrorMessage $isError={$isError} className={className}>{children}</StyledErrorMessage>
  )
}

export default ErrorMessage