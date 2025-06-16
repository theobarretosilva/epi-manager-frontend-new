import * as yup from 'yup'
import { schemas } from '../lib/yup/schemas'

export type ColaboradorForm = yup.InferType<typeof schemas.colaboradorForm>