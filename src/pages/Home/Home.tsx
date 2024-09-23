import {  useEffect, useRef } from "react";
import { FolderGridContainer, HomeContainer } from "./home.styles";
import { ContextRef } from "../../types";
import useDropHook from "../../hooks/useDrop/useDropFiles";
import useSelection from "../../hooks/useSelection/useSelection";
import { isClickedContainer, isMobileDevice } from "../../utils/homeUtils";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { selectFiles } from "../../state/features/files/filesSlice";
import Menu from "../../components/Menu/Menu";
import Statuses from "../../components/Statuses/Statuses";
import LoadingHome from "./LoadingHome";
import RenderFiles from "../../components/RenderFiles/RenderFiles";
import ContextMenu from "../../components/ContextMenu/ContextMenu";
import RenderFolders from "../../components/RenderFolders/RenderFolders";
import NotFound from "../NotFound/NotFound";
import { useLocation } from "react-router-dom";
import { setActualPathAndFetchAsync, setUnkownPathAndFetchAsync } from "../../state/features/path/pathSlice";

function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contextMenuRef = useRef<ContextRef>(null);
  const { data, status, error, actualPath } = useAppSelector((state) => state.path);
  const dispatch = useAppDispatch();
  const location = useLocation();



  useDropHook({ containerRef });
  const {
    handleMouseDown,
    handleMouseMove,
    handleClick,
    handleMouseLeave,
    draggingRef,
    clearDrag,
    allFilesRefs,
  } = useSelection({ containerRef, data });

  const handleClickWithContext = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    if (isMobileDevice()) {
      handleContextMenu(event);
    }
    else{
      handleClick(event)
    }
  }

  useEffect(() => {
    if(!data.id) return;
    if(status === "loading") return;
    const pathWithoutSlash = location.pathname.slice(1);
    const homeId = actualPath[0]?.id;
    const pathIndex = actualPath.findIndex((path) => path.id === pathWithoutSlash.toLowerCase());

   
    switch (pathWithoutSlash) {
      case "":
        if(homeId !== data.id) {
          dispatch(setActualPathAndFetchAsync(0));
        }
        break;
      case data.id:
        if(pathIndex !== -1) {
          dispatch(setActualPathAndFetchAsync(pathIndex));
        }
        break;
      default:
        if(pathIndex === -1 || data.id !== pathWithoutSlash) {
          dispatch(setUnkownPathAndFetchAsync(pathWithoutSlash));
        }
        break;
    }
    console.log("pathWithoutSlash", pathWithoutSlash)
   
  }, [location.pathname, actualPath, data.id, dispatch]);

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation()
    clearDrag();
    if (!isClickedContainer(containerRef, e)) return;
    contextMenuRef.current?.handleOpenContext(e, true);
    dispatch(selectFiles([]));
  };
  

  if (status === "loading" ) {
    return <LoadingHome withMenu />;
  }

  if(error === "Request failed with status code 404") return <NotFound/>

  if (status === "failed") {
    return <div>Failed to load data</div>; 
  }



  return (
    <>
      <Menu allFilesRefs={allFilesRefs} />
      <HomeContainer
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onContextMenu={handleContextMenu}
        onMouseMove={handleMouseMove}
        onClick={handleClickWithContext}
        $isDragging={draggingRef.current ? true : false}
        ref={containerRef}
      >
        <FolderGridContainer>
          <RenderFolders
            data={data}
            allFilesRefs={allFilesRefs}
            clearDrag={clearDrag}
          />
          <RenderFiles
            data={data}
            clearDrag={clearDrag}
            allFilesRefs={allFilesRefs}
          />
        </FolderGridContainer>
        <ContextMenu element={"Home"} ref={contextMenuRef} />
        <Statuses />
      </HomeContainer>
    </>
  );
}

export default Home;
