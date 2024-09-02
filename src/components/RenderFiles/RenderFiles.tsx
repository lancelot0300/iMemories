import React from "react";
import { ActiveFiles, File, Item, Response } from "../../types";
import FileElement from "../FileElement/FileElement";

type Props = {
  data: Response;
  allFilesRefs: React.MutableRefObject<ActiveFiles[]>;
  clearDrag: () => void;
};

const RenderFiles = ({ data, allFilesRefs, clearDrag }: Props) => {
  if (!data) return null;

  return (
    <>
      {data.files.map((item: File, index: number) => {
        return (
          <FileElement
          key={item.id}
          clearDrag={clearDrag}
          element={item}
          ref={(el) => {
            if (!el) return;
            if(allFilesRefs.current.some((file) => file.item.id === item.id)) return;
            allFilesRefs.current.push(el);
          }}
          />
        );
      })}
    </>
  );
};

export default RenderFiles;
