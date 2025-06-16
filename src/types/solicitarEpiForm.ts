import * as yup from 'yup'
import { schemas } from '../lib/yup/schemas'

export type SolicitarEpiForm = yup.InferType<typeof schemas.solicitarEpiForm>