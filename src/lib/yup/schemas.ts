import * as yup from 'yup'
import { validators } from './validators'

export const schemas = {
    loginForm: yup.object().shape({
        email: validators.email,
        password: validators.password,
    })
}