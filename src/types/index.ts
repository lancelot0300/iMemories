export type Item = {
    id: string;
    folderId: string;
    storageFileId: string;
    tags: never[];
    isFolder: boolean,
    category: null;
    fileDetails: {
        id: string;
        name: string;
        size: number;
        description: null;
        isStared: boolean;
        createdDate: string;
        lastOpenedDate: string;
        lastModifiedDate: string;
    };
}

export type ActiveFiles = {
    element: HTMLDivElement | null;
    item: Item
    setActive?: (isActive: boolean) => void;
    setIsCopied?: (isCopied: boolean) => void;
}

export type SelectedElements = Item[]

export type ContextRef = {
    handleOpenContext: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, isOpen: boolean) => void;
}