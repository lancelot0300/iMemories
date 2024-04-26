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