import { Suspense, useEffect, useRef, useState } from "react";
import { FolderGridContainer, HomeContainer } from "./home.styles";
import { ActiveFiles, ContextRef, Item } from "../../types";
import useDropHook from "../../hooks/dropHook/useDropFiles";
import useSelection from "../../hooks/selectionHook/useSelection";
import FileElement from "../../components/FileElement/FileElement";
import { isClickedContainer } from "../../utils/homeUtils";
import ContainerContextMenu from "../../components/ContainerContextMenu/ContainerContextMenu";
import { useAppDispatch, useAppSelector } from "../../state/store";
import {
  selectFiles,
} from "../../state/features/files/filesSlice";
import Menu from "../../components/Menu/Menu";
import Statuses from "../../components/Statuses/Statuses";
import {
  setPathAsync,
} from "../../state/features/path/pathSlice";
import LoadingHome from "./LoadingHome";

function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const allFilesRefs = useRef<ActiveFiles[]>([]);
  const contextMenuRef = useRef<ContextRef>(null);
  const { data, status } = useAppSelector(
    (state) => state.path
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPathAsync(""));
  }, [dispatch]);

  const {
    handleMouseDown,
    handleMouseMove,
    handleClick,
    handleMouseLeave,
    draggingRef,
    clearDrag,
  } = useSelection({ containerRef, allFilesRefs });
  useDropHook({ containerRef, allFilesRefs });

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

  if(status === "loading") {
    return <LoadingHome />
  }

  return (
    <>
      <Menu />
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
            {data?.files.map((item: Item, index) => {
              return (
                <FileElement
                  key={item.id}
                  clearDrag={clearDrag}
                  element={item}
                  ref={(el) => {
                    if (!el) return;
                    allFilesRefs.current[index] = el;
                  }}
                />
              );
            })}
          </FolderGridContainer>
        <ContainerContextMenu ref={contextMenuRef} />
        <Statuses />
      </HomeContainer>
    </>
  );
}

export default Home;
