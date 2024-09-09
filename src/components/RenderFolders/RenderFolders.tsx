import React from "react";
import { ActiveFiles, Folder, Response } from "../../types";
import FolderElement from "../FolderElement/FolderElement";

type Props = {
  data: Response;
  allFilesRefs: React.MutableRefObject<ActiveFiles[]>;
  clearDrag: () => void;
};

const RenderFiles = ({ data, allFilesRefs, clearDrag }: Props) => {
  if (!data) return null;

  return (
    <>
     {data.childFolders.map((item: Folder) => {
        return (
          <FolderElement
            key={item.id}
            clearDrag={clearDrag}
            element={item}
            ref={(el) => {
              if(!el) return;
              if(allFilesRefs.current.some((file) => file.item.id === item.id)) {
               const index = allFilesRefs.current.findIndex((file) => file.item.id === item.id);
               return allFilesRefs.current[index] = el;
              }
              allFilesRefs.current.push(el);
            }}
          />
        );
      })}
    </>
  );
};

export default RenderFiles;
