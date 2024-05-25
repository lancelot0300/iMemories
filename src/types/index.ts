import exp from "constants";

export type Response = {
  id: string;
  parentFolderId: string | null;
  folderDetails: string | null;
  files: Item[];
  childFolders: [];
};

export type Item = {
  id: string;
  folderId: string;
  tags: [];
  category: string | null;
  fileDetails: {
    id: string;
    name: string;
    size: 9551713;
    extension: string;
    description: string | null;
    isStared: boolean;
    createdDate: string;
    lastOpenedDate: string;
    lastModifiedDate: string;
  };
};

export type ActiveFiles = {
  element: HTMLDivElement | null;
  item: Item;
  setActive?: (isActive: boolean) => void;
  setIsCopied?: (isCopied: boolean) => void;
};

export type SelectedElements = Item[];

export type ContextRef = {
  handleOpenContext: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    isOpen: boolean
  ) => void;
};
