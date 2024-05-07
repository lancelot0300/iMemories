import { useAppDispatch, useAppSelector } from "../stateHook/useStateHook";
import axios from "axios";
import { addFileStatus, updateFileStatus } from "../../state/features/activeRequests/activeRequests";


function useOptionsHook() {

    const { path } = useAppSelector((state) => state.path);
    const dispatch = useAppDispatch();


    const uploadFiles = async (files: FileList | null) => {
        if (files) {
          const apiUrl = process.env.REACT_APP_API_URL + "/file/A66946B5-99B4-425F-0922-08DC6499EC98" + path;
      
          for (let i = 0; i < files.length; i++) {
            const formData = new FormData();
            const file = files[i];
            formData.append("fileData", file);

            const fileId = `${file.name}-${Date.now()}`;
            dispatch(addFileStatus({
                index: fileId,
                fileName: file.name,
                status: "0%",
            }));

            axios.post(apiUrl, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              withCredentials: true,
              onUploadProgress(progressEvent) {
                if(progressEvent && progressEvent.total) {
                  const procent = (progressEvent.loaded / progressEvent.total) * 100;
                  dispatch(updateFileStatus({
                    index: fileId,
                    fileName: file.name,
                    status: procent.toFixed(0) + "%",
                  }));
                }
              },
            });
          }
        } else {
          alert("Select a file to upload");
        }
      };
    

    return { uploadFiles };
}

export default useOptionsHook;
