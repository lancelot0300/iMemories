import React from "react";
import Menu from "../../components/Menu/Menu";
import { FolderGridContainer, HomeContainer } from "./home.styles";
import FileElement from "../../components/FileElement/FileElement";
import ContainerContextMenu from "../../components/ContainerContextMenu/ContainerContextMenu";
import LoadingFileElement from "../../components/FileElement/LoadingFileElement";

function LoadingHome() {

  const data = {
        files: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
        ]
  };

  return (
    <>
      <Menu />
      <HomeContainer>
        <FolderGridContainer>
            {data.files.map((file) => (
                <LoadingFileElement key={file} />
            ))}
        </FolderGridContainer>
        <ContainerContextMenu />
      </HomeContainer>
    </>
  );
}

export default LoadingHome;
