export type User = { 
  id: string;
  email: string;
  name: string;
};

export type Response = {
  id: string;
  parentFolderId: string | null;
  folderDetails: {
    id: string;
    createdDate: string;
    lastModifiedDate: string;
    name: string;
    lastOpenedDate: string;
    isStared: boolean;
  } | null;
  files: FileType[];
  childFolders: FolderType[];
};

export type UnknownPathResponse = {
  folder: FolderType;
  path: Path[];
};

export type LoginResponse = {
  user: User;
  accessToken: {
    expireDate: string;
    value: string;
  },
  refreshToken: {
    expireDate: string;
    value: string;
  }
};

export type FileType = {
  id: string;
  folderId: string;
  tags: [];
  category: string | null;
  fileDetails: {
    id: string;
    name: string;
    size: number;
    extension: string;
    description: string | null;
    isStared: boolean;
    createdDate: string;
    lastOpenedDate: string;
    lastModifiedDate: string;
  };
};

export type FolderType = {
  id: string;
  parentFolderId: string | null;
  folderDetails: {
    id: string;
    createdDate: string;
    lastModifiedDate: string;
    name: string;
    lastOpenedDate: string;
    isStared: boolean;
  };
}


export type ActiveFiles = {
  element: HTMLDivElement | null;
  item: FileType | FolderType;
  setActive?: (isActive: boolean) => void;
  setIsCopied?: (isCopied: boolean) => void;
};

export type SelectedElements = FileType[] | FolderType[] | (FileType | FolderType)[];

export type ContextRef = {
  handleOpenContext: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>,
    isOpen: boolean
  ) => void;
};


export type Path = {
  id: string;
  name: string;
};