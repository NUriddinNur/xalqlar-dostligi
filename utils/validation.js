import Joi from 'joi'

export const DEPARTMENT_INPUT_VALIDATION = Joi.object({
    body: Joi.object({
        id: Joi.string(),
        name: Joi.string().trim().min(2).max(55).required()
    })
})


export const CATEGORY_INPUT_VALIDATION = Joi.object({
    body: Joi.object({
        id: Joi.string(),
        departmentId: Joi.string(),
        name: Joi.string().trim().min(2).max(55).required()
    })
})




export const PRODUCT_INPUT_VALIDATION = Joi.object({
    body: Joi.object({
        name: Joi.string().min(2).max(255).required(),
        price: Joi.number().required(),
        departmentId: Joi.string().required(),
        categoryId: Joi.string().required(),
        description: Joi.string().max(1000),
        measure: Joi.string().allow('kg', 'dona').required()
    })
})


export const REGISTRATION = Joi.object({
    body: Joi.object({
        username: Joi.string().trim().min(2).max(255).required(),
        password: Joi.string().trim().min(4).required(),
        phone: Joi.string().trim().length(12).pattern(/^[0-9]+$/).required()
    })
})

export const LOGIN_INPUT = Joi.object({
    body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    })
})