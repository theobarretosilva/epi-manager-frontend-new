import * as yup from "yup";

export const FPMatriculaValidationSchema = yup.object().shape({
  matricula: yup
    .string()
    .required("Matrícula é um campo obrigatório!"),
    email: yup
    .string()
    .email("O e-mail não é valido!")
    .required("E-mail é um campo obrigatório!"),
});

export type FrgtPswdMatriculaForm = yup.InferType<typeof FPMatriculaValidationSchema>;
