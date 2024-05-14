import { useRef, useState } from "react";
import { FolderGridContainer, HomeContainer } from "./home.styles";
import { ActiveFiles, ContextRef, Item } from "../../types";
import useDropHook from "../../hooks/dropHook/useDropFiles";
import useSelection from "../../hooks/selectionHook/useSelection";
import FileElement from "../../components/FileElement/FileElement";
import DownloadOption from "../../components/DownloadOption/DownloadOption";
import CopyOption from "../../components/CopyOption/CopyOption";
import DeleteOption from "../../components/DeleteOption/DeleteOption";
import UploadOption from "../../components/UploadOption/UploadOption";
import NavBar from "../../components/NavBar/NavBar";
import LeftSideMenu from "../../components/LeftSideMenu/LeftSideMenu";
import {
  NavBarItem
} from "../../components/NavBar/navBar.styles";
import RightSideMenu from "../../components/RightSideMenu/RightSideMenu";
import ContextMenu from "../../components/ContextMenu/ContextMenu";
import { isClickedContainer } from "../../utils/homeUtils";

function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const allFilesRefs = useRef<ActiveFiles[]>([]);
  const contextMenuRef = useRef<ContextRef>(null);


  const {
    handleMouseDown,
    handleMouseMove,
    handleClick,
    handleMouseLeave,
    draggingRef,
  } = useSelection({ containerRef, allFilesRefs });
  useDropHook({ containerRef, allFilesRefs });

  const folderStructure = [];


  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  
  for (let i = 0; i < 25; i++) {
    const file = {
      id: uuidv4(),
      folderId: uuidv4(),
      storageFileId: uuidv4(),
      tags: [],
      isFolder: false,
      category: null,
      fileDetails: {
        id: uuidv4(),
        name: `file_${i}.txt`,
        size: Math.floor(Math.random() * 10000),
        description: null,
        isStared: false,
        createdDate: new Date().toISOString(),
        lastOpenedDate: "0001-01-01T00:00:00",
        lastModifiedDate: "0001-01-01T00:00:00",
      },
    };
    
    folderStructure.push(file);
  }

  const [files, setFiles] = useState(folderStructure);

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if(!isClickedContainer(containerRef, e)) return;
    contextMenuRef.current?.handleOpenContext(e, true);
  };

  return (
    <>
      {console.log("Home Rendered")}

      <NavBar>
        <LeftSideMenu>
          <NavBarItem>Settings</NavBarItem>
        </LeftSideMenu>
        <RightSideMenu>
          <DownloadOption />
          <CopyOption  />
          <DeleteOption />
          <UploadOption />
        </RightSideMenu>
      </NavBar>

      <HomeContainer
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onContextMenu={handleContextMenu}
        onClick={handleClick}
        $isDragging={draggingRef.current ? true : false}
        ref={containerRef}
      >
        <FolderGridContainer>
          {files.map((item: Item, index) => {
            return (
              <FileElement
                key={item.id}
                element={item}
                allFilesRefs={allFilesRefs}
                ref={(el) => {
                  if (!el) return;
                  allFilesRefs.current[index] = el;
                }}
                draggingRef={draggingRef}
              />
            );
          })}
        </FolderGridContainer>
      </HomeContainer>
      <ContextMenu  ref={contextMenuRef} />
    </>
  );
}

export default Home;
