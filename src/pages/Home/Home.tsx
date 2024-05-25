import { useEffect, useRef, useState } from "react";
import { FolderGridContainer, HomeContainer } from "./home.styles";
import { ActiveFiles, ContextRef, Item } from "../../types";
import useDropHook from "../../hooks/dropHook/useDropFiles";
import useSelection from "../../hooks/selectionHook/useSelection";
import FileElement from "../../components/FileElement/FileElement";
import { isClickedContainer } from "../../utils/homeUtils";
import ContainerContextMenu from "../../components/ContextComponents/ContainerContextMenu/ContainerContextMenu";
import { useAppDispatch, useAppSelector } from "../../hooks/stateHook/useStateHook";
import { selectFiles } from "../../state/features/files/filesSlice";
import Menu from "../../components/Menu/Menu";
import Statuses from "../../components/Statuses/Statuses";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Response } from "../../types";
import { getActualPath } from "../../state/features/path/pathSlice";

function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const allFilesRefs = useRef<ActiveFiles[]>([]);
  const contextMenuRef = useRef<ContextRef>(null);
  const pathHistory = useAppSelector((state) => getActualPath(state.path));

  const { data } = useQuery<Response>({ queryKey: [pathHistory.path], queryFn: async () => {
    const res = await axios.get(process.env.REACT_APP_API_URL + "/folder/" + pathHistory.path, {withCredentials: true});
    console.log(res.data);
    return res.data as Response;
  },
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
  refetchInterval: false,
  refetchIntervalInBackground: false,
  retry: 1,
})




  const dispatch = useAppDispatch();

  const {
    handleMouseDown,
    handleMouseMove,
    handleClick,
    handleMouseLeave,
    draggingRef,
    clearDrag
  } = useSelection({ containerRef, allFilesRefs });
  useDropHook({ containerRef, allFilesRefs });

  

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    clearDrag();
    if (!isClickedContainer(containerRef, e)) return;
    contextMenuRef.current?.handleOpenContext(e, true);
    dispatch(selectFiles([]));
  };



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
