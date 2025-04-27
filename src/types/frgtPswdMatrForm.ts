import * as yup from "yup";

export const FPMatriculaValidationSchema = yup.object().shape({
  matricula: yup
    .string()
    .required("Matrícula é um campo obrigatório!"),
});

export type FrgtPswdMatriculaForm = yup.InferType<typeof FPMatriculaValidationSchema>;
