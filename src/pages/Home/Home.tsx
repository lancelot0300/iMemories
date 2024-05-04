import React, { useEffect, useRef, useState } from 'react'
import { FolderGridContainer, HomeContainer } from './home.styles'
import FolderTypeElement from '../../components/FolderTypeElement/FolderTypeElement'
import { Item } from '../../types'
import NavBar from '../../components/NavBar/NavBar'
import useDropHook from '../../hooks/dropHook/useDropHook'
import { SelectedElements } from '../../types'




function Home() {

    const [selectedElements, setSelectedElements] = useState<SelectedElements[]>([]);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const allFilesRefs = useRef<(HTMLDivElement | null)[]>([]);
    useDropHook({containerRef});
    


    const folderStructure = [
        {
            "id": "84bb8ca0-0bfa-409d-4964-08dc64a33add",
            "folderId": "16d49864-cd29-47be-10c2-08dc649f508b",
            "storageFileId": "9c651e8a-4f23-4b14-826e-a9bf1214af64",
            "tags": [],
            "isFolder": false,
            "category": null,
            "fileDetails": {
                "id": "84bb8ca0-0bfa-409d-4964-08dc64a33add",
                "name": "bukkit.yml",
                "size": 1264,
                "description": null,
                "isStared": false,
                "createdDate": "2024-04-24T21:15:57.4333161",
                "lastOpenedDate": "0001-01-01T00:00:00",
                "lastModifiedDate": "0001-01-01T00:00:00"
            }
        },
        {
            "id": "0c61fae1-9a41-4a48-9d32-08dc64a1ac7d",
            "folderId": "16d49864-cd29-47be-10c2-08dc649f508b",
            "storageFileId": "bd0a3c11-7825-49a0-a1d8-4f898a566e7b",
            "tags": [],
            "isFolder": false,
            "category": null,
            "fileDetails": {
                "id": "0c61fae1-9a41-4a48-9d32-08dc64a1ac7d",
                "name": "Mateusz Rączka - Comarch.pdf",
                "size": 62534,
                "description": null,
                "isStared": false,
                "createdDate": "2024-04-24T21:01:36.4775277",
                "lastOpenedDate": "0001-01-01T00:00:00",
                "lastModifiedDate": "0001-01-01T00:00:00"
            }
        },
        {
            "id": "84bb8ca0-0bfa-409d-4964-08dc64a33add3",
            "folderId": "16d49864-cd29-47be-10c2-08dc649f508b",
            "storageFileId": "9c651e8a-4f23-4b14-826e-a9bf1214af64",
            "tags": [],
            "isFolder": true,
            "category": null,
            "fileDetails": {
                "id": "84bb8ca0-0bfa-409d-4964-08dc64a33add",
                "name": "Folder 2",
                "size": 1264,
                "description": null,
                "isStared": false,
                "createdDate": "2024-04-24T21:15:57.4333161",
                "lastOpenedDate": "0001-01-01T00:00:00",
                "lastModifiedDate": "0001-01-01T00:00:00"
            }
        },
        {
            "id": "0c61fae1-9a41-4a48-9d32-08dc64a1ac7d3",
            "folderId": "16d49864-cd29-47be-10c2-08dc649f508b",
            "storageFileId": "bd0a3c11-7825-49a0-a1d8-4f898a566e7b",
            "tags": [],
            "isFolder": false,
            "category": null,
            "fileDetails": {
                "id": "0c61fae1-9a41-4a48-9d32-08dc64a1ac7d",
                "name": "Mateusz Rączka - Comarch.pdf",
                "size": 62534,
                "description": null,
                "isStared": false,
                "createdDate": "2024-04-24T21:01:36.4775277",
                "lastOpenedDate": "0001-01-01T00:00:00",
                "lastModifiedDate": "0001-01-01T00:00:00"
            }
        },
        {
            "id": "84bb8ca0-0bfa-409d-4964-08dc64a33add2",
            "folderId": "16d49864-cd29-47be-10c2-08dc649f508b",
            "storageFileId": "9c651e8a-4f23-4b14-826e-a9bf1214af64",
            "tags": [],
            "isFolder": false,
            "category": null,
            "fileDetails": {
                "id": "84bb8ca0-0bfa-409d-4964-08dc64a33add",
                "name": "bukkit.yml",
                "size": 1264,
                "description": null,
                "isStared": false,
                "createdDate": "2024-04-24T21:15:57.4333161",
                "lastOpenedDate": "0001-01-01T00:00:00",
                "lastModifiedDate": "0001-01-01T00:00:00"
            }
        },
        {
            "id": "0c61fae1-9a41-4a48-9d32-08dc64a1ac7d2",
            "folderId": "16d49864-cd29-47be-10c2-08dc649f508b",
            "storageFileId": "bd0a3c11-7825-49a0-a1d8-4f898a566e7b",
            "tags": [],
            "isFolder": false,
            "category": null,
            "fileDetails": {
                "id": "0c61fae1-9a41-4a48-9d32-08dc64a1ac7d",
                "name": "Mateusz Rączka - Comarch.pdf",
                "size": 62534,
                "description": null,
                "isStared": false,
                "createdDate": "2024-04-24T21:01:36.4775277",
                "lastOpenedDate": "0001-01-01T00:00:00",
                "lastModifiedDate": "0001-01-01T00:00:00"
            }
        },
        {
            "id": "84bb8ca0-0bfa-409d-4964-08dc64a33add1",
            "folderId": "16d49864-cd29-47be-10c2-08dc649f508b",
            "storageFileId": "9c651e8a-4f23-4b14-826e-a9bf1214af64",
            "tags": [],
            "category": null,
            "isFolder": false,
            "fileDetails": {
                "id": "84bb8ca0-0bfa-409d-4964-08dc64a33add",
                "name": "bukkit.yml",
                "size": 1264,
                "description": null,
                "isStared": false,
                "createdDate": "2024-04-24T21:15:57.4333161",
                "lastOpenedDate": "0001-01-01T00:00:00",
                "lastModifiedDate": "0001-01-01T00:00:00"
            }
        },
        {
            "id": "0c61fae1-9a41-4a48-9d32-08dc64a1ac7d1",
            "folderId": "16d49864-cd29-47be-10c2-08dc649f508b",
            "storageFileId": "bd0a3c11-7825-49a0-a1d8-4f898a566e7b",
            "tags": [],
            "isFolder": false,
            "category": null,
            "fileDetails": {
                "id": "0c61fae1-9a41-4a48-9d32-08dc64a1ac7d",
                "name": "Mateusz Rączka - Comarch.pdf",
                "size": 62534,
                "description": null,
                "isStared": false,
                "createdDate": "2024-04-24T21:01:36.4775277",
                "lastOpenedDate": "0001-01-01T00:00:00",
                "lastModifiedDate": "0001-01-01T00:00:00"
            }
        },
    ]

    

    const handleClickOutside = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if(!containerRef.current) return;
        if(selectedElements.length === 0) return;
        if(allFilesRefs.current.some((el) => el?.contains(e.target as Node))) return;

        setSelectedElements([]);
    };




    
  return (
    <>
        <NavBar selectedElement={selectedElements} />
        <HomeContainer onClick={handleClickOutside} ref={containerRef}>
            <FolderGridContainer>
                {Object.values(folderStructure).map((item: Item, index) => {
                    return (
                        <FolderTypeElement
                            key={item.id}
                            element={item}
                            selectedElements={selectedElements}
                            setSelectedElements={setSelectedElements}
                            ref={(el) => {allFilesRefs.current[index] = el}}
                        />  
                    )
                })}
            </FolderGridContainer>
        </HomeContainer>   
    </>
    
  )
}

export default Home