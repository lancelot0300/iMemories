import {  useEffect, useRef } from "react";
import { FolderGridContainer, HomeContainer } from "./home.styles";
import { ActiveFiles, ContextRef } from "../../types";
import useDropHook from "../../hooks/useDrop/useDropFiles";
import useSelection from "../../hooks/useSelection/useSelection";
import { isClickedContainer } from "../../utils/homeUtils";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { selectFiles } from "../../state/features/files/filesSlice";
import Menu from "../../components/Menu/Menu";
import Statuses from "../../components/Statuses/Statuses";
import { setPathAsync } from "../../state/features/path/pathSlice";
import LoadingHome from "./LoadingHome";
import RenderFiles from "../../components/RenderFiles/RenderFiles";
import ContextMenu from "../../components/ContextMenu/ContextMenu";
import RenderFolders from "../../components/RenderFolders/RenderFolders";

function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const allFilesRefs = useRef<ActiveFiles[]>([]);
  const contextMenuRef = useRef<ContextRef>(null);
  const { data, status, actualPath } = useAppSelector((state) => state.path);
  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(setPathAsync(actualPath[actualPath.length - 1].path));
  }, [dispatch]);

  useEffect(() => {
    allFilesRefs.current = [];
  }, [data]);

  useDropHook({ containerRef });
  const {
    handleMouseDown,
    handleMouseMove,
    handleClick,
    handleMouseLeave,
    draggingRef,
    clearDrag,
  } = useSelection({ containerRef, allFilesRefs });

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    clearDrag();
    if (!isClickedContainer(containerRef, e)) return;
    contextMenuRef.current?.handleOpenContext(e, true);
    dispatch(selectFiles([]));
  };

  if (status === "failed") {
    return <div>Failed to load data</div>;
  }

  if (status === "loading") {
    return <LoadingHome />;
  }

  return (
    <>
      <Menu allFilesRefs={allFilesRefs} />
      <HomeContainer
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onContextMenu={handleContextMenu}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        $isDragging={draggingRef.current ? true : false}
        ref={containerRef}
      >
        <FolderGridContainer>
          <RenderFolders data={data} allFilesRefs={allFilesRefs} clearDrag={clearDrag} />
          <RenderFiles
            data={data}
            clearDrag={clearDrag}
            allFilesRefs={allFilesRefs}
          />
        </FolderGridContainer>
        <ContextMenu element={"Home"}  ref={contextMenuRef} />
        <Statuses />
      </HomeContainer>

    </>
  );
}

export default Home;
