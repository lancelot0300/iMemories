import { get } from "http";
import { useAppDispatch, useAppSelector } from "../../state/store"
import { getActualPath } from "../../state/features/path/pathSlice";
import axios from "axios";


function useCreateFolder() {

    const path = useAppSelector((state) => getActualPath(state.path))

    const handleCreateClick = () => {
       const response = axios.post(
         process.env.REACT_APP_API_URL + "/folder",
         {
           parentFolderId: "f46fe28e-1293-4f93-75bb-08dc7f57c8eb",
           folderDetails: {
             Name: "TestFolder",
           },
         },
         { withCredentials: true }
       ).then((res) => {
           console.log(res.data)
       }).catch((error) => {
           console.log(error)
       })
    }

    return {handleCreateClick}

}

export default useCreateFolder