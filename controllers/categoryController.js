import models from '../models/models.js'
import ApiError from '../error/ApiError.js'
import fs from 'fs'
import path from 'path'


class CategoryController {
    async create(req, res, next) {
        try {
            const { name, departmentId } = req.body
            const department = await models.Department.findOne({ where: { id: departmentId } })

            if(department) {
                const category = await models.Category.create({ name, departmentId })
                return res.status(200).json({ message: "Category qoshildi !", status: 200, data: category })
            }
            return next(ApiError.badRequest("Bunday bo'lim topilmadi"))

        } catch (error) {
            return next(ApiError.validationError(error))
        }
    }

    async getAll(req, res) {
        if(Object.keys(req.query).length) {
            const categorys = await models.Category.findAll({where: {departmentId: req.query.departmentId}, include: models.Department})
            return res.status(200).json({ message: "Categorys !", status: 200, data: categorys })
        }
        const categorys = await models.Category.findAll({ include: models.Department })
        return res.status(200).json({ message: "Categorys !", status: 200, data: categorys })
    }

    async getOne(req, res) {
        const {id} = req.params

        const category = await models.Category.findOne({
            where: {id},
            include: models.Department
        })
        return res.status(200).json({ message: "Category!", status: 200, data: category})
    }

    async update(req, res, next) {
        try {
            const { id, name } = req.body
            let category = await models.Category.findOne({ where: { id: id } })

            if (category) {
                await models.Category.update(
                    { name: name },
                    { where: { id: id } }
                )
                category = await models.Category.findOne({ where: { id: id } })
                return res.status(200).json({ message: "Categorya o'zgartirildi!", status: 200, data: category })
            }
            return res.status(404).json({ message: "Bunday categorya mavjud emas !", status: 404, data: null })
        } catch (error) {
            return next(ApiError.validationError(error))
        }
    }

    async delete(req, res) {
        const { id } = req.params
        let category = await models.Category.findOne({ where: { id: id }, include: models.Department })

        if (category) {
            const products = await models.Product.findAll({where: {categoryId: id}})
            await models.Product.destroy({where: { categoryId: id }})
            await models.Category.destroy({ where: { id: id } })

            for (let p of products) {
                let y = fs.unlinkSync(path.join(process.cwd(), 'uploads', p.img))
            }
            return res.status(200).json({ message: "Categorya o'chirildi!", status: 200, data: category })
        }
        return res.status(404).json({ message: "Bunday categorya mavjud emas !", status: 404, data: null })
    }
}

export default new CategoryController()