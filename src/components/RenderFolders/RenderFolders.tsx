import React from "react";
import { ActiveFiles, Folder, Item, Response } from "../../types";
import FileElement from "../FileElement/FileElement";
import FolderElement from "../FolderElement/FolderElement";

type Props = {
  data: Response;
  allFilesRefs: React.MutableRefObject<ActiveFiles[]>;
  clearDrag: () => void;
};

const RenderFiles = ({ data, clearDrag, allFilesRefs }: Props) => {
  if (!data) return null;

  return (
    <>
      {/* {data.childFolders.map((item: Folder, index: number) => {
        return (
          <FolderElement
            key={item.id}
            clearDrag={clearDrag}
            element={item}
            ref={(el) => {
              if (!el) return;
              allFilesRefs.current[index] = el;
            }}
          />
        );
      })} */}
    </>
  );
};

export default RenderFiles;
