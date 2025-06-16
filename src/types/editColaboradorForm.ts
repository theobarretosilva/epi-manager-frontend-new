import * as yup from 'yup'
import { schemas } from '../lib/yup/schemas'

export type EditColaboradorForm = yup.InferType<typeof schemas.editColaboradorForm>