import {  SelectedElements } from "../types";


export const isClickedContainer = (containerRef: React.MutableRefObject<HTMLDivElement | null>, e?: React.MouseEvent<HTMLDivElement>) => {
    if (e?.target === undefined) return true;
    return (
      e?.target === containerRef.current ||
      e?.target === containerRef.current?.firstChild
    );
  };

  export const isFolderSelected = (selectedElements: SelectedElements) => {
    const folderSelected = selectedElements.some((folder) => folder.folderDetails);
    return folderSelected && selectedElements.length  > 1;
  };