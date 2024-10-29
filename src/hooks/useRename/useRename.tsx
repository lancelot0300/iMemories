import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../state/store";
import * as yup from "yup";
import { useFormik } from "formik";
import CreateModal from "../../components/CreateModal/CreateModal";
import { InputWrapper, StyledField } from "../../pages/Login/login.styles";
import { UploadModal } from "../../components/ContextComponents/CreateFolderOption/createFolder.styles";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { UploadFormButton } from "../useCreateFolder/useCreateFolder.styles";
import useAxiosPrivate from "../useAxiosPrivate/useAxiosPrivate";
import { refreshPathAsync } from "../../state/features/path/pathSlice";

type IFormValues = {
  name: string;
};

function useRename(setIsOpened: (value: boolean) => void) {
  const { data } = useAppSelector((state) => state.path);
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const { selectedFiles } = useAppSelector((state) => state.files);
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();

  const schema = yup.object().shape({
    name: yup.string().required("Folder name is required"),
  });

  const handleCloseClick = () => {
    setIsOpenedModal(false);
    setIsOpened(false);
  };

  const onSubmit = async ({ name }: IFormValues) => {
    const cleanedName = name.trim();
    const isFile = "fileDetails" in selectedFiles[0];
    const isFolder = "folderDetails" in selectedFiles[0];

    const url = isFile ? "/file" : isFolder ? "/folder" : "";

      try {
        await axiosPrivate.patch(
          process.env.REACT_APP_API_URL + url + "/rename",
          {
            id: selectedFiles[0].id,
            name: cleanedName,
          },
          { withCredentials: true }
        );
      } catch (error) {
        console.error(error);
      }
      dispatch(refreshPathAsync(data.id));
  };

  const { values, errors, touched, handleChange, handleSubmit } =
    useFormik<{ name: string }>({
      initialValues: {
        name: "",
      },
      onSubmit,
      validationSchema: schema,
    });

  const createModal = () => {

    if(!isOpenedModal) return null;

    return (
      <>
        <CreateModal isOpened={isOpenedModal} setIsOpened={handleCloseClick}>
          <UploadModal>
            <form onSubmit={handleSubmit} title="Folder">
              <InputWrapper>
                <StyledField
                  id="name"
                  name="name"
                  autoComplete="name"
                  placeholder="New name"
                  value={values.name}
                  onChange={handleChange}
                  $isError={!!errors.name}
                />
                <ErrorMessage $isError={!!errors.name}>
                  {touched.name && errors.name ? errors.name : ""}
                </ErrorMessage>
              </InputWrapper>
              <UploadFormButton type="submit">Rename</UploadFormButton>
            </form>
          </UploadModal>
        </CreateModal>
      </>
    );
  };

  return { setIsOpenedModal, createModal, selectedFiles };
}

export default useRename;
