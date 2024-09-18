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

export const isMobileDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.userAgent.includes('Mobi');
};

export const isFolderSelected = (selectedElements: SelectedElements) => {
  const folderSelected = selectedElements.some(
    (folder) => "folderDetails" in folder
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

export const returnSize = (size: number) => {
  if (size < 1000) {
    return `${size} B`;
  } else if (size < 1000000) {
    return `${(size / 1000).toFixed(2)} KB`;
  } else if (size < 1000000000) {
    return `${(size / 1000000).toFixed(2)} MB`;
  } else {
    return `${(size / 1000000000).toFixed(2)} GB`;
  }
};
