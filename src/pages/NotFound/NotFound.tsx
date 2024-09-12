import { HomeContainer } from "../Home/home.styles";
import { styled } from "styled-components";

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

`;

const NotFoundText = styled.h1`
  font-size: 50px;
  color: #fff;
`;

function NotFound() {
  return (
    <HomeContainer>
      <NotFoundContainer>
        <NotFoundText>404</NotFoundText>
        <NotFoundText>Not Found</NotFoundText>
      </NotFoundContainer>
    </HomeContainer>
  );
}

export default NotFound;
