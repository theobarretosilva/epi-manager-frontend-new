import * as yup from "yup";

export const SNPswdValidationSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres!")
    .required("Senha é um campo obrigatório!"),
  confirm_password: yup
    .string()
    .oneOf(
      [yup.ref("password")],
      "A confirmação da senha não é igual à senha!",
    )
    .required("Confirmação da senha é um campo obrigatório!"),
});

export type SetNewPswdForm = yup.InferType<typeof SNPswdValidationSchema>;
