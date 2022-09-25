import path from 'path'
import models from '../models/models.js'
import ApiError from '../error/ApiError.js'
import fs from 'fs'

const link = 'http://localhost:3001/'


class ProductController {
    async create (req, res, next) {
        try {
            const {name, price, description,  measure, categoryId, departmentId } = req.body
            const {file} = req.files
            const fileName = Date.now() + file.name.replace(/\s/, '')

            if (file.size > 10 * 1024 * 1024) {
                return next(ApiError.validationError('Invalid file size!'))
            }
            if ( !['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype) ) {
                return next(ApiError.validationError('Invalid file mime type!'))
            }
            const product = await models.Product.create({name, price, description, categoryId, departmentId, measure, img: fileName })
            await file.mv(path.join(process.cwd(), 'uploads', fileName))

            product.img = link + product.img
            return res.status(200).json({message: 'product aded !', status: 200, product})

        }catch(error) {
            return next(ApiError.badRequest(error))
        }
    }


    async getAll(req, res) {
        let { categoryId, departmentId, limit, page } = req.query
        page = page || 1
        limit = limit || 12
        let offset = page * limit - limit
        let products

        if(!categoryId && !departmentId) {
            products  = await models.Product.findAndCountAll({ include: [ models.Department, models.Category ]})
        }
        if(categoryId && !departmentId) {
            products = await models.Product.findAndCountAll({where: {categoryId}, limit, offset }) 
        }
        if(!categoryId && departmentId) {
            products = await models.Product.findAndCountAll({where: {departmentId}, limit, offset, include: [ models.Department, models.Category ]}) 
        }
        if(categoryId && departmentId) {
            products = await models.Product.findAndCountAll({where: {categoryId, departmentId}, limit, offset, include: [ models.Department, models.Category ]}) 
        }

        products.rows.forEach(e => e.dataValues.img = link + e.dataValues.img)
        return res.status(200).json({message: 'Products !', status: 200, data: products})
    }

    async getOne(req, res) {
        const {id} = req.params

        const product = await models.Product.findOne({
            where: {id},
            include: [ models.Department, models.Category ]
        })
        product.img = link + product.img
        return res.status(200).json({ message: "Product!", status: 200, data: product})
    }

    async update(req, res, next) {
        try {
            const {productId, name, description, price, measure } = req.body
            let product = await models.Product.findOne({where: {id: productId}})
            let fileName

            if(!product) {
                return res.status(404).json({ message: "Bunday mahsulot mavjud emas", status: 404, data: null })
            }
            if(req.files) {
                const{file} = req.files
                fileName = Date.now() + file.name.replace(/\s/, '')

                if (file.size > 10 * 1024 * 1024) {
                    return next(ApiError.validationError('Invalid file size!'))
                }
                if ( !['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype) ) {
                    return next(ApiError.validationError('Invalid file mime type!'))
                }
                await file.mv(path.join(process.cwd(), 'uploads', fileName))
                fs.unlinkSync(path.join(process.cwd(), 'uploads', product.img))
                await models.Product.update({img: fileName}, { where: {id: productId}})
                product.img = link + fileName
            }
            await models.Product.update({ name, description, price, measure}, { where: {id: productId}})
            product = await models.Product.findOne({where: {id: productId}})
            return res.status(200).json({message: "Mahsulot ma'lumotlari o'zgartirildi !", status: 200, product})

        }catch(error) {
            return next(ApiError.badRequest(error))
        }
    }

    async delete(req, res) {
        const { id } = req.params
        let product = await models.Product.findOne({ where: { id: id }, include: models.Department })

        if (product) {
            await models.Product.destroy({ where: { id: id }})
            fs.unlinkSync(path.join(process.cwd(), 'uploads', product.img))
            return res.status(200).json({ message: "Mahsulot o'chirildi!", status: 200, data: product })
        }
        return res.status(404).json({ message: "Bunday mahsulot mavjud emas !", status: 404, data: null })
    }
}

export default new ProductController()