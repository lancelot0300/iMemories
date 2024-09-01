import React from "react";
import { ActiveFiles, Item, Response } from "../../types";
import FileElement from "../FileElement/FileElement";

type Props = {
  data: Response;
  allFilesRefs: React.MutableRefObject<ActiveFiles[]>;
  clearDrag: () => void;
};

const RenderFiles = ({ data, clearDrag, allFilesRefs }: Props) => {
  if (!data) return null;

  return (
    <>
      {data.files.map((item: Item, index: number) => {
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
    </>
  );
};

export default RenderFiles;
