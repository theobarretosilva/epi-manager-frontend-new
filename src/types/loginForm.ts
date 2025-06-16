import * as yup from 'yup'
import { schemas } from '../lib/yup/schemas'

export type LoginForm = yup.InferType<typeof schemas.loginForm>