import * as yup from 'yup'
import { validators } from './validators'

export const schemas = {
    loginForm: yup.object().shape({
        matricula: validators.matricula,
        password: validators.password,
    })
}