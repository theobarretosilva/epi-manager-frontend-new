import * as yup from "yup";

export const CRPswdValidationSchema = yup.object().shape({
  n1: yup.number().required("O código é necessário para recuperar sua senha!"),
  n2: yup.number().required("O código é necessário para recuperar sua senha!"),
  n3: yup.number().required("O código é necessário para recuperar sua senha!"),
  n4: yup.number().required("O código é necessário para recuperar sua senha!"),
});

export type CodeResetPswdForm = yup.InferType<typeof CRPswdValidationSchema>;
