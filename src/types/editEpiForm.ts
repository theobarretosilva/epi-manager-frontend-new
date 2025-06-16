import * as yup from 'yup'
import { schemas } from '../lib/yup/schemas'

export type EditEpiForm = yup.InferType<typeof schemas.editEpiForm>;