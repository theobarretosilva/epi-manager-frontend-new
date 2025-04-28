import { useSetNewPswdForm } from "../../hooks/useSetNewPswdForm";

type SetNewPswdFormProps = {
    email: string;
};

export const SetNewPswdForm = ({ email }: SetNewPswdFormProps) => {
    const { onSubmit, errors, responseError, control, isLoading, clearErrors } =
    useSetNewPswdForm(email);
    
    return(
        <>
        aiaiuiui
        </>
    )
}