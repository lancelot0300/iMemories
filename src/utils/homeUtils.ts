import { SelectedElements } from "../types";

export const isClickedContainer = (
  containerRef: React.MutableRefObject<HTMLDivElement | null>,
  e?: React.MouseEvent<HTMLDivElement>
) => {
  if (e?.target === undefined) return true;
  return (
    e?.target === containerRef.current ||
    e?.target === containerRef.current?.firstChild
  );
};

export const isFolderSelected = (selectedElements: SelectedElements) => {
  const folderSelected = selectedElements.some(
    (folder) => folder.folderDetails
  );
  return folderSelected && selectedElements.length > 1;
};

export const getDateString = (date: string) => {
  const dateObj = new Date(date);

  const year = dateObj.getUTCFullYear();
  const day = dateObj.getUTCDate().toString().padStart(2, "0");
  const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, "0");
  const hours = dateObj.getUTCHours().toString().padStart(2, "0");
  const minutes = dateObj.getUTCMinutes().toString().padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};
