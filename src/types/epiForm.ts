import * as yup from 'yup'
import { schemas } from '../lib/yup/schemas'

export type EpiForm = yup.InferType<typeof schemas.epiForm>;