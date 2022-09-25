import { DEPARTMENT_INPUT_VALIDATION, CATEGORY_INPUT_VALIDATION, PRODUCT_INPUT_VALIDATION, REGISTRATION, LOGIN_INPUT } from '../utils/validation.js'
import ApiError from '../error/ApiError.js'


export default (req, res, next) => {
    try {
        if(req.url === '/department' && req.method === 'POST' || req.url === '/department' && req.method === 'PUT') {
            const {error} = DEPARTMENT_INPUT_VALIDATION.validate({ body: req.body})
            if(error) {
                return next(ApiError.validationError(error.message))
            }
            return next()
        }

        if(req.url === '/category' && req.method === 'POST' || req.url === '/category' && req.method === 'PUT') {
            const {error} = CATEGORY_INPUT_VALIDATION.validate({ body: req.body})
            if(error) {
                return next(ApiError.validationError(error.message))
            }
            return next()
        }


        if(req.url === '/product' && req.method === 'POST') {
            const {error} = PRODUCT_INPUT_VALIDATION.validate({ body: req.body})
            if(error) {
                return next(ApiError.validationError(error.message))
            }
            return next()
        }

        if(req.url === '/user/register' && req.method === 'POST') {
            const {error} = REGISTRATION.validate({ body: req.body})
            if(error) {
                return next(ApiError.validationError(error.message))
            }
            return next()
        }

        if(req.url === '/user/login' && req.method === 'POST') {
            const {error} = LOGIN_INPUT.validate({ body: req.body})
            if(error) {
                return next(ApiError.validationError(error.message))
            }
            return next()
        }

        next()
    }catch(error) {
        next(error)
    }
}